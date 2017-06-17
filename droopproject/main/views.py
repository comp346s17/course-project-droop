from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from base64 import b64decode
from django.core.files.base import ContentFile
import random
import datetime
from models import Drawing
from models import Collection
from models import Prompt

@ensure_csrf_cookie
def index(request):
    return render(request, 'main/index.html')


def drawingsApi(request, drawingId=None):
    if request.method == 'GET' and drawingId is not None:
        drawing = getDrawing(drawingId)
        return JsonResponse(drawing.to_json())
    elif request.method == 'GET':
        drawings = getFinishedDrawingsByDate()
        drawingsJson = [drawing.to_json() for drawing in drawings]
        return JsonResponse(drawingsJson, safe=False)
    elif request.method == 'POST':
        params = json.loads(request.body)
        drawingId = params.get('drawingId')
        image_url = params.get('text')
        collectionId = params.get('collectionId')
        image_bs64 = image_url.split('base64,')[1]  # Gather just the bs64 encoding from the url
        image_data = b64decode(image_bs64)

        if Drawing.objects.filter(id=drawingId).count() > 0:  # If drawing already exists
            drawing = getDrawing(drawingId)
        else:
            collection = Collection.objects.get(id=collectionId)  # Get collection of drawing so database entry can have right collection
            drawing = Drawing(collection=collection, title=collection.title)
        drawing_name = 'drawing.png' + str(drawingId)
        drawing.image = ContentFile(image_data, drawing_name)
        drawing.updates += 1
        if is_drawing_finished(drawing):
            drawing.date = datetime.datetime.now()  # Only update time when drawing is finished and added to gallery
            drawing.finished = True
        drawing.save()
        return JsonResponse(drawing.to_json())

def collectionsApi(request, collectionId=None):
    if request.method == 'GET' and collectionId is not None:
        collection = Collection.objects.get(id=collectionId)
        return JsonResponse(collection.to_json())

def promptsApi(request, collectionId, updates):
    if request.method == 'GET':
        prompts = Prompt.objects.filter(collection=collectionId, promptNum=updates)
        return JsonResponse(prompts[0].to_json())


def getRandomUnfinishedDrawing(request):
    # First check if we should create a new drawing using a random number test
    num_unfinished_drawings = Drawing.objects.filter(finished=False).count()

    if num_unfinished_drawings == 0 or random.random() <= 0.20:  # 20% chance of getting blank canvas
        collection = get_random_collection()
        new_drawing = Drawing(collection=collection, title=collection.title)
        return JsonResponse(new_drawing.to_json())
    else:  # Get random drawing from unfinished
        random_idx = random.randint(0, num_unfinished_drawings - 1)
        drawing = Drawing.objects.filter(finished=False)[random_idx]
        return JsonResponse(drawing.to_json())


def addView(request, drawingId):
    drawing = Drawing.objects.get(id=drawingId)
    drawing.views += 1
    drawing.save()
    return JsonResponse(drawing.to_json())



# Helper functions
def getFinishedDrawingsByDate():
    return Drawing.objects.filter(finished=True).order_by('-date')

def getDrawing(drawingId):
    return Drawing.objects.get(id=drawingId)

def get_random_collection():
    num_collections = Collection.objects.count()
    rand_idx = random.randint(0, num_collections - 1)
    return Collection.objects.all()[rand_idx]

def is_drawing_finished(drawing):
    collection = drawing.collection
    return drawing.updates >= collection.numPrompts

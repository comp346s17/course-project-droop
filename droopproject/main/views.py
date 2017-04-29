from django.shortcuts import render
from django.http import JsonResponse
from models import Drawing
from models import Collection
from models import Prompt
import random


def index(request):
    return render(request, 'main/index.html')

def saveImageApi(request, dataUrl):
    if request.method == 'POST':
        collection = Collection(title="Bike Ride by the River")  # I think this is what is causing the error
        newImage = Drawing(collectionId=collection, image=dataUrl)  # Just testing this out
        newImage.save()
        return render(request, 'main/index.html')

def drawingsApi(request, drawingId=None):
    if request.method == 'GET' and drawingId is not None:
        drawing = getDrawing(drawingId)
        print(drawing)
        return JsonResponse(drawing.to_json())
    elif request.method == 'GET':
        drawings = getFinishedDrawings()
        print(drawings)
        drawingsJson = [drawing.to_json() for drawing in drawings]
        return JsonResponse(drawingsJson, safe=False)


def getFinishedDrawings():
    return Drawing.objects.filter(finished=True).order_by('-date')

def getDrawing(drawingId):
    return Drawing.objects.get(id=drawingId)

def addLike(drawingId):
    drawing = Drawing.objects.get(id=drawingId)
    drawing.likes += 1
    drawing.save()

def addView(drawingId):
    drawing = Drawing.objects.get(id=drawingId)
    drawing.views += 1
    drawing.save()



def updateDrawing(drawingId, image):
    drawing = Drawing.objects.get(id=drawingId)
    drawing.updates += 1
    # Update Image here
    drawing.save()

def getRandomUnfinishedDrawing():
    random_idx = random.randint(0, Drawing.objects.count() - 1)
    return Drawing.objects.filter(finished=false)[random_idx]

def getCurrentDrawingPrompt(drawingId):
    drawing = Drawing.objects.get(id=drawingId)
    return Prompt.objects.filter(collectionId=drawing.CollectionId).filter(promptNum=drawing.updates)[0]  # TODO: This is kinda ugly.

def getCurrentDrawingTitle(drawingId):
    drawing = Drawing.objects.get(id=drawingId)
    return Collection.get(id=drawing.CollectionId)

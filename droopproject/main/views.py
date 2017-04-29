from django.shortcuts import render
from models import Drawing
from models import Collection
from models import Prompt
import random


def index(request):
    return render(request, 'main/index.html')

def getFinishedDrawings(num):
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

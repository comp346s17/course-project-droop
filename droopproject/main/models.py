from __future__ import unicode_literals
from django.db import models
import random
import datetime
from django.conf import settings


class Drawing(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    views = models.IntegerField(default=0)
    collection = models.ForeignKey('Collection')
    title = models.CharField(max_length=200)
    updates = models.IntegerField(default=0)
    finished = models.BooleanField(default=False)
    image = models.ImageField(upload_to="drawings/", null=True, blank=True)

    def save(self, *args, **kwargs):  # From http://stackoverflow.com/questions/4394194/replacing-a-django-image-doesnt-delete-original
        # delete old file when replacing by updating the file
        try:
            this = Drawing.objects.get(id=self.id)
            if this.image != self.image:
                this.image.delete(save=False)
        except: pass  # when new photo then we do nothing, normal case
        super(Drawing, self).save(*args, **kwargs)

    def to_json(self):
        try:  # If imageUrl is null, default to blank screen image
            image_url = self.image.url
        except:
            image_url = settings.MEDIA_URL + 'drawings/blankImage.png'

        return {
            'id': self.id,
            'date': self.date,
            'title': self.title,
            'views': self.views,
            'updates': self.updates,
            'collectionId': self.collection.id,
            'finished': self.finished,
            'imageUrl': image_url
        }

    def __str__(self):
        return str(self.id) + str(self.title)


class Collection(models.Model):
    title = models.CharField(max_length=200)
    numPrompts = models.IntegerField(default=5)


    def to_json(self):
        return {
            'title': self.title,
            'numPrompts': self.numPrompts
        }

    def __str__(self):
        return self.title

class Prompt(models.Model):
    text = models.CharField(max_length=300)
    collection = models.ForeignKey('Collection')
    promptNum = models.IntegerField()

    class Meta:
        unique_together = ("collection", "promptNum")

    def to_json(self):
        return {
            'text': self.text,
            'collectionId': self.collection.id,
            'promptNum': self.promptNum
        }

    def __str__(self):
        return self.text

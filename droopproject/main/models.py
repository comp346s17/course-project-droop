from __future__ import unicode_literals
from django.db import models


class Drawing(models.Model):
    date = models.DateTimeField(auto_now=True)
    likes = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    collection = models.ForeignKey('Collection')
    updates = models.IntegerField(default=0)
    finished = models.BooleanField(default=False)
    image = models.ImageField(upload_to="drawings/")

    def to_json(self):
        return {
            'id': self.id,
            'date': self.date,
            'likes': self.likes,
            'views': self.views,
            'updates': self.updates,
            'collectionId': self.collection.id,
            'finished': self.finished,
            'imageUrl': self.image.url
        }

class Collection(models.Model):
    title = models.CharField(max_length=200)
    numPrompts = models.IntegerField(default=5)

    def to_json(self):
        return {
            'title': self.title,
            'numPrompts': self.numPrompts
        }

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

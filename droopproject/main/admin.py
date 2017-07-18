from django.contrib import admin
from main.models import Drawing, Collection, Prompt

# Register your models here.
admin.site.register(Drawing)
admin.site.register(Collection)
admin.site.register(Prompt)

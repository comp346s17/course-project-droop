# droopproject URL Configuration

from django.conf.urls import url
from django.contrib import admin
from main import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index, name='index'),
    url(r'^api/drawings/$', views.drawingsApi),
    url(r'^api/drawings/(?P<drawingId>[0-9]+)$', views.drawingsApi),
    url(r'^api/getCanvasDrawing/$', views.getRandomUnfinishedDrawing),
    url(r'^api/prompts/(?P<collectionId>[0-9]+)/(?P<updates>[0-9]+)$', views.promptsApi),
    url(r'^api/collections/$', views.drawingsApi),
    url(r'^api/collections/(?P<collectionId>[0-9]+)$', views.collectionsApi),
    url(r'^api/addView/(?P<drawingId>[0-9]+)$', views.addView),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from django.contrib import admin
from django.urls import path, include

#from django.views.generic import TemplateView
#from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('djoser.urls')),
    path('api/', include("user.urls", namespace="user")),
    path('api/', include("app.urls", namespace="app")),
    path("__debug__/", include("debug_toolbar.urls")), 
   # path("", TemplateView.as_view(template_name='frontend/index.html')), # for the empty url
    #url(r'^.*/$',TemplateView.as_view(template_name='frontend/index.html')), # for all other urls  
]

# if settings.DEBUG:
#     import debug_toolbar
#     urlpatterns = [
#         path("__debug__/", include("debug_toolbar.urls")), 
#     ] + urlpatterns
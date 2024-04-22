from django.urls import path, include
from .api.views import *
from . import views
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

app_name = 'app'

urlpatterns = [
    path('lquest/', QuestionnaireList.as_view(), name='questionnaire-list'),
    path('lquest/<str:purp>', QuestionnairePurpose.as_view(), name='questionnaire-purpose'),
    path('quest/<int:id>', QuestionnaireQuestions.as_view(), name='questionnaire-questions'),
    path('servq/<str:name>/<str:flag>/<int:year>', ServiceQualityList.as_view(), name='servicequality'),  
    path('sent/<str:name>/<str:flag>', SentimentMarksList.as_view(), name='sentimentmarks'),
    path('wc/<str:name>/<str:flag>', WordcloudList.as_view(), name='wordcloud'),    
]


# Service quality: if updates, has to be for every company at once

     #path("", views.index, name="index"),

     # path("api/models/",
     #      PredAllModelsView.as_view(),
     #      name="listModels"),
   
     #path("api/posts/<int:pk>",
     #    PredModelDetail.as_view(),
     #    name="detail"),

     # path("api/models/<int:fk>/",
     #      ModelTimeseriesList.as_view(),
     #      name="listModelTimeseries"),
     
     # path("api/historic_data/",
     #      HistoricDataList.as_view(),
     #      name="listHistoricData"),

     # path("api/historic_data/<int:fk>/",
     #      HistoricTimeseriesList.as_view(),
     #      name="listHistoricTimeseries"),
     
     #path("api/sentiment/<str:country>/<str:source>/",
     #     SentimentGeneralList.as_view(), 
     #     name="listSentimentFilterCountrySource"),
     
     # path("api/sentiment/<str:entity>/<str:country>/<str:source>/",
     #      SentimentList.as_view(),
     #      name="listSentimentFilterCountrySource"),

     # path("api/sentiment/",
     #      SentimentList.as_view(),
     #      name="listSentimentFilterCountrySource"),
     
     # path("api/wordcloud/",
     #      WordcloudList.as_view(),
     #      name="wordcloudlist"),
     
     # path("api/susQuestions/",
     
     #      SusQuestionsList.as_view(),
     #      name="listSusQuestions"),

     # path("api/susChoices/<int:question_fk>/",
     #      SusChoicesList.as_view(),
     #      name="listSusChoices"),


     # TODO this endpoint doesn't need authentication
     # path("api/sustainabilityGeneral/",
     #      SusGeneralList.as_view(),
     #      name="listSusGeneral"), 

     # path("api/sustainabilityLogged/<int:User_fk>/",
     #      SusLoggedList.as_view(),
     #      name="listSusLogged"),

     # TODO this endpoint doesn't need authentication
     # path("api/serviceQualityGeneral/",
     #      ServiceQualityGeneralList.as_view(),
     #      name="listServiceQualityGeneral"), 

     # path("api/serviceQualityLogged/<int:User_fk>/",
     #      ServiceQualityLoggedList.as_view(),
     #      name="listServiceQualityLogged"),
     
     

     # Added for JWT auth part 2
     #path('user',
     #     LoadUserView.as_view()),
     
     # Added for JWT auth part 1
     #path('api/token/',
     #     TokenObtainPairView.as_view()),
     
     # Added for JWT auth part 1
     #path('api/token/refresh/',
     #     TokenRefreshView.as_view()),
     
     # Added for JWT auth part 1
     #path('api/token/verify/',
     #     TokenVerifyView.as_view()),

     # Added for Nuno video part 1
     #path('apiAuth/', include('djoser.urls')),

     # Added for Nuno video part 1
     #         path('apiAuth/', include('djoser.urls')),
     #path('apiAuth/', include('djoser.urls.jwt')),
     #         path('apiAuth/', include('user.urls')),
     #path('apiAuth/', include('djoser.urls.authtoken')),
#]

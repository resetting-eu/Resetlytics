from .serializers import *
from app.models import *

# from django.db.models import Q, Count, Sum, Min, Max, Prefetch

#from rest_framework.generics import *
from rest_framework import renderers
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.generics import (
    ListAPIView,
)

# Some useful defs


class QuestionnaireList(ListAPIView):
    renderer_classes = [renderers.JSONRenderer]
    serializer_class = QuestionnaireSerializer
    # permission_classes = (permissions.IsAuthenticateOrReadOnly, )

    queryset = Questionnaire.objects.all()

class QuestionnairePurpose(ListAPIView):
    renderer_classes = [renderers.JSONRenderer]
    serializer_class = QuestionnaireSerializer
    # permission_classes = (permissions.IsAuthenticateOrReadOnly, )

    def get_queryset(self):
        return Questionnaire.objects.filter(purpose__icontains=self.kwargs['purp'])

class QuestionnaireQuestions(ListAPIView):
    renderer_classes = [renderers.JSONRenderer]
    serializer_class = QuestionBlockSerializer

    def get_queryset(self):
        # q = build_myqueryset(seld)
        # return q
        return QuestionBlock.objects.filter(questionnaire=self.kwargs['id'])
    
class ServiceQualityList(ListAPIView):
    renderer_classes = [renderers.JSONRenderer]
    serializer_class = ServiceQualitySerializer

    def get_queryset(self):
        return ServiceQuality.objects.filter(organization__legal_name=self.kwargs['name'], 
                                           organization__country=self.kwargs['flag'],
                                           year=self.kwargs['year']
                                           )   

class SentimentMarksList(ListAPIView):
    renderer_classes = [renderers.JSONRenderer]
    serializer_class = SentimentMarksSerializer

    def get_queryset(self):
        return SentimentMarks.objects.filter(sentiment__organization__legal_name=self.kwargs['name'], 
                                        sentiment__organization__country=self.kwargs['flag']
                                           )

class WordcloudList(ListAPIView):
    renderer_classes = [renderers.JSONRenderer]
    serializer_class = WordcloudSerializer

    def get_queryset(self):
        return Wordcloud.objects.filter(sentiment__organization__legal_name=self.kwargs['name'], 
                                        sentiment__organization__country=self.kwargs['flag']
                                           )
    



# class PredModelList(ListAPIView):
#     renderer_classes = [renderers.JSONRenderer]
#     serializer_class = PredModel_Serializer

#     queryset = Pred_Model.objects.all()
    

# class ModelTimeseriesList(ListAPIView):
#     renderer_classes = [renderers.JSONRenderer]
#     serializer_class = ModelTimeseries_Serializer

#     def get_queryset(self):
#         return Model_Timeseries.objects.filter(pred_model=self.kwargs['fk'])


# class HistoricDataList(ListAPIView):
#     renderer_classes = [renderers.JSONRenderer]
#     serializer_class = HistoricData_Serializer

#     queryset = Historic_Data.objects.all()


# class HistoricTimeseriesList(ListAPIView):
#     renderer_classes = [renderers.JSONRenderer]
#     serializer_class = HistoricTimeseries_Serializer
    
#     def get_queryset(self):
#         return Historic_Timeseries.objects.filter(historic_data_id=self.kwargs['fk'])


# class PredAllModelsView(APIView):
#     """
#     API View to get all Pred_Model and Model_Timeseries objects.
#     """

#     def get(self, request, *args, **kwargs):
#         # Serialize all Pred_Model objects
#         pred_models = Pred_Model.objects.all()
#         pred_models_serializer = PredModel_Serializer(pred_models, many=True)

#         # Serialize all Model_Timeseries objects
#         model_timeseries = Model_Timeseries.objects.all()
#         model_timeseries_serializer = ModelTimeseries_Serializer(model_timeseries, many=True)

#         # Construct the response data
#         response_data = {
#             'models': pred_models_serializer.data,
#             'timeseries': model_timeseries_serializer.data
#         }

#         return Response(response_data)

# #class PredAllModelsView(APIView):
# #    def get(self, request, *args, **kwargs):
# #        # Instantiate your serializer
# #        serializer = PredAllModels_Serializer()
# #
# #        # Get the serialized data
# #        serialized_data = serializer.data
# #
# #        # Return the serialized data in the response
# #        return Response(serialized_data)

# ==============================================================================
# Sentiment

# class SentimentGeneralList(ListAPIView):
#     renderer_classes = [renderers.JSONRenderer]
#     serializer_class = SentimentSerializer

#     def get_queryset(self):
#         if self.kwargs['country'] == "all":
#             if self.kwargs['source'] == "all":
#                 return Sentiment.objects.all()
#             else:
#                 return Sentiment.objects.filter(source=self.kwargs['source'])
#         else:
#             if self.kwargs['source'] == "all":
#                 return Sentiment.objects.filter(country=self.kwargs['country'])
#             else:
#                 return Sentiment.objects.filter(country=self.kwargs['country'], source=self.kwargs['source'])        

# class SentimentList(ListAPIView):
#     renderer_classes = [renderers.JSONRenderer]
#     serializer_class = SentimentSerializer

#     def get_queryset(self):
        
#         if self.kwargs['entity'] == "all":
#             if self.kwargs['country'] == "all":
#                 if self.kwargs['source'] == "all":
#                     return Sentiment.objects.all()
#                 else:
#                     return Sentiment.objects.filter(source=self.kwargs['source'])
#             else:
#                 if self.kwargs['source'] == "all":
#                     return Sentiment.objects.filter(ecountry=self.kwargs['country'])
#                 else:
#                     return Sentiment.objects.filter(country=self.kwargs['country'], source=self.kwargs['source']) 
#         else:
#             if self.kwargs['country'] == "all":
#                 if self.kwargs['source'] == "all":
#                     return Sentiment.objects.filter(entity=self.kwargs['entity'])
#                 else:
#                     return Sentiment.objects.filter(entity=self.kwargs['entity'], source=self.kwargs['source'])
#             else:
#                 if self.kwargs['source'] == "all":
#                     return Sentiment.objects.filter(entity=self.kwargs['entity'], country=self.kwargs['country'])
#                 else:
#                     return Sentiment.objects.filter(entity=self.kwargs['entity'], country=self.kwargs['country'], source=self.kwargs['source']) 


# class WordcloudList(ListAPIView):
#     renderer_classes = [renderers.JSONRenderer]
#     serializer_class = WordcloudSerializer
    
#     def get_queryset(self):
#         return Wordcloud.objects.all()

# ==============================================================================
                    
# class SusQuestionsList(ListAPIView):
#     renderer_classes = [renderers.JSONRenderer]
#     serializer_class = SustainabilityQuestions_Serializer

#     queryset = Sustainability_Questions.objects.all()


# class SusAnswersList(ListAPIView):
#     renderer_classes = [renderers.JSONRenderer]
#     serializer_class = SustainabilityAnswers_Serializer

#     def get_queryset(self):
#         return Sustainability_Answers.objects.all()


# class SusChoicesList(ListAPIView): # Assuming that frontend will ask only per question (since not all questions will appear in one page)
#     renderer_classes = [renderers.JSONRenderer]
#     serializer_class = SustainabilityChoices_Serializer

#     def get_queryset(self):
#         return Sustainability_Choices.objects.filter(question_fk=self.kwargs['fk'])
    
# class SusLoggedList(ListAPIView):
#     renderer_classes = [renderers.JSONRenderer]
#     serializer_class = SustainabilityLogged_Serializer

#     def get_queryset(self):
#         user_id = self.kwargs['User_fk']
#         #when the model for answers has the author as a User foreign key, change to: .filter(answers__author_id=user_id)
#         answered_questions = Sustainability_Questions.objects.filter(answers__author=user_id).distinct()
#         return answered_questions
    
#     def get_serializer_context(self):
#         return {'user_id': self.kwargs['User_fk']}

# class SusGeneralList(ListAPIView):
#     renderer_classes = [renderers.JSONRenderer]
#     serializer_class = SustainabilityGeneral_Serializer

#     def get_queryset(self):
#         #when the model for answers has the author as a User foreign key, change to: .filter(answers__author_id=user_id)
#         questions = Sustainability_Questions.objects.distinct()
#         return questions
    
# class ServiceQualityLoggedList(ListAPIView):
#     renderer_classes = [renderers.JSONRenderer]
#     serializer_class = ServiceQualityLogged_Serializer

#     def get_queryset(self):
#         user_id = self.kwargs['User_fk']
#         #when the model for answers has the author as a User foreign key, change to: .filter(answers__author_id=user_id)
#         answered_questions = ServiceQuality_Questions.objects.filter(answers__author=user_id).distinct()
#         return answered_questions
    
#     def get_serializer_context(self):
#         return {'user_id': self.kwargs['User_fk']}

# class ServiceQualityGeneralList(ListAPIView):
#     renderer_classes = [renderers.JSONRenderer]
#     serializer_class = ServiceQualityGeneral_Serializer

#     def get_queryset(self):
#         #when the model for answers has the author as a User foreign key, change to: .filter(answers__author_id=user_id)
#         questions = ServiceQuality_Questions.objects.distinct()
#         return questions


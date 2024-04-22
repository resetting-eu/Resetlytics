from app.models import *
 
from rest_framework import serializers
from user.models import ResettingUser

from django.db.models import Count
from collections import Counter

class ResettingUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResettingUser
        fields = '__all__' # or exclude = ['whatever']
        #depth = 1

class QuestionnaireSerializer(serializers.ModelSerializer):
    owner = ResettingUserSerializer(many=False, read_only=True)
    class Meta:
        model = Questionnaire
        #fields = (,,)
        fields = [
            'id',
            'title',
            'introduction',
            'purpose',
            'title_translations',
            'introduction_translations',
            'created_at',
            'owner',
        ]

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = [
            'id',
            'number',
            'text',
            'text_translations',
        ]

class QuestionBlockSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    class Meta:
        model = QuestionBlock
        fields = [
            'id',
            'title',
            'title_translations',
            'criterion',
            'category',
            'options',
            'scale',
            'count_questions',
            'questions',
        ]

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'

class OrganizationSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = [
            'legal_name',
            'commercial_name',
            'country',
            'location',
            'main_activity'
        ]

class IndicatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Indicator
        fields = '__all__'

class AllServiceQualitySerializer(serializers.ModelSerializer):
    
    serv = IndicatorSerializer(source='service', read_only=True)
    reserv = IndicatorSerializer(source='reservation', read_only=True)
    environ = IndicatorSerializer(source='environment', read_only=True)
    tech = IndicatorSerializer(source='technology', read_only=True)
    staf = IndicatorSerializer(source='staff', read_only=True)
    sustain = IndicatorSerializer(source='sustainability', read_only=True)
    satisf = IndicatorSerializer(source='satisfaction', read_only=True)
    demog = IndicatorSerializer(source='demographics', read_only=True)

    class Meta:
        model = AllServiceQuality
        fields = [      
            'serv',
            'reserv',
            'environ',
            'tech',
            'staf',
            'sustain',
            'satisf',
            'demog',
            'year',
            'updated_at',
        ]
    



class ServiceQualitySerializer(serializers.ModelSerializer):

    org = OrganizationSerializer(source='organization', read_only=True)
    allservq = AllServiceQualitySerializer(source='allservicequality', read_only=True)
    serv = IndicatorSerializer(source='service', read_only=True)
    reserv = IndicatorSerializer(source='reservation', read_only=True)
    environ = IndicatorSerializer(source='environment', read_only=True)
    tech = IndicatorSerializer(source='technology', read_only=True)
    staf = IndicatorSerializer(source='staff', read_only=True)
    sustain = IndicatorSerializer(source='sustainability', read_only=True)
    satisf = IndicatorSerializer(source='satisfaction', read_only=True)
    demog = IndicatorSerializer(source='demographics', read_only=True)

    class Meta:
        model = ServiceQuality
        fields = [      
            'org',
            'allservq',
            'serv',
            'reserv',
            'environ',
            'tech',
            'staf',
            'sustain',
            'satisf',
            'demog',
            'year',
            'updated_at',
        ]

class SentimentMarksSerializer(serializers.ModelSerializer):
    org = OrganizationSimpleSerializer(source='sentiment.organization', read_only=True)

    class Meta:
        model = SentimentMarks
        fields = [
            'date',
            'outcome',
            'org',
        ]


class WordcloudSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Wordcloud
        fields = '__all__'

# def get_whatever(self, obj):
#     qset = ....filter(id=obj)
#     return [[f1, f2] for m in qset]

""" class PredModel_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Pred_Model
        fields = [
            "id",
            "timeseries_name",
            "type_model",
            "time_period",
        ]


class ModelTimeseries_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Model_Timeseries
        fields = [
            "id",
            "date",
    	    "value",
    	    "pred_model",
            "type"
        ]


class PredAllModels_Serializer(serializers.Serializer):
    models = serializers.SerializerMethodField()
    timeseries = serializers.SerializerMethodField()

    def get_models(self, obj):
        # Assuming you have a serializer for Pred_Model
        models = Pred_Model.objects.all()
        models_serializer = PredModel_Serializer(models, many=True)
        return models_serializer.data

    def get_timeseries(self, obj):
        # Assuming you have a serializer for Model_Timeseries
        timeseries = Model_Timeseries.objects.all()
        timeseries_serializer = ModelTimeseries_Serializer(timeseries, many=True)
        return timeseries_serializer.data
    

#class PredAllModels_Serializer(serializers.ModelSerializer):
#    models = serializers.SerializerMethodField()
#    timeseries = serializers.SerializerMethodField()
#
#    class Meta:
#        fields = ['models', 'timeseries']
#
#    def get_models(self, obj):
#        models = Pred_Model.objects.all()
#        return models
#
#    def get_timeseries(self, obj):
#        timeseries = Model_Timeseries.objects.all()
#        return timeseries


class HistoricData_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Historic_Data
        fields = [
            "timeseries_name",
            "time_period",
            "id"
        ]


class HistoricTimeseries_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Historic_Timeseries
        fields = [
            "date",
    	    "value",
    	    "historic_data",
            "id"
        ]
 """
# Sentiment

# class SentimentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Sentiment
#         fields = [
#             "id",
#             "review_date",
#             "vader_boolean"
#         ]

# class WordcloudSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = Wordcloud
#         fields = '__all__'

# # User
        
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ResettingUser
#         fields = ['email', 'first_name', 'last_name']


# class SustainabilityQuestionsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SustainabilityQuestions
#         fields = '__all__'


# class SustainabilityAnswersSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SustainabilityAnswers
#         fields = ['answer']


# class SustainabilityChoicesSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SustainabilityChoices
#         fields = ['num_choice', 'text']


# class SustainabilityAnswerQuestion_Serializer(serializers.ModelSerializer):
#     question_fk = SustainabilityQuestions_Serializer(many=False)

#     class Meta:
#         model = Sustainability_Answers
#         fields = ('question_fk', 'answer', 'choice')



# class SustainabilityLogged_Serializer(serializers.ModelSerializer):
#     answers = serializers.SerializerMethodField()
#     majority_answer = serializers.SerializerMethodField()

#     class Meta:
#         model = Sustainability_Questions
        
#         fields = ["id", "item_code", "text", "type", "dimension", "indicator", "theme", "public_output", "private_output", 
#                   "answers", "majority_answer"]

#     def get_answers(self, obj):
#         user_id = self.context.get("user_id")
#         answers = Sustainability_Answers.objects.filter(question_fk=obj, author=user_id)
#         answer_data = []

#         for answer in answers:
#             if obj.type in ['multiple', 'likert']:
#                 choices = Sustainability_Choices.objects.filter(question_fk=obj, num_choice=answer.answer)
                
#                 if choices.exists():
#                     choice = choices.first()
#                     return choice.text
#                 else:
#                     return str(answer.answer)
#             else:
#                 return str(answer.answer)


#     def get_majority_answer(self, obj):
#         if obj.type not in ['multiple', 'likert', 'int']:
#             return None 

#         answers = Sustainability_Answers.objects.filter(question_fk=obj).values_list('answer', flat=True)
#         if not answers:
#             return None

#         counter = Counter(answers)
#         majority_answer_number, _ = counter.most_common(1)[0]

#         # Now lookup the corresponding choice for this majority answer number
#         choice = Sustainability_Choices.objects.filter(question_fk=obj, num_choice=majority_answer_number).first()
        
#         if choice:
#             return {
#                 'majority_choice_text': choice.text,
#                 'majority_percentage': (counter[majority_answer_number] / len(answers)) * 100
#             }
#         else:
#             return {
#                 'majority_choice_text': majority_answer_number,
#                 'majority_percentage': (counter[majority_answer_number] / len(answers)) * 100
#             }
    
# class SustainabilityGeneralSerializer(serializers.ModelSerializer):
#     majority_answer = serializers.SerializerMethodField()

#     class Meta:
#         model = SustainabilityQuestions
        
#         fields = ["id", "item_code", "text", "type", "dimension", "indicator", "theme", "public_output", "private_output", 
#                   "majority_answer"]


#     def get_majority_answer(self, obj):
#         if obj.type not in ['multiple', 'likert', 'int']:
#             return None 

#         answers = SustainabilityAnswers.objects.filter(question_fk=obj).values_list('answer', flat=True)
#         if not answers:
#             return None

#         counter = Counter(answers)
#         majority_answer_number, _ = counter.most_common(1)[0]

#         # Now lookup the corresponding choice for this majority answer number
#         choice = SustainabilityChoices.objects.filter(question_fk=obj, num_choice=majority_answer_number).first()
        
#         if choice:
#             return {
#                 'majority_choice_text': choice.text,
#                 'majority_percentage': (counter[majority_answer_number] / len(answers)) * 100
#             }
#         else:
#             return {
#                 'majority_choice_text': majority_answer_number,
#                 'majority_percentage': (counter[majority_answer_number] / len(answers)) * 100
#             }

# class ServiceQualityLogged_Serializer(serializers.ModelSerializer):
#     answers = serializers.SerializerMethodField()
#     majority_answer = serializers.SerializerMethodField()

#     class Meta:
#         model = ServiceQualityQuestions
        
#         fields = ["id", "item_code", "text", "type", "dimension", "indicator", "theme", "public_output", "private_output", 
#                   "answers", "majority_answer"]

#     def get_answers(self, obj):
#         user_id = self.context.get("user_id")
#         answers = ServiceQualityAnswers.objects.filter(question_fk=obj, author=user_id)
#         answer_data = []

#         for answer in answers:
#             if obj.type in ['multiple', 'likert']:
#                 choices = ServiceQualityChoices.objects.filter(question_fk=obj, num_choice=answer.answer)
                
#                 if choices.exists():
#                     choice = choices.first()
#                     return choice.text
#                 else:
#                     return str(answer.answer)
#             else:
#                 return str(answer.answer)


#     def get_majority_answer(self, obj):
#         if obj.type not in ['multiple', 'likert', 'int']:
#             return None 

#         answers = ServiceQualityAnswers.objects.filter(question_fk=obj).values_list('answer', flat=True)
#         if not answers:
#             return None

#         counter = Counter(answers)
#         majority_answer_number, _ = counter.most_common(1)[0]

#         # Now lookup the corresponding choice for this majority answer number
#         choice = ServiceQualityChoices.objects.filter(question_fk=obj, num_choice=majority_answer_number).first()
        
#         if choice:
#             return {
#                 'majority_choice_text': choice.text,
#                 'majority_percentage': (counter[majority_answer_number] / len(answers)) * 100
#             }
#         else:
#             return {
#                 'majority_choice_text': majority_answer_number,
#                 'majority_percentage': (counter[majority_answer_number] / len(answers)) * 100
#             }

# class ServiceQualityGeneral_Serializer(serializers.ModelSerializer):
#     majority_answer = serializers.SerializerMethodField()

#     class Meta:
#         model = ServiceQuality_Questions
        
#         fields = ["id", "item_code", "text", "type", "dimension", "indicator", "theme", "public_output", "private_output", 
#                   "majority_answer"]


#     def get_majority_answer(self, obj):
#         if obj.type not in ['multiple', 'likert', 'int']:
#             return None 

#         answers = ServiceQuality_Answers.objects.filter(question_fk=obj).values_list('answer', flat=True)
#         if not answers:
#             return None

#         counter = Counter(answers)
#         majority_answer_number, _ = counter.most_common(1)[0]

#         # Now lookup the corresponding choice for this majority answer number
#         choice = ServiceQuality_Choices.objects.filter(question_fk=obj, num_choice=majority_answer_number).first()
        
#         if choice:
#             return {
#                 'majority_choice_text': choice.text,
#                 'majority_percentage': (counter[majority_answer_number] / len(answers)) * 100
#             }
#         else:
#             return {
#                 'majority_choice_text': majority_answer_number,
#                 'majority_percentage': (counter[majority_answer_number] / len(answers)) * 100
#             }
    


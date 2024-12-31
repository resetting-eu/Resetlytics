from django.db import models

from django.conf import settings
from django.apps import apps
from user.models import ResettingUser
import uuid

from datetime import datetime, timedelta
from django.utils import timezone

'''
=========================================================================
BASE 
=========================================================================
'''

class Organization(models.Model):
    '''
    Organization
    A organization must be linked to one user
    '''

    class Meta:
        db_table = 'organization'
        ordering = ['-country']
        constraints = [
            models.UniqueConstraint(
                fields=['legal_name', 'country'], name='unique_organization'
            )
        ]

    class Country(models.TextChoices):
        PT = "Portugal"
        SP = "Spain"
        GR = "Greece"
        IT = "Italy"

    class Activity(models.TextChoices):
        HOTEL = "Hotel"
        LEISURE = "Leisure activities"
        LOCAL_ACCOMMODATION = "Local accommodation"

    class SurveyLanguage(models.TextChoices):
        ENGLISH = "English"
        PORTUGUESE = "Portuguese"
        CASTELIAN = "Castelian" # aka Spanish
        GREEK = "Greek"
        ITALIAN = "Italian"

    # a unique organization
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    # just one but ... in case of changing ideas
    representative = models.ForeignKey(ResettingUser, related_name='organizations', 
                                    on_delete=models.SET_NULL, blank=True, null=True)

    legal_name = models.CharField(max_length=50) 
    commercial_name = models.CharField(max_length=50)
    description = models.TextField()
    main_activity = models.CharField(
        max_length=50,
        choices = Activity.choices,
        default = Activity.HOTEL
    )
    location = models.CharField(max_length=50)
    country = models.CharField(
        max_length=50,
        choices = Country.choices,
        default = Country.PT
    )
    is_sme = models.BooleanField(default=True) # less than 251 employees
    survey_language = models.CharField(
        max_length=20,
        choices = SurveyLanguage.choices,
        default = SurveyLanguage.ENGLISH
    )

    REQUIRED_FIELDS = ['legal_name', 'country']

    def __str__(self):
        return f"{self.legal_name} {self.commercial_name}\
              {self.location} {self.country}"
    
class Questionnaire(models.Model):
    '''
    Questionnaire
    '''

    class Meta:
        db_table = 'questionnaire'

    # just one but ... in case of changing ideas
    owner = models.ForeignKey(ResettingUser, related_name='questionnaires', 
                            on_delete=models.SET_NULL, blank=True, null=True)

    title = models.TextField()
    introduction = models.TextField(blank=True, null=True)
    purpose = models.CharField(max_length=100, blank=True, null=True) # set of keywords to show the purpose/focus  
    title_translations = models.JSONField(blank=True, null=True)
    introduction_translations = models.JSONField(blank=True, null=True)
    
    created_at = models.DateTimeField()

    def __str__(self):
        return f"{self.title} created at {self.created_at} owned by {self.owner.email}"
    
class QuestionBlock(models.Model):
    '''
    Question Block
    All questions of same type/category
    '''

    class Meta:
        db_table = 'questionblock'

    class QuestionCriterion(models.TextChoices):
        SERVICE = "Service"
        ENVIRONMENT = "Environment"
        RESERVATION = "Reservation" 
        TECHNOLOGY = "Technology"
        STAFF = "Staff"
        SUSTAINABILITY = "Sustainability"
        SATISFACTION = "Satisfaction"
        DEMOGRAPHICS = "Demographics"
        GENERAL = "General"

    class QuestionCategory(models.TextChoices):
        CATEGORICAL = "Categorical" # entitled to select one option; no implicit scale
        CATEGORICAL_MANY = "Categorical-many" # entitled to select more than one option; no implicit scale
        ORDINAL = "Ordinal" # entitled to select one option; implicit scale; kind of rating
        ORDINAL_MANY = "Ordinal-many" # entitled to select more than one option; implicit scale; kind of rating
        COMMENTARY = "Commentary"

    questionnaire = models.ForeignKey(Questionnaire, 
                                    related_name='questionblocks', on_delete=models.CASCADE)
    number = models.PositiveIntegerField(default=1)
    title = models.TextField(blank=True, null=True) # English
    title_translations = models.JSONField(blank=True, null=True) # to accommodate different languages
    criterion = models.CharField( # questions aims at one criterion
        max_length=50,
        choices = QuestionCriterion.choices,
        default = QuestionCriterion.GENERAL
    )
    category = models.CharField( # this block contains questions of same category/class
        max_length=50,
        choices = QuestionCategory.choices,
        default = QuestionCategory.ORDINAL
    )
    options = models.TextField(blank=True, null=True)
    scale = models.CharField(max_length=50, blank=True, null=True)
    # TO BE CHECKED NAMELY MEANING OF 0
    # e.g. 1, 2, 3, 4, 0 .  (0 means weight N/A) length dictates number of options
    # scale with n options: 1st, 2nd, etc.
    # scale for ordinal category ... have to check with included questions 1st to nth
    # assumes questions in this block have the same range and weight, that is, the scale is the same; just changes of text
    # further: assumes variations/weights are explicit within the group of questions

    # question about ordinal-many: scale min, max and score
          
    count_questions = models.PositiveIntegerField(default=0) # might be useful

    @property
    def scale_limits(self):
        if self.scale == 'None':
            return None
        scalevalues = self.scale.split(',')
        scalenozero = list(map(float, scalevalues))
        scalenozero = [f for f in scalenozero if f != 0]
        # todo: ordinal-many
        return [min(scalenozero), max(scalenozero)]

    def weight(self, position):
        scalevalues = self.scale.split(',')
        # todo: ordinal-many
        return scalevalues[position-1]

    def __str__(self):
        return f"{self.title} criterion {self.criterion} category {self.category}"

class Question(models.Model):
    '''
    Question
    '''

    class Meta:
        db_table = 'question'

    # a question is unique
    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    
    question_block = models.ForeignKey(QuestionBlock, 
                                    related_name='questions', on_delete=models.CASCADE)

    number = models.PositiveIntegerField(default=1) # within the block
    text = models.TextField()
    text_translations = models.JSONField(blank=True, null=True) # to accommodate different languages
    
   
    def computescore(self, selection):
        return self.question_block.weight(selection) # selection: -1 (none), 1 (1st), 2 (2nd), ...
    
    def criterion(self):
        return self.question_block.criterion
    
    def category(self):
        return self.question_block.category
       
    
    def __str__(self):
        return f"{self.number} {self.text} part of {self.question_block.title}"
       

class Survey(models.Model):
    '''
    Survey
    '''

    class Meta:
        db_table = 'survey'

    # just one but ... in case of changing ideas
    owner = models.ForeignKey(ResettingUser, related_name='surveys', 
                            on_delete=models.SET_NULL, blank=True, null=True)
    questionnaire = models.OneToOneField(Questionnaire, on_delete=models.CASCADE)
    organizations = models.ManyToManyField(Organization)

    title = models.TextField()
    title_translations = models.JSONField(blank=True, null=True)
    introduction = models.TextField(blank=True, null=True)
    introduction_translations = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField()
    access_url = models.URLField()
    open_at = models.DateTimeField(blank=True, null=True)
    close_at = models.DateField(blank=True, null=True) # if none is open

    def __str__(self):
        return f"{self.title} \
            owned by {self.owner.email} questionnaire {self.questionnaire.title} "  + str(self.created_at)

class Respondent(models.Model):
    '''
    Respondent
    '''

    class Meta:
        db_table = 'respondent'
        ordering = ['-answered_at']

    # note: when survey is about sustainability, respondent is from the organization
    related_organization = models.ForeignKey(Organization, 
                                        related_name='respondents', on_delete=models.CASCADE)
    survey = models.ForeignKey(Survey, 
                               related_name='respondents', on_delete=models.CASCADE, blank=True, null=True)

    access_url = models.URLField(blank=True, null=True) # used url (provided)
    answered_at = models.DateTimeField()
    digital_ID = models.CharField(max_length=20) # e.g. IP_address or something that identifies
    questions = models.ManyToManyField(Question, through='Answer')

    def __str__(self):      
        return f"{self.digital_ID} \
            organization {self.related_organization.legal_name}" + str(self.answered_at)


class Answer(models.Model):
    '''
    Answer
    '''

    class Meta:
        db_table = 'answer'

    question = models.ForeignKey(Question, 
                                related_name='answers', on_delete=models.CASCADE)
    respondent = models.ForeignKey(Respondent, 
                                related_name='answers', on_delete=models.CASCADE)

    # commentary; one or more selections from the options availabe (scale)
    # selections can have weight or not
    # selections are positional order in the options scale (1 to range)
    # weights are in general from min (1st position) to max (last position)
    # but not always e.g. one can have a 0 as weight somewhere
    # bottom-line: each position has its own weight

    # weight 0 means the option does not count e.g. Not applicable

    text = models.TextField(blank=True, null=True) # if needed; to accommodate all
    # plus the order of selection in the array of options (-1 is not selected)
    selection = models.IntegerField(default=-1) 
    
    # score, if any, once computed is stored for the sake of speeding up things
    # it is just an integer
    score = models.FloatField(default=0) 

    def computescore(self):
        # get score from question block - applied to ordinal questions, with scale
        self.score = self.question.computerscore(self.selection)

    def criterion(self):
        return self.question.criterion()
    
    def category(self):
        return self.question.category()
       
    def __str__(self):
        crit = self.criterion()
        cat = self.category()
        return f"{self.text} answered by {self.respondent.digital_ID} \
            to question: {self.question.text}. Score is {self.score}. Criterion: {crit}. Category: {cat}. " +  str(self.respondent.answered_at)
    
class Indicator(models.Model):
    '''
    Indicator

    Only suitable for categories 'Ordinal' and 'Ordinal-many', that is, there is a score implicitly - it can be compared to
    '''

    class Meta:
        db_table = 'indicator'

    # average of scores
    Q1 = models.FloatField(default=0)
    Q2 = models.FloatField(default=0)
    Q3 = models.FloatField(default=0)
    Q4 = models.FloatField(default=0)
    year_to_date = models.FloatField(default=0)
    previous_year = models.FloatField(default=0)

    # counting of scores used
    count_Q1 = models.PositiveBigIntegerField(default=0)
    count_Q2 = models.PositiveBigIntegerField(default=0)
    count_Q3 = models.PositiveBigIntegerField(default=0)
    count_Q4 = models.PositiveBigIntegerField(default=0)
    count_year_to_date = models.PositiveBigIntegerField(default=0)
    count_previous_year = models.PositiveBigIntegerField(default=0)

    year = models.PositiveIntegerField(default=0) # maybe not needed

    scale_min = models.FloatField(default=0)
    scale_max = models.FloatField(default=0)

    Q1_updated_at = models.DateTimeField(default=timezone.now)
    Q2_updated_at = models.DateTimeField(default=timezone.now)
    Q3_updated_at = models.DateTimeField(default=timezone.now)
    Q4_updated_at = models.DateTimeField(default=timezone.now)
    year_to_date_updated_at = models.DateTimeField(default=timezone.now)
    previous_year_updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.year} {self.scale_min} {self.scale_max} {self.Q1} \
            {self.Q2} {self.Q3} {self.Q4} \
            {self.year_to_date} {self.previous_year}"

'''
=========================================================================
SERVICE QUALITY MODULE
=========================================================================
'''

class AllServiceQuality(models.Model):
    '''
    All Service Quality
    '''

    class Meta:
        db_table = 'allservicequality'

    year = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(default=timezone.now)
    
    # some useful methods - to add
    # to support eventual asyncronous update and speed up things 
    # as long as update stage is properli controlled 
    # (redundant but just small space)

    # dimensions
    service = models.ForeignKey(Indicator, related_name='allservicequalities_service', 
                                on_delete=models.SET_NULL, blank=True, null=True)
    environment = models.ForeignKey(Indicator, related_name='allservicequalities_environment',
                                    on_delete=models.SET_NULL, blank=True, null=True)
    reservation = models.ForeignKey(Indicator, related_name='allservicequalities_reservation',
                                    on_delete=models.SET_NULL, blank=True, null=True)
    technology = models.ForeignKey(Indicator, related_name='allservicequalities_technology',
                                   on_delete=models.SET_NULL, blank=True, null=True)
    staff = models.ForeignKey(Indicator, related_name='allservicequalities_staff',
                              on_delete=models.SET_NULL, blank=True, null=True)
    sustainability = models.ForeignKey(Indicator, related_name='allservicequalities_sustainability',
                                       on_delete=models.SET_NULL, blank=True, null=True)
    satisfaction = models.ForeignKey(Indicator, related_name='allservicequalities_satisfaction',
                                     on_delete=models.SET_NULL, blank=True, null=True)
    demographics = models.ForeignKey(Indicator, related_name='allservicequalities_demographics',
                                     on_delete=models.SET_NULL, blank=True, null=True)


    def __str__(self):
        return str(self.updated_at)


class ServiceQuality(models.Model):
    '''
    Service Quality
    '''

    class Meta:
        db_table = 'servicequality'
    
    organization = models.OneToOneField(Organization, on_delete=models.CASCADE)
    allservicequality = models.ForeignKey(AllServiceQuality, related_name='servicequalities', 
                                            on_delete=models.SET_NULL, blank=True, null=True)
    
    year = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(default=timezone.now)
    
    # dimensions
    service = models.ForeignKey(Indicator, related_name='servicequalities_service', 
                                on_delete=models.SET_NULL, blank=True, null=True)
    environment = models.ForeignKey(Indicator, related_name='servicequalities_environment',
                                    on_delete=models.SET_NULL, blank=True, null=True)
    reservation = models.ForeignKey(Indicator, related_name='servicequalities_reservation',
                                    on_delete=models.SET_NULL, blank=True, null=True)
    technology = models.ForeignKey(Indicator, related_name='servicequalities_technology',
                                   on_delete=models.SET_NULL, blank=True, null=True)
    staff = models.ForeignKey(Indicator, related_name='servicequalities_staff',
                              on_delete=models.SET_NULL, blank=True, null=True)
    sustainability = models.ForeignKey(Indicator, related_name='servicequalities_sustainability',
                                       on_delete=models.SET_NULL, blank=True, null=True)
    satisfaction = models.ForeignKey(Indicator, related_name='servicequalities_satisfaction',
                                     on_delete=models.SET_NULL, blank=True, null=True)
    demographics = models.ForeignKey(Indicator, related_name='servicequalities_demographics',
                                     on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return f"{self.organization.legal_name} " + str(self.updated_at)
    


'''
=========================================================================
SUSTAINABILITY MODULE
=========================================================================
'''

class AllSustainability(models.Model):
    '''
    All Sustainability
    '''
   
    class Meta:
        db_table = 'allsustainability'

    year = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(default=timezone.now)
    

    # some useful methods - to add
    # to support eventual asyncronous update and speed up things 
    # as long as update stage is properli controlled 
    # (redundant but just small space)

    # average of the companies 
    # PS. At some point, excel was mentioning top 25% (Figure out)
    # ("Based on base scenario. But updated in average of all companies as responses evolve")

     # dimensions
    economic = models.ForeignKey(Indicator, related_name='allsustainabilities_economic', 
                                on_delete=models.SET_NULL, blank=True, null=True)
    social = models.ForeignKey(Indicator, related_name='allsustainabilities_social', 
                               on_delete=models.SET_NULL, blank=True, null=True)
    environment = models.ForeignKey(Indicator, related_name='allsustainabilities_environment', 
                                    on_delete=models.SET_NULL, blank=True, null=True)
    demographics = models.ForeignKey(Indicator, related_name='allsustainabilities_demographics', 
                                    on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return str(self.updated_at)


class Sustainability(models.Model):
    '''
    Sustainability
    '''


    class Meta:
        db_table = 'sustainability'
        
    organization = models.OneToOneField(Organization, on_delete=models.CASCADE)
    allsustainability = models.ForeignKey(AllSustainability, related_name='sustainabilities', 
                                            on_delete=models.SET_NULL, blank=True, null=True)
    year = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(default=timezone.now)
   
    # dimensions
    economic = models.ForeignKey(Indicator, related_name='sustainabilities_economic', 
                                on_delete=models.SET_NULL, blank=True, null=True)
    social = models.ForeignKey(Indicator, related_name='sustainabilities_social', 
                               on_delete=models.SET_NULL, blank=True, null=True)
    environment = models.ForeignKey(Indicator, related_name='sustainabilities_environment', 
                                    on_delete=models.SET_NULL, blank=True, null=True)
    demographics = models.ForeignKey(Indicator, related_name='sustainabilities_demographics', 
                                    on_delete=models.SET_NULL, blank=True, null=True)
    
    def __str__(self):
        return f"{self.organization.legal_name} " + str(self.updated_at)




'''
=========================================================================
SENTIMENT MODULE
=========================================================================
'''

class SentimentAnalysis(models.Model):
    class Meta:
        db_table = 'sentiment'

    organization = models.OneToOneField(Organization, on_delete=models.CASCADE)

    updated_at = models.DateTimeField(default=timezone.now)
    # extra fields eventually; but be linked from semtiment marks and wordcloud

class SentimentMarks(models.Model):
    '''
    Sentiment Marks
    '''
    class Meta:
        db_table = 'sentimentmarks'
        ordering =['-date']
    
    class Marking(models.TextChoices): 
        POSITIVE = "Positive"
        NEGATIVE = "Negative"
        NEUTRAL = "Neutral"

    sentiment = models.ForeignKey(SentimentAnalysis, 
                                related_name='sentimentmarks', on_delete=models.CASCADE)

    text = models.TextField()
    date = models.DateField() # when is important
    value = models.FloatField(default=0)
    outcome = models.CharField(
        max_length=50,
        choices=Marking.choices,
        default=Marking.NEUTRAL
    )
    
    def __str__(self):
        return f"{self.text} \
            value {self.value} is {self.outcome} at "  + str(self.sentiment_at)
    


class Wordcloud(models.Model):
    '''
    Wordcloud
    '''

    class Meta:
        db_table = 'wordcloud'

    class Tendency(models.TextChoices): 
        POSITIVE = "Positive"
        NEGATIVE = "Negative"
        NEUTRAL = "Neutral"

    sentiment = models.ForeignKey(SentimentAnalysis, 
                                related_name='wordclouds', on_delete=models.CASCADE)

    words = models.CharField(max_length=50)
    count_words = models.IntegerField(default=0)
    tendency = models.CharField(
        max_length=50,
        choices=Tendency.choices,
        default=Tendency.NEUTRAL
    )
    from_date = models.DateField()
    till_date = models.DateField()
   
    def __str__(self):
        return f"{self.words} from " + str(self.from_date) + " till " + str(self.till_date)
    


# '''
# =========================================================================
# FORECAST MODULE
# Assumptions
# - The minimum frequency is daily so all timestamps are of date type
# - At the moment, we are just considereing one related historical timeseries to 
#     show up. So it will be the most important (main)
# =========================================================================
# '''

# class TimeFrequency(models.TextChoices):
#     DAILY = "daily"
#     MONTHLY = "monthly"
#     QUARTERLY = "quarterly"
#     YEARLY = "yearly"


# class ForecastType(models.TextChoices):
#     POINT = "point"
#     INTERVAL = "interval"

# class Forecasts(models.Model):
#     '''
#     Block of forecasts. Each datum can be jut one value or two, respectively 
#     if we are dealing with point forecast or interval forecast
#     '''

#     class Meta:
#         db_table = 'forecasts'

#     first_date = models.DateField()
#     number_datum_values = models.IntegerField() # up to a limit
#     forecast_frequency = models.CharField(
#         max_length=50,
#         choices = TimeFrequency.choices,
#         default = TimeFrequency.DAILY
#     )
#     forecast_type = models.CharField(
#         max_length = 50,
#         choices = ForecastType.choices,
#         default = ForecastType.POINT
#     )
#     datum_values = models.JSONField



# class Algorithms(models.Model):

#     class Meta:
#         db_table = 'algorithms'
    
#     name = models.CharField(max_length=50)    
#     description = models.CharField(max_length=100)


# class Predictors(models.Model):

#     class Meta:
#         db_table = 'predictors'

#     class CountryScope(models.TextChoices):
#         EU = "European Union"
#         PT = "Portugal"
#         SP = "Spain"
#         GR = "Greece"
#         IT = "Italy"
#         AL = "Albania"
 
#     owner_id = models.ForeignKey(ResettingUser, on_delete=models.CASCADE)
#     target_name = models.CharField(max_length=50)
#     main_related_historical_name = models.CharField(max_length=50)
#      # so far we will consider up to one if any. So it is the main
#     forecast_frequency = models.CharField(
#         max_length=50,
#         choices = TimeFrequency.choices,
#         default = TimeFrequency.DAILY
#     )
#     forecast_horizon = models.IntegerField()
#     forecast_type = models.CharField(
#         max_length = 50,
#         choices = ForecastType.choices,
#         default = ForecastType.POINT
#     )
#     forecast_quantile = models.IntegerField() # only applied if forecast type is interval
#     algorithm_id = models.ForeignKey(Algorithms, on_delete=models.CASCADE)
#     country_scope = models.CharField(
#         max_length = 50,
#         choices = CountryScope.choices,
#         default = CountryScope.EU
#     )
#     forecast_start_day = models.DateField()
#     forecast_end_day = models.DateField()
#     target_series_start_day = models.DateField()
#     target_series_end_day = models.DateField()
#     main_related_historical_series_start_day = models.DateField()
#     main_related_historical_series_end_day = models.DateField()

#     forecasts = models.ForeignKey(Forecasts, on_delete=models.CASCADE)

#     #accuracy_metrics_id = "aa" . related to target
#     #impact_scores_id = ""related to related historical
    
#     #point_forecast = "" only one of them
#     #interval_forecast = ""

#     updated_at = models.DateTimeField()

# class AccuracyMetrics(models.Model):

#     class Meta:
#         db_table = 'accuracy_metrics'

# class ImpactScores(models.Model):

#     class Meta:
#         db_table = 'impact_scores'

# class TargetTimeseries(models.Model):

#     class Meta:
#         db_table = 'target_timeseries'

#     date = models.DateField()
#     value = models.FloatField()
#     predictor_id = models.ForeignKey(Predictors, on_delete=models.CASCADE) # cannot be with FK


# class RelatedHistoricalTimeseries(models.Model):

#     class Meta:
#         db_table = 'related_historical_timeseries'

#     date = models.DateField()
#     value = models.FloatField()
#     predictor_id = models.ForeignKey(Predictors, on_delete=models.CASCADE) # cannot be with FK


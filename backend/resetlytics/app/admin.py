from django.contrib import admin


from .models import ( 
    Organization, 
    QuestionBlock, 
    Question, 
    Questionnaire, 
    Survey, 
    Respondent, 
    Answer, 
    Indicator,
    SentimentAnalysis, 
    SentimentMarks, 
    Wordcloud, 
    AllServiceQuality, 
    ServiceQuality, 
    AllSustainability, 
    Sustainability
)

admin.site.register(Organization)
admin.site.register(QuestionBlock)
admin.site.register(Question)
admin.site.register(Questionnaire)
admin.site.register(Survey)
admin.site.register(Respondent)
admin.site.register(Answer)
admin.site.register(Indicator)
admin.site.register(SentimentAnalysis)
admin.site.register(SentimentMarks)
admin.site.register(Wordcloud)
admin.site.register(AllServiceQuality)
admin.site.register(ServiceQuality)
admin.site.register(AllSustainability)
admin.site.register(Sustainability)


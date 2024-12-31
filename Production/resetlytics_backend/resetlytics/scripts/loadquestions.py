
from app.models import Question, QuestionBlock, Questionnaire
from django.utils import timezone

import csv

def run():

    p1 = "Sustainability is a success factor for all businesses. It is very important to understand how is your company positioned in view of others. Thus, you may better plan your actions and evaluate your results."
    p2 = "We help you in that regard. You access a questionnaire and you are able to obtain responses after that." 
    p3 = "The questionnaire is intended for Small and Medium Entreprises (SMEs) operating in the tourism sector. Information will be confidential."
    
    p4 = "The results compare the performance of your company with the average of companies inspected so far. Thus you may understand your position in comparison with other SMEs and articulate your action plans." 
    p5 = "In most variables, your performance is compared with the top 25% best performing companies in the specific criteria. For the remaining ones, averages are used." 
    
    p6 = "There are three groups of criteria considered, namely: economic, social and environment. These three account for how your company performs in sustainability."
    p7 = "According to some criteria, the list of variables that are collected include:"
    p8 = "1) ECONOMY - It captures information related to the quantity and quality of employment and suppliers."
    p9 = "2) SOCIAL - It captures information related to your activities regarding community and social impact; health and safety; inclusion and accessibility; protecting cultural heritage."  
    p10 = "3) ENVIRONMENT - It captures information associated to the optimal use of resources, namely: reducing transportation impact, solid waste management, water management, energy usage and landscape and biodiversity protection."
    p11 = "4) DEMOGRAPHICS - It captures information about your company."

    
    p45 = ' '.join([p4, p5])

    intro = '\n'.join([p1, p2, p3, p45, p6, p7, p8, p9, p10, p11]).strip()

    # print(intro)
    
    # questionnaire = Questionnaire(title='Self-diagnostic on Sustainability Questionnaire', 
    #                               introduction=intro, 
    #                               created_at=timezone.localtime())
    # questionnaire.save()
    # with open('app/selfdiagnosticquestions.csv') as file:
    #     reader = csv.reader(file, delimiter=';')
    #     next(reader) # next to the header

        
    #     for row in reader:
    #         print(row)
    #         print(row[3], len(row[3]))
    #         print("===========")
    #         if (int(row[6]) == 1): # new 
    #             block, _ = QuestionBlock.objects.get_or_create(number=int(row[0]), title=row[1].strip(), criterion=row[2].strip(), 
    #                                                       options=row[3].strip(), category=row[4].strip(), scale=row[5].strip(), 
    #                                                       questionnaire=questionnaire)
    #         question = Question(number=int(row[6]), text=row[7].strip(), question_block=block)
    #         question.save()


# def run():
#     p1 = "Dear Participant,"
#     p2 = "Thank you for taking the time to participate in this survey."
#     p3 = "The purpose of this questionnaire is to gather information about your perceptions after using our services."
#     p4 = "We follow the Declaration of ethical principles of Helsinkis in research."
#     p5 = "Therefore, the information you provide will be kept strictly confidential and will be used only for research purposes."
#     p6 = "There are no right or wrong answers, and we encourage you to be as honest and thoughtful as possible." 
#     p7 = "The questionnaire should last only 5 minutes."
#     p456 = ' '.join([p4, p5, p6])

#     intro = '\n'.join([p1, p2, p456, p7]).strip()

#     print(intro)
    
#     Questionnaire.objects.all().delete()
#     questionnaire = Questionnaire(title='Service Quality Questionnaire', 
#                                   introduction=intro, 
#                                   created_at=timezone.localtime())
#     questionnaire.save()
#     with open('app/servicequalityquestions.csv') as file:
#         reader = csv.reader(file, delimiter=';')
#         next(reader) # next to the header

#         Question.objects.all().delete()
#         QuestionBlock.objects.all().delete()
        
#         for row in reader:
#             print(row)
#             print(row[3], len(row[3]))
#             print("===========")
#             if (int(row[6]) == 1): # new group
#                 block, _ = QuestionBlock.objects.get_or_create(number=int(row[0]), title=row[1].strip(), criterion=row[2].strip(), 
#                                                            options=row[3].strip(), category=row[4].strip(), scale=row[5].strip(), 
#                                                            questionnaire=questionnaire)
#             question = Question(number=int(row[6]), text=row[7].strip(), question_block=block)
#             question.save()
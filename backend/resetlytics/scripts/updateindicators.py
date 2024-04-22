from app.models import *
from django.utils import timezone

from django.core.files import File
from datetime import datetime

import array
import csv

# alreday done this time around
# def updatescores():
#     answers = Answer.objects.all()
#     for ans in answers:
#         ans.computescore()
#         ans.save()



def isvalid_date(date, fromdate, tilldate):
    # assuming date
    # return date >= fromdate and date <= tilldate
    return True
    
def isvalid_score(score):
    return score != 0

def isvalid_category(category):
    return category in ['Ordinal', 'Ordinal_many']


def update_service_quality_previous_year(servq, counts, averages):

    date = datetime(2014,2,10)
    servq.updated_at = date
    servq.year = 2024


    print(servq)
   
    service = servq.service
    service.count_previous_year = counts['Service']
    service.previous_year = averages['Service']
    service.previous_year_updated_at = date
    service.year = 2024

    service.save()

    environment = servq.environment
    environment.count_previous_year = counts['Environment']
    environment.previous_year = averages['Environment']
    environment.previous_year_updated_at = date
    environment.year = 2024

    environment.save()

    reservation = servq.reservation
    reservation.count_previous_year = counts['Reservation']
    reservation.previous_year = averages['Reservation']
    reservation.previous_year_updated_at = date
    reservation.year = 2024

    reservation.save()

    technology = servq.technology
    technology.count_previous_year = counts['Technology']
    technology.previous_year = averages['Technology']
    technology.previous_year_updated_at = date
    technology.year = 2024

    technology.save()

    staff = servq.staff
    staff.count_previous_year = counts['Staff']
    staff.previous_year = averages['Staff']
    staff.previous_year_updated_at = date
    staff.year = 2024

    staff.save()

    sustainability = servq.sustainability
    sustainability.count_previous_year = counts['Sustainability']
    sustainability.previous_year = averages['Sustainability']
    sustainability.previous_year_updated_at = date
    sustainability.year = 2024

    sustainability.save()

    satisfaction = servq.satisfaction
    satisfaction.count_previous_year = counts['Satisfaction']
    satisfaction.previous_year = averages['Satisfaction']
    satisfaction.previous_year_updated_at = date
    satisfaction.year = 2024

    satisfaction.save()

    if 'Demographics' in counts:
        demographics = servq.demographics
        demographics.count_previous_year = counts['Demographics']
        demographics.previous_year = averages['Demographics']
        demographics.previous_year_updated_at = date
        demographics.year = 2024

        demographics.save()

    servq.save()

def adjust_limits(v1, v2):
    return [min(v1[0], v2[0]), max(v1[1], v2[1])]

def getscales():
    quests = Questionnaire.objects.all()
    print(quests[0])
    scales_ordinal = dict()
    if quests[0] is not None:
        questblock = QuestionBlock.objects.filter(questionnaire=quests[0])
        for qb in questblock:
            print("===")
            crit = qb.criterion
            if qb.category == 'Ordinal':
                scale = qb.scale_limits
                if crit not in scales_ordinal.keys():
                    scales_ordinal[crit] = scale
                else:
                    v = scales_ordinal[crit]
                    scales_ordinal[crit] = adjust_limits(scale, v)
            print(qb.scale, qb.scale_limits)
            print(scales_ordinal)

        servqs = ServiceQuality.objects.all()
        for servq in servqs:
            indic = servq.satisfaction
            indic.scale_min = scales_ordinal['Satisfaction'][0]
            indic.scale_max = scales_ordinal['Satisfaction'][1]
            indic.save()

            indic = servq.reservation
            indic.scale_min = scales_ordinal['Reservation'][0]
            indic.scale_max = scales_ordinal['Reservation'][1]
            indic.save()

            indic = servq.environment
            indic.scale_min = scales_ordinal['Environment'][0]
            indic.scale_max = scales_ordinal['Environment'][1]
            indic.save()

            indic = servq.service
            indic.scale_min = scales_ordinal['Service'][0]
            indic.scale_max = scales_ordinal['Service'][1]
            indic.save()

            indic = servq.staff
            indic.scale_min = scales_ordinal['Staff'][0]
            indic.scale_max = scales_ordinal['Staff'][1]
            indic.save()

            indic = servq.technology
            indic.scale_min = scales_ordinal['Technology'][0]
            indic.scale_max = scales_ordinal['Technology'][1]
            indic.save()

            indic = servq.sustainability
            indic.scale_min = scales_ordinal['Sustainability'][0]
            indic.scale_max = scales_ordinal['Sustainability'][1]
            indic.save()

        allserq = AllServiceQuality.objects.all()[0]

        indic = allserq.satisfaction
        indic.scale_min = scales_ordinal['Satisfaction'][0]
        indic.scale_max = scales_ordinal['Satisfaction'][1]
        indic.save()

        indic = allserq.reservation
        indic.scale_min = scales_ordinal['Reservation'][0]
        indic.scale_max = scales_ordinal['Reservation'][1]
        indic.save()

        indic = allserq.environment
        indic.scale_min = scales_ordinal['Environment'][0]
        indic.scale_max = scales_ordinal['Environment'][1]
        indic.save()

        indic = allserq.service
        indic.scale_min = scales_ordinal['Service'][0]
        indic.scale_max = scales_ordinal['Service'][1]
        indic.save()

        indic = allserq.staff
        indic.scale_min = scales_ordinal['Staff'][0]
        indic.scale_max = scales_ordinal['Staff'][1]
        indic.save()

        indic = allserq.technology
        indic.scale_min = scales_ordinal['Technology'][0]
        indic.scale_max = scales_ordinal['Technology'][1]
        indic.save()

        indic = allserq.sustainability
        indic.scale_min = scales_ordinal['Sustainability'][0]
        indic.scale_max = scales_ordinal['Sustainability'][1]
        indic.save()
        
        
            

def run():

    
    
# def run():

#     fromdate = datetime(2013,1,10).date()
#     tilldate = datetime(2013,10,10).date()
#     indicators = {}
#     # get all organizations

#     orgs = Organization.objects.all()

#     allservq = AllServiceQuality.objects.all()[0] ## should be one ... leave it now

#     with open('app/basket.txt', 'w') as file:
#         f = File(file)

#         categories = set()
#         criteria = set()
#         indicators = dict()

#         for org in orgs:
#             # get its service quality
#             print("ORGANIZATION ---> ", org.__str__())
#             f.write("\nORGANIZATION ---> ")
#             f.write(org.__str__())
#             servq = ServiceQuality.objects.get(organization=org) # and year later on
#             print("SERVICE QUALITY ---> ", servq.__str__())
#             f.write("\nSERVICE QUALITY ---> ")
#             f.write(servq.__str__())
#             if servq is None:
#                 print("Supposedly new service quality is needed !!!!!!")
               
#             # get the respondents but to the same stuff (TO DO)
#             resps = org.respondents.all()
            
#             if resps is not None:
#                 for resp in resps:
#                     print("RESPONDANT ---> ", resp.__str__())
#                     f.write("\nRESPONDANT ---> ")
#                     f.write(resp.__str__())
#                     # check answered date
#                     answers = resp.answers.all()
#                     answered_at = resp.answered_at
#                     for ans in answers:
#                         cat = ans.category()
#                         crit = ans.criterion()
#                         score = ans.score
#                         categories.add(cat)
#                         criteria.add(crit)
#                         #print(isvalid_date(answered_at.date(), fromdate, tilldate), isvalid_score(score), isvalid_category(cat))
#                         if isvalid_date(answered_at.date(), fromdate, tilldate) and isvalid_score(score) and isvalid_category(cat):
#                             if crit not in indicators.keys():
#                                 indicators[crit] = [score]
#                             else:
#                                 v = indicators[crit]
#                                 v.append(score)
#                         f.write(ans.__str__())
#         print(categories)
#         print(criteria)
#             #print(indicators)
#         indic_count = dict()
#         indic_avg = dict()
#         for x, y in indicators.items():
#             n = len(y)
#             indic_count[x] = n
#             if n > 0:
#                 indic_avg[x] = sum(y) / n
#             else:
#                 indic_avg[x] = 0
#         print(indic_count, indic_avg)
#             # for this org / servq
#         update_service_quality_previous_year(allservq, indic_count, indic_avg)

#     f.closed


                    
# def run():

#     fromdate = datetime(2013,1,10).date()
#     tilldate = datetime(2013,10,10).date()
#     indicators = {}
#     # get all organizations

#     orgs = Organization.objects.all()

#     with open('app/basket.txt', 'w') as file:
#         f = File(file)

#         for org in orgs:
#             # get its service quality
#             print("ORGANIZATION ---> ", org.__str__())
#             f.write("\nORGANIZATION ---> ")
#             f.write(org.__str__())
#             servq = ServiceQuality.objects.get(organization=org) # and year later on
#             print("SERVICE QUALITY ---> ", servq.__str__())
#             f.write("\nSERVICE QUALITY ---> ")
#             f.write(servq.__str__())
#             if servq is None:
#                 print("Supposedly new service quality is needed")
#                 servq = ServiceQuality(organization=org)
#             # get the respondents
#             resps = org.respondents.all()
#             categories = set()
#             criteria = set()
#             indicators = dict()
#             if resps is not None:
#                 for resp in resps:
#                     print("RESPONDANT ---> ", resp.__str__())
#                     f.write("\nRESPONDANT ---> ")
#                     f.write(resp.__str__())
#                     # check answered date
#                     answers = resp.answers.all()
#                     answered_at = resp.answered_at
#                     for ans in answers:
#                         cat = ans.category()
#                         crit = ans.criterion()
#                         score = ans.score
#                         categories.add(cat)
#                         criteria.add(crit)
#                         #print(isvalid_date(answered_at.date(), fromdate, tilldate), isvalid_score(score), isvalid_category(cat))
#                         if isvalid_date(answered_at.date(), fromdate, tilldate) and isvalid_score(score) and isvalid_category(cat):
#                             if crit not in indicators.keys():
#                                 indicators[crit] = [score]
#                             else:
#                                 v = indicators[crit]
#                                 v.append(score)
#                         f.write(ans.__str__())
#             print(categories)
#             print(criteria)
#             #print(indicators)
#             indic_count = dict()
#             indic_avg = dict()
#             for x, y in indicators.items():
#                 n = len(y)
#                 indic_count[x] = n
#                 if n > 0:
#                     indic_avg[x] = sum(y) / n
#                 else:
#                     indic_avg[x] = 0
#             print(indic_count, indic_avg)
#             # for this org / servq
#             update_service_quality_previous_year(servq, indic_count, indic_avg)



#         f.closed

                    



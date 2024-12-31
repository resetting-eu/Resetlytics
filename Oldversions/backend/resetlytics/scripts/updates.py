
from app.models import *
from django.utils import timezone

from datetime import datetime
import csv

def run():

    # indics = []
    # for i in range(0,32):
    #     indic = Indicator()
    #     indic.save()
    #     indics.append(indic)
    #     #indics.add(Indicator())
   
    indics = Indicator.objects.all()
    #print(indics)
    allservice = AllServiceQuality.objects.get(id=1)
    #allservice = AllServiceQuality.objects.all()
    org = Organization.objects.get(legal_name="Istar Resetting")
    #org = Organization.objects.all()
    services = ServiceQuality.objects.all()
    print(services)
    print(allservice)
    print(org)
    k = 24
    serv = ServiceQuality(organization=org, allservicequality=allservice,
                                service=indics[k], environment=indics[k+1], reservation=indics[k+2],
                                     technology=indics[k+3], staff=indics[k+4],
                                     sustainability=indics[k+5], satisfaction=indics[k+6], demographics=indics[k+7])
    serv.save()
    # serv = ServiceQuality(organization=org, allservicequality=allservice,
    #                            service=indics[k], environment=indics[k+1], reservation=indics[k+2],
    #                                 technology=indics[k+3], staff=indics[k+4],
    #                                 sustainability=indics[k+5], satisfaction=indics[k+6], demographics=indics[k+7])
                          
    # allservice = AllServiceQuality(service=indics[0], environment=indics[1], reservation=indics[2],
    #                             technology=indics[3], staff=indics[4],
    #                             sustainability=indics[5], satisfaction=indics[6], demographics=indics[7]
    #                             )
    # allservice.save()
    # orgs = Organization.objects.all()
    # k = 8
    # for org in orgs:
    #     print(k, indics[k])
    #     print(org)
    #     serv = ServiceQuality(organization=org, allservicequality=allservice,
    #                           service=indics[k], environment=indics[k+1], reservation=indics[k+2],
    #                                technology=indics[k+3], staff=indics[k+4],
    #                                sustainability=indics[k+5], satisfaction=indics[k+6], demographics=indics[k+7]
    #                         )
    #     serv.save()
    #     k = k + 8
    







    # date = datetime(2024, 1, 4)
    # eu = ResettingUser.objects.get(id=1)
    # print(eu)
    # quest = Questionnaire.objects.get(id=14)
    # print(quest)
    # survey = Survey(owner=eu, title="Service Quality Survey", created_at=date, questionnaire=quest)
    # survey.save()
    # print(survey)

    # objs = Organization.objects.all()
    # for obj in objs:
    #     print(obj)
    #     obj.representative = eu
    #     obj.save()

    # objs = Respondent.objects.all()
    # for obj in objs:
    #     #print(obj)
    #     obj.survey = survey
    #     obj.save()

    # survey = Survey.objects.get(id=1)
    # print(survey)
    # objs = Organization.objects.all()
    # for obj in objs:
    #     print(obj)
    #     survey.organizations.add(obj)

from app.models import *
from django.utils import timezone

from datetime import datetime
import csv
import random
#ID|Review-sentences-text|Review-nouns-text|TextBlob-sentiment|Vader-sentiment

def run():

    sents = SentimentAnalysis.objects.all()

   
    date1 = datetime(2023,1,3)
    date2 = datetime(2023,12,23)

    with open('app/negcommonwords.csv') as file:
        reader = csv.reader(file, delimiter="|")
        next(reader)
        for row in reader:
            print("==================================")
            print(row)
            sa = sents[2]
            wc = Wordcloud(words=row[1], count_words=row[2], tendency="Negative", sentiment=sa, from_date=date1, till_date=date2)
            wc.save()
            

# days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
#     months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
#     companies = [0, 1, 2]

#     with open('app/poscommonwords.csv') as file:
#         reader = csv.reader(file, delimiter="|")
#         next(reader)
#         id = 1
#         for row in reader:
#             print("==================================")
#             day = random.choice(days)
#             month = random.choice(months)
#             date1 = datetime(2023, month, day)
#             print(date1)
#             if (id % 3 == 0):
#                 comp = 0
#             else:
#                 comp = random.choice(companies)
#             id = id + 1
#             sa = sents[comp]
#             smark = SentimentMarks(outcome=row[3], sentiment=sa, date=date1)
#             smark.save()

 
#  Organization.objects.all().delete()
#     Respondent.objects.all().delete()
#     Answer.objects.all().delete()
#     org1 = Organization(legal_name='Iscte Resetting', commercial_name='Iscte Resetting Demo', location='Lisboa', country='Portugal')
#     org2 = Organization(legal_name='Istar Resetting', commercial_name='Istar Research Demo', location='Lisboa', country='Portugal')
#     org3 = Organization(legal_name='Bru Resetting', commercial_name='Bru Research Demo', location='Lisboa', country='Portugal')

#     org1.save()
#     org2.save()
#     org3.save()
#     orgs = [org1, org2, org3]
#     with open('app/sq-answers-all.csv') as file:
#         reader = csv.reader(file, delimiter=";")
#         next(reader)

#         for row in reader:
#             print("==================================")
#             companyid = max(0, int(row[1])-1) # between 0 and 2
#             if (companyid > 2):
#                 companyid = 2
#             dv = row[2].split('-')
#             date = datetime(int(dv[2]), int(dv[1]), int(dv[0]))
#             print(companyid, row[0], row[2], date)
#             resp = Respondent(answered_at=date, digital_ID=row[0], related_organization=orgs[companyid])
#             resp.save()
#             id = 3
#             #print(id, ' as text: ', row[id+1])
#             quest = Question.objects.get(id=int(row[id]))
#             print(row[id], ' -> ', quest)
#             ans = Answer(question=quest, respondent=resp, text=row[id+1])
#             ans.save()
#             for id in range(5, 53, 2):
#                 #print(id, ' as score: ', row[id+1])
#                 quest = Question.objects.get(id=int(row[id]))
#                 #print(row[id], ' -> ', quest)
#                 ans = Answer(question=quest, respondent=resp, score=float(row[id+1]))
#                 ans.save()
#             for id in range(53, 63, 2):
#                 #print(id, ' as text: ', row[id+1])
#                 quest = Question.objects.get(id=int(row[id]))
#                 #print(row[id], ' -> ', quest)
#                 ans = Answer(question=quest, respondent=resp, text=row[id+1])
#                 ans.save()

 
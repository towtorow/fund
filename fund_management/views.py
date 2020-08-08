from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from .models import FundUser
from .models import Fund
from .serializers import FundUserSerializer
from .serializers import FundSerializer
# Create your views here.
def index(request) :
    return render(request, 'fund_management/index.html',{})

def signin(request) :
    if request.method == "POST":
        print(request.POST)
        email = request.POST.get('email')
        password = request.POST.get('password')
        row = FundUser.objects.filter(email=email)
        if(len(row) is 0) :
            fundUser = FundUser()
            fundUser.email = email
            fundUser.password = password
            fundUser.save()
            return JsonResponse({
                'result' : 'success',
            }, json_dumps_params = {'ensure_ascii': True})

        else :
            return JsonResponse({
                'result' : 'alreadyExistId',
            }, json_dumps_params = {'ensure_ascii': True})

    else:
        return JsonResponse({
            'result' : 'noGetRequest',
        }, json_dumps_params = {'ensure_ascii': True})

def login(request) :
        if request.method == "POST":
            email = request.POST.get('email')
            password = request.POST.get('password')
            row = FundUser.objects.filter(email=email)
            if(len(row) is not 0) :
                fundUser = row.first()
                serializer = FundUserSerializer(fundUser)
                if(fundUser.password == password) :
                    return JsonResponse({
                        'result' : 'success',
                        'fundUser' : serializer.data,
                    }, json_dumps_params = {'ensure_ascii': True})
                else :
                    return JsonResponse({
                        'result' : 'fail',
                    }, json_dumps_params = {'ensure_ascii': True})
            else :
                return JsonResponse({
                    'result' : 'fail',
                }, json_dumps_params = {'ensure_ascii': True})

        else:
            return JsonResponse({
                'result' : 'noGetRequest',
            }, json_dumps_params = {'ensure_ascii': True})

def getFundList(request) :
    if request.method == "POST":
        email = request.POST.get('email')
        row = Fund.objects.filter(email=email)
        fundList = row.all()
        serializer = FundSerializer(fundList, many=True)
        return JsonResponse({
            'result' : len(fundList),
            'fundList' : serializer.data,
        }, json_dumps_params = {'ensure_ascii': True})
    else :
        return JsonResponse({
            'result' : 'noGetRequest',
        }, json_dumps_params = {'ensure_ascii': True})

def getFundDetail(request) :
    if request.method == "POST":
        fundNo = request.POST.get('fundNo')
        row = Fund.objects.filter(fundNo=fundNo)
        fund = row.first()
        serializer = FundSerializer(fund)
        return JsonResponse({
            'result' : 1,
            'fund' : serializer.data,
        }, json_dumps_params = {'ensure_ascii': True})
    else :
        return JsonResponse({
            'result' : 'noGetRequest',
        }, json_dumps_params = {'ensure_ascii': True})
def deleteFund(request) :
    if request.method == "POST":
        fundNo = request.POST.get('fundNo')
        fund = Fund.objects.get(fundNo=fundNo)
        fund.delete()
        return JsonResponse({
            'result' : 'success',
        }, json_dumps_params = {'ensure_ascii': True})
    else :
        return JsonResponse({
            'result' : 'noGetRequest',
        }, json_dumps_params = {'ensure_ascii': True})
def updateFund(request) :
    if request.method == "POST":
        fundNo = request.POST.get('fundNo')
        fund = Fund.objects.get(fundNo=fundNo)

        email = request.POST.get('email')
        fundName = request.POST.get('fundName')
        pay = request.POST.get('pay')
        payCnt = request.POST.get('payCnt')
        totalPay = request.POST.get('totalPay')
        doc = request.POST.get('doc')
        row = FundUser.objects.filter(email=email)
        fundUser = row.first()

        fund.email = fundUser
        fund.fundName = fundName
        fund.pay = pay
        fund.payCnt = payCnt
        fund.totalPay = totalPay
        fund.doc = doc

        fund.save()

        return JsonResponse({
            'result' : 'success',
        }, json_dumps_params = {'ensure_ascii': True})
    else :
        return JsonResponse({
            'result' : 'noGetRequest',
        }, json_dumps_params = {'ensure_ascii': True})
def createFund(request) :
    if request.method == "POST":
        email = request.POST.get('email')
        fundName = request.POST.get('fundName')
        pay = request.POST.get('pay')
        payCnt = request.POST.get('payCnt')
        totalPay = request.POST.get('totalPay')
        doc = request.POST.get('doc')
        row = FundUser.objects.filter(email=email)
        fundUser = row.first()
        fund = Fund()
        fund.email = fundUser
        fund.fundName = fundName
        fund.pay = pay
        fund.payCnt = payCnt
        fund.totalPay = totalPay
        fund.doc = doc
        try:
            fund.save()
        except Exception as e:
            return JsonResponse({
                'result' : 'fail',
            }, json_dumps_params = {'ensure_ascii': True})
        return JsonResponse({
            'result' : 'success',
        }, json_dumps_params = {'ensure_ascii': True})
    else:
        return JsonResponse({
            'result' : 'noGetRequest',
        }, json_dumps_params = {'ensure_ascii': True})

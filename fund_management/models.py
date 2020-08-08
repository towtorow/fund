from django.db import models
class FundUser(models.Model):
    email = models.CharField(max_length=50, primary_key=True)
    password = models.CharField(max_length=50)

class Fund(models.Model):
    fundNo = models.AutoField(primary_key=True)
    email = models.ForeignKey('FundUser', on_delete=models.CASCADE)
    fundName = models.CharField(max_length=50)
    pay = models.IntegerField()
    payCnt = models.IntegerField()
    totalPay = models.IntegerField()
    doc = models.TextField(max_length=1000)

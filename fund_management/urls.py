from django.urls import path
from .models import Fund
from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static



from .views import *
app_name = 'fund_management'

urlpatterns = [
    path('', index, name='index'),
    path('signin/', signin, name='signin'),
    path('login/', login, name='login'),
    path('getFundList/',getFundList,name='getFundList'),
    path('getFundDetail/',getFundDetail,name='getFundDetail'),
    path('deleteFund/',deleteFund,name='deleteFund'),
    path('updateFund/',updateFund,name='updateFund'),
    path('createFund/',createFund,name='createFund'),

]

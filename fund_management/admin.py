from django.contrib import admin

# Register your models here.
from .models import Fund
from .models import FundUser
admin.site.register(Fund)
admin.site.register(FundUser)

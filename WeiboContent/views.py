from django.shortcuts import render
from django.shortcuts import HttpResponse

import json

from WeiboContent import models_server
from WeiboContent import respone


# Create your views here.


def index(request):
    return HttpResponse('OK!')


def weibocontent(request):
    if request.method == 'GET':
        page = request.GET.get('home', None)
        if not page:
            page = 1
        obj = models_server.WeiboContent()
        content_list, favor_list, comments_list = obj.all(page)

        con_obj = respone.weibocontent(content_list=content_list, favor_list=favor_list,
                                       comments_list=comments_list)

        return HttpResponse(json.dumps(con_obj.con_dic))



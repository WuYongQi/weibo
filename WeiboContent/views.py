from django.shortcuts import render
from django.shortcuts import HttpResponse

import json
from django.core.cache import cache
from WeiboContent import models_server
from WeiboContent import respone
from Common import session_detection


# Create your views here.


def index(request):
    # request.session.setdefault('is_login', True)
    # request.session.get('k1', None)
    # print(request.session.session_key)
    # cache.set(request.session.session_key, {"k1": 'v1', "k2": "v2"}, timeout=25)
    # print("1111", type(cache.get('xja9sqa9sniul8')), cache.get('xja9sqa9sniul8'))
    return render(request, 'indextest.html')

# @session_detection.session_detection
def weibocontent(request):
    if request.method == 'GET':

        # from django.core.cache import cache
        # cache.set("foo", "value", timeout=25)
        # print(cache.ttl("foo"))
        # print(cache.get("foo"))
        # cache.keys("foo_*")   #["foo_1", "foo_2"]


        page = request.GET.get('home', None)
        if not page:
            page = 1
        obj = models_server.WeiboContent()
        content_list, favor_list, comments_list, forwarding_conut = obj.all(page)

        con_obj = respone.weibocontentrespone(content_list=content_list,
                                              favor_list=favor_list,
                                              comments_list=comments_list,
                                              forwarding_conut=forwarding_conut)
        print(con_obj.con_dic)
        return HttpResponse(json.dumps(con_obj.con_dic))

    if request.method == 'POST':
        page = request.POST.get('home', None)


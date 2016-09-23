from django.shortcuts import render
from django.shortcuts import HttpResponse

import json
import datetime
import time
from django.core.cache import cache
from django.contrib.auth.decorators import login_required

from WeiboContent import models_server
from WeiboContent import respone


# Create your views here.


def index(request):
    # request.session.setdefault('is_login', True)
    # request.session.get('k1', None)
    # print(request.session.session_key)
    # cache.set(request.session.session_key, {"k1": 'v1', "k2": "v2"}, timeout=25)
    # print("1111", type(cache.get('xja9sqa9sniul8')), cache.get('xja9sqa9sniul8'))

    return render(request, 'indextest.html', {"ti": time.time()})


# @login_required(login_url='/index/')
def weibocontent(request):
    """微博内容视图"""
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


def userinfo(request):
    """用户信息视图"""
    if request.method == 'GET':
        pass

    if request.method == 'POST':
        """添加用户信息"""
        obj = models_server.UserCollection()
        ret = obj.is_userprofile(username="jenny", email='suoning8@163.com', password='jennyjenny',
                                 name="珍妮", head_img='coco.img', sex=0, age=21, brief="I love Nick.")
        print(ret)


def login(request):
    """登录视图"""
    if request.method == 'GET':
        pass

    elif request.method == 'POST':
        """登录判断"""
        username = request.POST.get('username')
        password = request.POST.get('password')
        if username and password:
            obj = models_server.UserCollection()
            ret = obj.is_login(request=request, username=username, password=password)
            return

    elif request.method == 'PUT':
        """更改密码"""
        username = request.POST.get('username')
        old_password = request.POST.get('old_password')
        new_password = request.POST.get('new_password')
        if username and old_password and new_password:
            obj = models_server.UserCollection()
            ret = obj.put_passwd(username=username, old_password=old_password, new_password=new_password)
            return

    elif request.method == 'DELETE':
        """退出用户登录"""
        obj = models_server.UserCollection()
        ret = obj.is_logout(request)
        return



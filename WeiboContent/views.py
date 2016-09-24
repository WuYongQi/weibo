from django.shortcuts import render
from django.shortcuts import HttpResponse

import json
import datetime
import time
from django.core.cache import cache
from django.contrib.auth.decorators import login_required
from django.contrib.auth.backends import ModelBackend

from WeiboContent import models_server
from WeiboContent import respone
from WeiboContent.forms import UserInfoPostForm


# Create your views here.


def index(request):
    obj = models_server.UserCollection()
    ret = obj.is_login(request=request, username="nick", password="nicknick")
    # # print("Ret:", ret.id)
    # userid = request.session.get('_auth_user_id')
    # a = ModelBackend().get_user(user_id=userid)
    # print(type(a), a, a.is_active)
    # # print(userbackendobj.is_value())
    # # print("name:", request.session.get('_auth_user_backend'))
    # # print("name:", request.session.get('_auth_user_id'))
    # request.session['id_login'] = True
    # print("item:", request.session.items())
    #
    # cache.set(request.session.get('_auth_user_hash'), list(request.session.items()), timeout=30)
    # print("1111", type(cache.get(request.session.get('_auth_user_hash'))), cache.get(request.session.get('_auth_user_hash')))

    ret = models_server.UserCollection().wblist(ret)
    print(ret)
    return render(request, 'indextest.html', {"ti": time.time()})


# @login_required
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


# @login_required
def userinfo(request):
    """用户信息视图"""
    if request.method == 'GET':
        pass

    if request.method == 'POST':
        """添加用户信息"""
        request_form = UserInfoPostForm(request.POST)
        if request_form.is_valid():
            request_dict = request_form.clean()
            print("request_dict", request_dict)
            obj = models_server.UserCollection()
            # ret = obj.is_userprofile(username="jenny", email='suoning8@163.com', password='jennyjenny',
            #                          name="珍妮", head_img='coco.img', sex=0, age=21, brief="I love Nick.")
            # print(ret)
        else:
            error_msg = request_form.errors.as_json()
            print(type(error_msg), error_msg)


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
            if ret:
                request.session['id_login'] = True
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


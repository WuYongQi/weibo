from django.shortcuts import render, render_to_response
from django.shortcuts import HttpResponse

import json
import datetime
import time
import config
from django.core.cache import cache
from django.contrib.auth.decorators import login_required
from django.contrib.auth.backends import ModelBackend
from django.template.context import RequestContext

from Common.messMQ import producers  # 生产者

from WeiboContent import models_server
from WeiboContent.respone import weiborespone
from WeiboContent.request import weiborequest
from WeiboContent.respone import userrespone
from WeiboContent.request import userrequest

from WeiboContent.forms import UserInfoPostForm
from WeiboContent.forms import NewWeiBo

# 消费者夯住
from WeiboContent import newmess_server


# Create your views here.


def index(request):
    obj = models_server.UserCollection()
    ret = obj.is_login(request=request, username="nick", password="nicknick")
    # print("Ret:", ret.id)
    userid = request.session.get('_auth_user_id')
    a = ModelBackend().get_user(user_id=userid)
    # print(type(a), a, a.is_active)
    # print(userbackendobj.is_value())
    # print("name:", request.session.get('_auth_user_backend'))
    # print("name:", request.session.get('_auth_user_id'))
    # request.session['id_login'] = True
    # print("item:", request.session.items())

    # cache.set(request.session.get('_auth_user_hash'), list(request.session.items()), timeout=30)
    # print("1111", type(cache.get(request.session.get('_auth_user_hash'))),
    #       cache.get(request.session.get('_auth_user_hash')))

    models_server.UserCollection().userweibo(a, page=1)

    f = NewWeiBo(request.GET)
    print(f)
    print(f.is_valid())
    print(f.cleaned_data)
    print(f.errors)

    return render(request, 'login_master.html', {'context_instance': RequestContext(request)})


# @login_required
def weibocontent(request):
    """微博内容视图"""
    if request.method == 'GET':
        """未登录首页微博内容"""
        # from django.core.cache import cache
        # cache.set("foo", "value", timeout=25)
        # print(cache.ttl("foo"))
        # print(cache.get("foo"))
        # cache.keys("foo_*")   #["foo_1", "foo_2"]

        page = request.GET.get('home') if request.GET.get('home', None) else 1
        obj = models_server.WeiboContent()
        content_list, favor_list, comments_list, forwarding_conut = obj.all(page)

        con_obj = weiborespone.weibocontentrespone(content_list=content_list,
                                                   favor_list=favor_list,
                                                   comments_list=comments_list,
                                                   forwarding_conut=forwarding_conut)
        print(con_obj.con_dic)
        return HttpResponse(json.dumps(con_obj.con_dic))

    elif request.method == 'POST':
        page = request.POST.get('home', None)


# @login_required
def userinfo(request):
    """用户信息视图"""
    if request.method == 'GET':
        pass

    elif request.method == 'POST':
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
        loginrespone = userrespone.loginespone()
        if username and password:
            obj = models_server.UserCollection()
            ret = obj.is_login(request=request, username=username, password=password)
            if ret:
                request.session['id_login'] = True
                loginrespone.status = True
            loginrespone.status = False
            loginrespone.message = "用户名或密码错误"
        else:
            loginrespone.status = False
            loginrespone.message = "用户名或密码不能为空"
        return HttpResponse(json.dumps(loginrespone.dic()))

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


def userhome(request):
    if request.method == 'GET':
        """登录后首页内容"""
        obj = models_server.UserCollection()
        ret = obj.is_login(request=request, username="nick", password="nicknick")

        userid = request.session.get('_auth_user_id')
        userobj = ModelBackend().get_user(user_id=userid)
        usercollectionobj = models_server.UserCollection()
        page = request.GET.get('home') if request.GET.get('home', None) else 1
        content_list, favor_list, comments_list, forwarding_conut = usercollectionobj.userweibo(ret, page=page)
        con_obj = weiborespone.weibocontentrespone(content_list=content_list,
                                                   favor_list=favor_list,
                                                   comments_list=comments_list,
                                                   forwarding_conut=forwarding_conut)
        return HttpResponse(json.dumps(con_obj.con_dic))

    elif request.method == 'POST':
        """发布微博"""
        userid = request.session.get('_auth_user_id')
        userobj = ModelBackend().get_user(user_id=userid)
        if userobj:
            formnewweiboret = NewWeiBo(request.POST)
            if formnewweiboret.is_valid():
                data_dic = formnewweiboret.cleaned_data
                data_dic['user'] = userobj
                weiborequestobj = weiborequest.newweibocontentrequest(**data_dic)
                # 加队列返回
                print(weiborequestobj.dic())
                obj = producers.producers()
                ret = obj.createadd(config.rabbitMQ['New_weibo'], json.dumps(weiborequestobj.dic()))
                if ret:
                    obj.closeconn()   # 关闭连接
                    newweiboconresponeobj = weiborespone.newweibocontentrespone(status=True,
                                                                                message='发布成功',
                                                                                connect_dic=weiborequestobj.dic())
                else:
                    newweiboconresponeobj = weiborespone.newweibocontentrespone(status=False,
                                                                                message='发布错误',
                                                                                connect_dic=formnewweiboret.errors)
            else:
                print(formnewweiboret.errors)
                newweiboconresponeobj = weiborespone.newweibocontentrespone(status=False,
                                                                            message='填写错误',
                                                                            connect_dic=formnewweiboret.errors)
            print(type(newweiboconresponeobj.dic()), newweiboconresponeobj.dic())
            return HttpResponse(json.dumps(newweiboconresponeobj.dic()))


    elif request.method == 'PUT':
        pass
    elif request.method == 'DELETE':
        pass


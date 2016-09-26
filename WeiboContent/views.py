from django.shortcuts import render, render_to_response, redirect
from django.shortcuts import HttpResponse

import os
import json
import datetime
import time
import shutil

import config
from django.core.cache import cache
from django.contrib.auth.decorators import login_required
from django.contrib.auth.backends import ModelBackend
from django.template.context import RequestContext

from Common.messMQ import producers  # 生产者
from Common.encryption import encryption  # 加密函数

from WeiboContent import models_server
from WeiboContent import user_file
from WeiboContent import push_followers
from WeiboContent import newmess_push
from WeiboContent.respone import weiborespone
from WeiboContent.request import weiborequest
from WeiboContent.respone import userrespone
from WeiboContent.request import userrequest
from WeiboContent.respone import pushmessrespone
from WeiboContent.respone import sessionrespone

from WeiboContent.forms import UserInfoPostForm
from WeiboContent.forms import NewWeiBo
from WeiboContent.forms import picturevideoForm

# 消费者夯住
from WeiboContent import newmess_server


# Create your views here.


def index(request):
    obj = models_server.UserCollection()
    ret = obj.is_login(request=request, username="nick", password="nicknick")
    userid = request.session.get('_auth_user_id')
    if not userid:
        return render(request, 'master.html', {"ti": time.time(), 'context_instance': RequestContext(request)})
    else:
        cacheret = cache.get(userid, None)
        if not cacheret:
            return render(request, 'master.html',
                          {"ti": time.time(), 'context_instance': RequestContext(request)})
        elif not cacheret['is_login']:
            return render(request, 'master.html',
                          {"ti": time.time(), 'context_instance': RequestContext(request)})
    userobj = ModelBackend().get_user(user_id=userid)
    a = ModelBackend().get_user(user_id=userid)
    # print(type(a), a, a.is_active)
    # print(userbackendobj.is_value())
    # print("name:", request.session.get('_auth_user_backend'))
    # print("name:", request.session.get('_auth_user_id'))
    request.session['id_login'] = True
    print(models_server.UserCollection().followlistid(user_obj=userobj))
    retdic = {
        'is_login': True,
        'user_id': request.session['_auth_user_id'],
        'followlist': models_server.UserCollection().followlistid(user_obj=userobj),
    }
    # print("item:", request.session.items())
    # for i in cache.iter_keys("_auth_user_hash*"):
    #     print("next_iterkey:", i)

    cache.set(userid, retdic, timeout=30)
    print("1111", type(cache.get(userid)), cache.get(userid))
    print("11111", cache.get(userid)['is_login'])

    models_server.UserCollection().userweibo(a, page=1)


    return render(request, 'login_master.html', {"ti": time.time(), 'context_instance': RequestContext(request)})


@login_required
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
        pass
    elif request.method == 'PUT':
        pass
    elif request.method == 'DELETE':
        pass


@login_required
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

    elif request.method == 'PUT':
        pass
    elif request.method == 'DELETE':
        pass


def login(request):
    """登录视图"""
    if request.method == 'GET':
        pass

    elif request.method == 'POST':
        """登录判断"""
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)
        loginrespone = userrespone.loginespone()
        if username and password:
            obj = models_server.UserCollection()
            ret = obj.is_login(request=request, username=username, password=password)
            if ret:
                user_id = request.session['_auth_user_id']
                request.session['id_login'] = True
                loginrespone.status = True
                sessionrequestobj = sessionrespone.sessionrespone(user_id=user_id)
                cache.set(user_id, sessionrequestobj.dic(), timeout=30)
            else:
                loginrespone.status = False
                loginrespone.message = "用户名或密码错误"
        else:
            loginrespone.status = False
            loginrespone.message = "用户名或密码不能为空"
        return HttpResponse(json.dumps(loginrespone.dic()))

    elif request.method == 'PUT':
        """更改密码"""
        username = request.POST.get('username', None)
        old_password = request.POST.get('old_password', None)
        new_password = request.POST.get('new_password', None)
        if username and old_password and new_password:
            obj = models_server.UserCollection()
            ret = obj.put_passwd(username=username, old_password=old_password, new_password=new_password)
            print(ret)
            return

    elif request.method == 'DELETE':
        """退出用户登录"""
        userid = request.session.get('_auth_user_id', None)
        cache.set(userid, {'is_login': False}, timeout=5)
        obj = models_server.UserCollection()
        ret = obj.is_logout(request)
        return redirect('/index/', permanent=True)


@login_required
def userhome(request):
    if request.method == 'GET':
        """登录后首页内容"""
        obj = models_server.UserCollection()
        ret = obj.is_login(request=request, username="nick", password="nicknick")

        userid = request.session.get('_auth_user_id', None)
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
        userid = request.session.get('_auth_user_id', None)
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
                    obj.closeconn()  # 关闭连接
                    newweiboconresponeobj = weiborespone.newweibocontentrespone(status=True,
                                                                                message='发布成功',
                                                                                user_obj=userobj,
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
            return HttpResponse(json.dumps(newweiboconresponeobj.dic()))


    elif request.method == 'PUT':
        pass
    elif request.method == 'DELETE':
        pass


@login_required
def picture_video(request):
    """图片视频上传视图"""
    userid = request.session.get('_auth_user_id', None)
    userobj = ModelBackend().get_user(user_id=userid)
    fileobj = user_file.userfile(user_obj=userobj)
    filepath = fileobj.filepath
    if userobj:
        if request.method == 'GET':
            shutil.rmtree(filepath) if os.path.isdir(filepath) else os.makedirs(filepath)
            return HttpResponse('ok')
        elif request.method == 'POST':
            try:
                obj = request.FILES.get('PVFile')
                fileabspath = os.path.join(filepath, encryption(obj.name), '.', str(obj.name).split('.')[-1])
                f = open(fileabspath, 'wb')
                for chunk in obj.chunks():
                    f.write(chunk)
                f.close()
                pvfileresponeobj = weiborespone.PVFile(status=True, message='上传成功',
                                                       filepath=str(fileabspath).split('user')[-1])
            except Exception as e:
                pvfileresponeobj = weiborespone.PVFile(status=False, message='上传失败', filepath=str(e))
            return HttpResponse(json.dumps(pvfileresponeobj.dic()))


@login_required
def messpush(request):
    """心跳视图"""
    pushmessresponeobj = pushmessrespone.pushmessrespone(count='')
    userid = request.session.get('_auth_user_id', None)
    cacheuserdic = cache.get(userid, None)
    if not cacheuserdic['is_login']:
        pushmessresponeobj.status = False
        pushmessresponeobj.message = "登录超时，请重新登录"
        return HttpResponse(json.dumps(pushmessresponeobj.dic()))
    followidlist = cacheuserdic['followlist']   # 关注的人ID
    num = 0     # 个数初始化
    li = []     # [{},{},]
    for user_id in followidlist:
        tarhas_list = getattr(push_followers.pushfollowers, str(user_id), None)
        if not tarhas_list:
            continue
        for i in tarhas_list:
            newmess_push.start(i)
            cachedic = cache.get(i, None)
            print(cachedic)
            if cachedic:
                num += 1
                li.append(cacheuserdic)
    pushmessresponeobj.status = True
    pushmessresponeobj.num = str(num)
    pushmessresponeobj.count = li
    return HttpResponse(json.dumps(pushmessresponeobj.dic()))



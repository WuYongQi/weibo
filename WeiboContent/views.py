from django.shortcuts import render, render_to_response, redirect
from django.shortcuts import HttpResponse

import os
import json
import datetime
import time
import shutil
import queue

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
from WeiboContent.respone import searchrespone

from WeiboContent.forms import UserInfoPostForm
from WeiboContent.forms import NewWeiBo
from WeiboContent.forms import picturevideoForm

# 消费者夯住
from WeiboContent import newmess_server


# Create your views here.



def index(request):
    # obj = models_server.UserCollection()
    # ret = obj.is_login(request=request, username="nick", password="nicknick")
    userid = request.session.get('_auth_user_id')
    if not userid:
        return render(request, 'master.html', {'context_instance': RequestContext(request)})
    else:
        cacheret = cache.get(userid, None)
        if not cacheret:
            return render(request, 'master.html', {'context_instance': RequestContext(request)})
        elif not cacheret['is_login']:
            return render(request, 'master.html', {'context_instance': RequestContext(request)})

    # userobj = ModelBackend().get_user(user_id=userid)
    # a = ModelBackend().get_user(user_id=userid)
    # print(type(a), a, a.is_active)
    # print(userbackendobj.is_value())
    # print("name:", request.session.get('_auth_user_backend'))
    # print("name:", request.session.get('_auth_user_id'))
    # request.session['id_login'] = True
    # print(models_server.UserCollection().followlistid(user_obj=userobj))
    # retdic = {
    #     'is_login': True,
    #     'user_id': request.session['_auth_user_id'],
    #     'followlist': models_server.UserCollection().followlistid(user_obj=userobj),
    # }
    # print("item:", request.session.items())
    # for i in cache.iter_keys("_auth_user_hash*"):
    #     print("next_iterkey:", i)

    # cache.set(userid, retdic, timeout=30)
    # print("1111", type(cache.get(userid)), cache.get(userid))
    # print("11111", cache.get(userid)['is_login'])

    # models_server.UserCollection().userweibo(a, page=1)


    return render(request, 'login_master.html', {'context_instance': RequestContext(request)})


def weibocontent(request):
    """微博内容视图"""
    if request.method == 'GET':
        """未登录首页微博内容"""
        print(request.GET.get('home', None))
        page = request.GET.get('home') if request.GET.get('home', None) else 1
        print(page)
        obj = models_server.WeiboContent()
        content_list, favor_list, comments_list, forwarding_conut = obj.all(page)

        con_obj = weiborespone.weibocontentrespone(content_list=content_list,
                                                   favor_list=favor_list,
                                                   comments_list=comments_list,
                                                   forwarding_conut=forwarding_conut)
        return HttpResponse(json.dumps(con_obj.con_dic))

    elif request.method == 'POST':
        weiboid = request.POST.get('weibo_id', None)
        if not weiboid:
            return HttpResponse({'status': False})
        obj = models_server.WeiboContent()
        content_list, favor_list, comments_list, forwarding_conut = obj.onewei(weiboid=weiboid)
        con_obj = weiborespone.weibocontentrespone(content_list=content_list,
                                                   favor_list=favor_list,
                                                   comments_list=comments_list,
                                                   forwarding_conut=forwarding_conut)
        return HttpResponse(json.dumps(con_obj.con_dic))


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
                cache.set(user_id, sessionrequestobj.dic(), timeout=config.cache['redis_timeout'])
                usercollobj = models_server.UserCollection()
                newmess_push.start(
                    '%s%s' % (str(usercollobj.mymess(ModelBackend().get_user(user_id=user_id)).id), 'mq'))
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
        userid = request.session.get('_auth_user_id', None)
        userobj = ModelBackend().get_user(user_id=userid)
        usercollectionobj = models_server.UserCollection()

        # 关注信息
        follew = request.GET.get('follew', None)
        if follew:
            mymess = usercollectionobj.mymess(userobj)
            userinfomessobj = userrespone.userinfomess(mymess)
            return HttpResponse(json.dumps(userinfomessobj.dic()))

        page = request.GET.get('home') if request.GET.get('home', None) else 1
        content_list, favor_list, comments_list, forwarding_conut = usercollectionobj.userweibo(userobj, page=page)
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
                filepath = user_file.userfile(user_obj=userobj).filepath
                # data_path = filepath.split('user')[1]
                if os.path.isdir(filepath):
                    if len(os.listdir(filepath)) != 0:
                        path = encryption(filepath)
                        new_path = os.path.join(os.path.dirname(filepath), 'weibo_img', path)
                        os.rename(filepath, new_path)
                        data_dic['pictures'] = path
                # 文件处理
                weiborequestobj = weiborequest.newweibocontentrequest(**data_dic)
                # 加队列返
                obj = producers.producers()
                ret = obj.createadd(config.rabbitMQ['New_weibo'], json.dumps(weiborequestobj.dicadd()))

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


@login_required
def picture_video(request):
    """图片视频上传视图"""
    userid = request.session.get('_auth_user_id', None)
    userobj = ModelBackend().get_user(user_id=userid)
    fileobj = user_file.userfile(user_obj=userobj)
    filepath = fileobj.filepath
    if userobj:
        if request.method == 'GET':
            if os.path.isdir(filepath):
                shutil.rmtree((filepath))
                os.makedirs(filepath)
            else:
                os.makedirs(filepath)
            return HttpResponse('ok')
        elif request.method == 'POST':
            try:
                obj = request.FILES.get('PVFile')
                fileabspath = os.path.join(filepath,
                                           '%s%s%s' % (encryption(obj.name), '.', str(obj.name).split('.')[-1]))
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
    userid = request.session.get('_auth_user_id', None)
    cacheuserdic = cache.get(userid, None)
    if not cacheuserdic:
        return False
    if not cacheuserdic['is_login']:
        pushmessresponeobj = pushmessrespone.pushmessrespone(count='',
                                                             status=False,
                                                             message="登录超时，请重新登录")
        return HttpResponse(json.dumps(pushmessresponeobj.dic()))
    followidlist = cacheuserdic['followlist']  # 关注的人ID

    weibo_id_list = request.POST.get('weibo_id_list', None)
    weibo_id_list = json.loads(weibo_id_list)
    num = 0  # 个数初始化
    li = []  # [1,{},{},]
    status = False
    for user_id in followidlist:
        cachedic = cache.get('%s%s' % (user_id, 'mq'), None)
        if cachedic:
            for i in cachedic:
                status = True
                if str(cachedic.index(i)) == '0':
                    num += int(i)
                    continue
                if json.loads(str(i, encoding='utf-8'))['id'] not in weibo_id_list:
                    li.append(str(i, encoding='utf-8'))
                # li.append(cachedic)
    print("li:", li)
    pushmessresponeobj = pushmessrespone.pushmessrespone(count=li,
                                                         status=status,
                                                         message="",
                                                         num=num)
    print("pushmessresponeobj.dic():", pushmessresponeobj.dic())
    return HttpResponse(json.dumps(pushmessresponeobj.dic()))


def search(request):
    userid = request.session.get('_auth_user_id', None)
    cacheuserdic = cache.get(userid, None)
    if not cacheuserdic or not cacheuserdic['is_login']:
        return render(request, 'search_no_login.html', {'context_instance': RequestContext(request)})
    searchtype = request.GET.get('type', None)
    searchtext = request.GET.get('text', None)
    return render(request, 'search.html', {'context_instance': RequestContext(request),
                                           'type': searchtype, 'text': searchtext})


def searchall(request):
    """搜索视图"""
    if request.method == 'GET':
        searchtype = request.GET.get('type', None)
        searchtext = request.GET.get('text', None)
        searchallobj = models_server.Searchall()
        try:
            if searchtype == 'user':
                ret = searchallobj.name(searchtext)
                if ret:
                    searchresponeobj = searchrespone.searchrespone(ret)
                    return HttpResponse(json.dumps(searchresponeobj.dic()))
            else:
                content_list, favor_list, comments_list, forwarding_conut = searchallobj.weibo(searchtext)

                con_obj = weiborespone.weibocontentrespone(content_list=content_list,
                                                           favor_list=favor_list,
                                                           comments_list=comments_list,
                                                           forwarding_conut=forwarding_conut)
                return HttpResponse(json.dumps(con_obj.con_dic))
        except ValueError as e:
            con_obj = weiborespone.weibocontentrespone(content_list='',
                                                       favor_list='',
                                                       comments_list='',
                                                       forwarding_conut='',
                                                       status=False,
                                                       message="没有找到与之匹配的")
            return HttpResponse(json.dumps(con_obj.con_dic))


# 表情文件读取
text_url = open(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'static', 'img', 'BQ_Url', 'emotions.json'),
                encoding='utf-8').read()
def Expression_processing(req):
    """QQ表情"""
    return HttpResponse(text_url)


# 存放消息队列全局变量
GLOBAL_MQ = {}
@login_required
def new_msg(request):
    """聊天视图"""
    if request.method == 'POST':
        # 获取用户发过来的数据
        data = json.loads(request.POST.get('data'))

        send_to = data['to']
        # 判断队列里是否有这个用户名,如果没有新建一个队列
        if send_to not in GLOBAL_MQ:
            GLOBAL_MQ[send_to] = queue.Queue()
        data['timestamp'] = time.strftime("%Y-%m-%d %X", time.localtime())
        GLOBAL_MQ[send_to].put(data)
        return HttpResponse(GLOBAL_MQ[send_to].qsize())
    else:
        # 因为队列里目前存的是字符串所以我们需要先给他转换为字符串
        request_user = str(request.user.id)
        msg_lists = []
        # 判断是否在队列里
        if request_user in GLOBAL_MQ:
            # 判断有多少条消息
            stored_msg_nums = GLOBAL_MQ[request_user].qsize()
            try:
                # 如果没有新消息
                if stored_msg_nums == 0:
                    print("\033[41;1m没有消息等待,15秒.....\033[0m")
                    msg_lists.append(GLOBAL_MQ[request_user].get(timeout=15))
                '''
                    如果队列里面有没有消息,get就会阻塞,等待有新消息之后会继续往下走,这里如果阻塞到这里了,等有新消息过来之后,把消息加入到
                    msg_lists中后,for循环还是不执行的因为,这个stored_msg_mums是在上面生成的变量下面for调用这个变量的时候他还是为0
                    等返回之后再取得时候,现在stored_msg_nums不是0了,就执行执行for循环了,然后发送数据
                '''
            except Exception as e:
                print('error:', e)
                print("\033[43;1等待已超时......15秒.....\033[0m")

            # 把消息循环加入到列表中并发送
            for i in range(stored_msg_nums):
                msg_lists.append(GLOBAL_MQ[request_user].get())
        else:
            # 创建一个新队列给这个用户
            GLOBAL_MQ[str(request.user.userprofile.id)] = queue.Queue()
        print(request_user, msg_lists, "rrrrrrrrrrrrrrr")
        return HttpResponse(json.dumps(msg_lists))


@login_required
def userhtml(request):
    """个人信息页"""
    return render(request, 'home/main.html', {'context_instance': RequestContext(request)})


@login_required
def favhtml(request):
    """点赞"""
    userid = request.session.get('_auth_user_id', None)
    cacheuserdic = cache.get(userid, None)
    if not cacheuserdic:
        return False
    if not cacheuserdic['is_login']:
        weiboresponeobj = weiborespone.is_favor(nid='', status=False, message="登录超时，请重新登录")
        return HttpResponse(json.dumps(weiboresponeobj.dic()))

    if request.method == 'GET':
        favid = request.GET.get('id', None)
        userobj = ModelBackend().get_user(user_id=userid)
        weibocontenobj = models_server.WeiboContent()
        ret = weibocontenobj.is_favor(favid, userobj)
        if not ret:
            weiboresponeobj = weiborespone.is_favor(nid='', status=False, message="已经点过赞了亲")
        else:
            weiboresponeobj = weiborespone.is_favor(nid='', status=True, message="")
        return HttpResponse(json.dumps(weiboresponeobj.dic()))


    elif request.method == 'POST':
        pass


@login_required
def comhtml(request):
    """评论"""
    userid = request.session.get('_auth_user_id', None)
    cacheuserdic = cache.get(userid, None)
    if not cacheuserdic or not cacheuserdic['is_login']:
        weiboresponeobj = weiborespone.is_com(comlist='', status=False, message="登录超时，请重新登录")
        return HttpResponse(json.dumps(weiboresponeobj.dic()))

    if request.method == 'GET':
        comid = request.GET.get('id', None)
        text = request.GET.get('text', None)
        userobj = ModelBackend().get_user(user_id=userid)
        weibocontenobj = models_server.WeiboContent()
        if text:
            ret = weibocontenobj.is_comment(weibo_id=comid, userobj=userobj, comment=text)
        else:
            ret = weibocontenobj.select_comment(comid)
        weiboresponeobj = weiborespone.is_com(comlist=ret, status=True, message="")
        return HttpResponse(json.dumps(weiboresponeobj.dic()))

    elif request.method == 'POST':
        pass


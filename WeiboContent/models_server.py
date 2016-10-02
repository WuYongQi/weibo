#!/usr/bin/env python
# -*- coding:utf-8 -*-
__author__ = 'Nick Suo'

import os

from Common import time_conversion
from Common import singleton

from django.db.models import Count, Min, Max, Sum
from django.db.models import Q
from django.db.models import F

from django.contrib.auth.models import User
from django.contrib.auth import login
from django.contrib.auth import logout
from django.contrib.auth import authenticate

from WeiboContent.models import Comment
from WeiboContent.models import Weibo
from WeiboContent.models import UserProfile
from WeiboContent.models import Tags


@singleton.singleton
class WeiboContent:
    def __init__(self):
        pass

    def __wbtype(self, obj):
        """转换微博类型字符串"""
        for item in obj:
            wb_type = item.wb_type
            if wb_type == 0:
                item.wb_type = "原创"
            elif wb_type == 1:
                item.wb_type = "转发"
            elif wb_type == 2:
                item.wb_type = "收藏"
        return obj

    def all(self, page):
        """查询所有微博"""
        obj_list = Weibo.objects.all().order_by('-date')[
                   (int(page) * 10 if int(page) != 1 else 0):int(page) * 20]

        # 赞个数
        favor_conut_list = self.favorconut(obj_list)
        # 评论个数
        comments_conut_list = self.commentsconut(obj_list)
        # 转发个数
        forwarding_conut_list = self.forwardingconut(obj_list)

        return obj_list, favor_conut_list, comments_conut_list, forwarding_conut_list

    def favorconut(self, obj_list):
        """赞个数"""
        favor_conut_list = Comment.objects.filter(to_weibo__in=list(obj_list), comment_type=1) \
            .values('to_weibo').annotate(fav_conut=Count('id'))
        print(favor_conut_list)
        return favor_conut_list

    def commentsconut(self, obj_list):
        """评论个数"""
        comments_conut_list = Comment.objects.filter(to_weibo__in=list(obj_list), comment_type=0) \
            .values('to_weibo').annotate(com_conut=Count('id'))
        return comments_conut_list

    def forwardingconut(self, obj_list):
        """转发个数"""
        forwarding_conut_list = Weibo.objects.filter(forward_or_collect_from__in=list(obj_list), wb_type=1) \
            .values('forward_or_collect_from').annotate(for_conut=Count('id'))
        return forwarding_conut_list

    def onewei(self, weiboid):
        weiboobj = Weibo.objects.filter(id=weiboid)
        # 赞个数
        favor_conut_list = self.favorconut(weiboobj)
        # 评论个数
        comments_conut_list = self.commentsconut(weiboobj)
        # 转发个数
        forwarding_conut_list = self.forwardingconut(weiboobj)
        return weiboobj, favor_conut_list, comments_conut_list, forwarding_conut_list

    def add(self, weibodic):
        """增加微博"""
        obj = Weibo.objects.create(**weibodic)
        return obj

    def put(self, nid):
        """修改"""

    def delete(self, nid):
        """删除"""

    def is_favor(self, weibo_id, userobj):
        """点赞"""
        userinfoobj = UserProfile.objects.get(user=userobj)
        ret = Comment.objects.filter(user=userinfoobj, to_weibo_id=str(weibo_id), comment_type=1).first()
        if ret:
            return False
        favorobj = Comment.objects.create(to_weibo_id=str(weibo_id),
                                          user=userinfoobj,
                                          comment_type=1)
        return favorobj

    def select_comment(self, weibo_id):
        """评论树"""
        commentret = Comment.objects.filter(to_weibo_id=weibo_id, comment_type=0).order_by('-date')\
            .values('id', 'comment', 'p_comment_id', 'user__user_id', 'user__name', 'user__head_img',
                    'child_comments__child_comments__user')
        # [{'user__user_id': 7, 'user__head_img': 'jenny/User_info/mm.jpeg', 'user__name': '珍妮', 'id': 14,
        #   'comment': '这个视频屌爆了', 'p_comment_id': None},
        #  {'user__user_id': 1, 'user__head_img': 'nick/User_info/mm.jpeg', 'user__name': 'nick', 'id': 15,
        #   'comment': '碉堡了二', 'p_comment_id': 14}]
        return commentret


    def is_comment(self, weibo_id, userobj, comment, p_comment=None):
        """评论"""
        if p_comment:
            commentobj = Comment.objects.create(to_weibo_id=weibo_id,
                                                user=UserProfile.objects.get(user=userobj),
                                                comment_type=0,
                                                comment=comment,
                                                p_comment=p_comment)
        else:
            commentobj = Comment.objects.create(to_weibo_id=weibo_id,
                                                user=UserProfile.objects.get(user=userobj),
                                                comment_type=0,
                                                comment=comment)
        return [{"comment": commentobj.comment, "id": commentobj.id, "p_comment_id": commentobj.p_comment_id,
                "user__head_img": str(commentobj.user.head_img), "user__name": str(commentobj.user.name),
                "user__user_id": str(commentobj.user_id),
                 "child_comments__child_comments__user": str(commentobj.child_comments.name)}, ]


@singleton.singleton
class UserCollection:
    """用户操作类"""

    def __init__(self):
        self.WeiboContent = WeiboContent()

    def __is_put(self, username, email, password):
        """新建用户"""
        user = User.objects.create_user(username, email, password)
        user.save()
        return user

    def is_userprofile(self, username, email, password, name, head_img,
                       sex=1, age=None, brief=None):
        """新建用户信息"""
        userprofileobj = UserProfile.objects.create(
            user=self.__is_put(username, email, password),
            name=name,
            email=email,
            head_img=str(os.path.join(str(username), 'User_info', head_img)),
            sex=sex,
            age=age,
            brief=brief,
        )
        if userprofileobj:
            return userprofileobj

    def is_active_user(self, username, password):
        """认证用户"""
        user = authenticate(username=username, password=password)
        if user:
            return user
        else:
            return None

    def put_passwd(self, username, old_password, new_password):
        """修改密码"""
        user = authenticate(username=username, password=old_password)
        if user:
            user.set_password(new_password)
            user.save()
            return user
        else:
            return None

    def is_login(self, request, username, password):
        """登录"""
        user = authenticate(username=username, password=password)
        if user:
            if user.is_active:
                login(request, user)
                return user
            return False
        else:
            return False

    def is_logout(self, request):
        """退出登录"""
        return logout(request)

    def put_tags(self, name):
        """添加标签"""
        tag = Tags.objects.create(name=name)
        return tag

    def mymess(self, user_obj):
        """个人信息"""
        userinfo_obj = UserProfile.objects.filter(user=user_obj).first()
        return userinfo_obj

    def followlistid(self, user_obj):
        """我的粉丝USERINFO[ID]"""
        userinfo_obj = UserProfile.objects.filter(user=user_obj).first()
        retuserinfo = userinfo_obj.follow_list.values('user')
        ret = UserProfile.objects.filter(user_id__in=[item['user'] for item in retuserinfo]).values('id')
        list_id = [item['id'] for item in ret]
        return list_id

    # def followlist(self, user_obj):
    #     """我的粉丝"""
    #     userinfo_obj = UserProfile.objects.filter(user=user_obj).first()
    #     ret = userinfo_obj.follow_list.all()
    #     return {"followlen": len(ret), "followcon": ret}
    #
    # def focuslist(self, user_obj):
    #     """我的关注"""
    #     userinfo_obj = UserProfile.objects.filter(user=user_obj).first()
    #     ret = userinfo_obj.my_followers.all()
    #     return {"focuslen": len(ret), "focuscon": ret}
    #
    # def wblist(self, user_obj):
    #     """我的微博"""
    #     userinfo_obj = UserProfile.objects.filter(user=user_obj).first()
    #     ret = userinfo_obj.weibo_set.all()
    #     return {"wblen": len(ret), "wbcon": ret}


    def userweibo(self, user_obj, page):
        """用户登录显示关注用户微博"""
        userinfo_obj = UserProfile.objects.filter(user=user_obj).first()
        fav_list = userinfo_obj.my_followers.all()
        obj_list = Weibo.objects.filter(user__in=list(fav_list)).order_by('date')[
                   (int(page) * 10 if int(page) != 1 else 0):int(page) * 20]

        # 赞个数
        favor_conut_list = self.WeiboContent.favorconut(obj_list)
        # 评论个数
        comments_conut_list = self.WeiboContent.commentsconut(obj_list)
        # 转发个数
        forwarding_conut_list = self.WeiboContent.forwardingconut(obj_list)

        return obj_list, favor_conut_list, comments_conut_list, forwarding_conut_list


@singleton.singleton
class Searchall:
    """搜索类"""

    def __init__(self):
        self.WeiboContent = WeiboContent()

    def add(self, adddic):
        # {
        #     'connector': 'AND'/'OR',
        #     'count': [('id', 1), ('id', 1), ]
        # }
        con = Q()
        q1 = Q()
        q1.connector = adddic['connector']
        for item in adddic['count']:
            q1.children.append(item)

        con.add(q1, 'AND')
        return con

    def name(self, searchtext):
        # addoneobj is self.addobj()
        retlist = []
        # retlist.append(UserProfile.objects.filter(name=searchtext).first())
        # retlist.extend(list(UserProfile.objects.filter(name__istartswith=searchtext).all()))
        retlist.extend(list(UserProfile.objects.filter(name__icontains=searchtext).all()))
        return retlist

    def weibo(self, searchtext):
        # news=New.objects.filter(Q(question__startswith='What'))
        # Q(  ~Q(pub_date__year=2005    否定
        # Poll.objects.get(Q(question__startswith='Who'),Q(pub_date=date(2005, 5, 6)))

        obj_list = []
        # retlist.append(Weibo.objects.filter(text=searchtext).first())
        # retlist.extend(list(Weibo.objects.filter(text__istartswith=searchtext).all()))
        obj_list.extend(list(Weibo.objects.filter(text__icontains=searchtext).all()))

        # 赞个数
        favor_conut_list = self.WeiboContent.favorconut(obj_list)
        # 评论个数
        comments_conut_list = self.WeiboContent.commentsconut(obj_list)
        # 转发个数
        forwarding_conut_list = self.WeiboContent.forwardingconut(obj_list)

        return obj_list, favor_conut_list, comments_conut_list, forwarding_conut_list

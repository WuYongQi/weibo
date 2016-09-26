#!/usr/bin/env python
# -*- coding:utf-8 -*-
__author__ = 'Nick Suo'

import os

from Common import time_conversion
from Common import singleton

from django.db.models import Count, Min, Max, Sum
from django.contrib.auth.models import User
from WeiboContent.models import Comment
from WeiboContent.models import Weibo
from WeiboContent.models import UserProfile
from WeiboContent.models import Tags

from django.contrib.auth import login
from django.contrib.auth import logout
from django.contrib.auth import authenticate


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
        favor_conut_list = Comment.objects.filter(to_weibo__in=list(obj_list), comment_type=1) \
            .values('to_weibo').annotate(fav_conut=Count('id'))
        # 评论个数
        comments_conut_list = Comment.objects.filter(to_weibo__in=list(obj_list), comment_type=0) \
            .values('to_weibo').annotate(com_conut=Count('id'))
        # 转发个数
        forwarding_conut_list = Weibo.objects.filter(forward_or_collect_from__in=list(obj_list), wb_type=1) \
            .values('forward_or_collect_from').annotate(for_conut=Count('id'))

        # # 赞个数
        # favor_conut_list = self.favorconut(obj_list)
        # # 评论个数
        # comments_conut_list = self.commentsconut(obj_list)
        # # 转发个数
        # forwarding_conut_list = self.forwardingconut(obj_list)

        return obj_list, favor_conut_list, comments_conut_list, forwarding_conut_list

    def favorconut(self, setlist):
        """赞个数"""
        favor_conut = map(lambda x: x.comment_set.all().filter(comment_type=1)
                          .values('to_weibo').annotate(fav_conut=Count('comment_type')), setlist)
        favor_conut_list = [{'fav_conut': li[0]['fav_conut'], 'to_weibo': li[0]['to_weibo']}
                            if li else None
                            for li in favor_conut]
        return favor_conut_list

    def commentsconut(self, setlist):
        """评论个数"""
        comments_conut = map(lambda x: x.comment_set.all().filter(comment_type=0)
                             .values('to_weibo').annotate(com_conut=Count('comment_type')), setlist)
        comments_conut_list = [{'com_conut': li[0]['com_conut'], 'to_weibo': li[0]['to_weibo']}
                               if li else None
                               for li in comments_conut]
        return comments_conut_list

    def forwardingconut(self, setlist):
        """转发个数"""
        forwarding_conut = map(lambda x: Weibo.objects.filter(forward_or_collect_from=x.id)
                               .values('forward_or_collect_from').annotate(for_conut=Count('id')), setlist)
        forwarding_conut_list = [{'for_conut': li[0]['for_conut'], 'to_weibo': li[0]['forward_or_collect_from']}
                                 if li else None
                                 for li in forwarding_conut]
        return forwarding_conut_list

    def add(self, weibodic):
        """增加微博"""
        obj = Weibo.objects.create(**weibodic)
        return obj

    def put(self, nid):
        """修改"""

    def delete(self, nid):
        """删除"""


@singleton.singleton
class UserCollection:
    """用户操作类"""

    def __init__(self):
        pass

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

    def followlist(self, user_obj):
        """我的粉丝"""
        userinfo_obj = UserProfile.objects.filter(user=user_obj).first()
        ret = userinfo_obj.follow_list.all()
        return {"followlen": len(ret), "con": ret}

    def followlistid(self, user_obj):
        """我的粉丝ID"""
        userinfo_obj = UserProfile.objects.filter(user=user_obj).first()
        ret = list(userinfo_obj.follow_list.values('user_id'))
        list_id = [item['user_id'] for item in ret]
        return list_id

    def focuslist(self, user_obj):
        """我的关注"""
        userinfo_obj = UserProfile.objects.filter(user=user_obj).first()
        ret = userinfo_obj.my_followers.all()
        return {"focuslen": len(ret), "con": ret}

    def wblist(self, user_obj):
        """我的微博"""
        userinfo_obj = UserProfile.objects.filter(user=user_obj).first()
        ret = userinfo_obj.weibo_set.all()
        return {"wblen": len(ret), "con": ret}

    def focuswblist(self, user_obj):
        """我的关注"""
        userinfo_obj = UserProfile.objects.filter(user=user_obj).first()
        ret = userinfo_obj.my_followers.all()
        return {"focuslen": len(ret), "con": ret}

    def userweibo(self, user_obj, page):
        """用户登录显示关注用户微博"""
        userinfo_obj = UserProfile.objects.filter(user=user_obj).first()
        fav_list = userinfo_obj.my_followers.all()
        obj_list = Weibo.objects.filter(user__in=list(fav_list)).order_by('date')[
                   (int(page) * 10 if int(page) != 1 else 0):int(page) * 20]

        # 赞个数
        favor_conut_list = Comment.objects.filter(to_weibo__in=list(obj_list), comment_type=1)\
            .values('to_weibo').annotate(fav_conut=Count('id'))
        # 评论个数
        comments_conut_list = Comment.objects.filter(to_weibo__in=list(obj_list), comment_type=0) \
            .values('to_weibo').annotate(com_conut=Count('id'))
        # 转发个数
        forwarding_conut_list = Weibo.objects.filter(forward_or_collect_from__in=list(obj_list), wb_type=1) \
            .values('forward_or_collect_from').annotate(for_conut=Count('id'))

        return obj_list, favor_conut_list, comments_conut_list, forwarding_conut_list






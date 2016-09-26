#!/usr/bin/env python
#-*- coding:utf-8 -*-
__author__ = 'Nick Suo'

from django.contrib.auth.backends import ModelBackend
from WeiboContent.models import UserProfile
from django.core.cache import cache


class pushfollowers:
    def __init__(self, user_id):
        self.user_id = user_id
        self.user_obj = self.__is_userobj()
        self.followers_list = self.__is_followers()

    def __is_userobj(self):
        return ModelBackend().get_user(user_id=self.user_id)

    def __is_followers(self):
        followers_list = UserProfile.objects.get(user=self.user_obj).my_followers.all()
        print(followers_list)
        return followers_list

    def redisonline(self):
        cache.get(request.session.get('_auth_user_hash'))




#!/usr/bin/env python
# -*- coding:utf-8 -*-
__author__ = 'Nick Suo'

from django.contrib.auth.backends import ModelBackend
from WeiboContent import models_server


class sessionrespone:
    def __init__(self, user_id, is_login=True):
        self.user_id = user_id
        self.is_login = is_login
        self.userobj = ModelBackend().get_user(user_id=self.user_id)
        self.followlist = models_server.UserCollection().followlistid(user_obj=self.userobj)

    def dic(self):
        d = {
            'is_login': self.is_login,
            'user_id': self.user_id,
            'followlist': self.followlist,
        }
        return d


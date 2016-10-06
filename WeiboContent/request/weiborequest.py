#!/usr/bin/env python
# -*- coding:utf-8 -*-
__author__ = 'Nick Suo'

import datetime
import config
import os
import json
from Common import time_conversion
from WeiboContent.models import UserProfile

class newweibocontentrequest:
    """增加微博"""

    def __init__(self, wb_type, user, perm, text=None, date=None,
                 pictures=None, video=None, forward=None):
        self.wb_type = wb_type
        self.user = user
        self.user_id = UserProfile.objects.get(user=self.user)
        self.text = text
        self.perm = perm
        self.date = date if date else datetime.datetime.now()
        self.pictures_link_id = pictures,
        self.video_link_id = video,
        self.forward_or_collect_from = forward


    def __new_path(self, username, img_path):
        new_path = os.path.join(config.PATH, 'static', 'user', username, "weibo_img", img_path)
        if os.path.isdir(new_path):
            imglist = []
            for item in os.listdir(new_path):
                imglist.append(os.path.join(new_path, item).split('user')[-1])
            return json.dumps(imglist)
        else:
            return json.dumps([])

    def dic(self):
        d = {
            'wb_type': self.wb_type,
            'user_id': str(self.user.id),
            'text': self.text,
            # 'weibo_id':self.
            'perm': self.perm,
            'date': time_conversion.timeconversion(self.date).timeret,
            'pictures_link_id': self.__new_path(str(self.user), self.pictures_link_id[0]) if self.pictures_link_id[0] else '',
            'video_link_id': self.__new_path(str(self.user), self.video_link_id[0]) if self.video_link_id[0] else '',
            'forward_or_collect_from': self.forward_or_collect_from,
        }
        return d

    def dicadd(self):
        print(type(self.pictures_link_id))
        print(self.pictures_link_id)
        print(type(self.video_link_id))
        print(self.video_link_id)
        if self.video_link_id:
            print("zfdsdfsdfsdfs")
        d = {
            'wb_type': self.wb_type,
            'user_id': str(self.user_id.id),
            'text': self.text,
            'perm': self.perm,
            'date': str(self.date),
            'pictures_link_id': self.pictures_link_id[0] if self.pictures_link_id else '',
            'video_link_id': self.video_link_id[0] if self.video_link_id else '',
            'forward_or_collect_from': self.forward_or_collect_from,
        }
        return d




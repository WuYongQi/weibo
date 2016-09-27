#!/usr/bin/env python
# -*- coding:utf-8 -*-
__author__ = 'Nick Suo'

import datetime
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
        self.pictures_link_id = pictures
        self.video_link_id = video
        self.forward_or_collect_from = forward

    def dic(self):
        d = {
            'wb_type': self.wb_type,
            'user_id': str(self.user.id),
            'text': self.text,
            'perm': self.perm,
            'date': time_conversion.timeconversion(self.date).timeret,
            'pictures_link_id': self.pictures_link_id,
            'video_link_id': self.video_link_id,
            'forward_or_collect_from': self.forward_or_collect_from,
        }
        return d

    def dicadd(self):
        d = {
            'wb_type': self.wb_type,
            'user_id': str(self.user_id.id),
            'text': self.text,
            'perm': self.perm,
            'date': time_conversion.timeconversion(self.date).timeret,
            'pictures_link_id': self.pictures_link_id,
            'video_link_id': self.video_link_id,
            'forward_or_collect_from': self.forward_or_collect_from,
        }
        return d




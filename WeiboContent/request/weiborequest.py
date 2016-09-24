#!/usr/bin/env python
#-*- coding:utf-8 -*-
__author__ = 'Nick Suo'

import datetime

class weibocontentrequest:
    """增加微博"""

    def __init__(self, wb_type, user, text, perm, date=None,
                 pictures_link_id=None, video_link_id=None, forward_or_collect_from=None):
        self.wb_type = wb_type
        self.user = user
        self.text = text
        self.perm = perm
        self.date = date if date else datetime.datetime.now()
        self.pictures_link_id = pictures_link_id
        self.video_link_id = video_link_id
        self.forward_or_collect_from = forward_or_collect_from





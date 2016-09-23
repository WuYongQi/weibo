#!/usr/bin/env python
# -*- coding:utf-8 -*-
__author__ = 'Nick Suo'

import datetime


class timeconversion:
    """
    装换时间
    self.timeret 为结果
    """

    def __init__(self, time_obj):
        self.time_obj = time_obj
        self.time_now = datetime.datetime.now()
        self.time_onehours = self.time_now + datetime.timedelta(hours=-1)
        self.time_onedays = self.time_now + datetime.timedelta(days=-1)
        self.timeret = self.time_dudge()

    def time_dudge(self):
        if self.time_onehours < self.time_obj:
            return self.time_before()
        elif self.time_onedays < self.time_obj:
            return self.time_today()
        else:
            return self.time_normal()

    def time_before(self):
        beforetime = "%s分钟前" % str(self.time_now - self.time_obj).split(':')[0]
        return beforetime

    def time_today(self):
        Y, T = str(self.time_obj).split('.')[0].split(' ')
        hour, minute, second = T.split(':')
        timetoday = "今天 %s:%s" % (hour, minute)
        return timetoday

    def time_normal(self):
        Y, T = str(self.time_obj).split('.')[0].split(' ')
        year, mouth, day = Y.split('-')
        hour, minute, second = T.split(':')
        normaltime = "%s月%s日 %s:%s" % (mouth, day, hour, minute)
        return normaltime



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
        self.time_onehours = self.time_now.timetuple()[3]
        self.time_mountdays = self.time_now.timetuple()[1]
        self.time_tadaydays = self.time_now.timetuple()[2]
        self.time_yeardays = self.time_now.timetuple()[0]
        self.timeret = self.time_dudge()


    def time_dudge(self):
        if (self.time_yeardays == self.time_obj.timetuple()[0]) and (
                    self.time_mountdays == self.time_obj.timetuple()[1]) and (
                    self.time_tadaydays == self.time_obj.timetuple()[2]) and (
                    self.time_onehours == self.time_obj.timetuple()[3]):
            return self.time_before()
        elif (self.time_yeardays == self.time_obj.timetuple()[0]) and (
                    self.time_mountdays == self.time_obj.timetuple()[1]) and (
                    self.time_tadaydays == self.time_obj.timetuple()[2]):
            return self.time_today()
        else:
            return self.time_normal()

    def time_before(self):
        beforetime = "%s分钟前" % (61 - int(self.time_obj.timetuple()[3]))
        return beforetime

    def time_today(self):
        hour, minute = self.time_obj.timetuple()[3], self.time_obj.timetuple()[4]
        timetoday = "今天 %s:%s" % (hour, minute)
        return timetoday

    def time_normal(self):
        mouth, day, hour, minute = self.time_obj.timetuple()[1], self.time_obj.timetuple()[2],\
                                   self.time_obj.timetuple()[1], self.time_obj.timetuple()[2]
        normaltime = "%s月%s日 %s:%s" % (mouth, day, hour, minute)
        return normaltime



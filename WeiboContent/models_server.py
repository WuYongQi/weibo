#!/usr/bin/env python
# -*- coding:utf-8 -*-
__author__ = 'Nick Suo'

from Common import time_conversion
from WeiboContent import models as wbcmodels


class WeiboContent:
    def __init__(self):
        pass

    def __wbtype(self, obj):
        """转换微博类型"""
        for item in obj:
            wb_type = item.wb_type
            if wb_type == 0:
                item.wb_type = "原创"
            elif wb_type == 1:
                item.wb_type = "转发"
            elif wb_type == 2:
                item.wb_type = "收藏"
        return obj

    # def __time_con(self, obj):
    #     """转换时间"""
    #     for item in obj:
    #         ret = time_conversion.timeconversion(item.date)
    #         item.date = ret.timeret
    #     return obj

    def all(self, page):
        """查询所有微博"""
        obj_list = wbcmodels.Weibo.objects.all().order_by('-date')[
                   (int(page) * 10 if int(page) != 1 else 0):int(page) * 20]
        obj_wbtype = self.__wbtype(obj_list)
        # obj_time = self.__time_con(obj_wbtype)
        return obj_wbtype


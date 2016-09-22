#!/usr/bin/env python
# -*- coding:utf-8 -*-
__author__ = 'Nick Suo'

from Common import time_conversion
from django.db.models import Count, Min, Max, Sum
from WeiboContent import models as wbcmodels
from WeiboContent.models import Comment
from WeiboContent.models import Weibo


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


    def all(self, page):
        """查询所有微博"""
        obj_list = Weibo.objects.all().order_by('-date')[
                   (int(page) * 10 if int(page) != 1 else 0):int(page) * 20]
        obj_wbtype = self.__wbtype(obj_list)
        return obj_wbtype


    def Conut(self, obj_list):
        couut_list = []
        for item in obj_list:
            obj = item.comment_set.all().filter(comment_type=1) \
                .values('to_weibo').annotate(c=Count('comment_type'))
            print(obj)
            couut_list.append(obj[0])
        print(couut_list)
        return couut_list




#!/usr/bin/env python
# -*- coding:utf-8 -*-
__author__ = 'Nick Suo'

from Common import time_conversion


class weibocontent:
    """所有微博"""

    def __init__(self, content_list, favor_list, status=True, message=''):
        self.content_list = content_list
        self.favor_list = favor_list
        self.list_by_dic = []
        self.__list_by_dic()
        self.con_dic = {
            "status": status,
            "message": message,
            "content": self.list_by_dic
        }

    def __list_by_dic(self):
        for item in self.content_list:
            dic = self.__dic_of(item)
            self.list_by_dic.append(dic)
        return self.list_by_dic

    def __dic_of(self, item):
        d = {
            "wb_type": item.wb_type,
            "user": item.user.name,
            "text": item.text,
            "perm": item.perm,
            "date": time_conversion.timeconversion(item.date).timeret,
            "pictures": item.pictures_link_id,
            "video": item.video_link_id,
            "forward": item.forward_or_collect_from,
            "to_weibo": item.id,
        }
        for item in self.favor_list:
            if item['to_weibo'] == d['to_weibo']:
                d.update(item)
        return d

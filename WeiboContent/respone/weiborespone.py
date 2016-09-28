#!/usr/bin/env python
# -*- coding:utf-8 -*-
__author__ = 'Nick Suo'

from Common import time_conversion
import os,config,json


class weibocontentrespone:
    """所有微博"""

    def __init__(self, content_list, favor_list, comments_list, forwarding_conut, status=True, message=''):
        self.content_list = content_list
        self.favor_list = favor_list
        self.comments_list = comments_list
        self.forwarding_conut = forwarding_conut
        self.list_by_dic = []
        self.__list_by_dic()
        self.con_dic = {
            "status": status,
            "message": message,
            "content": self.list_by_dic
        }

    def __img_new_path(self, username, img_path):
        new_path = os.path.join(config.PATH, 'static', 'user', username, "weibo_img", img_path)
        if os.path.isdir(new_path):
            imglist = []
            for item in os.listdir(new_path):
                imglist.append(os.path.join(new_path, item).split('user')[-1])
            return json.dumps(imglist)
        else:
            return json.dumps([])

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
            "head_img": str(item.user.head_img),
            "perm": item.perm,
            "date": time_conversion.timeconversion(item.date).timeret,
            # "pictures": item.pictures_link_id,  # []
            "pictures": self.__img_new_path(str(item.user.user.username), item.pictures_link_id),
            "video": item.video_link_id,
            "forward": str(item.forward_or_collect_from.id) if item.forward_or_collect_from else 0,    # url
            "to_weibo": item.id,
            "fav_count": 0,
            "com_count": 0,
            "for_count": 0,
        }
        # 赞个数
        for item in self.favor_list:
            if item:
                if item['to_weibo'] == d['to_weibo']:
                    d['fav_conut'] = item['fav_conut']
        # 评论个数
        for item in self.comments_list:
            if item:
                if item['to_weibo'] == d['to_weibo']:
                    d['com_conut'] = item['com_conut']
        # 转发个数
        for item in self.forwarding_conut:
            if item:
                if item['forward_or_collect_from'] == d['to_weibo']:
                    d['for_conut'] = item['for_conut']
        return d


class newweibocontentrespone:
    def __init__(self, connect_dic, status=True, message='', user_obj=None):
        self.status = status
        self.message = message
        self.connect = connect_dic
        from WeiboContent import models
        self.user = str(models.UserProfile.objects.filter(user=user_obj).first().name)
        connect_dic['user'] = self.user
        print(connect_dic)

    def dic(self):
        d = {
            'status': self.status,
            'message': self.message,
            'connect': self.connect,
        }
        return d


class PVFile:
    def __init__(self, filepath, status=True, message=''):
        self.filepath = filepath
        self.status = status
        self.message = message

    def dic(self):
        d = {
            'filepath': self.filepath,
            'status': self.status,
            'message': self.message,
        }
        return d




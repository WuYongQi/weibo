#!/usr/bin/env python
#-*- coding:utf-8 -*-
__author__ = 'Nick Suo'

from Common.time_conversion import timeconversion

class loginespone:
    """登录"""
    def __init__(self, status=True, message=''):
        self.status = status
        self.message = message

    def dic(self):
        d = {
            "status": self.status,
            "message": self.message
        }
        return d


class userinfomess:
    """用户信息"""
    def __init__(self, count, status=True, message=''):
        self.count = count
        self.status = status
        self.message = message


    def dic(self):
        d = {
            'count': {
                'user': self.count.user.username,
                'user_id': self.count.user_id,
                'name': self.count.name,
                'brief': self.count.brief,
                'sex': self.count.sex,
                'age': self.count.age,
                'email': self.count.email,
                'tags': self.count.tags.name,
                'head_img': str(self.count.head_img),
                'follow_list': self.__follow_dic(self.count.follow_list.all()),
                'follow_list_len': len(self.count.follow_list.all()),
                'my_followers': self.__follow_dic(self.count.my_followers.all()),
                'my_followers_len': len(self.count.my_followers.all()),
                'weibo': self.__weibo_count(self.count.weibo_set.all()),
                'weibo_len': len(self.count.weibo_set.all()),
            },
            "status": self.status,
            "message": self.message
        }
        return d


    def __follow_dic(self, follow_list):
        li = []
        for i in follow_list:
            d = {
                'id': i.user.id,
                'user': i.user.username,
                'name': i.name,
                'brief': i.brief,
                'sex': i.sex,
                'age': i.age,
                'email': i.email,
                'tags': i.tags.name if i.tags else None,
                'head_img': str(i.head_img),
            }
            li.append(d)
        return li

    def __weibo_count(self, weiboset):
        li = []
        for i in weiboset:
            d = {
                'wb_type': str(i.wb_type),
                'forward_or_collect_from': str(i.forward_or_collect_from.id) if i.forward_or_collect_from else None,
                'user': i.user.name,
                'text': i.text,
                'pictures_link_id': i.pictures_link_id,
                'video_link_id': i.video_link_id,
                'perm': i.perm,
                'date': timeconversion(i.date).timeret,
            }
            li.append(d)
        return li



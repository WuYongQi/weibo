#!/usr/bin/env python
#-*- coding:utf-8 -*-
__author__ = 'Nick Suo'


class loginespone:
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
    def __init__(self, count, status=True, message=''):
        self.count = count
        self.status = status
        self.message = message


    def dic(self):
        d = {
            'count': {
                'user': self.count.user.username,
                'name': self.count.name,
                'brief': self.count.brief,
                'sex': self.count.sex,
                'age': self.count.age,
                'email': self.count.email,
                'tags': self.count.tags.name,
                'head_img': str(self.count.head_img),
                # 'follow_list': self.count.follow_list,    # many_to_many
                'follow_list_len': len(self.count.follow_list.all()),
                # 'my_followers': self.count.my_followers,  # many_to_many
                'my_followers_len': len(self.count.my_followers.all()),
                # 'weibo': self.count.weibo_set.all(),      # QuerySet[]
                'weibo_len': len(self.count.my_followers.all()),
            },
            "status": self.status,
            "message": self.message
        }
        return d



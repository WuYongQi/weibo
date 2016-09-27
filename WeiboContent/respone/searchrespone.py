#!/usr/bin/env python
#-*- coding:utf-8 -*-
__author__ = 'Nick Suo'


class searchrespone:
    def __init__(self, count, status=True, message=''):
        self.count = self.__to_dic(count)  # []
        self.status = status
        self.message = message

    def __to_dic(self, countlist):
        d = []
        for i in countlist:
            dicone = {
                'user': str(i.user),
                'name': str(i.name),
                'brief': str(i.brief),
                'sex': str(i.sex),
                'age': str(i.age),
                'email': str(i.email),
                'tags': str(i.tags),
                'head_img': str(i.head_img),
            }
            d.append(dicone)
        return d

    def dic(self):
        d = {
            'status': self.status,
            'message': self.message,
            'count': self.count,
        }
        return d

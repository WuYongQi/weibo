#!/usr/bin/env python
#-*- coding:utf-8 -*-
__author__ = 'Nick Suo'


import json


class pushmessrespone:

    def __init__(self, count, num=0, status=True, message=''):
        self.count = count
        self.num = num
        self.status = status
        self.message = message

    def dic(self):
        d = {
            'count': json.dumps(self.count),
            'num': self.num,
            'status': self.status,
            'message': self.message,
        }
        return d





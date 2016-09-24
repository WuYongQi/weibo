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



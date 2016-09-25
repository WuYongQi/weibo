#!/usr/bin/env python
#-*- coding:utf-8 -*-
__author__ = 'Nick Suo'


def singleton(argv):
    """单例模式"""
    dic = {}

    def inner(*args, **kwargs):

        if argv not in dic:
            dic[argv] = argv(*args, **kwargs)
            return dic[argv]
        else:
            return dic[argv]

    return inner


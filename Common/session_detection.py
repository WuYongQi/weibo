#!/usr/bin/env python
# -*- coding:utf-8 -*-
__author__ = 'Nick Suo'

from django.core.cache import cache


def session_detection(func):
    """检测用户session装饰器"""

    def inner(request, *args, **kwargs):
        if cache.get('xja9sqa9sniul8'):
            ret = func(request, *args, **kwargs)
            return ret
        else:
            return False

    return inner






#!/usr/bin/env python
# -*- coding:utf-8 -*-
__author__ = 'Nick Suo'

import os
import time
from hashlib import sha1
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


class IDSession:
    """os.urandom(16)：随机产生16个字节的字符串"""
    create_session_id = lambda: sha1(bytes('%s%s' % (os.urandom(16), time.time()), encoding='utf-8')).hexdigest()




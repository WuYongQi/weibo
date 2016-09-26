#!/usr/bin/env python
#-*- coding:utf-8 -*-
__author__ = 'Nick Suo'

import os
import time
from hashlib import sha1


def encryption(name=None):
    """os.urandom(16)：随机产生16个字节的字符串"""
    name = name or os.urandom(16)
    create_sha1str = sha1(bytes('%s%s%s' % (name, os.urandom(16), time.time()), encoding='utf-8')).hexdigest()
    return create_sha1str



"""
How to use:
ret = encryption('suoning')
print(ret)
"""

#!/usr/bin/env python
#-*- coding:utf-8 -*-
__author__ = 'Nick Suo'

import os
import sys

# 数据库配置
DBSetting = {
    'NAME': 'weibodb',
    'USER': 'root',
    # 'PASSWORD': 'python_q1',
    'PASSWORD': 'suoning',
    # 'HOST': '144.48.127.122',
    'HOST': '',
    'PORT': '',
}

# rabbitMQ 配置
rabbitMQ = {
    # 'host': '144.48.127.122',
    'host': '192.168.1.5',
    'no_ack': False,            # 是否启用 acknowledgment 消息不丢失， False/True, False 为启用状态
    'New_weibo': 'newweibo',    # 添加微博队列名字
}

# session 配置
session = {
    'status': True,         # 是否启用session,必须启用!!!
    'encryption': True,     # 是否加密session
    'host': '144.48.127.122',
    # 'host': '192.168.11.51',
    'port': '6379',
    'DB': 0,
    # 'passwd': '',
    'passwd': 'wuyongqi123',
    'name': 'xja9sqa9sniul8',
    'time_out': 60*3,      # 单位秒
}

# 消费者线程
# 修改表时关闭
newmess_status = True

# 当前路径,务改
PATH = os.path.join(os.path.dirname(__file__))



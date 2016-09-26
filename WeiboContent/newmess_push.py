#!/usr/bin/env python
# -*- coding:utf-8 -*-
__author__ = 'Nick Suo'

import json
import pika
import threading
from django.core.cache import cache
from Common.messMQ import BaseMQ
from config import rabbitMQ as rabbitMQconfig
from config import newmess_status
from WeiboContent import models_server


class pushconsumers(BaseMQ.BaseMQ):
    """推送消费者"""

    def __init__(self, exchange):
        super(pushconsumers, self).__init__()
        self.exchange = exchange
        self.connection = pika.BlockingConnection(self.hostconPar)
        self.channel = self.connection.channel()
        self.channel.exchange_declare(exchange=self.exchange, type='fanout')
        self.result = self.channel.queue_declare(exclusive=True)
        self.queue_name = self.result.method.queue
        self.channel.queue_bind(exchange=self.exchange, queue=self.queue_name)
        self.channel.basic_consume(self.callback,
                                   queue=self.queue_name,
                                   no_ack=True)
        self.channel.start_consuming()

    def callback(self, ch, method, properties, body):
        print(" [x] %r" % body)
        cache.set(self.exchange, body, timeout=30)



class MyThread(threading.Thread):
    def __init__(self, exchange):
        threading.Thread.__init__(self)
        self.exchange = exchange

    def run(self):  # 定义每个线程要运行的函数
        ret = pushconsumers(exchange=self.exchange)

def start(exchange):
    MyThread(exchange=exchange).start()



# connection = pika.BlockingConnection(pika.ConnectionParameters(
#     host='localhost'))
# channel = connection.channel()
#
# channel.exchange_declare(exchange='logs',
#                          type='fanout')
#
# result = channel.queue_declare(exclusive=True)
# queue_name = result.method.queue
#
# channel.queue_bind(exchange='logs',
#                    queue=queue_name)
#
#
# def callback(ch, method, properties, body):
#     print(" [x] %r" % body)
#
#
# channel.basic_consume(callback,
#                       queue=queue_name,
#                       no_ack=True)
# channel.start_consuming()

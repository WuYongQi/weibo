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
import config


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
        beforecache = cache.get(self.exchange, None)
        print("beforecache:", beforecache)
        if beforecache:
            num = beforecache[0]
            beforecache[0] = int(num) + 1
            beforecache.append(body)
            print("beforecache222:", beforecache)
            cache.set(self.exchange, beforecache, timeout=config.cache['redis_timeout'])
        else:
            cache.set(self.exchange, [1, body, ], timeout=config.cache['redis_timeout'])


class MyThread(threading.Thread):
    def __init__(self, exchange):
        threading.Thread.__init__(self)
        self.exchange = exchange

    def run(self):  # 定义每个线程要运行的函数
        print("run...", self.exchange)
        ret = pushconsumers(exchange=self.exchange)


def start(exchange):
    tobj = MyThread(exchange=exchange)
    tobj.start()
    # connection = pika.BlockingConnection(pika.ConnectionParameters(
    #     host=rabbitMQconfig['host']))
    # channel = connection.channel()
    #
    # channel.exchange_declare(exchange=exchange,
    #                          type='fanout')
    #
    # result = channel.queue_declare(exclusive=True)
    # queue_name = result.method.queue
    #
    # channel.queue_bind(exchange=exchange,
    #                    queue=queue_name)
    #
    # print(' [*] Waiting for logs. To exit press CTRL+C')
    #
    # def callback(ch, method, properties, body):
    #     print(" [x] %r" % body)
    #     print("boddddyy", exchange)
    #
    #     cache.set(exchange, body, timeout=60 * 5)
    #
    # channel.basic_consume(callback,
    #                       queue=queue_name,
    #                       no_ack=True)
    #
    # channel.start_consuming()



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

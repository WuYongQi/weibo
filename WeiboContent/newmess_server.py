#!/usr/bin/env python
# -*- coding:utf-8 -*-
__author__ = 'Nick Suo'

# 消费者
import json
import pika
import threading
from Common.messMQ import BaseMQ
from config import rabbitMQ as rabbitMQconfig
from WeiboContent import models_server


# connection = pika.BlockingConnection(pika.ConnectionParameters(
#     host=rabbitMQconfig['host']))
# channel = connection.channel()
#
# channel.queue_declare(queue='hello')
#
#
# def callback(ch, method, properties, body):
#     print(" [x] Received %r" % body)
#
#
# channel.basic_consume(callback,
#                       queue='hello',
#                       no_ack=rabbitMQconfig['no_ack'])
#
# print(' [*] Waiting for messages. To exit press CTRL+C')
# channel.start_consuming()


class consumers(BaseMQ.BaseMQ):
    """消费者"""

    def __init__(self, queue):
        super(consumers, self).__init__()
        self.connection = pika.BlockingConnection(self.hostconPar)
        self.channel = self.connection.channel()
        self.queuedeclare(queue=queue)
        self.basicconsume(queue=queue)
        self.startconn()

    def queuedeclare(self, queue):
        """创建队列"""
        self.channel.queue_declare(queue=queue)

    def basicconsume(self, queue):
        """取出数据"""
        self.channel.basic_consume(self.callback,
                                   queue=queue,
                                   no_ack=rabbitMQconfig['no_ack'])

    def startconn(self):
        """夯住"""
        self.channel.start_consuming()

    def callback(self, ch, method, properties, body):
        """回调函数"""
        # print("callback:", method.redelivered)    # True
        # print("callback:", method.delivery_tag)    # 1
        strbody = str(body, encoding='utf8')
        dicbody = json.loads(strbody)
        print("THis is huidiao callback!!!!!!!!!!!")
        print("callback:", type(dicbody), dicbody)
        # 写入数据库
        weibocountentobj = models_server.WeiboContent()
        ret = weibocountentobj.add(dicbody)
        print("callback_ret:", ret)


"""
How to ues:
consumers(queue=config.rabbitMQ['New_weibo'])
"""


# 线程
class MyThread(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)

    def run(self):  # 定义每个线程要运行的函数
        consumers(queue=rabbitMQconfig['New_weibo'])

MyThread().start()


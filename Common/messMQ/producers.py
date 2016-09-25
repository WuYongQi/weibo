#!/usr/bin/env python
# -*- coding:utf-8 -*-
__author__ = 'Nick Suo'

# 生产者
import pika
from Common.messMQ import BaseMQ
from config import rabbitMQ as rabbitMQconfig


# connection = pika.BlockingConnection(pika.ConnectionParameters(
#     host=rabbitMQconfig['host']))
# channel = connection.channel()
#
# channel.queue_declare(queue='hello')
#
# channel.basic_publish(exchange='',
#                       routing_key='hello',
#                       body='Hello World!')
# print(" [x] Sent 'Hello World!'")
# connection.close()


class producers(BaseMQ.BaseMQ):
    """生产者"""

    def __init__(self):
        super(producers, self).__init__()
        self.connection = pika.BlockingConnection(self.hostconPar)
        self.channel = self.connection.channel()

    def queuedeclare(self, queue):
        """创建队列"""
        self.channel.queue_declare(queue=queue)

    def basicpublish(self, routing_key, body, exchange=''):
        """放入数据"""
        ret = self.channel.basic_publish(exchange=exchange,
                                         routing_key=routing_key,
                                         body=body)
        return ret

    def createadd(self, queue, body, exchange=''):
        """创建并放入数据"""
        self.queuedeclare(queue=queue)
        ret = self.basicpublish(routing_key=queue, body=body, exchange=exchange)
        return ret

    def closeconn(self):
        """关闭连接"""
        self.connection.close()


"""
How to ues:
obj = producers()
import json
ret = obj.createadd(config.rabbitMQ['New_weibo'], json.dumps({'name': 'test', 'age': 'test'}))
if ret:
    obj.closeconn()
"""


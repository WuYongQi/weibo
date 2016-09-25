#!/usr/bin/env python
#-*- coding:utf-8 -*-
__author__ = 'Nick Suo'

# 生产者
import pika
from config import rabbitMQ as rabbitMQconfig

connection = pika.BlockingConnection(pika.ConnectionParameters(
    host=rabbitMQconfig['host']))
channel = connection.channel()

channel.queue_declare(queue='hello')

channel.basic_publish(exchange='',
                      routing_key='hello',
                      body='Hello World!')
print(" [x] Sent 'Hello World!'")
connection.close()


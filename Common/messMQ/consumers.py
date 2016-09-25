#!/usr/bin/env python
#-*- coding:utf-8 -*-
__author__ = 'Nick Suo'

# 消费者
import pika
from config import rabbitMQ as rabbitMQconfig


connection = pika.BlockingConnection(pika.ConnectionParameters(
    host=rabbitMQconfig['host']))
channel = connection.channel()

channel.queue_declare(queue='hello')


def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)


channel.basic_consume(callback,
                      queue='hello',
                      no_ack=True)

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()




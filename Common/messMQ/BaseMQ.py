#!/usr/bin/env python
# -*- coding:utf-8 -*-
__author__ = 'Nick Suo'

import pika
from config import rabbitMQ as rabbitMQconfig


class BaseMQ:
    def __init__(self):
        self.hostconPar = pika.ConnectionParameters(host=rabbitMQconfig['host'])


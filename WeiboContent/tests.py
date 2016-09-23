from django.test import TestCase
import json
# Create your tests here.

import redis

r = redis.Redis(host='192.168.11.61', port=6379, password='wuyongqi123')
r.set('foo', 'Bar')
print(r.get('foo'))





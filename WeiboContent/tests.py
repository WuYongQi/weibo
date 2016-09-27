from django.test import TestCase
import json
# Create your tests here.

# import redis
#
# r = redis.Redis(host='192.168.11.61', port=6379, password='wuyongqi123')
# r.set('foo', 'Bar')
# print(r.get('foo'))

# import os
# from WeiboContent.models import UserProfile
#
# UserProfile.objects.create(user_id=3, name='oo',
#                            sex=1, email='1111111@qq.com',
#                            head_img=os.path.join(''))


# #!/usr/bin/env python
# import pika
# import sys
#
# connection = pika.BlockingConnection(pika.ConnectionParameters(
#         host='192.168.1.5'))
# channel = connection.channel()
#
# channel.exchange_declare(exchange='logs',
#                          type='fanout')
#
# message = ' '.join(sys.argv[1:]) or "info: Hello World!"
# channel.basic_publish(exchange='logs',
#                       routing_key='',
#                       body=message)
# print(" [x] Sent %r" % message)
# connection.close()

#!/usr/bin/env python
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters(
        host='192.168.1.5'))
channel = connection.channel()

channel.exchange_declare(exchange='logs',
                         type='fanout')

result = channel.queue_declare(exclusive=True)
queue_name = result.method.queue

channel.queue_bind(exchange='logs',
                   queue=queue_name)

print(' [*] Waiting for logs. To exit press CTRL+C')

def callback(ch, method, properties, body):
    print("xx")
    print(" [x] %r" % body)

channel.basic_consume(callback,
                      queue=queue_name,
                      no_ack=True)

channel.start_consuming()

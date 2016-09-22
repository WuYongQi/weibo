# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-22 01:37
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('WeiboContent', '0002_auto_20160921_2340'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='weibo',
            options={'verbose_name': '所有微博内容', 'verbose_name_plural': '所有微博内容'},
        ),
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(max_length=32, verbose_name='分类名'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='comment_type',
            field=models.IntegerField(choices=[(0, '评论'), (1, '点赞')], default=0, verbose_name='类型'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='date',
            field=models.DateTimeField(auto_created=True, verbose_name='时间'),
        ),
        migrations.AlterField(
            model_name='topic',
            name='date',
            field=models.DateTimeField(auto_now=True, verbose_name='时间'),
        ),
        migrations.AlterField(
            model_name='topic',
            name='name',
            field=models.CharField(max_length=140, verbose_name='话题名字'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='name',
            field=models.CharField(max_length=64, verbose_name='用户名称'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='登录账号'),
        ),
        migrations.AlterField(
            model_name='weibo',
            name='date',
            field=models.DateTimeField(auto_now_add=True, verbose_name='创建时间'),
        ),
        migrations.AlterField(
            model_name='weibo',
            name='forward_or_collect_from',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='forward_or_collects', to='WeiboContent.Weibo', verbose_name='关联微博'),
        ),
        migrations.AlterField(
            model_name='weibo',
            name='perm',
            field=models.IntegerField(choices=[(0, '公开'), (1, '自己可见'), (2, '朋友可见')], default=0, verbose_name='可见度'),
        ),
        migrations.AlterField(
            model_name='weibo',
            name='pictures_link_id',
            field=models.CharField(blank=True, max_length=128, null=True, verbose_name='照片路径'),
        ),
        migrations.AlterField(
            model_name='weibo',
            name='text',
            field=models.CharField(max_length=140, verbose_name='微博内容'),
        ),
        migrations.AlterField(
            model_name='weibo',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='WeiboContent.UserProfile', verbose_name='用户'),
        ),
        migrations.AlterField(
            model_name='weibo',
            name='video_link_id',
            field=models.CharField(blank=True, max_length=128, null=True, verbose_name='视频路径'),
        ),
        migrations.AlterField(
            model_name='weibo',
            name='wb_type',
            field=models.IntegerField(choices=[(0, '原创'), (1, '转发'), (2, '收藏')], default=0, verbose_name='微博类型'),
        ),
    ]

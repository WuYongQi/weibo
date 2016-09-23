#!/usr/bin/env python
# -*- coding:utf-8 -*-
__author__ = 'Nick Suo'

from Common import time_conversion
from django.db.models import Count, Min, Max, Sum
from WeiboContent.models import Comment
from WeiboContent.models import Weibo
from WeiboContent.models import UserProfile


class WeiboContent:
    def __init__(self):
        pass

    # def __wbtype(self, obj):
    #     """转换微博类型字符串"""
    #     for item in obj:
    #         wb_type = item.wb_type
    #         if wb_type == 0:
    #             item.wb_type = "原创"
    #         elif wb_type == 1:
    #             item.wb_type = "转发"
    #         elif wb_type == 2:
    #             item.wb_type = "收藏"
    #     return obj

    def all(self, page):
        """查询所有微博"""
        obj_list = Weibo.objects.all().order_by('-date')[
                   (int(page) * 10 if int(page) != 1 else 0):int(page) * 20]

        # 赞个数
        favor_conut = map(lambda x: x.comment_set.all().filter(comment_type=1)
                          .values('to_weibo').annotate(fav_conut=Count('comment_type')), obj_list)
        favor_conut_list = [{'fav_conut': li[0]['fav_conut'], 'to_weibo': li[0]['to_weibo']}
                            if li else None
                            for li in favor_conut]
        # 评论个数
        comments_conut = map(lambda x: x.comment_set.all().filter(comment_type=0)
                             .values('to_weibo').annotate(com_conut=Count('comment_type')), obj_list)
        comments_conut_list = [{'com_conut': li[0]['com_conut'], 'to_weibo': li[0]['to_weibo']}
                               if li else None
                               for li in comments_conut]
        # 转发个数
        forwarding_conut = map(lambda x: Weibo.objects.filter(forward_or_collect_from=x.id)
                               .values('forward_or_collect_from').annotate(for_conut=Count('id')), obj_list)
        forwarding_conut_list = [{'for_conut': li[0]['for_conut'], 'to_weibo': li[0]['forward_or_collect_from']}
                                 if li else None
                                 for li in forwarding_conut]

        return obj_list, favor_conut_list, comments_conut_list, forwarding_conut_list

    def add(self):
        """增加微博"""

    def put(self, nid):
        """修改"""

    def delete(self, nid):
        """删除"""


class User:
    def __init__(self):
        pass

    def getuser(self):
        obj_list = UserProfile.objects.all()



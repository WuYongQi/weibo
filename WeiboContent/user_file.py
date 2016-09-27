#!/usr/bin/env python
# -*- coding:utf-8 -*-
__author__ = 'Nick Suo'

import os
import shutil
import config


class userfile:
    def __init__(self, user_obj):
        self.user_obj = user_obj
        self.filepath = os.path.join(config.PATH, 'static', 'user', str(self.user_obj.username), 'temp')

    def __move_file(self, temp_path, weiboid_path):
        new_path = os.path.join(config.PATH, 'static', 'user', str(self.user_obj.username), 'weibo_img', weiboid_path)
        new_temp_path = os.path.join(config.PATH, 'static', 'user', str(self.user_obj.username), 'temp')
        os.rename(new_temp_path, new_path)
        return new_path

    def file_list(self, temp_path, weiboid_path):
        new_path = self.__move_file(temp_path, weiboid_path)
        file_list = os.listdir(new_path)

        new_file_list = map(lambda x: file_list.remove(str(x)) \
            if str(x).startswith('.') \
            else os.path.join(new_path, str(x)), file_list)

        return new_file_list

    # o = user_file.userfile(ret)
    # temp = o.file_list(os.path.join(config.PATH, 'static', 'user', 'nick', 'temp'),
    #                    os.path.join(config.PATH, 'static', 'user', 'nick', 'newID!'))



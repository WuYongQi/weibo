from django.db import models
from django.contrib.auth.models import User


# Create your models here.
# $ python manage.py makemigrations
# $ python manage.py migrate
# $ python manage.py createsuperuser    创建管理员


class Weibo(models.Model):
    '''所有微博'''
    wb_type_choices = (
        (0, '原创'),
        (1, '转发'),
        (2, '收藏'),
    )
    wb_type = models.IntegerField(choices=wb_type_choices, default=0, verbose_name="微博类型")
    forward_or_collect_from = models.ForeignKey('self', related_name="forward_or_collects",
                                                blank=True, null=True, verbose_name="关联微博")
    user = models.ForeignKey('UserProfile', verbose_name="用户")
    text = models.CharField(max_length=140, verbose_name="微博内容")
    pictures_link_id = models.CharField(max_length=128, blank=True, null=True, verbose_name="照片路径")
    video_link_id = models.CharField(max_length=128, blank=True, null=True, verbose_name="视频路径")
    perm_choice = ((0, '公开'),
                   (1, '自己可见'),
                   (2, '朋友可见'))
    perm = models.IntegerField(choices=perm_choice, default=0, verbose_name="可见度")
    date = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")

    class Meta:
        verbose_name = '所有微博内容'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.text


class Topic(models.Model):
    '''话题'''
    name = models.CharField(max_length=140, verbose_name="话题名字")
    date = models.DateTimeField(auto_now=True, verbose_name="时间")

    class Meta:
        verbose_name = '话题'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Category(models.Model):
    '''微博分类'''

    name = models.CharField(max_length=32, verbose_name="分类名")

    class Meta:
        verbose_name = '微博分类'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Comment(models.Model):
    '''评论点赞'''
    to_weibo = models.ForeignKey(Weibo)
    p_comment = models.ForeignKey('self', related_name="child_comments", blank=True, null=True)
    user = models.ForeignKey('UserProfile')
    comment_type_choices = (
        (0, '评论'),
        (1, '点赞'),
    )
    comment_type = models.IntegerField(choices=comment_type_choices, default=0, verbose_name="类型")
    comment = models.CharField(max_length=140, blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True, verbose_name="时间")

    class Meta:
        verbose_name = '评论点赞'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.comment


class Tags(models.Model):
    '''标签'''
    name = models.CharField(max_length=64)

    class Meta:
        verbose_name = '标签'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.comment_type,self.name


class UserProfile(models.Model):
    '''用户信息'''
    user = models.OneToOneField(User, verbose_name="登录账号")
    name = models.CharField(max_length=64, verbose_name="用户名称")
    brief = models.CharField(max_length=140, blank=True, null=True, verbose_name="简介")
    sex_type = ((1, '男'), (0, '女'))
    sex = models.IntegerField(choices=sex_type, default=1, verbose_name="性别")
    age = models.PositiveSmallIntegerField(blank=True, null=True, verbose_name="年龄")
    email = models.EmailField(verbose_name="邮件")
    tags = models.ManyToManyField(Tags)
    head_img = models.ImageField(verbose_name="头像")

    follow_list = models.ManyToManyField('self', blank=True, related_name="my_followers",
                                         symmetrical=False)

    # registration_date = models.DateTimeField(auto_created=True)

    class Meta:
        verbose_name = '用户信息'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name

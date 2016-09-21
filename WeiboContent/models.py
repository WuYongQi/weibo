from django.db import models
from django.contrib.auth.models import User


# Create your models here.
# $ python manage.py makemigrations
# $ python manage.py migrate
# $ python manage.py createsuperuser    创建管理员


class Weibo(models.Model):
    '''所有微博'''
    wb_type_choices = (
        (0, 'new'),
        (1, 'forward'),
        (2, 'collect'),
    )
    wb_type = models.IntegerField(choices=wb_type_choices, default=0)
    forward_or_collect_from = models.ForeignKey('self', related_name="forward_or_collects",
                                                blank=True, null=True)
    user = models.ForeignKey('UserProfile')
    text = models.CharField(max_length=140)
    pictures_link_id = models.CharField(max_length=128, blank=True, null=True)
    video_link_id = models.CharField(max_length=128, blank=True, null=True)
    perm_choice = ((0, 'public'),
                   (1, 'private'),
                   (2, 'friends'))
    perm = models.IntegerField(choices=perm_choice, default=0)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = '所有微博'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.text


class Topic(models.Model):
    '''话题'''
    name = models.CharField(max_length=140)
    date = models.DateTimeField()

    class Meta:
        verbose_name = '话题'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Category(models.Model):
    '''微博分类'''

    name = models.CharField(max_length=32)

    class Meta:
        verbose_name = '微博分类'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Comment(models.Model):
    '''评论'''
    to_weibo = models.ForeignKey(Weibo)
    p_comment = models.ForeignKey('self', related_name="child_comments")
    user = models.ForeignKey('UserProfile')
    comment_type_choices = ((0, 'comment'), (1, 'thumb_up'))
    comment_type = models.IntegerField(choices=comment_type_choices, default=0)
    comment = models.CharField(max_length=140)
    date = models.DateTimeField(auto_created=True)

    class Meta:
        verbose_name = '评论'
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
        return self.name


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

"""
Django settings for weibo project.

Generated by 'django-admin startproject' using Django 1.10.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.10/ref/settings/
"""

import os
import config

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.10/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '-6^0s6eas)rdhs6nch3rak8^0uigu=r$7+!d&hvj=y!p(uw57a'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'WeiboContent',
]

MIDDLEWARE = [
    # 'django.middleware.cache.UpdateCacheMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 'django.middleware.cache.FetchFromCacheMiddleware',
]

ROOT_URLCONF = 'weibo.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'weibo.wsgi.application'

# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }

# 配置数据库
from config import DBSetting

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': DBSetting['NAME'],
        'USER': DBSetting['USER'],
        'PASSWORD': DBSetting['PASSWORD'],
        'HOST': DBSetting['HOST'],
        'PORT': DBSetting['PORT'],
    }
}

# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/1.10/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

# USE_TZ = True
USE_TZ = False

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.10/howto/static-files/

STATIC_URL = '/Static/'
# 静态文件
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)

# 没登录跳转链接
LOGIN_URL = '/index/'

# Session
from config import session as sessionconfig

if sessionconfig['status']:
    SESSION_ENGINE = 'django.contrib.sessions.backends.signed_cookies' if sessionconfig['encryption'] \
        else 'redis_sessions.session'
    SESSION_REDIS_HOST = sessionconfig['host']
    SESSION_REDIS_PORT = sessionconfig['port']
    SESSION_REDIS_DB = sessionconfig['DB']
    SESSION_REDIS_PASSWORD = sessionconfig['passwd']
    SESSION_COOKIE_NAME = sessionconfig['name']
    SESSION_COOKIE_AGE = sessionconfig['time_out']  # 超时时间
    SESSION_EXPIRE_AT_BROWSER_CLOSE = False



from config import cache
if cache['cache_type'] == 'redis':
    # 配置reids
    CACHES = {
        "default": {
            "BACKEND": "django_redis.cache.RedisCache",
            # "LOCATION": "redis://:wuyongqi123@192.168.1.108:6379",
            # "LOCATION": "redis://144.48.127.122:6379",
            "LOCATION": [
                # "redis://:wuyongqi123@144.48.127.122:6379",
                *cache['redis_host']
            ],
            "OPTIONS": {
                # "CLIENT_CLASS": "django_redis.client.DefaultClient",
                "CONNECTION_POOL_KWARGS": {"max_connections": 100},     # 连接池
                # "PARSER_CLASS": "redis.connection.HiredisParser",       # hiredis解释器
                # 2 apt-get install python-dev  3 apt-get install python3-dev
                # easy_install hiredis
            }
        }
    }
elif cache['cache_type'] == 'cache':
    # 内存默认缓存
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',  # 引擎
            'TIMEOUT': 'unique-snowflake',  # 缓存超时时间（默认300，None表示永不过期，0表示立即过期）
            'OPTIONS': {
                'MAX_ENTRIES': 300,  # 最大缓存个数（默认300）
                'CULL_FREQUENCY': 3,  # 缓存到达最大个数之后，剔除缓存个数的比例，即：1/CULL_FREQUENCY（默认3）
            },
            'KEY_PREFIX': '',  # 缓存key的前缀（默认空）
            'VERSION': 1,  # 缓存key的版本（默认1）
            # 'KEY_FUNCTION',   # 生成key的函数（默认函数会生成为：【前缀:版本:key】）
        }
    }




"""weibo URL Configurationa

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin

from WeiboContent import views as weibocontentviews


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    # url(r'', weibocontentviews.index),
    url(r'^index/$', weibocontentviews.index),

    url(r'^index/weibocontent\.html', weibocontentviews.weibocontent),  # 未登录微博内容
    url(r'^index/search\.html', weibocontentviews.searchall),  # 搜索
    url(r'^home\.html$', weibocontentviews.userhome),  # 登录关注好友微博内容
    url(r'^login/', weibocontentviews.login),  # 登录函数
    url(r'^home/push/mess\.html', weibocontentviews.messpush),  # 推送消息心跳
    url(r'^home/upload/pv\.html', weibocontentviews.picture_video),  # 图片视频
    url(r'^emotions.json$', weibocontentviews.Expression_processing),  # 表情处理
    url(r'^wechat\.html$', weibocontentviews.wechat),   # 聊天
    url(r'^home/user\.html$', weibocontentviews.userhtml),   # 个人信息
    url(r'^home/fav\.html$', weibocontentviews.favhtml),   # 点赞
]


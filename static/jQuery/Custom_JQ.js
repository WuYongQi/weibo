/**
 * Created by wuyon on 2016/9/22.
 */
var csrftoken = $.cookie('csrftoken');
function Hot_search() {
    $.ajax({
        url: '/Public_Hot_search',
        type: 'get',
        data: {'type': 'Hot_search'},
        dataType: 'json',
        success: function (arg) {
            $('#Hot_search').text('大家正在搜 : ' + arg['name']);
        }
    })
}
$(function () {

    var $bottomTools = $('.bottom_tools');
    var $qrTools = $('.coin');
    var qrImg = $('.qr_img');

    $(window).scroll(function () {
        var scrollHeight = $(document).height();
        var scrollTop = $(window).scrollTop();
        var $windowHeight = $(window).innerHeight();
        scrollTop > 50 ? $("#scrollUp").fadeIn(200).css("display", "block") : $("#scrollUp").fadeOut(200);
        $bottomTools.css("bottom", scrollHeight - scrollTop > $windowHeight ? 40 : $windowHeight + scrollTop + 40 - scrollHeight);
    });

    $('#scrollUp').click(function (e) {
        e.preventDefault();
        $('html,body').animate({scrollTop: 0});
    });

    $qrTools.hover(function () {
        qrImg.fadeIn();
    }, function () {
        qrImg.fadeOut();
    });

});
function Request_content() {
    $.ajax({
        url: '/index/weibocontent.html',
        type: 'get',
        data: {},
        dataType: 'json',
        success: function (arg) {
            console.log(arg);
            // var expression = $('<img render="ext" width="22" height="22">');
            console.log(arg);
            if (arg['status']) {
                $.each(arg['content'], function (k, v) {
                    var pictures = v['pictures'];
                    if (pictures) {
                        var pictures = JSON.parse(v['pictures']);
                    }
                    console.log(pictures,'asdfasdvsdfvrgasdgasdgdas');
                    console.log(pictures[0],'asdfasdvsdfvrgasdgasdgdas');
                    console.log(typeof (v['pictures']));
                    if (pictures.length > 1) {
                        var li = $("<li class='Content_Center_li_img clearfix'>");
                        var Center = $('<div class="Content_Center_TXT_img clearfix">').appendTo(li);
                        var Text_info = $('<div class="Text_info">').appendTo(Center);
                        var Text = $('<span>').html(AnalyticEmotion(v["text"])).appendTo(Text_info);
                        // var Text_ = $('<span>'+v["text"]).appendTo(Text_info);
                        var Text_img = $('<div class="Picture_zone">').appendTo(Center);
                        var ul = $('<ul>');
                        for (var i = 0; i < 3; i++) {
                            li_list = $('<li><img class="piccut_v piccut_h" src="/Static/user/' + v["pictures"][i] + '">').appendTo(ul);
                        }
                        ul.appendTo(Text_img);
                        var Userinfo_img = $('<div class="Userinfo_img">').appendTo(Center);
                        $('<span><a href="javascript:(0)"><img src="/Static/user/' + v["head_img"] + '" style="vertical-align: top;" width="18" height="18"></a></span>').appendTo(Userinfo_img);//用户头像
                        $('<span><a href="javascript:(0)"><span>&nbsp;@' + v["user"] + '</span></a></span>').appendTo(Userinfo_img);//用户名
                        $('<span>&nbsp;&nbsp;&nbsp;' + v['date'] + '</span>').appendTo(Userinfo_img);//时间
                        $('<span class="Txt_operation_z iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info">&#xe60f;</em><em>' + v["fav_count"] + '</em>').appendTo(Userinfo_img);//赞的个数
                        $('<span class="Txt_operation_p iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info ">&#xe60e;</em><em>' + v["com_count"] + '</em>').appendTo(Userinfo_img);//评论个数
                        $('<span class="Txt_operation_zf"><em class="iconfont_info">&#xe611;</em><em>' + v["for_count"] + '</em>').appendTo(Userinfo_img);//转发个数
                        li.appendTo($('#Text'))
                    } else if (pictures.length == 0) {
                        console.log(AnalyticEmotion(v["text"]));
                        var li = $("<li class='Content_Center_li'>");
                        var Center = $('<div class="Content_Center_TXT">').appendTo(li);
                        var Center_left = $('<div class="Text_left">').appendTo(Center);
                        // $('<img src="/Static/user/nick/weibo_img/1/123.png" width="106" height="70">').appendTo(Center_left);   //后期修改
                        $('<img src="/Static/user/'+pictures[0]+'"'+' width="106" height="70">').appendTo(Center_left);
                        var Text_right = $('<div class="Text_right">').appendTo(Center);
                        var Coutent = $('<div class="Coutent">').html(AnalyticEmotion(v["text"])).appendTo(Text_right);
                        // var Coutent = $('<div class="Coutent">' + v['text'] + '</div>').appendTo(Text_right);
                        var Content_Userinfo = $('<div class="Content_Userinfo">').appendTo(Text_right);
                        var span = $('<span>').appendTo(Content_Userinfo);
                        var MUser = $('<a href="javascript:(0)">').appendTo(span);//用户个人主页url
                        var User_title_img = $('<img src="/Static/user/' + v["head_img"] + '" style="vertical-align: top;" width="18" height="18">').appendTo(MUser); //用户头像
                        var span_User = $('<span>').appendTo(Content_Userinfo);
                        var Userinfo = $('<a href="javascript:(0)">').appendTo(span_User);//用户个人主页url
                        var Username = $('<span>&nbsp;@' + v["user"] + '</span>').appendTo(Userinfo);
                        var span_time = $('<span>&nbsp;&nbsp;&nbsp;' + v["date"] + '</span>').appendTo(Content_Userinfo);
                        var span_zan = $('<span class="Txt_operation_z iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info">&#xe60f;</em><em>' + v["fav_count"] + '</em>').appendTo(Content_Userinfo);//赞的个数
                        var span_p = $('<span class="Txt_operation_p iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info ">&#xe60e;</em><em>' + v["com_count"] + '</em>').appendTo(Content_Userinfo);//评论个数
                        var span_zf = $('<span class="Txt_operation_zf"><em class="iconfont_info">&#xe611;</em><em>' + v["for_count"] + '</em>').appendTo(Content_Userinfo);//转发个数
                        li.appendTo($('#Text'));
                    } else {

                    }
                })
            } else {
                alert('服务器偷懒，获取信息失败，请重新获取！')
            }
        }
    })
}
function Login() {
    $('#Mo_T').attr('class', 'The_motel_dialog')
}
function ChangeTab(title, body) {
    $(title).children().bind("click", function () {
        $menu = $(this);
        $content = $(body).find('div[content="' + $(this).attr("content-to") + '"]');
        $menu.addClass('current').siblings().removeClass('current');
        $content.removeClass('hide').siblings().addClass('hide');
    });
}
function ChangeTab_tab(title_tab, body_tab) {
    $(title_tab).children().bind("click", function () {
        $menu = $(this);
        $content = $(body_tab).find('div[content="' + $(this).attr("content-to") + '"]');
        $menu.addClass('current').siblings().removeClass('current');
        $content.removeClass('hide').siblings().addClass('hide');
    });
}
function input_k(ths) {
    $('#error_null_name').attr('class', 'hide');
    $('#error_null_name_tab').attr('class', 'hide');
    $('#error_null_pwd').attr('class', 'hide');
    $('#error_null_pwd_tab').attr('class', 'hide');
    $(ths).parent().parent().css('border', '1px red solid');
}
function input_x(ths) {
    $(ths).parent().parent().css('border', '#d9d9d9 1px solid');
}
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
function Login_Server() {
    if ($('#username').val()) {
        var error_null_name_id = $('#error_null_name');
        var error_null_pwd_id = $('#error_null_pwd');
        var error_pwd_user_id = $('#user_pwd_error');
        var username = $('#username').val();
        var password = $('#password').val();
    } else {
        var error_null_name_id = $('#error_null_name_tab');
        var error_null_pwd_id = $('#error_null_pwd_tab');
        var error_pwd_user_id = $('#user_pwd_error_tab');
        var username = $('#username_tab').val();
        var password = $('#password_tab').val();
    }
    if (username.length == 0) {
        error_null_name_id.attr('class', ' ');
        setTimeout(function () {
            error_null_name_id.attr('class', 'hide');
        }, 3000);
        return
    }
    if (password.length == 0) {
        error_null_pwd_id.attr('class', ' ');
        setTimeout(function () {
            error_null_pwd_id.attr('class', 'hide');
        }, 3000);
        return
    }
    $.ajax({
        url: '/login/',
        type: 'post',
        data: {'username': username, 'password': password, 'Cookie': document.cookie},
        dataType: 'json',
        success: function (arg) {
            if (arg['status']) {
                console.log(11111111);
                location.href = '/index'
            } else {
                error_pwd_user_id.attr('class', ' ');
                setTimeout(function () {
                    error_pwd_user_id.attr('class', 'hide');
                }, 3000);
            }
        }
    })
}
function Login_G() {
    $('#Mo_T').attr('class', 'The_motel_dialog hide')
}
function Release() {
    var text = $('#Release_text').val();
    console.log(text);
    $.ajax({
        url: '/home.html',
        type: 'post',
        data: {'perm': 0, 'wb_type': 0, 'text': text, 'Cookie': document.cookie},
        dataType: 'json',
        success: function (arg) {
            $('#Release_text').val(' ');
            if (arg['status']) {
                cosnole.log(arg['connect']);
                var li = $("<li class='Content_Center_li'>");
                var Center = $('<div class="Content_Center_TXT">').appendTo(li);
                var Center_left = $('<div class="Text_left">').appendTo(Center);
                $('<img src="/Static/user/nick/weibo_img/1/123.png" width="106" height="70">').appendTo(Center_left);   //后期修改
                var Text_right = $('<div class="Text_right">').appendTo(Center);
                var Coutent = $('<div class="Coutent">' + arg['connect']['text'] + '</div>').appendTo(Text_right);
                var Content_Userinfo = $('<div class="Content_Userinfo">').appendTo(Text_right);
                var span = $('<span>').appendTo(Content_Userinfo);
                var MUser = $('<a href="javascript:(0)">').appendTo(span);//用户个人主页url
                $('<img src="/Static/user/' + arg['connect']["head_img"] + '" style="vertical-align: top;" width="18" height="18">').appendTo(MUser); //用户头像
                var span_User = $('<span>').appendTo(Content_Userinfo);
                var Userinfo = $('<a href="javascript:(0)">').appendTo(span_User);//用户个人主页url
                $('<span>&nbsp;@' + arg['connect']["user"] + '</span>').appendTo(Userinfo);
                $('<span>&nbsp;&nbsp;&nbsp;' + arg['connect']["date"] + '</span>').appendTo(Content_Userinfo);
                $('<span class="Txt_operation_z iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info">&#xe60f;</em><em>0</em>').appendTo(Content_Userinfo);//赞的个数
                $('<span class="Txt_operation_p iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info ">&#xe60e;</em><em>0</em>').appendTo(Content_Userinfo);//评论个数
                $('<span class="Txt_operation_zf"><em class="iconfont_info">&#xe611;</em><em>0</em>').appendTo(Content_Userinfo);//转发个数
                $('#Text').children().eq(0).after(li)
            } else {
                console.log(1111111111111);
                alert(arg['message'])
            }
        }
    })
}
function replace_em(str) {
    str = str.replace(/\</g, '&lt;');
    str = str.replace(/\>/g, '&gt;');
    str = str.replace(/\n/g, '<br/>');
    str = str.replace(/\[em_([0-9]*)\]/g, '<img src="/Static/img/QQ_img/$1.gif" border="0" />');
    return str;
}
$('#prcuter_one').click(function (event) {
    if (document.getElementById("picuter_one_s1")) {
        $('#picuter_one_s1').remove();
        return
    }
    $('#emotions').remove();
    console.log(event);
    var bq_prcut = $('#prcuter_one');
    var picuter_t = bq_prcut.offset()['top'] + 30;
    var picuter_l = bq_prcut.offset()['left'] - 60;
    console.log(picuter_l, picuter_t);
    var div = $('<div id="picuter_one_s1">').css({
        'WebkitBoxShadow': '0 -3px 4px rgba(0,0,0,0.1)',
        'position': 'absolute',
        'top': picuter_t,
        'left': picuter_l,
        'backgroundColor': '#fff',
        'width': '434px',
        'height': '145px',
        'border': '1px solid #ccc',
        'borderRadius': '6px'
    });
    $('body').append(div);
    $('<span class="picter_triangle">').css({'left': picuter_l - 276}).appendTo(div);
    var picuter_one = $('<div style="width: 400px; height: 100px; padding: 25px 16px 16px">');
    var ul = $('<ul class="clearfix">');
    $("<li onclick='updata_pctert()'><span class='iconfont_picter'>&#xe615;</span>&nbsp;<span class='picter_size'>单图/多图</span></li>").appendTo(ul); //多张或一张图
    $("<li><span class='iconfont_picter'>&#xe614;</span>&nbsp;<span class='picter_size'>拼图</span></li>").appendTo(ul);//拼图
    $("<li><span class='iconfont_picter'>&#xe613;</span>&nbsp;<span class='picter_size'>截屏</span></li>").appendTo(ul);  //截屏
    $("<li><span class='iconfont_picter'>&#xe616;</span>&nbsp;<span class='picter_size'>上传相册</span></li>").appendTo(ul);  //相册
    ul.appendTo(picuter_one);
    picuter_one.appendTo(div);
    $('#picuter_one_s1').appendTo(div);
    event.stopPropagation();
});
function updata_pctert() {
    $.ajax({
        url: '/home/upload/pv.html',
        data: {'asdfasdf': 'asdfsadfassd'},
        type: 'get',
        success: function () {

        }
    });
    $('#upload_zp').remove();
    $('<input type="file" class="hide" id="upload_zp" multiple>').appendTo($('#prcuter_one'));
    $('#upload_zp').trigger('click');
    $('#upload_zp').bind('change', function () {
        var file = $('#upload_zp')[0].files[0];
        var form = new FormData();
        form.append('PVFile', file);
        console.log(form);
        file_count = $("#upload_zp");
        console.log(file_count.length);
        if (file_count > 9) {
            alert('文件数不能超过9个，你选择了' + file_count + '个');
            return
        }
        $.ajax({
            type: 'POST',
            url: '/home/upload/pv.html',
            data: form,
            dataType: 'json',
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success: function (arg) {
                if (arg['status']) {
                    img = arg['filepath'];
                    alert('OK');
                    // for(var i=0;arg[''])
                } else {
                    alert(arg['message'])
                }
            }
        });

    })
}
img = [];

function move() {
    $.ajax({
        url: "/home/push/mess.html",
        data: {"a": 1},
        type: "post",
        dataType: "json",
        success: function (arg) {
            console.log(arg);
        }
    })
}

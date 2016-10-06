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

// 获取内容页
HOME_page = 0;

$(function () {

    var $bottomTools = $('.bottom_tools');
    var $qrTools = $('.coin');
    var qrImg = $('.qr_img');

    $(window).scroll(function () {
        var scrollHeight = $(document).height();
        var scrollTop = $(window).scrollTop();
        var $offsetHeight = document.documentElement.offsetHeight;
        var $windowHeight = $(window).innerHeight();
        scrollTop > 50 ? $("#scrollUp").fadeIn(200).css("display", "block") : $("#scrollUp").fadeOut(200);
        $bottomTools.css("bottom", scrollHeight - scrollTop > $windowHeight ? 40 : $windowHeight + scrollTop + 40 - scrollHeight);
        if ((scrollTop + 1000) > $offsetHeight){
            Request_content(HOME_page);
        }
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
    HOME_page += 1;
    $.ajax({
        url: '/index/weibocontent.html',
        type: 'get',
        data: {home:HOME_page},
        dataType: 'json',
        success: function (arg) {
            console.log(arg);
            if (arg['status']) {
                // $.each(arg['content'], function (k, v) {
                //     var pictures = v['pictures'];
                //     if (pictures) {
                //         var pictures = JSON.parse(v['pictures']);
                //     }
                //     if (pictures.length > 1) {
                //         var li = $("<li class='Content_Center_li_img clearfix'>");
                //         var Center = $('<div class="Content_Center_TXT_img clearfix">').appendTo(li);
                //         var Text_info = $('<div class="Text_info">').appendTo(Center);
                //         var Text = $('<span>').html(AnalyticEmotion(v["text"])).appendTo(Text_info);
                //         // var Text_ = $('<span>'+v["text"]).appendTo(Text_info);
                //         var Text_img = $('<div class="Picture_zone">').appendTo(Center);
                //         var ul = $('<ul>');
                //         for (var i = 0; i < 3; i++) {
                //             li_list = $('<li><img class="piccut_v piccut_h" src="/Static/user/' + v["pictures"][i] + '">').appendTo(ul);
                //         }
                //         ul.appendTo(Text_img);
                //         var Userinfo_img = $('<div class="Userinfo_img">').appendTo(Center);
                //         $('<span><a href="javascript:(0)"><img src="/Static/user/' + v["head_img"] + '" style="vertical-align: top;" width="18" height="18"></a></span>').appendTo(Userinfo_img);//用户头像
                //         $('<span><a href="javascript:(0)"><span>&nbsp;@' + v["user"] + '</span></a></span>').appendTo(Userinfo_img);//用户名
                //         $('<span>&nbsp;&nbsp;&nbsp;' + v['date'] + '</span>').appendTo(Userinfo_img);//时间
                //         $('<span class="Txt_operation_z iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info">&#xe60f;</em><em>' + v["fav_count"] + '</em>').appendTo(Userinfo_img);//赞的个数
                //         $('<span class="Txt_operation_p iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info ">&#xe60e;</em><em>' + v["com_count"] + '</em>').appendTo(Userinfo_img);//评论个数
                //         $('<span class="Txt_operation_zf"><em class="iconfont_info">&#xe611;</em><em>' + v["for_count"] + '</em>').appendTo(Userinfo_img);//转发个数
                //         li.appendTo($('#Text'))
                //     } else if (pictures.length == 0) {
                //         console.log(AnalyticEmotion(v["text"]));
                //         var li = $("<li class='Content_Center_li'>");
                //         var Center = $('<div class="Content_Center_TXT">').appendTo(li);
                //         var Center_left = $('<div class="Text_left">').appendTo(Center);
                //         // $('<img src="/Static/user/nick/weibo_img/1/123.png" width="106" height="70">').appendTo(Center_left);   //后期修改
                //         $('<img src="/Static/user/'+pictures[0]+'"'+' width="106" height="70">').appendTo(Center_left);
                //         var Text_right = $('<div class="Text_right">').appendTo(Center);
                //         var Coutent = $('<div class="Coutent">').html(AnalyticEmotion(v["text"])).appendTo(Text_right);
                //         // var Coutent = $('<div class="Coutent">' + v['text'] + '</div>').appendTo(Text_right);
                //         var Content_Userinfo = $('<div class="Content_Userinfo">').appendTo(Text_right);
                //         var span = $('<span>').appendTo(Content_Userinfo);
                //         var MUser = $('<a href="javascript:(0)">').appendTo(span);//用户个人主页url
                //         var User_title_img = $('<img src="/Static/user/' + v["head_img"] + '" style="vertical-align: top;" width="18" height="18">').appendTo(MUser); //用户头像
                //         var span_User = $('<span>').appendTo(Content_Userinfo);
                //         var Userinfo = $('<a href="javascript:(0)">').appendTo(span_User);//用户个人主页url
                //         var Username = $('<span>&nbsp;@' + v["user"] + '</span>').appendTo(Userinfo);
                //         var span_time = $('<span>&nbsp;&nbsp;&nbsp;' + v["date"] + '</span>').appendTo(Content_Userinfo);
                //         var span_zan = $('<span class="Txt_operation_z iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info">&#xe60f;</em><em>' + v["fav_count"] + '</em>').appendTo(Content_Userinfo);//赞的个数
                //         var span_p = $('<span class="Txt_operation_p iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info ">&#xe60e;</em><em>' + v["com_count"] + '</em>').appendTo(Content_Userinfo);//评论个数
                //         var span_zf = $('<span class="Txt_operation_zf"><em class="iconfont_info">&#xe611;</em><em>' + v["for_count"] + '</em>').appendTo(Content_Userinfo);//转发个数
                //         li.appendTo($('#Text'));
                //     } else {
                //
                //     }
                // })
                $.each(arg['content'], function (k, v) {
                    var pictures = v['pictures'];
                    var video = v['video'];
                    if (pictures) {
                        var pictures = JSON.parse(v['pictures']);
                    }
                    if (video) {
                        var video = JSON.parse(v['video']);
                    }
                    if(v['wb_type'] == 1){
                        $.ajax({
                            url:'/index/weibocontent.html',
                            type:'post',
                            data:{'weibo_id':v['forward'], 'Cookie':document.cookie},
                            dataType: 'json',
                            success: function (arg) {
                                var forw_info = arg ;
                                console.log(forw_info);
                                if (forw_info['status']){
                                    li = $('<li class="index_center_img_SLQ" id="' + v['to_weibo'] + '" style="position: relative">');
                                    $('<img href="" class="index_center_touxiang_SLQ" src="/Static/img/test_img/005KvRRWjw8ezywugsozbj30a10873zw.jpg"/>').appendTo(li);
                                    $('<ul class="index_center_img_ul_SLQ"><li style="margin-top: 10px;"><a href="" class="index_center_img_name_SLQ">'+v['user']+'</a></li><li><a class="index_center_img_V_SLQ"></a> <a class="index_center_img_vip_SLQ"></a><a class="index_center_img_lvxing_SLQ"></a></li>').appendTo(li);
                                    $('<div style="margin-top: 72px;margin-left: 60px;" class="index_center_img_time_from_SLQ"><span class="index_center_img_time_SLQ">'+v['date']+'</span><span class="index_cener_img_from_SLQ">来自</span><span class="index_cener_img_from_add_SLQ">iPhone 9999plus</span></div>').appendTo(li);
                                    $('<span class="index_center_readme_zhuanfa_SLQ">'+v['text']).appendTo(li);
                                    $('<ul style="margin-top: 115px;list-style-type: none;" class="index_center_img_ul_zhuanfa_SLQ"><li class="index_center_img_li_SLQ"><a href="" class="index_center_img_name_zhuanfa_SLQ">@'+forw_info['content'][0]["user"]+'</a></li></ul>').appendTo(li);
                                    $('<span style="margin-left: 60px;margin-top: 10px;" class="index_center_img_readme_SLQ">'+AnalyticEmotion(forw_info['content'][0]["text"])+'</span>').appendTo(li);
                                    var img_text_title = $('<div style="margin-top: 45px;margin-bottom: 15px;" class="index_img_iii_SLQ">');
                                    var img_text_content = $('<div class="index_img_SLQ" id="pt">');
                                    var img_list = JSON.parse(forw_info['content'][0]['pictures']);
                                    for(var i=0;img_list.length > i;i++) {
                                        // console.log(i,'aaaa');
                                        // if(i==10){
                                        //     break
                                        // }
                                        // console.log(img_list[i]);
                                        $('<a href="#" style="margin: 0 1px; display: inline-block;" target="_blank"><img style="width: 110px; height: 110px;" src="/Static/user' + img_list[i] + '">').appendTo(img_text_content);
                                    }
                                    img_text_content.appendTo(img_text_title);
                                    img_text_title.appendTo(li);
                                    li.appendTo($('#Text'))
                                }
                            }
                        });

                    }
                    else if (video.length == 1) {
                        var div = $("<div class='index_center_img_SLQ' id='" + v['to_weibo'] + "' style='position: relative;height: 489px;'>");
                        var headimg = $('<img href="" class="index_center_touxiang_SLQ" src="/Static/user/' + v["head_img"] + '">').appendTo(div);
                        var uldiv = $('<ul class="index_center_img_ul_SLQ">').appendTo(div);
                        var user = $('<li><a href="" class="index_center_img_name_SLQ">' + v["user"] +'</a></li>').appendTo(uldiv);
                        var imgtime = $('<div class="index_center_img_time_from_SLQ" style="margin: 65px 0 0 2px;">').appendTo(div);
                        var spantime = $('<span class="index_center_img_time_SLQ" style="margin: 72px 0px 0px 59px;">' + v["date"] + '</span>').appendTo(imgtime);
                        var text = $('<span class="index_center_readme_zhuanfa_SLQ" style="position: absolute;margin: 15px 0px 0px 58px;">').html(AnalyticEmotion(v["text"])).appendTo(div);
                        var video_div = $('<div class="index_center_img_wen"><video src="/Static/user' + video[0] + '" controls="controls" autoplay style="width: 481px;margin: 49px 0px 0px 45px;"></video></div>').appendTo(div);
                        // var Userinfo_img = $('<div class="Userinfo_img">').appendTo(div);
                        // $('<span class="Txt_operation_z iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info">&#xe60f;</em><em>' + v["fav_count"] + '</em>').appendTo(Userinfo_img);//赞的个数
                        // $('<span class="Txt_operation_p iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info ">&#xe60e;</em><em>' + v["com_count"] + '</em>').appendTo(Userinfo_img);//评论个数
                        // $('<span class="Txt_operation_zf"><em class="iconfont_info">&#xe611;</em><em>' + v["for_count"] + '</em>').appendTo(Userinfo_img);//转发个数
                        var OperatingCollection = $('<ul style="border-top-width: 1px;border-top-style: solid;border-color: #f2f2f5;position: absolute;position: absolute;bottom: -1px;width: 554px;left: 2px;">').appendTo(div);
                        var li_coll_one = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_one);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="iscollection(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                        $('<em>收藏</em>').appendTo(span_coll_stree);
                        var li_coll_two = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_two);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="isforwarding(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe611;</em>').appendTo(em_coll_one);
                        $('<em>' + v["for_count"] + '</em>').appendTo(span_coll_stree);
                        var li_coll_stree = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_stree);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="iscomments(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info ">&#xe60e;</em>').appendTo(em_coll_one);
                        $('<em>' + v["com_count"] + '</em>').appendTo(span_coll_stree);
                        var li_coll_four = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_four);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="islike(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                        $('<em>' + v["fav_count"] + '</em>').appendTo(span_coll_stree);
                        div.appendTo($('#Text'))

                    }
                    else if (pictures.length > 1) {
                        var li = $("<li class='Content_Center_li_img clearfix' style='list-style-type: none;' id='" + v['to_weibo'] + "'>");

                        var div = $("<div class='Content_Center_TXT_img clearfix' style='position: relative;min-height: 100px;top: 0;'>").appendTo(li);
                        var headimg = $('<img href="" class="index_center_touxiang_SLQ" src="/Static/user/' + v["head_img"] + '">').appendTo(div);
                        var uldiv = $('<ul class="index_center_img_ul_SLQ">').appendTo(div);
                        var user = $('<li><a href="" class="index_center_img_name_SLQ">' + v["user"] +'</a></li>').appendTo(uldiv);
                        var imgtime = $('<div class="index_center_img_time_from_SLQ" style="margin: 65px 0 0 2px;">').appendTo(div);
                        var spantime = $('<span class="index_center_img_time_SLQ" style="margin: 72px 0px 0px 59px;">' + v["date"] + '</span>').appendTo(imgtime);
                        var text = $('<span class="index_center_readme_zhuanfa_SLQ" style="position: absolute;margin: 15px 0px 0px 58px;">').html(AnalyticEmotion(v["text"])).appendTo(div);
                        // var img = $('<img src="/Static/user/'+pictures[0]+'"'+' width="266" height="180" style="margin-top: 56px;margin-left: 50px;margin-bottom: 26px;">').appendTo(div);

                        // var Text_img = $('<div class="Picture_zone">').appendTo(div);
                        // var ul = $('<ul>');
                        // for (var i = 0; i < pictures.length; i++) {
                        //     var li_list = $('<li style="list-style-type:none;"><img class="piccut_v piccut_h" src="/Static/user/' + pictures[i] + '">').appendTo(ul);
                        // }
                        // ul.appendTo(Text_img);
                        var img_text_title = $('<div class="index_img_iii_SLQ" style="margin: -17px 0 24px 0;">');
                        var img_text_content = $('<div class="index_img_SLQ" id="pt">');
                        // var img_list = JSON.parse(forw_info['content'][0]['pictures']);
                        for(var i=0;pictures.length > i;i++) {
                            $('<a href="#" style="margin: 0 1px; display: inline-block;" target="_blank"><img style="height: 110px;width: 110px;" src="/Static/user' + pictures[i] + '">').appendTo(img_text_content);
                        }
                        img_text_content.appendTo(img_text_title);
                        img_text_title.appendTo(li);


                        var OperatingCollection = $('<ul style="border-top-width: 1px;border-top-style: solid;border-color: #f2f2f5;position: absolute;position: absolute;bottom: -2px;width: 554px;left: 0;">').appendTo(li);
                        var li_coll_one = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_one);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="iscollection(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                        $('<em>收藏</em>').appendTo(span_coll_stree);
                        var li_coll_two = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_two);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="isforwarding(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe611;</em>').appendTo(em_coll_one);
                        $('<em>' + v["for_count"] + '</em>').appendTo(span_coll_stree);
                        var li_coll_stree = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_stree);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="iscomments(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info ">&#xe60e;</em>').appendTo(em_coll_one);
                        $('<em>' + v["com_count"] + '</em>').appendTo(span_coll_stree);
                        var li_coll_four = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_four);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="islike(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                        $('<em>' + v["fav_count"] + '</em>').appendTo(span_coll_stree);

                        // var Center = $('<div class="Content_Center_TXT_img clearfix">').appendTo(li);
                        // var Text_info = $('<div class="Text_info">').appendTo(Center);
                        // var Text = $('<span>').html(AnalyticEmotion(v["text"])).appendTo(Text_info);
                        // // var Text_ = $('<span>'+v["text"]).appendTo(Text_info);
                        // var Text_img = $('<div class="Picture_zone">').appendTo(Center);
                        // var ul = $('<ul>');
                        // for (var i = 0; i < pictures.length; i++) {
                        //     li_list = $('<li><img class="piccut_v piccut_h" src="/Static/user/' + pictures[i] + '">').appendTo(ul);
                        // }
                        // ul.appendTo(Text_img);
                        // var Userinfo_img = $('<div class="Userinfo_img">').appendTo(Center);
                        // $('<span><a href="javascript:(0)"><img src="/Static/user/' + v["head_img"] + '" style="vertical-align: top;" width="18" height="18"></a></span>').appendTo(Userinfo_img);//用户头像
                        // $('<span><a href="javascript:(0)"><span>&nbsp;@' + v["user"] + '</span></a></span>').appendTo(Userinfo_img);//用户名
                        // $('<span>&nbsp;&nbsp;&nbsp;' + v['date'] + '</span>').appendTo(Userinfo_img);//时间
                        // $('<span class="Txt_operation_z iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info">&#xe60f;</em><em>' + v["fav_count"] + '</em>').appendTo(Userinfo_img);//赞的个数
                        // $('<span class="Txt_operation_p iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info ">&#xe60e;</em><em>' + v["com_count"] + '</em>').appendTo(Userinfo_img);//评论个数
                        // $('<span class="Txt_operation_zf"><em class="iconfont_info">&#xe611;</em><em>' + v["for_count"] + '</em>').appendTo(Userinfo_img);//转发个数
                        li.appendTo($('#Text'))

                    }
                    else if (pictures.length == 1) {
                        var li = $("<li class='Content_Center_li' id='" + v['to_weibo'] + "' style='min-height: 70px;'>");
                        var div = $("<div class='.Content_Center_TXT' style='position: relative;min-height: 130px;'>").appendTo(li);
                        var headimg = $('<img href="" class="index_center_touxiang_SLQ" src="/Static/user/' + v["head_img"] + '">').appendTo(div);
                        var uldiv = $('<ul class="index_center_img_ul_SLQ">').appendTo(div);
                        var user = $('<li><a href="" class="index_center_img_name_SLQ">' + v["user"] +'</a></li>').appendTo(uldiv);
                        var imgtime = $('<div class="index_center_img_time_from_SLQ" style="margin: 65px 0 0 2px;">').appendTo(div);
                        var spantime = $('<span class="index_center_img_time_SLQ" style="margin: 72px 0px 0px 59px;">' + v["date"] + '</span>').appendTo(imgtime);
                        var text = $('<span class="index_center_readme_zhuanfa_SLQ" style="position: absolute;margin: 15px 0px 0px 58px;">').html(AnalyticEmotion(v["text"])).appendTo(div);
                        var img = $('<img src="/Static/user/'+pictures[0]+'"'+' width="266" height="180" style="margin-top: 56px;margin-left: 50px;margin-bottom: 26px;">').appendTo(div);

                        var OperatingCollection = $('<ul style="border-top-width: 1px;border-top-style: solid;border-color: #f2f2f5;position: absolute;position: absolute;bottom: -18px;width: 554px;left: -20px;">').appendTo(div);
                        var li_coll_one = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_one);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="iscollection(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                        $('<em>收藏</em>').appendTo(span_coll_stree);
                        var li_coll_two = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_two);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="isforwarding(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe611;</em>').appendTo(em_coll_one);
                        $('<em>' + v["for_count"] + '</em>').appendTo(span_coll_stree);
                        var li_coll_stree = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_stree);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="iscomments(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info ">&#xe60e;</em>').appendTo(em_coll_one);
                        $('<em>' + v["com_count"] + '</em>').appendTo(span_coll_stree);
                        var li_coll_four = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_four);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="islike(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                        $('<em>' + v["fav_count"] + '</em>').appendTo(span_coll_stree);
                        // var li = $("<li class='Content_Center_li'>");
                        // var Center = $('<div class="Content_Center_TXT">').appendTo(li);
                        // var Center_left = $('<div class="Text_left">').appendTo(Center);
                        // // $('<img src="/Static/user/nick/weibo_img/1/123.png" width="106" height="70">').appendTo(Center_left);   //后期修改
                        // $('<img src="/Static/user/'+pictures[0]+'"'+' width="106" height="70">').appendTo(Center_left);
                        // var Text_right = $('<div class="Text_right">').appendTo(Center);
                        // var Coutent = $('<div class="Coutent">').html(AnalyticEmotion(v["text"])).appendTo(Text_right);
                        // // var Coutent = $('<div class="Coutent">' + v['text'] + '</div>').appendTo(Text_right);
                        // var Content_Userinfo = $('<div class="Content_Userinfo">').appendTo(Text_right);
                        // var span = $('<span>').appendTo(Content_Userinfo);
                        // var MUser = $('<a href="javascript:(0)">').appendTo(span);//用户个人主页url
                        // var User_title_img = $('<img src="/Static/user/' + v["head_img"] + '" style="vertical-align: top;" width="18" height="18">').appendTo(MUser); //用户头像
                        // var span_User = $('<span>').appendTo(Content_Userinfo);
                        // var Userinfo = $('<a href="javascript:(0)">').appendTo(span_User);//用户个人主页url
                        // var Username = $('<span>&nbsp;@' + v["user"] + '</span>').appendTo(Userinfo);
                        // var span_time = $('<span>&nbsp;&nbsp;&nbsp;' + v["date"] + '</span>').appendTo(Content_Userinfo);
                        // var span_zan = $('<span class="Txt_operation_z iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info">&#xe60f;</em><em>' + v["fav_count"] + '</em>').appendTo(Content_Userinfo);//赞的个数
                        // var span_p = $('<span class="Txt_operation_p iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info ">&#xe60e;</em><em>' + v["com_count"] + '</em>').appendTo(Content_Userinfo);//评论个数
                        // var span_zf = $('<span class="Txt_operation_zf"><em class="iconfont_info">&#xe611;</em><em>' + v["for_count"] + '</em>').appendTo(Content_Userinfo);//转发个数
                        li.appendTo($('#Text'));

                    }
                    else if (pictures.length == 0){
                        var li = $("<li class='Content_Center_li' id='" + v['to_weibo'] + "'  style='min-height: 70px;'>");
                        var div = $("<div class='.Content_Center_TXT' style='position: relative;min-height: 130px;'>").appendTo(li);
                        var headimg = $('<img href="" class="index_center_touxiang_SLQ" src="/Static/user/' + v["head_img"] + '">').appendTo(div);
                        var uldiv = $('<ul class="index_center_img_ul_SLQ">').appendTo(div);
                        var user = $('<li><a href="" class="index_center_img_name_SLQ">' + v["user"] +'</a></li>').appendTo(uldiv);
                        var imgtime = $('<div class="index_center_img_time_from_SLQ" style="margin: 65px 0 0 2px;">').appendTo(div);
                        var spantime = $('<span class="index_center_img_time_SLQ" style="margin: 72px 0px 0px 59px;">' + v["date"] + '</span>').appendTo(imgtime);
                        var text = $('<span class="index_center_readme_zhuanfa_SLQ" style="position: absolute;margin: 15px 0px 0px 58px;">').html(AnalyticEmotion(v["text"])).appendTo(div);

                        var OperatingCollection = $('<ul style="border-top-width: 1px;border-top-style: solid;border-color: #f2f2f5;position: absolute;position: absolute;bottom: -18px;width: 554px;left: -20px;">').appendTo(div);
                        var li_coll_one = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_one);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="iscollection(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                        $('<em>收藏</em>').appendTo(span_coll_stree);
                        var li_coll_two = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_two);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="isforwarding(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe611;</em>').appendTo(em_coll_one);
                        $('<em>' + v["for_count"] + '</em>').appendTo(span_coll_stree);
                        var li_coll_stree = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_stree);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="iscomments(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info ">&#xe60e;</em>').appendTo(em_coll_one);
                        $('<em>' + v["com_count"] + '</em>').appendTo(span_coll_stree);
                        var li_coll_four = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_four);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="islike(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                        $('<em>' + v["fav_count"] + '</em>').appendTo(span_coll_stree);
                        // var Center = $('<div class="Content_Center_TXT">').appendTo(li);
                        // var Text_right = $('<div class="Text_right">').appendTo(Center);
                        // var Coutent = $('<div class="Coutent">').html(AnalyticEmotion(v["text"])).appendTo(Text_right);
                        // var Content_Userinfo = $('<div class="Content_Userinfo">').appendTo(Text_right);
                        // var span = $('<span>').appendTo(Content_Userinfo);
                        // var MUser = $('<a href="javascript:(0)">').appendTo(span);//用户个人主页url
                        // var User_title_img = $('<img src="/Static/user/' + v["head_img"] + '" style="vertical-align: top;" width="18" height="18">').appendTo(MUser); //用户头像
                        // var span_User = $('<span>').appendTo(Content_Userinfo);
                        // var Userinfo = $('<a href="javascript:(0)">').appendTo(span_User);//用户个人主页url
                        // var Username = $('<span>&nbsp;@' + v["user"] + '</span>').appendTo(Userinfo);
                        // var span_time = $('<span>&nbsp;&nbsp;&nbsp;' + v["date"] + '</span>').appendTo(Content_Userinfo);
                        // var span_zan = $('<span class="Txt_operation_z iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info">&#xe60f;</em><em>' + v["fav_count"] + '</em>').appendTo(Content_Userinfo);//赞的个数
                        // var span_p = $('<span class="Txt_operation_p iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info ">&#xe60e;</em><em>' + v["com_count"] + '</em>').appendTo(Content_Userinfo);//评论个数
                        // var span_zf = $('<span class="Txt_operation_zf"><em class="iconfont_info">&#xe611;</em><em>' + v["for_count"] + '</em>').appendTo(Content_Userinfo);//转发个数
                        li.appendTo($('#Text'));
                    }
                    else {
                        console.log('服务器偷懒，获取信息失败，请重新获取！')
                    }
                })
            }
            else {
                console.log('服务器偷懒，获取信息失败，请重新获取！')
            }
        }
    })
}




function Request_login_content() {
     $.ajax({
        url: '/index/weibocontent.html',
        type: 'get',
        data: {},
        dataType: 'json',
        success: function (arg) {
            console.log(arg);
            if (arg['status']) {
                $.each(arg['content'], function (k, v) {
                    var pictures = v['pictures'];
                    var video = v['video'];
                    if (pictures) {
                        var pictures = JSON.parse(v['pictures']);
                    }
                    if (video) {
                        var video = JSON.parse(v['video']);
                    }
                    if(v['wb_type'] == 1){
                        $.ajax({
                            url:'/index/weibocontent.html',
                            type:'post',
                            data:{'weibo_id':v['forward'], 'Cookie':document.cookie},
                            dataType: 'json',
                            success: function (arg) {
                                var forw_info = arg ;
                                console.log(forw_info);
                                if (forw_info['status']){
                                    li = $('<li class="index_center_img_SLQ" id="' + v['to_weibo'] + '" style="position: relative">');
                                    $('<img href="" class="index_center_touxiang_SLQ" src="/Static/img/test_img/005KvRRWjw8ezywugsozbj30a10873zw.jpg"/>').appendTo(li);
                                    $('<ul class="index_center_img_ul_SLQ"><li style="margin-top: 10px;"><a href="" class="index_center_img_name_SLQ">'+v['user']+'</a></li><li><a class="index_center_img_V_SLQ"></a> <a class="index_center_img_vip_SLQ"></a><a class="index_center_img_lvxing_SLQ"></a></li>').appendTo(li);
                                    $('<div class="index_center_img_time_from_SLQ"><span class="index_center_img_time_SLQ">'+v['date']+'</span><span class="index_cener_img_from_SLQ">来自</span><span class="index_cener_img_from_add_SLQ">iPhone 9999plus</span></div>').appendTo(li);
                                    $('<span class="index_center_readme_zhuanfa_SLQ">'+v['text']).appendTo(li);
                                    $('<ul class="index_center_img_ul_zhuanfa_SLQ"><li class="index_center_img_li_SLQ"><a href="" class="index_center_img_name_zhuanfa_SLQ">@'+forw_info['content'][0]["user"]+'</a></li></ul>').appendTo(li);
                                    $('<span class="index_center_img_readme_SLQ">'+AnalyticEmotion(forw_info['content'][0]["text"])+'</span>').appendTo(li)
                                    var img_text_title = $('<div class="index_img_iii_SLQ">');
                                    var img_text_content = $('<div class="index_img_SLQ" id="pt">');
                                    var img_list = JSON.parse(forw_info['content'][0]['pictures']);
                                    for(var i=0;img_list.length > i;i++) {
                                        // console.log(i,'aaaa');
                                        // if(i==10){
                                        //     break
                                        // }
                                        // console.log(img_list[i]);
                                        $('<a href="#" target="_blank"><img src="/Static/user' + img_list[i] + '">').appendTo(img_text_content);
                                    }
                                    img_text_content.appendTo(img_text_title);
                                    img_text_title.appendTo(li);
                                    li.appendTo($('#Text'))
                                }
                            }
                        });
                        
                    }
                    else if (video.length == 1) {
                        var div = $("<div class='index_center_img_SLQ' id='" + v['to_weibo'] + "' style='position: relative;height: 489px;'>");
                        var headimg = $('<img href="" class="index_center_touxiang_SLQ" src="/Static/user/' + v["head_img"] + '">').appendTo(div);
                        var uldiv = $('<ul class="index_center_img_ul_SLQ">').appendTo(div);
                        var user = $('<li><a href="" class="index_center_img_name_SLQ">' + v["user"] +'</a></li>').appendTo(uldiv);
                        var imgtime = $('<div class="index_center_img_time_from_SLQ" style="margin: 65px 0 0 2px;">').appendTo(div);
                        var spantime = $('<span class="index_center_img_time_SLQ" style="margin: 72px 0px 0px 59px;">' + v["date"] + '</span>').appendTo(imgtime);
                        var text = $('<span class="index_center_readme_zhuanfa_SLQ" style="position: absolute;margin: 15px 0px 0px 58px;">').html(AnalyticEmotion(v["text"])).appendTo(div);
                        var video_div = $('<div class="index_center_img_wen"><video src="/Static/user' + video[0] + '" controls="controls" autoplay style="width: 481px;margin: 49px 0px 0px 45px;"></video></div>').appendTo(div);
                        // var Userinfo_img = $('<div class="Userinfo_img">').appendTo(div);
                        // $('<span class="Txt_operation_z iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info">&#xe60f;</em><em>' + v["fav_count"] + '</em>').appendTo(Userinfo_img);//赞的个数
                        // $('<span class="Txt_operation_p iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info ">&#xe60e;</em><em>' + v["com_count"] + '</em>').appendTo(Userinfo_img);//评论个数
                        // $('<span class="Txt_operation_zf"><em class="iconfont_info">&#xe611;</em><em>' + v["for_count"] + '</em>').appendTo(Userinfo_img);//转发个数
                        var OperatingCollection = $('<ul style="border-top-width: 1px;border-top-style: solid;border-color: #f2f2f5;position: absolute;position: absolute;bottom: -6px;width: 554px;left: 2px;">').appendTo(div);
                        var li_coll_one = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_one);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="iscollection(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                        $('<em>收藏</em>').appendTo(span_coll_stree);
                        var li_coll_two = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_two);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="isforwarding(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe611;</em>').appendTo(em_coll_one);
                        $('<em>' + v["for_count"] + '</em>').appendTo(span_coll_stree);
                        var li_coll_stree = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_stree);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="iscomments(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info ">&#xe60e;</em>').appendTo(em_coll_one);
                        $('<em>' + v["com_count"] + '</em>').appendTo(span_coll_stree);
                        var li_coll_four = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_four);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="islike(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                        $('<em>' + v["fav_count"] + '</em>').appendTo(span_coll_stree);
                        div.appendTo($('#Text'))

                    }
                    else if (pictures.length > 1) {
                        var li = $("<li class='Content_Center_li_img clearfix' style='list-style-type: none;' id='" + v['to_weibo'] + "'>");

                        var div = $("<div class='Content_Center_TXT_img clearfix' style='position: relative;min-height: 100px;top: 0;'>").appendTo(li);
                        var headimg = $('<img href="" class="index_center_touxiang_SLQ" src="/Static/user/' + v["head_img"] + '">').appendTo(div);
                        var uldiv = $('<ul class="index_center_img_ul_SLQ">').appendTo(div);
                        var user = $('<li><a href="" class="index_center_img_name_SLQ">' + v["user"] +'</a></li>').appendTo(uldiv);
                        var imgtime = $('<div class="index_center_img_time_from_SLQ" style="margin: 65px 0 0 2px;">').appendTo(div);
                        var spantime = $('<span class="index_center_img_time_SLQ" style="margin: 72px 0px 0px 59px;">' + v["date"] + '</span>').appendTo(imgtime);
                        var text = $('<span class="index_center_readme_zhuanfa_SLQ" style="position: absolute;margin: 15px 0px 0px 58px;">').html(AnalyticEmotion(v["text"])).appendTo(div);
                        // var img = $('<img src="/Static/user/'+pictures[0]+'"'+' width="266" height="180" style="margin-top: 56px;margin-left: 50px;margin-bottom: 26px;">').appendTo(div);

                        // var Text_img = $('<div class="Picture_zone">').appendTo(div);
                        // var ul = $('<ul>');
                        // for (var i = 0; i < pictures.length; i++) {
                        //     var li_list = $('<li style="list-style-type:none;"><img class="piccut_v piccut_h" src="/Static/user/' + pictures[i] + '">').appendTo(ul);
                        // }
                        // ul.appendTo(Text_img);
                        var img_text_title = $('<div class="index_img_iii_SLQ" style="margin: -17px 0 24px 0;">');
                        var img_text_content = $('<div class="index_img_SLQ" id="pt">');
                        // var img_list = JSON.parse(forw_info['content'][0]['pictures']);
                        for(var i=0;pictures.length > i;i++) {
                            $('<a href="#" target="_blank"><img style="width: 110px;height: 110px;" src="/Static/user' + pictures[i] + '">').appendTo(img_text_content);
                        }
                        img_text_content.appendTo(img_text_title);
                        img_text_title.appendTo(li);


                        var OperatingCollection = $('<ul style="border-top-width: 1px;border-top-style: solid;border-color: #f2f2f5;position: absolute;position: absolute;bottom: -2px;width: 554px;left: 0;">').appendTo(li);
                        var li_coll_one = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_one);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="iscollection(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                        $('<em>收藏</em>').appendTo(span_coll_stree);
                        var li_coll_two = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_two);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="isforwarding(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe611;</em>').appendTo(em_coll_one);
                        $('<em>' + v["for_count"] + '</em>').appendTo(span_coll_stree);
                        var li_coll_stree = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_stree);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="iscomments(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info ">&#xe60e;</em>').appendTo(em_coll_one);
                        $('<em>' + v["com_count"] + '</em>').appendTo(span_coll_stree);
                        var li_coll_four = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_four);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="islike(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                        $('<em>' + v["fav_count"] + '</em>').appendTo(span_coll_stree);

                        // var Center = $('<div class="Content_Center_TXT_img clearfix">').appendTo(li);
                        // var Text_info = $('<div class="Text_info">').appendTo(Center);
                        // var Text = $('<span>').html(AnalyticEmotion(v["text"])).appendTo(Text_info);
                        // // var Text_ = $('<span>'+v["text"]).appendTo(Text_info);
                        // var Text_img = $('<div class="Picture_zone">').appendTo(Center);
                        // var ul = $('<ul>');
                        // for (var i = 0; i < pictures.length; i++) {
                        //     li_list = $('<li><img class="piccut_v piccut_h" src="/Static/user/' + pictures[i] + '">').appendTo(ul);
                        // }
                        // ul.appendTo(Text_img);
                        // var Userinfo_img = $('<div class="Userinfo_img">').appendTo(Center);
                        // $('<span><a href="javascript:(0)"><img src="/Static/user/' + v["head_img"] + '" style="vertical-align: top;" width="18" height="18"></a></span>').appendTo(Userinfo_img);//用户头像
                        // $('<span><a href="javascript:(0)"><span>&nbsp;@' + v["user"] + '</span></a></span>').appendTo(Userinfo_img);//用户名
                        // $('<span>&nbsp;&nbsp;&nbsp;' + v['date'] + '</span>').appendTo(Userinfo_img);//时间
                        // $('<span class="Txt_operation_z iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info">&#xe60f;</em><em>' + v["fav_count"] + '</em>').appendTo(Userinfo_img);//赞的个数
                        // $('<span class="Txt_operation_p iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info ">&#xe60e;</em><em>' + v["com_count"] + '</em>').appendTo(Userinfo_img);//评论个数
                        // $('<span class="Txt_operation_zf"><em class="iconfont_info">&#xe611;</em><em>' + v["for_count"] + '</em>').appendTo(Userinfo_img);//转发个数
                        li.appendTo($('#Text'))
                        
                    }
                    else if (pictures.length == 1) {
                        var li = $("<li class='Content_Center_li' id='" + v['to_weibo'] + "' style='min-height: 70px;'>");
                        var div = $("<div class='.Content_Center_TXT' style='position: relative;min-height: 130px;'>").appendTo(li);
                        var headimg = $('<img href="" class="index_center_touxiang_SLQ" src="/Static/user/' + v["head_img"] + '">').appendTo(div);
                        var uldiv = $('<ul class="index_center_img_ul_SLQ">').appendTo(div);
                        var user = $('<li><a href="" class="index_center_img_name_SLQ">' + v["user"] +'</a></li>').appendTo(uldiv);
                        var imgtime = $('<div class="index_center_img_time_from_SLQ" style="margin: 65px 0 0 2px;">').appendTo(div);
                        var spantime = $('<span class="index_center_img_time_SLQ" style="margin: 72px 0px 0px 59px;">' + v["date"] + '</span>').appendTo(imgtime);
                        var text = $('<span class="index_center_readme_zhuanfa_SLQ" style="position: absolute;margin: 15px 0px 0px 58px;">').html(AnalyticEmotion(v["text"])).appendTo(div);
                        var img = $('<img src="/Static/user/'+pictures[0]+'"'+' width="266" height="180" style="margin-top: 56px;margin-left: 50px;margin-bottom: 26px;">').appendTo(div);

                        var OperatingCollection = $('<ul style="border-top-width: 1px;border-top-style: solid;border-color: #f2f2f5;position: absolute;position: absolute;bottom: -18px;width: 554px;left: -20px;">').appendTo(div);
                        var li_coll_one = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_one);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="iscollection(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                        $('<em>收藏</em>').appendTo(span_coll_stree);
                        var li_coll_two = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_two);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="isforwarding(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe611;</em>').appendTo(em_coll_one);
                        $('<em>' + v["for_count"] + '</em>').appendTo(span_coll_stree);
                        var li_coll_stree = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_stree);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="iscomments(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info ">&#xe60e;</em>').appendTo(em_coll_one);
                        $('<em>' + v["com_count"] + '</em>').appendTo(span_coll_stree);
                        var li_coll_four = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_four);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="islike(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                        $('<em>' + v["fav_count"] + '</em>').appendTo(span_coll_stree);
                        // var li = $("<li class='Content_Center_li'>");
                        // var Center = $('<div class="Content_Center_TXT">').appendTo(li);
                        // var Center_left = $('<div class="Text_left">').appendTo(Center);
                        // // $('<img src="/Static/user/nick/weibo_img/1/123.png" width="106" height="70">').appendTo(Center_left);   //后期修改
                        // $('<img src="/Static/user/'+pictures[0]+'"'+' width="106" height="70">').appendTo(Center_left);
                        // var Text_right = $('<div class="Text_right">').appendTo(Center);
                        // var Coutent = $('<div class="Coutent">').html(AnalyticEmotion(v["text"])).appendTo(Text_right);
                        // // var Coutent = $('<div class="Coutent">' + v['text'] + '</div>').appendTo(Text_right);
                        // var Content_Userinfo = $('<div class="Content_Userinfo">').appendTo(Text_right);
                        // var span = $('<span>').appendTo(Content_Userinfo);
                        // var MUser = $('<a href="javascript:(0)">').appendTo(span);//用户个人主页url
                        // var User_title_img = $('<img src="/Static/user/' + v["head_img"] + '" style="vertical-align: top;" width="18" height="18">').appendTo(MUser); //用户头像
                        // var span_User = $('<span>').appendTo(Content_Userinfo);
                        // var Userinfo = $('<a href="javascript:(0)">').appendTo(span_User);//用户个人主页url
                        // var Username = $('<span>&nbsp;@' + v["user"] + '</span>').appendTo(Userinfo);
                        // var span_time = $('<span>&nbsp;&nbsp;&nbsp;' + v["date"] + '</span>').appendTo(Content_Userinfo);
                        // var span_zan = $('<span class="Txt_operation_z iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info">&#xe60f;</em><em>' + v["fav_count"] + '</em>').appendTo(Content_Userinfo);//赞的个数
                        // var span_p = $('<span class="Txt_operation_p iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info ">&#xe60e;</em><em>' + v["com_count"] + '</em>').appendTo(Content_Userinfo);//评论个数
                        // var span_zf = $('<span class="Txt_operation_zf"><em class="iconfont_info">&#xe611;</em><em>' + v["for_count"] + '</em>').appendTo(Content_Userinfo);//转发个数
                        li.appendTo($('#Text'));

                    }
                    else if (pictures.length == 0){
                        var li = $("<li class='Content_Center_li' id='" + v['to_weibo'] + "'  style='min-height: 70px;'>");
                        var div = $("<div class='.Content_Center_TXT' style='position: relative;min-height: 130px;'>").appendTo(li);
                        var headimg = $('<img href="" class="index_center_touxiang_SLQ" src="/Static/user/' + v["head_img"] + '">').appendTo(div);
                        var uldiv = $('<ul class="index_center_img_ul_SLQ">').appendTo(div);
                        var user = $('<li><a href="" class="index_center_img_name_SLQ">' + v["user"] +'</a></li>').appendTo(uldiv);
                        var imgtime = $('<div class="index_center_img_time_from_SLQ" style="margin: 65px 0 0 2px;">').appendTo(div);
                        var spantime = $('<span class="index_center_img_time_SLQ" style="margin: 72px 0px 0px 59px;">' + v["date"] + '</span>').appendTo(imgtime);
                        var text = $('<span class="index_center_readme_zhuanfa_SLQ" style="position: absolute;margin: 15px 0px 0px 58px;">').html(AnalyticEmotion(v["text"])).appendTo(div);

                        var OperatingCollection = $('<ul style="border-top-width: 1px;border-top-style: solid;border-color: #f2f2f5;position: absolute;position: absolute;bottom: -18px;width: 554px;left: -20px;">').appendTo(div);
                        var li_coll_one = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_one);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="iscollection(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                        $('<em>收藏</em>').appendTo(span_coll_stree);
                        var li_coll_two = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_two);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="isforwarding(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe611;</em>').appendTo(em_coll_one);
                        $('<em>' + v["for_count"] + '</em>').appendTo(span_coll_stree);
                        var li_coll_stree = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_stree);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="iscomments(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info ">&#xe60e;</em>').appendTo(em_coll_one);
                        $('<em>' + v["com_count"] + '</em>').appendTo(span_coll_stree);
                        var li_coll_four = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                        var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_four);
                        var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                        var span_coll_two = $('<span onclick="islike(this,' + v['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                        var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                        var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                        $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                        $('<em>' + v["fav_count"] + '</em>').appendTo(span_coll_stree);
                        // var Center = $('<div class="Content_Center_TXT">').appendTo(li);
                        // var Text_right = $('<div class="Text_right">').appendTo(Center);
                        // var Coutent = $('<div class="Coutent">').html(AnalyticEmotion(v["text"])).appendTo(Text_right);
                        // var Content_Userinfo = $('<div class="Content_Userinfo">').appendTo(Text_right);
                        // var span = $('<span>').appendTo(Content_Userinfo);
                        // var MUser = $('<a href="javascript:(0)">').appendTo(span);//用户个人主页url
                        // var User_title_img = $('<img src="/Static/user/' + v["head_img"] + '" style="vertical-align: top;" width="18" height="18">').appendTo(MUser); //用户头像
                        // var span_User = $('<span>').appendTo(Content_Userinfo);
                        // var Userinfo = $('<a href="javascript:(0)">').appendTo(span_User);//用户个人主页url
                        // var Username = $('<span>&nbsp;@' + v["user"] + '</span>').appendTo(Userinfo);
                        // var span_time = $('<span>&nbsp;&nbsp;&nbsp;' + v["date"] + '</span>').appendTo(Content_Userinfo);
                        // var span_zan = $('<span class="Txt_operation_z iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info">&#xe60f;</em><em>' + v["fav_count"] + '</em>').appendTo(Content_Userinfo);//赞的个数
                        // var span_p = $('<span class="Txt_operation_p iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info ">&#xe60e;</em><em>' + v["com_count"] + '</em>').appendTo(Content_Userinfo);//评论个数
                        // var span_zf = $('<span class="Txt_operation_zf"><em class="iconfont_info">&#xe611;</em><em>' + v["for_count"] + '</em>').appendTo(Content_Userinfo);//转发个数
                        li.appendTo($('#Text'));
                    }
                    else {
                        console.log('服务器偷懒，获取信息失败，请重新获取！')
                    }
                })
            } else {
                console.log('服务器偷懒，获取信息失败，请重新获取！')
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


// 发微博
function Release() {
    var text = $('#Release_text').val();
    console.log(text);
    $.ajax({
        url: '/home.html',
        type: 'post',
        // 公开程度与类型原创转发收藏
        data: {'perm': 0, 'wb_type': 0, 'text': text, 'Cookie': document.cookie},
        dataType: 'json',
        success: function (arg) {
            $('#Release_text').val(' ');
            if (arg['status']) {
// {'text': 'hahha', 'perm': 0, 'user_id': '1', 'wb_type': 0, 'user': 'nick', 'video_link_id': '', 
// 'date': '1分钟前', 'forward_or_collect_from': None, 'pictures_link_id': ''}
                arg['connect']["head_img"] = $('#Content_center_right_top_img').attr('headimageurl');
//                 arg['connect']['text']
//                 var li = $("<li class='Content_Center_li'>");
//                 var Center = $('<div class="Content_Center_TXT">').appendTo(li);
//                 var Center_left = $('<div class="Text_left">').appendTo(Center);
//                 $('<img src="/Static/user/nick/weibo_img/1/123.png" width="106" height="70">').appendTo(Center_left);   //后期修改
//                 var Text_right = $('<div class="Text_right">').appendTo(Center);
//                 var Coutent = $('<div class="Coutent">' + arg['connect']['text'] + '</div>').appendTo(Text_right);
//                 var Content_Userinfo = $('<div class="Content_Userinfo">').appendTo(Text_right);
//                 var span = $('<span>').appendTo(Content_Userinfo);
//                 var MUser = $('<a href="javascript:(0)">').appendTo(span);//用户个人主页url
//                 $('<img src="/Static/user/' + arg['connect']["head_img"] + '" style="vertical-align: top;" width="18" height="18">').appendTo(MUser); //用户头像
//                 var span_User = $('<span>').appendTo(Content_Userinfo);
//                 var Userinfo = $('<a href="javascript:(0)">').appendTo(span_User);//用户个人主页url
//                 $('<span>&nbsp;@' + arg['connect']["user"] + '</span>').appendTo(Userinfo);
//                 $('<span>&nbsp;&nbsp;&nbsp;' + arg['connect']["date"] + '</span>').appendTo(Content_Userinfo);
//                 $('<span class="Txt_operation_z iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info">&#xe60f;</em><em>0</em>').appendTo(Content_Userinfo);//赞的个数
//                 $('<span class="Txt_operation_p iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info ">&#xe60e;</em><em>0</em>').appendTo(Content_Userinfo);//评论个数
//                 $('<span class="Txt_operation_zf"><em class="iconfont_info">&#xe611;</em><em>0</em>').appendTo(Content_Userinfo);//转发个数
                var pictures = arg['connect']['pictures_link_id'];
                var video = arg['connect']['video_link_id'];
                if (pictures) {
                    var pictures = JSON.parse(arg['connect']['pictures_link_id']);
                }
                if (video) {
                    var video = JSON.parse(arg['connect']['video_link_id']);
                }
                if(arg['connect']['wb_type'] == 1){
                    $.ajax({
                        url:'/index/weibocontent.html',
                        type:'post',
                        data:{'weibo_id':arg['connect']['forward'], 'Cookie':document.cookie},
                        dataType: 'json',
                        success: function (arg) {
                            var forw_info = arg ;
                            console.log(forw_info);
                            if (forw_info['status']){
                                li = $('<li class="index_center_img_SLQ" id="' + arg['connect']['to_weibo'] + '" style="position: relative">');
                                $('<img href="" class="index_center_touxiang_SLQ" src="' + arg['connect']["head_img"] + '"/>').appendTo(li);
                                $('<ul class="index_center_img_ul_SLQ"><li style="margin-top: 10px;"><a href="" class="index_center_img_name_SLQ">'+arg['connect']['user']+'</a></li><li><a class="index_center_img_V_SLQ"></a> <a class="index_center_img_vip_SLQ"></a><a class="index_center_img_lvxing_SLQ"></a></li>').appendTo(li);
                                $('<div class="index_center_img_time_from_SLQ"><span class="index_center_img_time_SLQ">'+arg['connect']['date']+'</span><span class="index_cener_img_from_SLQ">来自</span><span class="index_cener_img_from_add_SLQ">iPhone 9999plus</span></div>').appendTo(li);
                                $('<span class="index_center_readme_zhuanfa_SLQ">'+arg['connect']['text']).appendTo(li);
                                $('<ul class="index_center_img_ul_zhuanfa_SLQ"><li class="index_center_img_li_SLQ"><a href="" class="index_center_img_name_zhuanfa_SLQ">@'+forw_info['content'][0]["user"]+'</a></li></ul>').appendTo(li);
                                $('<span class="index_center_img_readme_SLQ">'+AnalyticEmotion(forw_info['content'][0]["text"])+'</span>').appendTo(li);
                                var img_text_title = $('<div class="index_img_iii_SLQ">');
                                var img_text_content = $('<div class="index_img_SLQ" id="pt">');
                                var img_list = JSON.parse(forw_info['content'][0]['pictures']);
                                for(var i=0;img_list.length > i;i++) {
                                    // console.log(i,'aaaa');
                                    // if(i==10){
                                    //     break
                                    // }
                                    // console.log(img_list[i]);
                                    $('<a href="#" target="_blank"><img src="/Static/user' + img_list[i] + '">').appendTo(img_text_content);
                                }
                                img_text_content.appendTo(img_text_title);
                                img_text_title.appendTo(li);

                                $('#Text').children().eq(0).after(li);
                            }
                        }
                    });

                }
                else if (video.length == 1) {
                    var div = $("<div class='index_center_img_SLQ' id='" + arg['connect']['to_weibo'] + "' style='position: relative;height: 489px;'>");
                    var headimg = $('<img href="" class="index_center_touxiang_SLQ" src="' + arg['connect']["head_img"] + '">').appendTo(div);
                    var uldiv = $('<ul class="index_center_img_ul_SLQ">').appendTo(div);
                    var user = $('<li><a href="" class="index_center_img_name_SLQ">' + arg['connect']["user"] +'</a></li>').appendTo(uldiv);
                    var imgtime = $('<div class="index_center_img_time_from_SLQ" style="margin: 65px 0 0 2px;">').appendTo(div);
                    var spantime = $('<span class="index_center_img_time_SLQ" style="margin: 72px 0px 0px 59px;">' + arg['connect']["date"] + '</span>').appendTo(imgtime);
                    var text = $('<span class="index_center_readme_zhuanfa_SLQ" style="position: absolute;margin: 15px 0px 0px 58px;">').html(AnalyticEmotion(arg['connect']["text"])).appendTo(div);
                    var video_div = $('<div class="index_center_img_wen"><video src="/Static/user' + video[0] + '" controls="controls" autoplay style="width: 481px;margin: 49px 0px 0px 45px;"></video></div>').appendTo(div);
                    // var Userinfo_img = $('<div class="Userinfo_img">').appendTo(div);
                    // $('<span class="Txt_operation_z iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info">&#xe60f;</em><em>' + v["fav_count"] + '</em>').appendTo(Userinfo_img);//赞的个数
                    // $('<span class="Txt_operation_p iconfont_info"><em class="iconfont_info">&#xe60a;</em><em class="iconfont_info ">&#xe60e;</em><em>' + v["com_count"] + '</em>').appendTo(Userinfo_img);//评论个数
                    // $('<span class="Txt_operation_zf"><em class="iconfont_info">&#xe611;</em><em>' + v["for_count"] + '</em>').appendTo(Userinfo_img);//转发个数
                    var OperatingCollection = $('<ul style="border-top-width: 1px;border-top-style: solid;border-color: #f2f2f5;position: absolute;position: absolute;bottom: -6px;width: 554px;left: 2px;">').appendTo(div);
                    var li_coll_one = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                    var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_one);
                    var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                    var span_coll_two = $('<span onclick="iscollection(this,' + arg['connect']['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                    var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                    var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                    $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                    $('<em>收藏</em>').appendTo(span_coll_stree);
                    var li_coll_two = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                    var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_two);
                    var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                    var span_coll_two = $('<span onclick="isforwarding(this,' + arg['connect']['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                    var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                    var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                    $('<em class="iconfont_info">&#xe611;</em>').appendTo(em_coll_one);
                    $('<em>0</em>').appendTo(span_coll_stree);
                    var li_coll_stree = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                    var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_stree);
                    var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                    var span_coll_two = $('<span onclick="iscomments(this,' + arg['connect']['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                    var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                    var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                    $('<em class="iconfont_info ">&#xe60e;</em>').appendTo(em_coll_one);
                    $('<em>0</em>').appendTo(span_coll_stree);
                    var li_coll_four = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                    var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_four);
                    var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                    var span_coll_two = $('<span onclick="islike(this,' + arg['connect']['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                    var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                    var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                    $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                    $('<em>0</em>').appendTo(span_coll_stree);

                    $('#Text').children().eq(0).after(div)

                }
                else if (pictures.length > 1) {
                    var li = $("<li class='Content_Center_li_img clearfix' style='list-style-type: none;' id='" + arg['connect']['to_weibo'] + "'>");

                    var div = $("<div class='Content_Center_TXT_img clearfix' style='position: relative;min-height: 100px;top: 0;'>").appendTo(li);
                    var headimg = $('<img href="" class="index_center_touxiang_SLQ" src="' + arg['connect']["head_img"] + '">').appendTo(div);
                    var uldiv = $('<ul class="index_center_img_ul_SLQ">').appendTo(div);
                    var user = $('<li><a href="" class="index_center_img_name_SLQ">' + arg['connect']["user"] +'</a></li>').appendTo(uldiv);
                    var imgtime = $('<div class="index_center_img_time_from_SLQ" style="margin: 65px 0 0 2px;">').appendTo(div);
                    var spantime = $('<span class="index_center_img_time_SLQ" style="margin: 72px 0px 0px 59px;">' + arg['connect']["date"] + '</span>').appendTo(imgtime);
                    var text = $('<span class="index_center_readme_zhuanfa_SLQ" style="position: absolute;margin: 15px 0px 0px 58px;">').html(AnalyticEmotion(arg['connect']["text"])).appendTo(div);
                    // var img = $('<img src="/Static/user/'+pictures[0]+'"'+' width="266" height="180" style="margin-top: 56px;margin-left: 50px;margin-bottom: 26px;">').appendTo(div);

                    // var Text_img = $('<div class="Picture_zone">').appendTo(div);
                    // var ul = $('<ul>');
                    // for (var i = 0; i < pictures.length; i++) {
                    //     var li_list = $('<li style="list-style-type:none;"><img class="piccut_v piccut_h" src="/Static/user/' + pictures[i] + '">').appendTo(ul);
                    // }
                    // ul.appendTo(Text_img);
                    var img_text_title = $('<div class="index_img_iii_SLQ" style="margin: -17px 0 24px 0;">');
                    var img_text_content = $('<div class="index_img_SLQ" id="pt">');
                    // var img_list = JSON.parse(forw_info['content'][0]['pictures']);
                    for(var i=0;pictures.length > i;i++) {
                        $('<a href="#" target="_blank"><img style="width: 110px;height: 110px;" src="/Static/user' + pictures[i] + '">').appendTo(img_text_content);
                    }
                    img_text_content.appendTo(img_text_title);
                    img_text_title.appendTo(li);


                    var OperatingCollection = $('<ul style="border-top-width: 1px;border-top-style: solid;border-color: #f2f2f5;position: absolute;position: absolute;bottom: -2px;width: 554px;left: 0;">').appendTo(li);
                    var li_coll_one = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                    var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_one);
                    var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                    var span_coll_two = $('<span onclick="iscollection(this,' + arg['connect']['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                    var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                    var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                    $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                    $('<em>收藏</em>').appendTo(span_coll_stree);
                    var li_coll_two = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                    var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_two);
                    var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                    var span_coll_two = $('<span onclick="isforwarding(this,' + arg['connect']['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                    var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                    var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                    $('<em class="iconfont_info">&#xe611;</em>').appendTo(em_coll_one);
                    $('<em>0</em>').appendTo(span_coll_stree);
                    var li_coll_stree = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                    var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_stree);
                    var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                    var span_coll_two = $('<span onclick="iscomments(this,' + arg['connect']['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                    var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                    var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                    $('<em class="iconfont_info ">&#xe60e;</em>').appendTo(em_coll_one);
                    $('<em>0</em>').appendTo(span_coll_stree);
                    var li_coll_four = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                    var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_four);
                    var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                    var span_coll_two = $('<span onclick="islike(this,' + arg['connect']['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                    var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                    var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                    $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                    $('<em>0</em>').appendTo(span_coll_stree);

                    $('#Text').children().eq(0).after(li)

                }
                else if (pictures.length == 1) {
                    var li = $("<li class='Content_Center_li' id='" + arg['connect']['to_weibo'] + "' style='min-height: 70px;'>");
                    var div = $("<div class='.Content_Center_TXT' style='position: relative;min-height: 130px;'>").appendTo(li);
                    var headimg = $('<img href="" class="index_center_touxiang_SLQ" src="' + arg['connect']["head_img"] + '">').appendTo(div);
                    var uldiv = $('<ul class="index_center_img_ul_SLQ">').appendTo(div);
                    var user = $('<li><a href="" class="index_center_img_name_SLQ">' + arg['connect']["user"] +'</a></li>').appendTo(uldiv);
                    var imgtime = $('<div class="index_center_img_time_from_SLQ" style="margin: 65px 0 0 2px;">').appendTo(div);
                    var spantime = $('<span class="index_center_img_time_SLQ" style="margin: 72px 0px 0px 59px;">' + arg['connect']["date"] + '</span>').appendTo(imgtime);
                    var text = $('<span class="index_center_readme_zhuanfa_SLQ" style="position: absolute;margin: 15px 0px 0px 58px;">').html(AnalyticEmotion(arg['connect']["text"])).appendTo(div);
                    var img = $('<img src="/Static/user/'+pictures[0]+'"'+' width="266" height="180" style="margin-top: 56px;margin-left: 50px;margin-bottom: 26px;">').appendTo(div);

                    var OperatingCollection = $('<ul style="border-top-width: 1px;border-top-style: solid;border-color: #f2f2f5;position: absolute;position: absolute;bottom: -18px;width: 554px;left: -20px;">').appendTo(div);
                    var li_coll_one = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                    var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_one);
                    var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                    var span_coll_two = $('<span onclick="iscollection(this,' + arg['connect']['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                    var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                    var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                    $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                    $('<em>收藏</em>').appendTo(span_coll_stree);
                    var li_coll_two = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                    var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_two);
                    var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                    var span_coll_two = $('<span onclick="isforwarding(this,' + arg['connect']['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                    var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                    var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                    $('<em class="iconfont_info">&#xe611;</em>').appendTo(em_coll_one);
                    $('<em>0</em>').appendTo(span_coll_stree);
                    var li_coll_stree = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                    var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_stree);
                    var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                    var span_coll_two = $('<span onclick="iscomments(this,' + arg['connect']['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                    var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                    var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                    $('<em class="iconfont_info ">&#xe60e;</em>').appendTo(em_coll_one);
                    $('<em>0</em>').appendTo(span_coll_stree);
                    var li_coll_four = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                    var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_four);
                    var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                    var span_coll_two = $('<span onclick="islike(this,' + arg['connect']['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                    var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                    var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                    $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                    $('<em>0</em>').appendTo(span_coll_stree);

                    $('#Text').children().eq(0).after(li);

                }
                else if (pictures.length == 0){
                    var li = $("<li class='Content_Center_li' id='" + arg['connect']['to_weibo'] + "'  style='min-height: 70px;'>");
                    var div = $("<div class='.Content_Center_TXT' style='position: relative;min-height: 130px;'>").appendTo(li);
                    var headimg = $('<img href="" class="index_center_touxiang_SLQ" src="' + arg['connect']["head_img"] + '">').appendTo(div);
                    var uldiv = $('<ul class="index_center_img_ul_SLQ">').appendTo(div);
                    var user = $('<li><a href="" class="index_center_img_name_SLQ">' + arg['connect']["user"] +'</a></li>').appendTo(uldiv);
                    var imgtime = $('<div class="index_center_img_time_from_SLQ" style="margin: 65px 0 0 2px;">').appendTo(div);
                    var spantime = $('<span class="index_center_img_time_SLQ" style="margin: 72px 0px 0px 59px;">' + arg['connect']["date"] + '</span>').appendTo(imgtime);
                    var text = $('<span class="index_center_readme_zhuanfa_SLQ" style="position: absolute;margin: 15px 0px 0px 58px;">').html(AnalyticEmotion(arg['connect']["text"])).appendTo(div);

                    var OperatingCollection = $('<ul style="border-top-width: 1px;border-top-style: solid;border-color: #f2f2f5;position: absolute;position: absolute;bottom: -18px;width: 554px;left: -20px;">').appendTo(div);
                    var li_coll_one = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                    var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_one);
                    var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                    var span_coll_two = $('<span onclick="iscollection(this,' + arg['connect']['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                    var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                    var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                    $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                    $('<em>收藏</em>').appendTo(span_coll_stree);
                    var li_coll_two = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                    var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_two);
                    var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                    var span_coll_two = $('<span onclick="isforwarding(this,' + arg['connect']['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                    var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                    var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                    $('<em class="iconfont_info">&#xe611;</em>').appendTo(em_coll_one);
                    $('<em>0</em>').appendTo(span_coll_stree);
                    var li_coll_stree = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                    var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_stree);
                    var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                    var span_coll_two = $('<span onclick="iscomments(this,' + arg['connect']['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                    var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                    var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                    $('<em class="iconfont_info ">&#xe60e;</em>').appendTo(em_coll_one);
                    $('<em>0</em>').appendTo(span_coll_stree);
                    var li_coll_four = $('<li style="width: 25%;float: left;height: 38px;list-style-type: none;">').appendTo(OperatingCollection);
                    var a_coll = $('<a style="display: block;margin: 0 0 0 1px;padding: 1px 0;text-align: center;color: #808080;text-decoration: none;-webkit-tap-highlight-color: rgba(0,0,0,0);">').appendTo(li_coll_four);
                    var span_coll_one = $('<span style="display: block;margin-left: -1px;text-align: center;color: #808080;">').appendTo(a_coll);
                    var span_coll_two = $('<span onclick="islike(this,' + arg['connect']['to_weibo'] + ');" style="display: block;height: 22px;margin: 7px 0;border-left-width: 1px;border-left-style: solid;line-height: 22px;border-color: #d9d9d9;text-align: center;color: #808080;cursor: pointer;">').appendTo(span_coll_one);
                    var span_coll_stree = $('<span style="line-height: 22px;">').appendTo(span_coll_two);
                    var em_coll_one = $('<em style="font-size: 15px;vertical-align: top;margin-left: 2px;margin-right: 3px;color: #696e78;display: inline-block; -webkit-font-smoothing: antialiased;font-style: normal;font-weight: normal;">').appendTo(span_coll_stree);
                    $('<em class="iconfont_info">&#xe60f;</em>').appendTo(em_coll_one);
                    $('<em>0</em>').appendTo(span_coll_stree);

                    $('#Text').children().eq(0).after(li)
                } else {
                    console.log('服务器偷懒，获取信息失败，请重新获取！')
                }

            } else {
                console.log(arg['message'])
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

// 图片上传
function updata_pctert() {
    $.ajax({
        url: '/home/upload/pv.html',
        data: {'asdfasdf': 'czcdremovefdsfdsfd'},
        type: 'get',
        success: function () {

        }
    });

    // $('#upload_zp').remove();
    // $('<input type="file" class="hide" id="upload_zp" multiple>').appendTo($('#prcuter_one'));
    $('#upload_zp').trigger('click');
    $('#upload_zp').bind('change', function () {
        $('#picuter_one_s1').css('display', 'none');
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
                    $('#picuter_one_s1').addClass('hide');
                    $('#layer_nick').removeClass('hide');
                    // $('#partenimgnine').find('div').last().css('background', 'url("/Static/user/' + img + '") center center');
                    // document.getElementById("partenimgnine").lastChild.firstChild.style.setProperty('background', 'url("/Static/user/' + img + '") center center');
                    $('#num_totla').text(Number($('#num_totla').text())+1);
                    $('#num_remain').text($('#num_remain').text()-1);
                    if ($('#num_remain').text() == 0){
                        $('#Addimgnineid').css('background-color','#ffc09f').css('cursor','not-allowed').attr('onclick', "");
                    } else {
                        $('#Addimgnineid').css('background-color','#ff8140').css('cursor','auto').attr('onclick', "Addimgnine();");
                    }

                } else {
                    alert(arg['message'])
                }
            }
        });

    })
}

function flush_Text() {
    var weibo_input = $('#new_weibo_input');
    $('#Text').empty().appendTo(weibo_input);
    Request_login_content()
}




/* 发微博上传图片九宫格隐藏 bu_nick */
function Addhidex() {
    $('#layer_nick').addClass('hide');
}

/* 发微博上传图片九宫格添加img框 by_nick */
function Addimgnine(arg) {
    $('#upload_zp').trigger('click');
}

/* 上传图片立即本地预览 by_nick */
function handleFileSelect(evt) {
    var files = evt.target.files;
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }
      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML =
          [
           '<div style="background:url(' + e.target.result + ') center center;' +
          'width:80px;height:59px;float: left;margin: 1px;background-repeat: round;"></div>'
          ].join('');
          document.getElementById('partenimgnine').insertBefore(span, null);
        };
      })(f);
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

document.getElementById('upload_zp').addEventListener('change', handleFileSelect, false);



/* 全局变量 by nick */
weibo_id_list = [];
/* 心跳函数 by nick */
function move() {
    $('#flush_text').remove();
    $.ajax({
        url: "/home/push/mess.html",
        data: {"weibo_id_list": JSON.stringify(weibo_id_list)},
        type: "post",
        dataType: "json",
        success: function (arg) {
            console.log(arg);
            if (arg.status){
                // {"perm": 0, "forward_or_collect_from": null, "video_link_id": "", "pictures_link_id": "",
                // "text": "\u597d\u4e86\uff0c\u54c8", "user_id": "4", "date": "1\u5206\u949f\u524d",
                // "wb_type": 0, 'id':666}
                var num = arg.num;
                var message = arg.message;
                var count = JSON.parse(arg.count);
                console.log("CCCCCCCCCC", typeof (count), count);
                $(count).each(function () {
                    console.log($(this)[0]['id']);
                    weibo_id_list.push($(this)[0]['id']);
                });
                title_info = $('<li id="flush_text"><a onclick="flush_Text()" href="" id="new_text" class="search_new_text_SLQ">有'+num+'条新微薄，点击刷新</a></li>');
                $('#Text').children().eq(0).after(title_info);
                console.log("您有", num, "新微薄");
            }
        }
    })
}


/* 搜索 by nick */
$('.Seek_img').bind("click", function () {
    var search_values = $('.index_seek [name="seek"]').val();
    location.href='/index/search.html/?type=user';
    $.ajax({
        type: 'GET',
        url: '/index/search.html/',
        data: {'type': 'user', 'text': search_values},
        dataType: 'json',
        success: function (arg) {
            console.log(arg);
            console.log(arg['status']);
            if (arg['status']){
                location.href = ''
                var countlist = arg['count'];
                for(var i=0;i<countlist.length;i++){
                    var st = '<li><div class="search_body_L_flag"><img class="search_user_img" src="/Static' +
                            countlist[i]['head_img'] + '"><a  href="" class="search_user_name" >' + countlist[i]['name'] +
                            '</a><a href="" class="search_user_V"></a><span class="search_user_sex"></span><span class="search_user_address">'
                            + countlist[i]['sex'] + '<a href="http://weibo.com/chenchiaoen"> http://weibo.com/chenchiaoen</a>' +
                            '<span class="search_user_job">' + countlist[i]['tags'] + '</span><span class="search_user_inf">关注 450  |  粉丝 5265万  |  微博 4284 </span>'
                            + '<a class="search_user_trends">' + countlist[i]['brief'] + '</a><span>.......</span></span></div></li>';
                    $('#ulcount').append(st);
                }
            }
        }
    })
})







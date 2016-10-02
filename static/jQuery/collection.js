/**
 * Created by Nick on 2016/10/1.
 */


// 收藏
function iscollection(ths, id) {
    // var id = $(ths).parent().parent().parent().parent().parent().attr('id');
}

// 转发
function isforwarding(ths, id) {
    // var id = $(ths).parent().parent().parent().parent().parent().attr('id');
}


// [{'user__user_id': 7, 'user__head_img': 'jenny/User_info/mm.jpeg', 'user__name': '珍妮', 'id': 14,
//         #   'comment': '这个视频屌爆了', 'p_comment_id': None},
//         #  {'user__user_id': 1, 'user__head_img': 'nick/User_info/mm.jpeg', 'user__name': 'nick', 'id': 15,
//         #   'comment': '碉堡了二', 'p_comment_id': 14}]

// 评论
function iscomments(ths, id) {
    var status = $('#commitpl').attr('status_com');
    if (status){
        $('#commitpl').remove();
        return
    }
    var nameinfo = $('#nameinfo').text();
    var imgheadurl = $('#Content_center_right_top_img').css('background-image');
    // var imgheadurl = $('#Content_center_right_top_img').attr('headimageurl');
    // var id = $(ths).parent().parent().parent().parent().parent().attr('id');
    var div = $('<div id="commitpl" status_com="true" class="div_com">').insertBefore(ths);
    var ul = $('<ul>').appendTo(div);
    var li = $('<li class="li_com">').appendTo(ul);
    var img = $('<img class="img_com" src="' + imgheadurl + '">').appendTo(li);
    var div_com_name = $('<div class="name_com">' + nameinfo + '</div>').appendTo(li);
    var div_com_time = $('<div class="time_com">' + '现在' + '</div>').appendTo(li);
    var div_com_text = $('<div>').appendTo(li);
    var input = $('<input style="height: 30px; width: 360px;margin-left: -1px;" type="text">').appendTo(div_com_text);
    var botton = $('<button class="booton_com" onclick="is_comments_submit(this,' + id +');">评论</button>').appendTo(div_com_text);

    $.ajax({
        url: '/home/com.html',
        type: 'GET',
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {'id':id},
        success: function (callback) {
            if (callback.status){
                console.log("ccccc", callback);
                for (var i=0;i<callback['id'].length;i++){
                    var li = $('<li class="li_com">').appendTo(ul);
                    var img = $('<img class="img_com" src="/Static/user/' + callback['id'][i]['user__head_img'] + '">').appendTo(li);
                    var div_com_name = $('<div class="name_com">' + callback['id'][i]['user__name'] + '</div>').appendTo(li);
                    var div_com_time = $('<div class="time_com">' + '几分钟前' + '</div>').appendTo(li);
                    var div_com_text = $('<div class="text_com">').appendTo(li);
                    var div_com_span = $('<span>' + callback['id'][i]['comment'] + '</span>').appendTo(div_com_text);

                }

            } else {

            }
        }
    })
}
    // <div class="div_com">
    //     <ul>
    //       <li class="li_com">
    //             <img class="img_com" src="http://127.0.0.1:8000/Static/user/nick/weibo_img/100b883c84e1f3bdbaca434aeb0ed94d5d1c52e1/e70189cffc9433a3ef387e1a748481f774ef24e9.jpg">
    //             <div class="name_com">小强</div>
    //             <div class="time_com">几分钟前</div>
    //             <div>
    //                 <input style="height: 30px; width: 360px;margin-left: -1px;" type="text">
    //                 <button class="booton_com" onclick="is_comments_submit(this);">评论</button>
    //             </div>
    //       </li>
    //       <li>
    //             <img class="img_com" src="http://127.0.0.1:8000/Static/user/nick/weibo_img/100b883c84e1f3bdbaca434aeb0ed94d5d1c52e1/e70189cffc9433a3ef387e1a748481f774ef24e9.jpg">
    //             <div class="name_com">小强</div>
    //             <div class="time_com">几分钟前</div>
    //             <div class="text_com">
    //                 <span>发送到发送到非师范生放水电费水电费水电费</span>
    //             </div>
    //       </li>
    //     </ul>
    // </div>
function is_comments_submit(ths, id) {
    // var id = $(ths).parent().parent().parent().parent().parent().attr('id');
    var textcom = $(ths).prev().val();

    $.ajax({
        url: '/home/com.html',
        type: 'GET',
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {'id':id, "text":textcom},
        success: function (callback) {
            if (callback.status){
                console.log(callback);
                $(ths).prev().val('');
                var ul = $(ths).parent().parent().parent().children().first();
                for (var i=0;i<callback['id'].length;i++){
                    var li = $('<li class="li_com">').insertAfter(ul);
                    var img = $('<img class="img_com" src="/Static/user/' + callback['id'][i]['user__head_img'] + '">').appendTo(li);
                    var div_com_name = $('<div class="name_com">' + callback['id'][i]['user__name'] + '</div>').appendTo(li);
                    var div_com_time = $('<div class="time_com">' + '1分钟前' + '</div>').appendTo(li);
                    var div_com_text = $('<div class="text_com">').appendTo(li);
                    var div_com_span = $('<span>' + callback['id'][i]['comment'] + '</span>').appendTo(div_com_text);
                }

            } else {

            }
        }
    })
}


// 点赞
function islike(ths, id) {
    // var id = $(ths).parent().parent().parent().parent().parent().attr('id');
    $.ajax({
        url: '/home/fav.html',
        type: 'GET',
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {'id':id},
        success: function (callback) {
            if (callback.status){
                $(ths).children().children().last().text(Number($(ths).children().children().last().text())+1);
            } else {
                $(ths).css('corol', 'red');
            }
        }
    })
}


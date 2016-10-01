/**
 * Created by Nick on 2016/10/1.
 */


// 收藏
function iscollection(ths) {
    var id = $(ths).parent().parent().parent().parent().parent().attr('id');
}

// 转发
function isforwarding(ths) {
    var id = $(ths).parent().parent().parent().parent().parent().attr('id');
}

// 评论
function iscomments(ths) {
    var id = $(ths).parent().parent().parent().parent().parent().attr('id');
}

// 点赞
function islike(ths) {
    var id = $(ths).parent().parent().parent().parent().parent().attr('id');
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


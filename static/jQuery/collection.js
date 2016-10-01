/**
 * Created by Nick on 2016/10/1.
 */


// 收藏
function iscollection(ths) {
    
}

// 转发
function isforwarding(ths) {
    
}

// 评论
function iscomments(ths) {
    
}

// 点赞
function islike(ths) {
    var id = $(ths).parent().parent().parent().parent().parent().parent().attr('id');
    console.log("iiidddd:", id);
    $.ajax({
        url: 'home/fav.html',
        type: 'GET',
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {'id':id},
        success: function (callback) {
            console.log(callback);
        }
    })
}


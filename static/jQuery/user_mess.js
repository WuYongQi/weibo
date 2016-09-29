/**
 * Created by Nick on 2016/9/29.
 */


$(function () {
    $.ajax({
        url: '/home.html',
        type: 'GET',
        data: {'follew': '6cabc8fafc6dc'},
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (callback) {
            console.log(callback);
            var my_followers_len = callback['count']['my_followers_len'];
            var follow_list_len = callback['count']['follow_list_len'];
            var weibo_len = callback['count']['weibo_len'];
            var age = callback['count']['age'];
            var email = callback['count']['email'];
            var name = callback['count']['name'];
            var sex = callback['count']['sex'];
            var tags = callback['count']['tags'];
            var head_img = callback['count']['head_img'];

            $('#nameinfo').text(name);
            $('#follow_list_len').text(follow_list_len);
            $('#my_followers_len').text(my_followers_len);
            $('#weibo_len').text(weibo_len);
            $('.Content_center_right_top_img').css('background-image','url(/Static/user/' + head_img + ')')
        }
    });
});


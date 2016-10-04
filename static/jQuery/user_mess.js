/**
 * Created by Nick on 2016/9/29.
 */


$(function () {
    /* 登录后获取用户信息 */
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
            var user = callback['count']['user'];
            var user_id = callback['count']['user_id'];
            var sex = callback['count']['sex'];
            var tags = callback['count']['tags'];
            var head_img = callback['count']['head_img'];
            var follow_list = callback['count']['follow_list'];
            var my_followers = callback['count']['my_followers'];
            var weibo = callback['count']['weibo'];

            
            User_id = user_id;
            
            $('#nameinfo').text(name).attr('user_id', user_id);
            $('#follow_list_len').text(follow_list_len);
            $('#my_followers_len').text(my_followers_len);
            $('#weibo_len').text(weibo_len);
            $('.Content_center_right_top_img').css('background-image','url(/Static/user/' + head_img + ')');
            $('#Content_center_right_top_img').attr('headimageurl','/Static/user/' + head_img);

            
// age:21
// brief:"I love Nick."
// email:"suoning8@163.com"
// head_img:"jenny/User_info/mm.jpeg"
// name:"珍妮"
// sex:0
// tags:null
// user:"jenny"
// id:"4"
//         <div class="contact">
//             <img src="/Static/img/wechatimg/1.png" alt="" class="contact__photo"/>
//             <span class="contact__name">Ethan Hawke</span>
//             <span class="contact__status online"></span>
//         </div>
//         <div class="contact">
//             <img src="/Static/img/wechatimg/8.png" alt="" class="contact__photo"/>
//             <span class="contact__name">Eva Green</span>
//             <span class="contact__status"></span>
//         </div>
//             关注人聊天信息添加
            for (var i=0;i<follow_list_len;i++){
                // follow_list[i]
                var div = $('<div class="contact" id="' + follow_list[i]['id'] + '">').appendTo($('#sidebar-content'));
                var img = $('<img src="/Static/user/' + follow_list[i]['head_img'] + '" alt="" class="contact__photo"/>').appendTo(div);
                $('<span class="contact__name">' + follow_list[i]['name'] + '</span>').appendTo(div);
                $('<span class="contact__status"></span>').appendTo(div);
                
            }
            
            
        }
    });
});



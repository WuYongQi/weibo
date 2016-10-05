/**
 * Created by Nick on 2016/9/29.
 */


User_id = '';


$(document).ready(function () {
    //delegate 事件链,把多个事件进行绑定
    //给body下的textarea进行绑定,当回车键按下后执行的函数
    $("#demowechat").delegate('input', "keydown", function (e) {
        console.log("按下键盘了啊！！！");
        if (e.which == 13) {//如果13这个按键(回车,可以通过console.log输出实际按下的那个键),执行下面的函数
            //send msg button clicked
            var msg_text = $("#yourmessage").val();
            if ($.trim(msg_text).length > 0) { //如果去除空格后,大于0
                //console.log(msg_text);
                //SendMsg(msg_text); //把数据进行发送
            }
            //把数据发送到聊天框里
            AddSentMsgIntoBox(msg_text);
            $("#yourmessage").val('');
        }
    });
});

function Sendmess() {
    var msg_text = $("#yourmessage").val();
    if ($.trim(msg_text).length > 0) { //如果去除空格后,大于0
        //console.log(msg_text);
        //SendMsg(msg_text); //把数据进行发送
    }
    //把数据发送到聊天框里
    AddSentMsgIntoBox(msg_text);
    $("#yourmessage").val('');
}


//定义发送到聊天框函数
function AddSentMsgIntoBox(msg_text) {
    //拼接聊天内容
    /*气泡实现
     */
    var msg_ele = '<div class="chat__msgRow">' + '<div class="chat__message notMine">' +
        msg_text + '</div></div>';
    $("#chat__messages").append(msg_ele);
    //animate 动画效果
    $('#chat__messages').animate({
            scrollTop: $('#chat__messages')[0].scrollHeight
        }, 500
    );//动画效果结束

    var to_user_id = $(".chat__name").attr('id');
    var datamess = {
        // "to": User_id,
        "to": to_user_id,
        "mess": msg_text,
        'from': $('#nameinfo').attr('user_id')
    };

    DumpSession2(to_user_id, 'single_contact', datamess);

    $.ajax({
        url: '/save_hostinfo.html',
        type: 'POST',
        tradition: true,
        data: {data: JSON.stringify(datamess)},
        success: function (arg) {
            //成功接收的返回值(返回条目)
            var callback_dict = $.parseJSON(arg);//这里把字符串转换为对象
            //然后咱们就可以判断
            if (callback_dict) {//执行成功了
                //设置5秒钟后隐藏
                setTimeout("hide()", 5000);
                var change_infos = '修改了' + callback_dict['change_count'] + '条数据';
                $('#handle_status').text(change_infos).removeClass('hide')
            } else {//如果为False执行失败了
                alert(callback_dict.error)
            }
        }
    });
}//发送到聊天框函数结束



function AddRecvMsgToChatBox(msg_item, me_type) {
    if ($(".chat__name").attr('id') == me_type){
        var msg_ele = '<div class="chat__msgRow">' + '<div class="chat__message notMine">' +
        msg_item + '</div></div>';
    }else {
        var msg_ele = '<div class="chat__msgRow">' + '<div class="chat__message mine">' +
        msg_item + '</div></div>';
    }

    $("#chat__messages").append(msg_ele);
    //animate 动画效果
    $('#chat__messages').animate({
            scrollTop: $('#chat__messages')[0].scrollHeight
        }, 500
    );//动画效果结束
}


//接收消息
function GetNewMsgs() {
    $.get("/save_hostinfo.html", function (callback) {
        console.log("----->new msg:", callback);
        var msg_list = JSON.parse(callback);
        var current_open_session_id = $(".chat__name").attr('id');//获取当前打开的ID
        // var current_open_session_type = $('#chat_hander h2').attr("contact_type");//获取当前打开的类型,是单独聊天还是群组聊天
        $.each(msg_list, function (index, msg_item) {
            //接收到的消息的to,是我自己 from是谁发过来的,如果是当前打开的ID和from相同说明,我现在正在和他聊天直接显示即可
            //判断挡墙打开ID接收
            if (msg_item.from == current_open_session_id) {
                AddRecvMsgToChatBox(msg_item.mess, msg_item.to)
            } else {
                $("div[id="+msg_item.from+"]").children().last().addClass('online');
            }
            DumpSession2(msg_item.from, 'single_contact', msg_item)
        });//结束循环
        console.log('run.....agin.....');
    })
}//接收消息结束

//循环接收消息
setInterval(function () {
    GetNewMsgs();
}, 10000);


//定义一个全局变量存储用户信息
GLOBAL_SESSION_CACHE = {
    'single_contact': {},
    'group_contact': {},
};

//存储未打开的聊天内容
function DumpSession2(contact_from_id, contact_type, content) {
    // msg_item.mess.from, 'single_contact', msg_item.mess.content
    console.log(contact_from_id, contact_type, content);
    if (GLOBAL_SESSION_CACHE[contact_type][contact_from_id]) {
        GLOBAL_SESSION_CACHE[contact_type][contact_from_id].push(content);
    } else if (contact_from_id){
        GLOBAL_SESSION_CACHE[contact_type][contact_from_id] = [content];
    }
}


//点击用户打开连天窗口
function OpenDialogBox(ele) {
    //获取与谁聊天
    var contact_id = $(ele).attr("contact_id");
    var contact_name = $(ele).attr("chat_to");
    var contact_type = $(ele).attr("contact_type");
    //先把当前聊天的内容存储起来
    DumpSession();
    //当前聊天内容存储结束

    //修改聊天框与谁聊天
    var chat_to_info = "<h2 style='color:whitesmoke;text-align:center;' contact_type='" + contact_type + "' contact_id='" + contact_id + "'>" + contact_name + "</h2>";
    $('#chat_hander').html(chat_to_info);
    $('.chat_contener').html(LoadSession(contact_id, contact_type));

    //清除未读消息显示
    var unread_msg_num_ele = $(ele).find('span')[0];
    $(unread_msg_num_ele).text(0);
    $(unread_msg_num_ele).addClass('hide')
}//打开聊天窗口结束




//加载新的聊天窗口,把要打开的聊天内容重新加载上
function LoadSession(contact_id, current_contact_type) {
    //通过hasOwnProperty判断key是否存在
    if (GLOBAL_SESSION_CACHE[current_contact_type].hasOwnProperty(contact_id)) {
        var messbefore = GLOBAL_SESSION_CACHE[current_contact_type][contact_id];
        $.each(messbefore, function () {
            AddRecvMsgToChatBox($(this)[0].mess, $(this)[0].to)
        })
    } else {

    }
}





$(function(){
    getUserinfo();

    //给退出按钮绑定弹窗以及退出事件，引用laiui弹出层的confirm组件
    $('#btn_quit').on('click',function(){

        layer.confirm('是否要退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            location.href = '/login.html';
            localStorage.removeItem('token');
            layer.close(index);
          });
    })
})

/* 获取用户信息 */
function getUserinfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status!==0){
                console.log(res);
                return layui.layer.msg('获取失败')
            }
            renderAvatar(res.data);
            
        }
        /* complete:function(res){
            console.log(res);

            if(res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败'){
                localStorage.removeItem('token');
                location.href = '/login.html';
            }
        } */
        
    })
}


/* 渲染用户头像 */
function renderAvatar(user){
    var name = user.nickname? user.nickname : user.username;
    $('.welcome').html('欢迎'+name);

    if(user.user_pic !== null){
        $('.text-avatar').hide();
        $('.layui-nav-img').attr('src',user.user_pic);
    }else{
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first);
    }
}


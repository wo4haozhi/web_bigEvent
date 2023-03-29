$(function(){
    var layer = layui.layer
    var q = {
        pagenum:1,
        pagesize:2,
        cate_id:'',
        state:''
    }

    initTable()
    function initTable(){
        $.ajax({
            method:'GET',
            url:'/my/article/list',
            data:q,
            success:function(res){
                if(res.status !==0){
                    layer.msg('获取失败')
                }

                console.log(res);
           var strHtml = template('tpl-table',res);
        $('tbody').html(strHtml)
            }
        })

    
    }
})
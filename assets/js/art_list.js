$(function(){
    var layer = layui.layer
    var form = layui.form
    var q = {
        pagenum:1,
        pagesize:2,
        cate_id:'',
        state:''
    }

    initTable()
    initTheFilterArea()

   
        $('#form_sift').on('submit',function(e){
            e.preventDefault();
            var cate_id = $('[name = cate_id]').val();
            var state = $('[name = state]').val();
            

            q.cate_id = cate_id;
            q.state = state;

            initTable()
            form.render();


        })
    

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
        form.render();
            }
        })

    
    }

    function initTheFilterArea(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
           
            success:function(res){
                if(res.status !==0){
                    layer.msg('获取失败')
                }

                
             var strHtml = template('tpl-FilterArea',res);
            $('[name = cate_id]').html(strHtml)
            form.render();
            /* console.log($('[name = cate_id]').html()); */
            }
        })
    }
})
$(function(){
   
    var form = layui.form;
    var layer = layui.layer;
     /* 初始化文章分类的数据 */
    function innitArtCate(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
             var str =   template('tpl_artcate',res);
    
             $('tbody').html(str);
            }
        })
    }

    innitArtCate();
    var index = null;
    $('#btn-AddCate').on('click',function(){
       index =  layer.open({
            title: '编辑文章类别'
            ,content: $('#Add_window').html()
          ,type:1
          ,area: ['400px', '500px']
          });  
    })

    /* 因为Dom中不存在这个表单，所以需要通过事件委托的方法来实现提交表单的事件 */
    $('body').on('submit','#Add_form',function(e){
        e.preventDefault();

        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    console.log(res);
                  return  layer.msg('增加文章类别失败')
                }

                innitArtCate()
                layer.msg('新增分类成功')
                layer.close(index)

            }
        })
    })

    


    /* 编辑功能弹出层 */
    var indexEdit = null;
    $('tbody').on('click','#btn-Edit',function(){

        /* console.log(); */
       indexEdit =  layer.open({
            title: '添加文章类别'
            ,content: $('#Add_Edit').html()
          ,type:1
          ,area: ['400px', '300px']
          });  
        var id = $(this).attr('data-Id');
        $.ajax({
            method:'GET',
            url:'/my/article/cates/' + id,
            success:function(res){
                form.val('Add_form',res.data)
            }
        })
    })

    $('body').on('submit','#btn_confirmSet',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0 ){
                  return  layer.msg('更新失败')
                }

                layer.msg('更新成功')

                layer.close(indexEdit)

                innitArtCate()
            }
        })
    })

    /* 1.通过委托给删除按钮绑定点击事件
   2. 给删除按钮绑定上data-id属性 并声明一个id变量接受，用于后续发送ajax请求告诉系统应该处理哪一个数据
    3.在点击事件中 弹出一个提示框 确认删除则为发送请求，取消则关闭事件
    4.发送ajax请求 删除失败弹回一个msg，成功亦弹回，并且删除成功后，重新init方法初始化表单 */

    $('body').on('click','.btn-delet',function(){
        var id = $(this).attr('data-id');
        layer.confirm('是否确认删除', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/' + id,
                success:function(res){
                    if(res.status !== 0){
                       return layer.msg('删除失败')
                    }

                    layer.msg('删除成功')
                    innitArtCate()
                    layer.close(index);
                }

            })
            
            
          });
    })

})


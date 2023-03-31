$(function(){
    var lay = layui.layer;
    var form = layui.form;
    initCate();



    function initCate(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status !== 0){
                 return   lay.msg('获取文章失败')
                }
            var strHtml =  template('tpl_pub',res);
            $('[name = cate_id]').html(strHtml);
            form.render();
            }
        })

        initEditor()/* 初始化富文本编辑器 */

    
    }

        // 1. 初始化图片裁剪器
        var $image = $('#image')
     
        // 2. 裁剪选项
        var options = {
          aspectRatio: 400 / 280,
          preview: '.img-preview'
        }
        
        // 3. 初始化裁剪区域
        $image.cropper(options)


        $('#btn_choose_image').on('click',function(){
            $('#CoverFile').click();

        })

        $('#CoverFile').on('change',function(e){
            var file = e.target.files[0]
            if(file.length === 0){
                return
            }
            var newImgURL = URL.createObjectURL(file)

            $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域

        })


    var art_status = '已发布';

    $('#btn_draft').on('click',function(){
        art_status = '草稿'
    })

    $('#form_pub').on('submit',function(e){

        e.preventDefault();

       var fd =  new FormData($(this)[0]);

       fd.append('state', art_status)

       fd.forEach(function(v,k){
        console.log(k,v);
       })
    })
})
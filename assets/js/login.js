$(function(){
    $('#link_reg').on('click',function(){
        $('.log-box').hide();
        $('.reg-box').show();
    })

    $('#link_log').on('click',function(){
        $('.reg-box').hide();
        $('.log-box').show();
    })
})
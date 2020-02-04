$(document).on('click', '.btn', function(e){
    e.preventDefault();

    let uid = $(this).attr('data-id');
    $.ajax({
        type:'POST',
        url:path+'/common/controller.php',
        data:{
            action:'leave',
            uid: uid
        }
    })
    .done((data)=>{
        if(data == 'OK'){
            alert('退会処理が完了しました');
            location.href=path+'/users/login';
            return;
        }else{
            alert('退会処理に失敗しました。\ncustomer@selftimecard.workまで、ご登録アドレスからメールをお願いします');
            return;
        }
    })
    .fail((data)=>{
        alert('サーバエラーが発生しています。\nお時間を空けて再度、登録処理をお願いします');
        return;
    })
})
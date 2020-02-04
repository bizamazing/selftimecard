$(document).on('click', '.btn', function(e){
    e.preventDefault();
    ajax();
    
})

$(document).on('keydown','#pass', function(e){
    if(e.which == 13){
        ajax();
    }
})


function ajax(){
    let address = $('input[type="email"]').val();
    if(!address.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        alert('メールアドレスを入力してください');
        return;
    }

    let password = $('input[type="password"]').val();
    if(!password.match(/^[A-Za-z0-9]+$/)){
        alert('パスワードは英数字のみで入力お願いします');
        return;
    }else if(password.length < 8){
        alert('パスワードは8文字以上で設定されています');
        return;
    }

    $.ajax({
        type:'POST',
        url:path+'/common/controller.php',
        data:{
            action:'login',
            address: address,
            password:password
        }
    })
    .done((data)=>{
        if(data == 'OK'){
            location.href=path+"/";
            return;
        }else if(data == 'loginNG'){
            alert('メールアドレスもしくはパスワードをご確認ください');
            return;
        }else{
            alert('ログイン出来ませんでした\nメールアドレスなど、ご確認ください');
            return;
        }
    })
    .fail((data)=>{
        alert('サーバエラーが発生しています。\nお時間を空けて再度、登録処理をお願いします');
        return;
    })
}
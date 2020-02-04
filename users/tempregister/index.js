// 登録ボタンを押した時
$(document).on('click', '.btn', function(e){
    e.preventDefault();

    // 文字列の確認
    let str = $('.inputarea').val();
    if(str == ''){
        alert('入力されていません');
        return;
    }else if(!str.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        alert('メールアドレスを入力してください');
        return;
    }

    $.ajax({
        type:'POST',
        url:path+'/common/controller.php',
        data:{
            action:'tempregister',
            address: str
        }
    })
    .done((data)=>{
        if(data == 'done'){
            // 登録済みの場合
            alert('既に登録されています');
        }else if(data == 'error'){
            alert('仮登録が出来ませんでした\n違うアドレスにて登録をお願いします');
        }else if(data == 'mailsuccess'){
            alert('メールをお送りさせて頂きました。\nご確認よろしくお願いします');
            $('.btnarea').html('<p>上記メールアドレス宛てにメールをお送りしましたので、ご確認ください</p>');
        }else if(data == 'mailerror'){
            alert('確認メールが送信出来ませんでした\nアドレスの確認をお願いします');
        }
        return;
    })
    .fail((data)=>{
        alert('サーバエラーが発生しています。\nお時間を空けて再度、登録処理をお願いします');
        return;
    })


})

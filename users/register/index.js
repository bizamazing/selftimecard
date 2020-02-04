// パスワード表示
$(document).on('click', '.discribe', function(e){
    e.preventDefault();

    let ids = $(this).attr('id');
    if(ids == 'passview1'){
        $('#pass1').get(0).type = 'text';
    }else if(ids == 'passview2'){
        $('#pass2').get(0).type = 'text';
    }
    return;
})

// 本登録処理
$(document).on('click', '.btn', function(e){
    e.preventDefault();

    // 会社名の文字数
    let company = $('#company').val();
    if(company.length > 50){
        alert('会社名を50文字以内で入力してください');
        return;
    }

    // パスワードの確認
    let pass1 = $('#pass1').val();
    let pass2 = $('#pass2').val();
    if(pass1.length < 8){
        alert('パスワードは8文字以上で設定お願いします');
        return;
    }else if(!pass1.match(/^[A-Za-z0-9]+$/)){
        alert('パスワードは英数字のみで設定お願いします');
        return;
    }else if(pass1 != pass2){
        alert('パスワード確認用の入力が誤っています\nご確認お願いします');
        return;
    }

    // アドレス取得
    let address = $('#emails').val();
    
    // 送信処理
    $.ajax({
        type:'POST',
        url:path+'/common/controller.php',
        data:{
            action:'register',
            address: address,
            company:company,
            password:pass1
        }
    })
    .done((data)=>{
        if(data == 'OK'){
            alert('本登録が完了しました');
            location.href=path+"/";
            return;
        }else if(data == 'updateNG'){
            
        }
    })
    .fail((data)=>{
        alert('サーバエラーが発生しています。\nお時間を空けて再度、登録処理をお願いします');
        return;
    })
})
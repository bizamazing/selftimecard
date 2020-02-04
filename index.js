// GPS取得
function getGPS(id,recodeids){
    let lat;
    let long;
    let accuracy;
    let array = [];
    loadingimg();
    navigator.geolocation.getCurrentPosition(
        function(position){
            array.push(position.coords.longitude); //経度
            array.push(position.coords.latitude); //緯度
            array.push(position.coords.accuracy); //精度
            $('#waitting').remove();
            // データ送信
            if(id == 'sbtn'){
                // 出勤処理
                ajax(array);
            }else if(id == 'fbtn'){
                // 退勤処理
                finishajax(array,recodeids);
            }else{
                // 退勤処理忘れ
                forgetajax(recodeids);
            }
        },
        function(error){
            $('#waitting').remove();
            switch(error.code) {
                case 1: //PERMISSION_DENIED
                    alert("位置情報の利用が許可されていません");
                    break;
                case 2: //POSITION_UNAVAILABLE
                    alert("現在位置が取得できませんでした");
                    break;
                case 3: //TIMEOUT
                    alert("タイムアウトになりました");
                    break;
                default:
                    alert("その他のエラー(エラーコード:"+error.code+")");
                    break;
            }
        }
    );
}

// ローディング
function loadingimg(){
    let view = `
        <div id='waitting' style='background-color: white; width: 100%; height: 100vh; vertical-align: middel; z-index: 1000; text-align: center; position:fixed; top: 40%;'>
            <img src='img/three-dots-green.svg'>
            <p>GPS取得中</p>
        </div>
    `;
    $('body').prepend(view);
}

$(document).on('click', '.btn', function(e){
    e.preventDefault();
    let id = $(this).attr('id');
    let recodeids = $(this).attr('data-id');
    getGPS(id,recodeids);

})

// 出勤処理
function ajax(array){
    $.ajax({
        type:'POST',
        url:path+'/common/controller.php',
        data:{
            action:'inputrecode',
            uid: uid,
            longtitude:array[0],
            latitude:array[1],
            accuracy:array[2]
        }
    })
    .done((data)=>{
        if(data == 'OK'){
            alert('出勤記録しました');
            location.reload();
            return;
        }else{
            alert('登録出来ませんでした。\nもう一度、出勤処理をお願いします');
            return;
        }
    })
    .fail((data)=>{
        alert('サーバエラーが発生しています。\nお時間を空けて再度、登録処理をお願いします');
        return;
    })
}

// 退勤処理
function finishajax(array, recodeids){
    $.ajax({
        type:'POST',
        url:path+'/common/controller.php',
        data:{
            action:'outputrecode',
            recodeids:recodeids,
            longtitude:array[0],
            latitude:array[1],
            accuracy:array[2]
        }
    })
    .done((data)=>{
        if(data == 'OK'){
            alert('退勤を記録しました');
            location.reload();
            return;
        }else{
            alert('登録出来ませんでした。\nもう一度、退勤処理をお願いします');
            return;
        }
    })
    .fail((data)=>{
        alert('サーバエラーが発生しています。\nお時間を空けて再度、登録処理をお願いします');
        return;
    })
}

// 退勤忘れ
function forgetajax(recodeids){
    $.ajax({
        type:'POST',
        url:path+'/common/controller.php',
        data:{
            action:'forgetrecode',
            recodeids:recodeids,
            longtitude:0,
            latitude:0,
            accuracy:0,
            finishtime:'00:00:00'
        }
    })
    .done((data)=>{
        if(data == 'OK'){
            alert('本日の出勤手続きをお願いします');
            location.reload();
            return;
        }else{
            alert('登録出来ませんでした。\nもう一度、処理をお願いします');
            return;
        }
    })
    .fail((data)=>{
        alert('サーバエラーが発生しています。\nお時間を空けて再度、登録処理をお願いします');
        return;
    })
}
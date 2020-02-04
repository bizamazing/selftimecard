// 読み込み時の処理
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth()+1;

// 年数描画
for(let i=2020;i<=year;i++){
    let view = '';
    if(i == year){
        view = '<option value="'+i+'" selected>'+i+'年</option>';
    }else{
        view = '<option value="'+i+'">'+i+'年</option>';
    }
    $('#year').append(view);
}

// 月数描画
for(let i=1;i<=12;i++){
    let view = '';
    if(i == month){
        if(i < 10){
            view = '<option value="'+("0"+i)+'" selected>'+i+'月</option>';
        }else{
            view = '<option value="'+i+'" selected>'+i+'月</option>';
        }
    }else{
        if(i < 10){
            view = '<option value="'+("0"+i)+'">'+i+'月</option>';
        }else{
            view = '<option value="'+i+'">'+i+'月</option>';
        }
    }
    
    $('#month').append(view);
}

// 記録取得
$(document).on('click', '.btn', function(e){
    e.preventDefault();

    let selectMonth = $('#month').val();
    let selectYear = $('#year').val();

    $.ajax({
        type:'POST',
        url:path+'/common/controller.php',
        data:{
            action:'getrecode',
            uid:uid,
            year:selectYear,
            month:selectMonth
        }
    })
    .done((data)=>{
        $('.describearea').empty();
        if(data == 'Nodata'){
            $('.describearea').append('<p class="txt">該当月の勤務記録がありません</p>');
        }else{
            let arrayrecode = JSON.parse(data);
            arrayView(arrayrecode);
        }
    })
    .fail((data)=>{
        alert('サーバエラーが発生しています。\nお時間を空けて再度、登録処理をお願いします');
        return;
    })
})

/////////////////////////////////////////////////////////////
// VIEW関数
/////////////////////////////////////////////////////////////
function arrayView(array){
    let view = `<p>※退勤忘れで処理した際は、「00:00:00」と表示されます</p>
                <table class="tabled">
                    <tr>
                        <th>出勤日</th>
                        <th>出勤時間<br>（時：分：秒）</th>
                        <th>退勤時間<br>（時：分：秒）</th>
                        <th class="sp">出勤地点<br>(緯度・経度)</th>
                        <th class="sp">GPS誤差<br>(メートル)</th>
                        <th class="sp">退勤地点<br>(緯度・経度)</th>
                        <th class="sp">GPS誤差<br>(メートル)</th>
                    </tr>
                `
    for(let i=0;i<array.length;i++){
        view += `<tr>
                    <th>`+array[i]['recode_dates']+`</th>
                    <th>`+array[i]['starttimes']+`</th>
                    <th>`+array[i]['finishtimes']+`</th>
                    <th class="sp">（`+array[i]['s_latitudes']+`,`+array[i]['s_ longitudes']+`）</th>
                    <th class="sp">`+array[i]['s_accuracy']+`</th>
                    <th class="sp">（`+array[i]['f_latitudess']+`,`+array[i]['f_longitudes']+`）</th>
                    <th class="sp">`+array[i]['f_accuracy']+`</th>
                </tr>
                `
    }
    view += '</table>'
    $('.describearea').append(view);
}
<?php $page_title = 'トップ'; ?>
<?php require_once __DIR__ . '/common/header.php'; ?>
<link rel="stylesheet" href="index.css">
</head>

<?php
    
    $path = passServer();
    include_once(__DIR__ .'/common/view.php');
    $view = new VIEW;
    $header = $view->headerCommon($path);
    $footer = $view->footerCommon($path);

    // セッション確認
    session();
    chkSsid();
    login($path);

    // 勤務表の時間取得
    include_once(__DIR__ .'/common/model.php');
    $model = new MODEL;
    $uid = $_SESSION['uid'];
    $res = $model->getRecode($uid);
    $flag = 'OFF';

    // 日付
    $date = date("Y-m-d");
    $week = array( "日", "月", "火", "水", "木", "金", "土" );
    $weekday = $week[date("w")];

    if(count($res) == 0){
        $flag = 'ON';
    }else{
        if($res[0]['finishtimes'] != NULL){
            $flag = 'ON';
        }else{
            $date = $res[0]['recode_dates'];
            $weekday = $week[date('w', strtotime($date))];
        }
    }
?>

<body>
    <!-- ヘッダー -->
    <?php echo $header; ?>
    <!-- メイン -->
    <div class="main">
        <div>
            <?php if($flag == 'ON'):?>
                <div class="datearea">
                    <p><?php echo $date; ?>（<?php echo $weekday; ?>）</p>
                </div>
                <div class="btnarea">
                    <a href="" class="btn" id="sbtn" data-id="0"><p class="btntxt">出勤</p></a>
                </div>
            <?php else:?>
                <div class="datearea">
                    <p class="datetext">出勤日：<?php echo $res[0]['recode_dates'];?>（<?php echo $weekday; ?>）</p>
                    <p class="datetext">出勤時間：<?php echo $res[0]['starttimes']; ?></p>
                    <p><span class="mustitem">現在、出勤中</span></p>
                    <p class="smalltext">前日勤務の退勤ボタンを押し忘れた場合は、「退勤忘れ」をクリックしてください</p>
                </div>
                <div class="flexarea">
                    <div class="btnsarea">
                        <a href="" class="btn" id="fbtn" data-id="<?php echo $res[0]['recode_ids'];?>"><p class="btnstxt">退勤</p></a>
                    </div>
                    <div class="btnsarea">
                        <a href="" class="btn" id="fgbtn" data-id="<?php echo $res[0]['recode_ids'];?>"><p class="secondbtntxt">退勤忘れ</p></a>
                    </div>
                </div>
            <?php endif;?>
        </div>
        <!-- 過去勤務時間 -->
        <div class="histrory">
            <a href="<?php echo $path; ?>/history">過去勤務履歴を確認する</a>
        </div>
    </div>

    <!-- フッター -->
    <?php echo $footer; ?>
</body>
<?php $path = json($path); ?>
<script>
    let path = <?php echo $path ?>;
    let uid = <?php echo $uid ?>;
</script>
<script src="index.js"></script>
</html>
<?php $page_title = '会員登録'; ?>
<?php require_once __DIR__ . '/../../common/header.php'; ?>
<link rel="stylesheet" href="../css/user.css">
<link rel="stylesheet" href="index.css">
</head>

<?php
    
    $path = passServer();
    include_once(__DIR__ .'/../../common/view.php');
    $view = new VIEW;
    $header = $view->headerCommon($path);
    $footer = $view->footerCommon($path);

    // GETパラメータをゲットする
    $address = h($_GET['mail']);

    // MODEL読み込み
    include_once(__DIR__ .'/../../common/model.php');
    $model = new MODEL;
    $password = $model->getpass($address);
    $temppass = h($_GET['pass']);
    if($password != $temppass){
        header("Location: ".$path."/users/login");
        exit();
    }

    session_start();
    $_SESSION['EMAIL'] = $address;
    $_SESSION["chk_ssid"] = session_id();

?>

<body>
    <!-- ヘッダー -->
    <?php echo $header; ?>

    <!-- メイン -->
    <div class="main">
        <p class="title">会員登録</p>
        <div>
            <form autocomplete="off">
                <p class="inputtitle">登録アドレス</p>
                <input type="email" class="inputarea" value="<?php echo $address; ?>" disabled="disabled" id="emails">
                <p class="inputtitle">会社名(50文字以内)<span class="mustitem">※任意</span></p>
                <input type="text" class="inputarea" id="company" placeholder="無記入でもOK" maxlength="50">
                <p class="inputtitle">パスワード<span class="mustitem">※必須</span></p>
                <p class="plustext">（英数8文字以上20文字以内）</p>
                <input type="password" class="inputarea" id="pass1" placeholder="パスワード" autocomplete="off"><a href="" class="discribe" id="passview1">表示</a>
                <p class="inputtitle">パスワード（確認用）<span class="mustitem">※必須</span></p>
                <input type="password" class="inputarea" id="pass2" placeholder="パスワード" autocomplete="off"><a href="" class="discribe" id="passview2">表示</a>
            </form>
            <div class="textarea">
                <p class="smalltext"><a href="<?php echo $path; ?>/rule/serviceterm/" target="_blank">利用規約</a>に同意した上で、会員登録を行います。</p>
            </div>
            <div class="btnarea">
                <a href="" class="btn"><p class="btntxt">本登録</p></a>
            </div>
        </div>
    </div>

    <!-- フッター -->
    <?php echo $footer; ?>
</body>
<?php $path = json($path); ?>
<script>
    let path = <?php echo $path ?>;
</script>
<script src="index.js"></script>
</html>
<?php $page_title = '仮登録'; ?>
<?php require_once __DIR__ . '/../../common/header.php'; ?>
<link rel="stylesheet" href="../css/user.css">
</head>

<?php
    $path = passServer();
    include_once(__DIR__ .'/../../common/view.php');
    $view = new VIEW;
    $header = $view->headerCommon($path);
    $footer = $view->footerCommon($path);

?>

<body>
    <!-- ヘッダー -->
    <?php echo $header ; ?>

    <!-- メイン部分 -->
    <div class="main">
        <p class="title">仮登録</p>
        <div>
            <p class="inputtitle">アドレスを入力してください<span class="mustitem">※必須</span></p>
            <input type="email" class="inputarea" placeholder="メールアドレス">
            <div class="btnarea">
                <a href="" class="btn"><p class="btntxt">仮登録</p></a>
                <p class="smalltext">上記アドレス宛てに登録用のリンクをお送りします</p>
            </div>
        </div>
    </div>

    <!-- フッター -->
    <?php echo $footer; ?>
</body>
<?php $path = json($path); ?>
<script>
    let path = <?php echo $path ?>
</script>
<script src="index.js"></script>
</html>
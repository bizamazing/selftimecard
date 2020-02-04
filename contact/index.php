<?php $page_title = 'お問い合わせ'; ?>
<?php require_once __DIR__ . '/../common/header.php'; ?>
<link rel="stylesheet" href="index.css">
</head>

<?php
    // セッション確認
    session();
    chkSsid();
    login($path);

    $path = passServer();
    include_once(__DIR__ .'/../common/view.php');
    $view = new VIEW;
    $header = $view->headerCommon($path);
    $footer = $view->footerCommon($path);

    $uid = $_SESSION['uid'];
?>

<body>
    <!-- ヘッダー -->
    <?php echo $header; ?>

    <!-- メイン -->
    <div class="main">
        <p class="title">お問い合わせ</p>
        <div class="textarea">
            <p>位置情報を含めた全勤務記録を出力したい場合は、PCで<a href="<?php echo $path; ?>/history">過去勤務記録</a>を確認頂ければ表示できます。</p>
        </div>

        <p>それ以外に関して、サービス全体に関してご質問がある場合は、下記アドレスに直接ご連絡ください。</p>
        <a href="mailto:customer@selftimecard.work">メールはこちらへ（customer@selftimecard.work）</a>

        <p style="margin-top: 10%;">退会処理をご希望の場合は、下記ボタンをクリックしてください</p>
        <div class="btnarea">
            <a href="" class="btn" data-id="<?php echo $uid; ?>"><p class="btntxt">退会</p></a>
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


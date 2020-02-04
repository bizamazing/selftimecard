<?php $page_title = 'ログイン'; ?>
<?php require_once __DIR__ . '/../../common/header.php'; ?>
<link rel="stylesheet" href="../css/user.css">
<link rel="stylesheet" href="index.css">
</head>

<?php
    $path = passServer();
    include_once(__DIR__ .'/../../common/view.php');
    $view = new VIEW;
    $header = $view->headerCommon($path);

?>

<body>
    <!-- ヘッダー -->
    <?php echo $header; ?>

    <!-- メイン -->
    <div class="main">
        <p class="title">ログイン</p>
        <div>
            <form autocomplete="off">
                <p class="inputtitle">アドレス</p>
                <input type="email" class="inputarea" placeholder="メールアドレス">
                <p class="inputtitle">パスワード</p>
                <input type="password" class="inputarea" placeholder="パスワード" autocomplete="off" id="pass">
            </form>
            <div class="btnarea">
                <a href="" class="btn"><p class="btntxt">ログイン</p></a>
            </div>
            <p class="newregister"><a href="<?php echo $path; ?>/users/tempregister">新規登録はこちら</a></p>
        </div>
    </div>
</body>
<?php $path = json($path); ?>
<script>
    let path = <?php echo $path ?>;
</script>
<script src="index.js"></script>
</html>
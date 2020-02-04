<?php $page_title = '履歴'; ?>
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
        <div class="datearea flexarea">
            <select id="year" class="selected"></select>
            <select id="month" class="selected"></select>
            <div class="btnarea">
                <a href="" class="btn"><p class="btntxt">表示</p></a>
            </div>
        </div>
        <div class="describearea">
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
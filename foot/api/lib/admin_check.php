<?php
    session_start();
    if( !isset($_SESSION['admin_email']) || empty($_SESSION['admin_email']) ) {
        showMsg('您还未登录，请登录...', 'login.php');die;
    }
?>
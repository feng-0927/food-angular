<?php

function fsize($size) {
	$types = array('b','kb','M','G','T');

	$type = $types['0']; // kb
	if( $size > pow(1024, 4) ) {
		$type = $types['4']; // T 
		$size = $size / pow(1024, 4);
	}else if( $size > pow(1024, 3) ) {
		$type = $types['3']; // G
		$size = $size / pow(1024, 3);
	}else if( $size > pow(1024, 2)) {
		$type = $types['2']; // M
		$size = $size / pow(1024, 2);
	}else if( $size > pow(1024, 1)) {
		$type = $types['1']; // k
		$size = $size / pow(1024, 1);
	}

	return ceil($size) . $type;
}

function deldir($dir) {
	if( file_exists( $dir ) ) {
		$files = scandir($dir);
		foreach($files as $value) {
			if($value != '.' && $value != '..') {
				$value = $dir . '/' . $value;
				if(is_dir($value)) {
					deldir($value);
				}
				if(is_file($value)) {
					unlink($value);
				}
			}
		}
		$r = rmdir($dir);
		return $r;
	}
	return false;
}

function upload_file( $filename , $uploads = './uploads/', $fsize = 1048576 ){
 	
	$uploads = rtrim($uploads, '/') . '/';

	if( !file_exists( $uploads ) ) {
		mkdir( $uploads , 0777);
	}
// var_dump($_FILES[$filename]);die;

	if ( !$_FILES[$filename] ){
		return '没有该字段文件';
	}

	// 获取文件信息
	$fileInfo = $_FILES[$filename];

	// 判断错误
	$fileError = $fileInfo['error'];
	if( $fileError > 0) {
		switch( $fileError ) {
			case 1: 
				return '上传的文件大小超出了 upload_max_filesize指令指定的值';
				break;
			case 2:
				return '试图上传的文件大小超出了MAX_FILE_SIZE指令指定的值';
				break;
			case 3:
				return '文件没有完全上传';
				break;
			case 4:
				return '没有指定上传的文件';
				break;
			default;
		}
	}

	// 判断文件格式是否符合设置格式
	$fileType = explode('/',$fileInfo['type']);
	$fileType = end($fileType);


	$types = array('jpg', 'jpeg', 'gif', 'png');
	if( !in_array( $fileType, $types )) {
		return '上传文件不符合格式';
	}

	// 图片后缀
	$ext = pathinfo($fileInfo['name'], PATHINFO_EXTENSION);

	// 判断文件大小是否符合设置大小
	$fileSize = $fileInfo['size'];
	if($fileSize > $fsize ) {
		return '上传文件超过设置大小';
	}

	// 重命名文件
	$newFile = $uploads . date('YmdHis') . mt_rand(0,10000)  . '.'. $ext;
	
	if( is_uploaded_file( $fileInfo['tmp_name']) ) { // 是否上传到临时目录
		// var_dump($fileInfo['tmp_name']);
		// var_dump($newFile);die;
		$r = move_uploaded_file($fileInfo['tmp_name'] , $newFile);
		if($r) return $newFile;
	}
	return false;
}

function thumbnail($filename, $dest_w = '', $dest_h = '', $newFile = '' ){

	// 同时没有宽高时，其中宽高有一个小于0
	if( !$dest_w || !$dest_h) return false;

	if( $dest_w && $dest_w < 0) return false;
	
	if( $dest_h && $dest_h < 0) return false;

	// 获取原图大小和类型
	list($s_w, $s_h, $type) = getimagesize($filename);
	// 根据原图类型设置图片的函数
	switch($type){
		case 1:
			$type = 'gif';
			break;
		case 2:
			$type = 'jpeg';
			break;
		case 3:
			$type = 'png';
			break;
		default;	
	}

	// $s_w/$dest_w = $s_h/$dest_h;
	// 只有一个值时，根据比例去求得另一个值
	if($dest_w && !$dest_h) {
		$dest_h = $s_h/$s_w*$dest_w;
	}
	if($dest_h && !$dest_w) {
		$dest_w = $s_w/$s_h*$dest_h;
	}
	
	$imgcreateFn = 'imagecreatefrom'.$type; // 拼接成动态函数
	// 原图
	$source_img = $imgcreateFn($filename);
	// 缩略图
	$dest_img = imagecreatetruecolor($dest_w, $dest_h );
	// 重采样拷贝部分图像并调整大小
	imagecopyresampled($dest_img, $source_img, 0 ,0 ,0 ,0, $dest_w, $dest_h, $s_w, $s_h);
	// 输出到浏览器显示
	// 生成新的图片
	$imageFn = 'image'.$type; // 拼接成动态函数

	if( !$newFile ) {
		header("Content-Type: image/{$type}");
		$imageFn($dest_img, null);
		imagedestroy($source_img);
		imagedestroy($dest_img);
		exit;
	}
	
	$r = $imageFn($dest_img, $newFile );
	imagedestroy($source_img);
	imagedestroy($dest_img);

	return $r;
}



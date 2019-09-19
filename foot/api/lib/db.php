<?php
function connect($host = 'h1902.com', $user = '', $pwd = '', $db) {
	$cn = mysqli_connect($host, $user, $pwd, $db);

	if( mysqli_connect_errno(!$cn) ) {
		echo "数据库链接失败：" . mysqli_connect_error();die;
	}
	mysqli_set_charset($cn, 'utf8');
	return $cn;
}

// 单条查询
function getOne($sql) {
	global $cn;
	$result = mysqli_query($cn, $sql);
	// 有结果集，并且结果集中有数据。
	if( $result && mysqli_num_rows($result) ) {
		$data= mysqli_fetch_assoc($result);
		// 释放结果集
		mysqli_free_result($result);
		return  $data;
	}
	return false;
}

// 多条查询
function getAll($sql) {
	global $cn;
	$result = mysqli_query($cn, $sql);
	// var_dump($result);
	if( $result && mysqli_num_rows($result) ) {
		$data = array();
		while( $row = mysqli_fetch_assoc($result)) {
			$data[] = $row;
		}
		mysqli_free_result($result);
		return  $data;
	}
	return false;

}

// 删除 
function delete($sql) {
	global $cn;
	mysqli_query($cn, $sql);
	return mysqli_affected_rows($cn);
}

// 添加
function add($table, $data) {
	global $cn;
	global $pre;
	$keys = array_keys($data);
	$values = array_values($data);
	
	$keys = '`' . implode('`, `', $keys) . '`';
	//``,`
	$values = "'" . implode("','" , $values) . "'";

	$sql = "insert into {$pre}{$table} ({$keys}) values ({$values})";
	// var_dump($sql);die;
	mysqli_query($cn, $sql);

	// 插入返回记录id
	return mysqli_insert_id($cn);
}

// 编辑
function update($table, $data, $where) {
	global $cn;
	global $pre;
	$str = '';
	foreach($data as $key=>$value) {
		$str .= $key . "='" . $value . "',";
	}
	$str = rtrim($str, ',');

	$sql = "update {$pre}{$table} set {$str} {$where}";
	mysqli_query($cn, $sql);
	// var_dump($sql);die;
	// mysqli_affected_rows 数据不更新也提交算更新成功，返回值为0,所以判断要写为大于负一。
	return mysqli_affected_rows($cn) > -1;
}

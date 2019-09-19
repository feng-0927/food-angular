<?php 
    include_once('../lib/config.php');

    $action = isset($_GET['action']) && !empty($_GET['action']) ? $_GET['action'] : '';

    $limit = isset($_GET['limit']) && !empty($_GET['limit']) ? $_GET['limit'] : 2;

    $offset = isset($_GET['offset']) && !empty($_GET['offset']) ? $_GET['offset'] : 0;

    $id = isset($_GET['id']) && !empty($_GET['id']) ? $_GET['id'] : 0;

    $ids = isset($_GET['ids']) && !empty($_GET['ids']) ? $_GET['ids'] : 0;
    
    if($action == 'settingDeleteByIds' && $ids ) {
        // $ids = '{"ids":["5","4","3","2","1"]}' json字符串
        $ids = json_decode($ids,true);
        // 我们想要的sql语句效果 delete from table_name where id in (1,2,3,4)
	
        // 查询图片循环删除
        // $oldpic = "select pic from {$pre}setting where setting_id in (${ids['ids']})"; //array

        // $oldpic = getAll($oldpic);
        // foreach ($oldpic as $key=>$value)
        // {
        //     $oldpic= str_replace(HTTP, ROOT, $value['pic']);
        //         unlink($oldpic);           
        // };
        $sql = "delete from {$pre}setting where setting_id in (${ids['ids']})";
        $result = delete($sql);
        if($result) {
            echo_json(1, '删除成功');
        }else{
            echo_json(0, '删除失败');
        }
    }

    if($action == 'settingDelete' && $id ) {
        // "select pic from f_setting where setting_id = 28"
        // $oldpic= str_replace(HTTP, ROOT, $oldpic);
        // unlink($oldpic);
        $oldpic= "select pic from {$pre}setting where setting_id = {$id}";
        // var_dump($oldpic);die;
        // $oldpic = getOne($oldpic);
        // $oldpic= str_replace(HTTP, ROOT, $Pic['pic']);
        // unlink($oldpic);
        // echo($oldpic.dic);die;
        $sql = "delete from {$pre}setting where setting_id = {$id}";
        $result = delete($sql);
        // var_dump($result);die;
        if($result) {
            echo_json(1, '删除成功');
        }else{
            echo_json(0, '删除失败');
        }
    }

    if($action == 'settingOne'){
        $sql = "select * from ${pre}setting where setting_id ={$id}";
        $data = getOne($sql);
        echo json_encode($data);die;
    }

    if($action == 'setting'){
        $sql = "select * from ${pre}setting order by setting_id desc limit ${offset}, ${limit}";
        $data = getAll($sql);
        echo json_encode($data);die;
    }

    if($action == 'settingCount') {
        $sql = "select count(*) as c from {$pre}setting";
        $data = getOne($sql);
        // var_dump($data);
        echo json_encode($data);die;
    }

    if($action == 'fileUpload'){
        $uploadUrl = '../../assets/home/img';
        $pic = upload_file('file',$uploadUrl);
        if($pic){
            $pic = str_replace($uploadUrl, '',$pic);
            $pic = UPLOADS . $pic;
            echo_json(1,$pic);
        }else{
            echo_json(0,'上传失败');
        }
    }

    if($action == 'settingAdd'){
        if($_POST){
            $setting_name = isset($_POST['setting_name']) && !empty($_POST['setting_name']) ? trim($_POST['setting_name']) : '';

            $setting_value = isset($_POST['setting_value']) && !empty($_POST['setting_value']) ? trim($_POST['setting_value']) : '';

            $orders = isset($_POST['orders']) && !empty($_POST['orders']) ? ($_POST['orders']) : '';
            
            $content = isset($_POST['content']) && !empty($_POST['content']) ? trim($_POST['content']) : '';
            
            $cate_id = isset($_POST['cate_id']) && !empty($_POST['cate_id']) ? intval($_POST['cate_id']) : '';

            $is_recommend = isset($_POST['is_recommend']) && !empty($_POST['is_recommend']) ? trim($_POST['is_recommend']) : '';

            $pic = isset($_POST['pic']) && !empty($_POST['pic']) ? trim($_POST['pic']) : '';
		
            $oldpic = isset($_POST['oldpic']) && !empty($_POST['oldpic']) ? trim($_POST['oldpic']) : '';
             
            

            $data = array(
                'setting_name' => $setting_name,
                'setting_value' => $setting_value,
            );
            if(!$id){
                $result = add("setting",$data);
                // var_dump($result);die;
                if($result){
                    echo_json(1,'添加成功');
                }else{
                    echo_json(0,'添加失败');
                }

            }else{
                // 物理处理图片
                if($pic && $oldpic && $pic != $oldpic) {
                    $oldpic= str_replace(HTTP, ROOT, $oldpic);
                    // echo($oldpic);die;
                    unlink($oldpic);
                }
                $result = update("setting",$data,"where setting_id =${id}");
                if($result){
                    echo_json(1,'更新成功');
                }else{
                    echo_json(0,'更新失败');
                }
            }
        }
    }
?>
<?php 
    include_once('../lib/config.php');

    $action = isset($_GET['action']) && !empty($_GET['action']) ? $_GET['action'] : '';

    $limit = isset($_GET['limit']) && !empty($_GET['limit']) ? $_GET['limit'] : 8;

    $offset = isset($_GET['offset']) && !empty($_GET['offset']) ? $_GET['offset'] : 0;

    $id = isset($_GET['id']) && !empty($_GET['id']) ? $_GET['id'] : 0;

    $ids = isset($_GET['ids']) && !empty($_GET['ids']) ? $_GET['ids'] : 0;
    
    if($action == 'regionDeleteByIds' && $ids ) {
        // $ids = '{"ids":["5","4","3","2","1"]}' json字符串
        $ids = json_decode($ids,true);
        // 我们想要的sql语句效果 delete from table_name where id in (1,2,3,4)
        
        $sql = "delete from {$pre}region where region_id in (${ids['ids']})";
        $result = delete($sql);
        if($result) {
            echo_json(1, '删除成功');
        }else{
            echo_json(0, '删除失败');
        }
        // 查询图片循环删除
        $oldpic = "select pic from {$pre}region where region_id in (${ids['ids']})"; //array

        $oldpic = getAll($oldpic);
        foreach ($oldpic as $key=>$value)
        {
            $oldpic= str_replace(HTTP, ROOT, $value['pic']);
                unlink($oldpic);
            }
    }
    if($action == 'regionDelete' && $id ) {
        $sql = "delete from {$pre}region where region_id = {$id}";
        $result = delete($sql);
        if($result) {
            echo_json(1, '删除成功');
        }else{
            echo_json(0, '删除失败');
        }
        // "select pic from f_region where region_id = 28"
        // $oldpic= str_replace(HTTP, ROOT, $oldpic);
        // unlink($oldpic);
        $oldpic= "select pic from f_region where region_id = {$id}";
        $oldpic = getOne($oldpic);
        $oldpic= str_replace(HTTP, ROOT, $oldpic['pic']);
        unlink($oldpic);
        // echo($oldpic.dic);die;
    }

    if($action == 'regionOne'){
        $sql = "select * from ${pre}region where region_id={$id}";
        $data = getOne($sql);
        echo json_encode($data);die;
    }

    if($action == 'region'){
        $sql = "select * from ${pre}region order by region_id desc limit ${offset}, ${limit}";
        $data = getAll($sql);
        echo json_encode($data);die;
    }

    if($action == 'regionAll'){
        $sql = "select * from ${pre}region order by region_id desc";
        $data = getAll($sql);
        echo json_encode($data);die;
    }

    if($action == 'regionCount') {
        $sql = "select count(*) as c from {$pre}region";
        // echo($sql);die;
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

    if($action == 'regionAdd'){
        if($_POST){
            $region_name = isset($_POST['region_name']) && !empty($_POST['region_name']) ? trim($_POST['region_name']) : '';

            // $orders = isset($_POST['orders']) && !empty($_POST['orders']) ? trim($_POST['orders']) : '';

            $orders = isset($_POST['orders']) && !empty($_POST['orders']) ? ($_POST['orders']) : '';
            
            $content = isset($_POST['content']) && !empty($_POST['content']) ? trim($_POST['content']) : '';
            
            $cate_id = isset($_POST['cate_id']) && !empty($_POST['cate_id']) ? intval($_POST['cate_id']) : '';

            $is_recommend = isset($_POST['is_recommend']) && !empty($_POST['is_recommend']) ? trim($_POST['is_recommend']) : '';

            $pic = isset($_POST['pic']) && !empty($_POST['pic']) ? trim($_POST['pic']) : '';
		
            $oldpic = isset($_POST['oldpic']) && !empty($_POST['oldpic']) ? trim($_POST['oldpic']) : '';
             
            

            $data = array(
                'region_name' => $region_name,
                'orders' => $orders,
            );
            if(!$id){
                // var_dump($data);die;
                $result = add("region",$data);
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
                $result = update("region",$data,"where region_id=${id}");
                // var_dump($id);die;
                if($result){
                    echo_json(1,'更新成功');
                }else{
                    echo_json(0,'更新失败');
                }
            }
        }
    }
?>
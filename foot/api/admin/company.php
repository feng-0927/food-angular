<?php 
    include_once('../lib/config.php');

    $action = isset($_GET['action']) && !empty($_GET['action']) ? $_GET['action'] : '';

    $limit = isset($_GET['limit']) && !empty($_GET['limit']) ? $_GET['limit'] : 2;

    $offset = isset($_GET['offset']) && !empty($_GET['offset']) ? $_GET['offset'] : 0;

    $id = isset($_GET['id']) && !empty($_GET['id']) ? $_GET['id'] : 0;

    $ids = isset($_GET['ids']) && !empty($_GET['ids']) ? $_GET['ids'] : 0;
    
    if($action == 'companyDeleteByIds' && $ids ) {
        // $ids = '{"ids":["5","4","3","2","1"]}' json字符串
        $ids = json_decode($ids,true);
        // 我们想要的sql语句效果 delete from table_name where id in (1,2,3,4)
	
        // 查询图片循环删除
        $oldpic = "select pic from {$pre}company where company_id in (${ids['ids']})"; //array

        $oldpic = getAll($oldpic);
        foreach ($oldpic as $key=>$value)
        {
            $oldpic= str_replace(HTTP, ROOT, $value['pic']);
                unlink($oldpic);           
        };
        $sql = "delete from {$pre}company where company_id in (${ids['ids']})";
        $result = delete($sql);
        if($result) {
            echo_json(1, '删除成功');
        }else{
            echo_json(0, '删除失败');
        }
    }

    if($action == 'companyDelete' && $id ) {
        // "select pic from f_company where company_id = 28"
        // $oldpic= str_replace(HTTP, ROOT, $oldpic);
        // unlink($oldpic);
        $oldpic= "select pic from {$pre}company where company_id = {$id}";
        // var_dump($oldpic);die;
        $oldpic = getOne($oldpic);
        $oldpic= str_replace(HTTP, ROOT, $oldpic['pic']);
        unlink($oldpic);
        // echo($oldpic.dic);die;
        $sql = "delete from {$pre}company where company_id = {$id}";
        $result = delete($sql);
        // var_dump($result);die;
        if($result) {
            echo_json(1, '删除成功');
        }else{
            echo_json(0, '删除失败');
        }
    }

    if($action == 'companyOne'){
        $sql = "select * from ${pre}company where company_id ={$id}";
        $data = getOne($sql);
        echo json_encode($data);die;
    }

    if($action == 'company'){
        $sql = "select * from ${pre}company order by company_id desc limit ${offset}, ${limit}";
        $data = getAll($sql);
        echo json_encode($data);die;
    }

    if($action == 'companyCount') {
        $sql = "select count(*) as c from {$pre}company";
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

    if($action == 'companyAdd'){
        if($_POST){
            $title = isset($_POST['title']) && !empty($_POST['title']) ? trim($_POST['title']) : '';

            $phone = isset($_POST['phone']) && !empty($_POST['phone']) ? trim($_POST['phone']) : '';

            $tel = isset($_POST['tel']) && !empty($_POST['tel']) ? trim($_POST['tel']) : '';

            $postal_code = isset($_POST['postal_code']) && !empty($_POST['postal_code']) ? ($_POST['postal_code']) : '';
            
            $address = isset($_POST['address']) && !empty($_POST['address']) ? trim($_POST['address']) : '';
            
            $cate_id = isset($_POST['cate_id']) && !empty($_POST['cate_id']) ? intval($_POST['cate_id']) : '';

            $is_recommend = isset($_POST['is_recommend']) && !empty($_POST['is_recommend']) ? trim($_POST['is_recommend']) : '';

            $pic = isset($_POST['pic']) && !empty($_POST['pic']) ? trim($_POST['pic']) : '';
		
            $oldpic = isset($_POST['oldpic']) && !empty($_POST['oldpic']) ? trim($_POST['oldpic']) : '';
             
            

            $data = array(
                'pic' => $pic,
                'title' => $title,
                'phone' => $phone,
                'address' => $address,
                'tel' => $tel,
                'postal_code' => $postal_code,
            );
            if(!$id){
                $result = add("company",$data);
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
                $result = update("company",$data,"where company_id =${id}");
                if($result){
                    echo_json(1,'更新成功');
                }else{
                    echo_json(0,'更新失败');
                }
            }
        }
    }
?>
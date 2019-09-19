<?php 
    include_once('../lib/config.php');

    $action = isset($_GET['action']) && !empty($_GET['action']) ? $_GET['action'] : '';

    $limit = isset($_GET['limit']) && !empty($_GET['limit']) ? $_GET['limit'] : 2;

    $offset = isset($_GET['offset']) && !empty($_GET['offset']) ? $_GET['offset'] : 0;

    $id = isset($_GET['id']) && !empty($_GET['id']) ? $_GET['id'] : 0;

    $ids = isset($_GET['ids']) && !empty($_GET['ids']) ? $_GET['ids'] : 0;
    
    //删除所有
    if($action == 'shopDeleteByIds' && $ids ) {
        // $ids = '{"ids":["5","4","3","2","1"]}' json字符串
        $ids = json_decode($ids,true);
        // 我们想要的sql语句效果 delete from table_name where id in (1,2,3,4)
	
        // 查询图片循环删除
        $oldpic = "select pic from {$pre}shop where shop_id in (${ids['ids']})"; //array

        $oldpic = getAll($oldpic);
        foreach ($oldpic as $key=>$value)
        {
            $oldpic= str_replace(HTTP, ROOT, $value['pic']);
                unlink($oldpic);
            }
        $sql = "delete from {$pre}shop where shop_id in (${ids['ids']})";
        $result = delete($sql);
        if($result) {
            echo_json(1, '删除成功');
        }else{
            echo_json(0, '删除失败');
        }
    }

    if($action == 'shopDelete' && $id ) {
        // "select pic from f_shop where shop_id = 28"
        // $oldpic= str_replace(HTTP, ROOT, $oldpic);
        // unlink($oldpic);
        $Pic= "select pic from f_shop where shop_id = {$id}";
        $Pic = getOne($Pic);
        $oldpic= str_replace(HTTP, ROOT, $Pic['pic']);
        unlink($oldpic);
        // echo($oldpic.dic);die;
        $sql = "delete from {$pre}shop where shop_id = {$id}";
        $result = delete($sql);
        if($result) {
            
            echo_json(1, '删除成功');
        }else{
            echo_json(0, '删除失败');
        }

    }

    if($action == 'shopOne'){
        $sql = "select * from ${pre}shop as f left join ${pre}region as c on c.region_id = f.region_id where shop_id={$id}";
        $data = getOne($sql);
        echo json_encode($data);die;
    }

    if($action == 'shop'){
        $sql = "select * from ${pre}shop as f left join ${pre}region as c on c.region_id = f.region_id order by shop_id desc limit ${offset}, ${limit}";
        $data = getAll($sql);
        echo json_encode($data);die;
    }

    if($action == 'shops'){
        $sql = "select * from ${pre}shop as f left join ${pre}region as c on c.region_id = f.region_id order by shop_id desc limit ${offset}, ${limit}";
        $data = getAll($sql);
        echo json_encode($data);die;
    }

    if($action == 'shopAll'){
        $sql = "select * from ${pre}shop as f left join ${pre}region as c on c.region_id = f.region_id order by shop_id desc";
        $data = getAll($sql);
        echo json_encode($data);die;
    }

    if($action == 'shopCount') {
        $sql = "select count(*) as c from {$pre}shop as f left join {$pre}region as c on c.region_id = f.region_id";
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

    if($action == 'shopAdd'){
        if($_POST){
            $title = isset($_POST['title']) && !empty($_POST['title']) ? trim($_POST['title']) : '';

            $address = isset($_POST['address']) && !empty($_POST['address']) ? trim($_POST['address']) : '';

            $business_time = isset($_POST['business_time']) && !empty($_POST['business_time']) ? trim($_POST['business_time']) : '';

            $dishes = isset($_POST['dishes']) && !empty($_POST['dishes']) ? ($_POST['dishes']) : '';
            
            $tag = isset($_POST['tag']) && !empty($_POST['tag']) ? trim($_POST['tag']) : '';
            
            $region_id = isset($_POST['region_id']) && !empty($_POST['region_id']) ? intval($_POST['region_id']) : '';

            $parking = isset($_POST['parking']) && !empty($_POST['parking']) ? trim($_POST['parking']) : '';

            $pic = isset($_POST['pic']) && !empty($_POST['pic']) ? trim($_POST['pic']) : '';
		
            $oldpic = isset($_POST['oldpic']) && !empty($_POST['oldpic']) ? trim($_POST['oldpic']) : '';
             
            

            $data = array(
                'pic' => $pic,
                'title' => $title,
                'dishes' => $dishes,
                'address' => $address,
                'business_time' => $business_time,
                'tag' => $tag,
                'region_id' => $region_id,
                'parking' => $parking
            );
            if(!$id){
                $result = add("shop",$data);
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
                $result = update("shop",$data,"where shop_id=${id}");
                if($result){
                    echo_json(1,'更新成功');
                }else{
                    echo_json(0,'更新失败');
                }
            }
        }
    }
?>
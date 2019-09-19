
app.controller('regionCtrl',function($scope,$stateParams, $resource, Region,$state,Form){
    // 可选择的页数范围
    $scope.maxSize = 2;
    // 每页显示的数量
    $scope.limit = 3;
    // 设置page默认值
    $scope.currentPage = 1
    // 设置总条数
    $scope.totalItems = 0
    // 正反选
    Form.checkedAction($scope,'.ids')
    // 分页功能
    $scope.page = function(currentPage) {
        // 当前页数
        $scope.currentPage = currentPage || 1
        // 总共有多少条数据
        // totalItems
        Region.count().then(function(result){
            // console.log(result) 
            if(result.status == 200) {
                if(result.data['c']>0){// 有数据
                    // 总数
                    $scope.totalItems = result.data['c'];
                    // 下标
                    $scope.offset = ($scope.currentPage - 1) * $scope.limit;
                    // 分页查询
                    Region.page($scope.limit,$scope.offset).then(function(result){
                        // console.log(result)
                        if(result.status == 200){
                            $scope.data = result.data;
                            console.log($scope.data)
                        }
                    })
                }
            }
        })
    }
    // 执行列表查询
    $scope.page()
    // 删除所有
    $scope.delAll = function(){
        var idsJson = Form.checkedValToJson('.ids')
        Region.deleteByIds(idsJson).then(function(result){
            if(result.status == 200){
                alert(result.data.msg)
                $state.reload()
            }
        })
    }
    // 删除一条
	$scope.del = function(id) { 
		Region.delete(id).then(function(result){
			// console.log(result)
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
			}
		})
	}

})

app.controller('regionAddCtrl',function($scope,$state,Region,$stateParams,Upload){
    // 设置是否推荐数组
    $scope.recommendArr = [
        {
            id:0,
            name:'不推荐'
        },
        {
            id:1,
            name:'推荐'
        }
        
    ]
    $scope.region = {}
    // 设置是否推荐默认值
    $scope.region.is_recommend = $scope.recommendArr[0]
    $scope.id = $stateParams.id;
    // 展示功能
	// 获取分类
    Region.query().then(function(result){
        if(result.status = 200){
            console.log(result.data[0])
            // 设置分类默认值
            $scope.region.cate = result.data[0];
            $scope.cates = result.data;
            // 查一条美食
            if($stateParams.id){
                Region.get($stateParams.id).then(function(result){
                    if(result.status == 200){
                        $scope.region = result.data
                        $scope.region.oldpic = result.data.pic
                        // console.log(region.oldpic)
                        
                        // 重置推荐值
                        $scope.region.is_recommend = $scope.recommendArr[$scope.region.is_recommend]
                        // 重置分类值
                        Region.get($scope.region.cate_id).then(function(res){
                            $scope.region.cate = res.data
                        })
                    }
                })
            }
        }
    })

	// 添加功能
    $scope.save = function(){

        if($scope.region.region_name == undefined){
            alert('名称不能为空')
            return false;
        }
        if($scope.region.orders == undefined){
            alert('排序不能为空')
            return false;
        }

        var data = {
            orders: $scope.region.orders,
            region_name: $scope.region.region_name,
        }

        if($scope.region.pic){
            Upload.upload({
                url:'../api/admin/region.php?action=fileUpload',
                data:{file:$scope.region.pic}
            }).then(function(resp){
                if(resp.data.code){
                    console.log(3456)
                    $scope.region.pic = resp.data.msg
                    data.pic = resp.data.msg
                    data.oldpic = $scope.region.oldpic
                    // console.log(data.oldpic)
                    // return false;
                    if(!$scope.id){
                        Region.save(data).then(function(result){
                            if(result.status == 200){
                                if(result.data.code == 1){
                                    alert(result.data.msg);
                                    // $state 状态管理不是地址/admin/region
                                    $state.go('admin.region')
                                }else{
                                    $state.reload()
                                }
                            }
                        })
                    }else{
                        Region.update(data,$scope.id).then(function(result){
                            if(result.status == 200){
                                if(result.data.code == 1){
                                    alert(result.data.msg);
                
                                    $state.go('admin.region')
                                }else{
                                    alert(result.data.msg);
                                }
                            }
                        })
                    }

                }else{
                    alert('上传图片失败')
                    return false;
                }
            })
        }else{
            if(!$scope.id){
                Region.save(data).then(function(result){
                    if(result.status == 200){
                        if(result.data.code == 1){
                            alert(result.data.msg);
                            // $state 状态管理不是地址/admin/region
                            $state.go('admin.region')
                        }else{
                            $state.reload()
                        }
                    }
                })
            }else{
                Region.update(data,$scope.id).then(function(result){
                    if(result.status == 200){
                        if(result.data.code == 1){
                            alert(result.data.msg);
        
                            $state.go('admin.region')
                        }else{
                            alert(result.data.msg);
                        }
                    }
                })
            }
        }

    }
})
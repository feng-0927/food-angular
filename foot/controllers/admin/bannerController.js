
app.controller('bannerCtrl',function($scope,$stateParams, $resource, banner,$state,Form){
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
        banner.count().then(function(result){
            // console.log(result) 
            if(result.status == 200) {
                if(result.data['c']>0){// 有数据
                    // 总数
                    $scope.totalItems = result.data['c'];
                    // 下标
                    $scope.offset = ($scope.currentPage - 1) * $scope.limit;
                    // 分页查询
                    banner.page($scope.limit,$scope.offset).then(function(result){
                        if(result.status == 200){
                            $scope.data = result.data;
                            console.log(result.data)
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
        banner.deleteByIds(idsJson).then(function(result){
            if(result.status == 200){
                alert(result.data.msg)
                $state.reload()
            }
        })
    }
    // 删除一条
	$scope.del = function(id) { 
		banner.delete(id).then(function(result){
			// console.log(result)
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
			}
		})
	}

})

app.controller('bannerAddCtrl',function($scope,$state,banner,$stateParams,Upload){
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
    $scope.banner = {}
    // 设置是否推荐默认值
    $scope.banner.is_recommend = $scope.recommendArr[0]
    $scope.id = $stateParams.id;
    // 展示功能
	// 获取分类
    banner.query().then(function(result){
        if(result.status = 200){
            console.log(result.data[0])
            // 设置分类默认值
            $scope.banner.cate = result.data[0];
            $scope.cates = result.data;
            // 查一条美食
            if($stateParams.id){
                banner.get($stateParams.id).then(function(result){
                    if(result.status == 200){
                        $scope.banner = result.data
                        $scope.banner.oldpic = result.data.pic
                        // console.log(banner.oldpic)
                        
                        // 重置推荐值
                        $scope.banner.is_recommend = $scope.recommendArr[$scope.banner.is_recommend]
                        // 重置分类值
                        banner.get($scope.banner.cate_id).then(function(res){
                            $scope.banner.cate = res.data
                        })
                    }
                })
            }
        }
    })

	// 添加功能
    $scope.save = function(){

        // if($scope.banner.title == undefined){
        //     alert('标题不能为空')
        //     return false;
        // }
        // if($scope.banner.price == undefined){
        //     alert('价格不能为空')
        //     return false;
        // }

        var data = {
            title: $scope.banner.title,
            orders: $scope.banner.orders,
            link: $scope.banner.link,
            price: $scope.banner.price,
            content: $scope.banner.content,
            cate_id: $scope.banner.cate.cate_id,
        }

        if($scope.banner.pic){
            Upload.upload({
                url:'../api/admin/banner.php?action=fileUpload',
                data:{file:$scope.banner.pic}
            }).then(function(resp){
                console.log(resp)
                if(resp.data.code){
                    $scope.banner.pic = resp.data.msg
                    data.pic = resp.data.msg
                    data.oldpic = $scope.banner.oldpic
                    // console.log(data.oldpic)
                    // return false;
                    if(!$scope.id){
                        banner.save(data).then(function(result){
                            if(result.status == 200){
                                if(result.data.code == 1){
                                    alert(result.data.msg);
                                    // $state 状态管理不是地址/admin/banner
                                    $state.go('admin.banner')
                                }else{
                                    $state.reload()
                                }
                            }
                        })
                    }else{
                        banner.update(data,$scope.id).then(function(result){
                            if(result.status == 200){
                                if(result.data.code == 1){
                                    alert(result.data.msg);
                
                                    $state.go('admin.banner')
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
                banner.save(data).then(function(result){
                    if(result.status == 200){
                        if(result.data.code == 1){
                            alert(result.data.msg);
                            // $state 状态管理不是地址/admin/banner
                            $state.go('admin.banner')
                        }else{
                            $state.reload()
                        }
                    }
                })
            }else{
                banner.update(data,$scope.id).then(function(result){
                    if(result.status == 200){
                        if(result.data.code == 1){
                            alert(result.data.msg);
        
                            $state.go('admin.banner')
                        }else{
                            alert(result.data.msg);
                        }
                    }
                })
            }
        }

    }
})
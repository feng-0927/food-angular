
app.controller('friendLinkCtrl',function($scope,$stateParams, $resource, friendLink,$state,Form){
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
        friendLink.count().then(function(result){
            // console.log(result) 
            if(result.status == 200) {
                if(result.data['c']>0){// 有数据
                    // 总数
                    $scope.totalItems = result.data['c'];
                    // 下标
                    $scope.offset = ($scope.currentPage - 1) * $scope.limit;
                    // 分页查询
                    friendLink.page($scope.limit,$scope.offset).then(function(result){
                        console.log(result)
                        if(result.status == 200){
                            $scope.data = result.data;
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
        friendLink.deleteByIds(idsJson).then(function(result){
            if(result.status == 200){
                alert(result.data.msg)
                $state.reload()
            }
        })
    }
    // 删除一条
	$scope.del = function(id) { 
		friendLink.delete(id).then(function(result){
			// console.log(result)
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
			}
		})
	}

})

app.controller('friendLinkAddCtrl',function($scope,$state,friendLink,$stateParams,Upload){
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
    $scope.friendLink = {}
    // 设置是否推荐默认值
    $scope.friendLink.is_recommend = $scope.recommendArr[0]
    $scope.id = $stateParams.id;
    // 展示功能
	// 获取分类
    friendLink.query().then(function(result){
        if(result.status = 200){
            console.log(result.data[0])
            // 设置分类默认值
            $scope.friendLink.cate = result.data[0];
            $scope.cates = result.data;
            // 查一条美食
            if($stateParams.id){
                friendLink.get($stateParams.id).then(function(result){
                    if(result.status == 200){
                        $scope.friendLink = result.data
                        $scope.friendLink.oldpic = result.data.pic
                        // console.log(friendLink.oldpic)
                        
                        // 重置推荐值
                        $scope.friendLink.is_recommend = $scope.recommendArr[$scope.friendLink.is_recommend]
                        // 重置分类值
                        friendLink.get($scope.friendLink.cate_id).then(function(res){
                            $scope.friendLink.cate = res.data
                        })
                    }
                })
            }
        }
    })

	// 添加功能
    $scope.save = function(){

        if($scope.friendLink.title == undefined){
            alert('标题不能为空')
            return false;
        }
        if($scope.friendLink.orders == undefined){
            alert('排序不能为空')
            return false;
        }

        var data = {
            title: $scope.friendLink.title,
            orders: $scope.friendLink.orders,
        }

        if($scope.friendLink.pic){
            Upload.upload({
                url:'../api/admin/friendLink.php?action=fileUpload',
                data:{file:$scope.friendLink.pic}
            }).then(function(resp){
                console.log(resp)
                if(resp.data.code){
                    $scope.friendLink.pic = resp.data.msg
                    data.pic = resp.data.msg
                    data.oldpic = $scope.friendLink.oldpic
                    // console.log(data.oldpic)
                    // return false;
                    if(!$scope.id){
                        friendLink.save(data).then(function(result){
                            if(result.status == 200){
                                if(result.data.code == 1){
                                    alert(result.data.msg);
                                    // $state 状态管理不是地址/admin/friendLink
                                    $state.go('admin.friendLink')
                                }else{
                                    $state.reload()
                                }
                            }
                        })
                    }else{
                        friendLink.update(data,$scope.id).then(function(result){
                            if(result.status == 200){
                                if(result.data.code == 1){
                                    alert(result.data.msg);
                
                                    $state.go('admin.friendLink')
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
                friendLink.save(data).then(function(result){
                    if(result.status == 200){
                        if(result.data.code == 1){
                            alert(result.data.msg);
                            // $state 状态管理不是地址/admin/friendLink
                            $state.go('admin.friendLink')
                        }else{
                            $state.reload()
                        }
                    }
                })
            }else{
                friendLink.update(data,$scope.id).then(function(result){
                    if(result.status == 200){
                        if(result.data.code == 1){
                            alert(result.data.msg);
        
                            $state.go('admin.friendLink')
                        }else{
                            alert(result.data.msg);
                        }
                    }
                })
            }
        }

    }
})
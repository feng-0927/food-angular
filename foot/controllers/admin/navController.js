
app.controller('navCtrl',function($scope,$stateParams, $resource, nav,$state,Form){
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
        nav.count().then(function(result){
            // console.log(result) 
            if(result.status == 200) {
                if(result.data['c']>0){// 有数据
                    // 总数
                    $scope.totalItems = result.data['c'];
                    // 下标
                    $scope.offset = ($scope.currentPage - 1) * $scope.limit;
                    // 分页查询
                    nav.page($scope.limit,$scope.offset).then(function(result){
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
        nav.deleteByIds(idsJson).then(function(result){
            if(result.status == 200){
                alert(result.data.msg)
                $state.reload()
            }
        })
    }
    // 删除一条
	$scope.del = function(id) { 
		nav.delete(id).then(function(result){
			// console.log(result)
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
			}
		})
	}

})

app.controller('navAddCtrl',function($scope,$state,nav,$stateParams,Upload){
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
    $scope.nav = {}
    // 设置是否推荐默认值
    $scope.nav.is_recommend = $scope.recommendArr[0]
    $scope.id = $stateParams.id;
    // 展示功能
	// 获取分类
    nav.query().then(function(result){
        if(result.status = 200){
            console.log(result.data[0])
            // 设置分类默认值
            $scope.nav.cate = result.data[0];
            $scope.cates = result.data;
            // 查一条美食
            if($stateParams.id){
                nav.get($stateParams.id).then(function(result){
                    if(result.status == 200){
                        $scope.nav = result.data
                        $scope.nav.oldpic = result.data.pic
                        // console.log(nav.oldpic)
                        
                        // 重置推荐值
                        $scope.nav.is_recommend = $scope.recommendArr[$scope.nav.is_recommend]
                        // 重置分类值
                        nav.get($scope.nav.cate_id).then(function(res){
                            $scope.nav.cate = res.data
                        })
                    }
                })
            }
        }
    })

	// 添加功能
    $scope.save = function(){

        if($scope.nav.title == undefined){
            alert('名称不能为空')
            return false;
        }
        if($scope.nav.orders == undefined){
            alert('排序不能为空')
            return false;
        }
        if($scope.nav.link == undefined){
            alert('链接不能为空')
            return false;
        }

        var data = {
            orders: $scope.nav.orders,
            title: $scope.nav.title,
            link: $scope.nav.link,
        }

        if($scope.nav.pic){
            Upload.upload({
                url:'../api/admin/nav.php?action=fileUpload',
                data:{file:$scope.nav.pic}
            }).then(function(resp){
                if(resp.data.code){
                    console.log(3456)
                    $scope.nav.pic = resp.data.msg
                    data.pic = resp.data.msg
                    data.oldpic = $scope.nav.oldpic
                    // console.log(data.oldpic)
                    // return false;
                    if(!$scope.id){
                        nav.save(data).then(function(result){
                            if(result.status == 200){
                                if(result.data.code == 1){
                                    alert(result.data.msg);
                                    // $state 状态管理不是地址/admin/nav
                                    $state.go('admin.nav')
                                }else{
                                    $state.reload()
                                }
                            }
                        })
                    }else{
                        nav.update(data,$scope.id).then(function(result){
                            if(result.status == 200){
                                if(result.data.code == 1){
                                    alert(result.data.msg);
                
                                    $state.go('admin.nav')
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
                nav.save(data).then(function(result){
                    if(result.status == 200){
                        if(result.data.code == 1){
                            alert(result.data.msg);
                            // $state 状态管理不是地址/admin/nav
                            $state.go('admin.nav')
                        }else{
                            $state.reload()
                        }
                    }
                })
            }else{
                nav.update(data,$scope.id).then(function(result){
                    if(result.status == 200){
                        if(result.data.code == 1){
                            alert(result.data.msg);
        
                            $state.go('admin.nav')
                        }else{
                            alert(result.data.msg);
                        }
                    }
                })
            }
        }

    }
})
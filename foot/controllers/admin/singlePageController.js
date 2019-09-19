
app.controller('singlePageCtrl',function($scope,$stateParams, $resource, singlePage,$state,Form){
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
        singlePage.count().then(function(result){
            // console.log(result) 
            if(result.status == 200) {
                if(result.data['c']>0){// 有数据
                    // 总数
                    $scope.totalItems = result.data['c'];
                    // 下标
                    $scope.offset = ($scope.currentPage - 1) * $scope.limit;
                    // 分页查询
                    singlePage.page($scope.limit,$scope.offset).then(function(result){
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
        singlePage.deleteByIds(idsJson).then(function(result){
            if(result.status == 200){
                alert(result.data.msg)
                $state.reload()
            }
        })
    }
    // 删除一条
	$scope.del = function(id) { 
		singlePage.delete(id).then(function(result){
			// console.log(result)
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
			}
		})
	}
})

app.controller('singlePageAddCtrl',function($scope,$state,singlePage,singlePage,$stateParams,Upload){
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
    $scope.singlePage = {}
    // 设置是否推荐默认值
    $scope.singlePage.is_recommend = $scope.recommendArr[0]
    $scope.id = $stateParams.id;
    // 展示功能
	// 获取分类
    singlePage.query().then(function(result){
        if(result.status = 200){
            console.log(result.data[0])
            // 设置分类默认值
            $scope.singlePage.cate = result.data[0];
            $scope.cates = result.data;
            // 查一条美食
            if($stateParams.id){
                singlePage.get($stateParams.id).then(function(result){
                    if(result.status == 200){
                        $scope.singlePage = result.data
                        $scope.singlePage.oldpic = result.data.pic
                        // console.log(singlePage.oldpic)
                        
                        // 重置推荐值
                        $scope.singlePage.is_recommend = $scope.recommendArr[$scope.singlePage.is_recommend]
                        // 重置分类值
                        singlePage.get($scope.singlePage.cate_id).then(function(res){
                            $scope.singlePage.cate = res.data
                        })
                    }
                })
            }
        }
    })

	// 添加功能
    $scope.save = function(){

        if($scope.singlePage.title == undefined){
            alert('标题不能为空')
            return false;
        }
        // if($scope.singlePage.price == undefined){
        //     alert('价格不能为空')
        //     return false;
        // }

        var data = {
            title: $scope.singlePage.title,
            price: $scope.singlePage.price,
            content: $scope.singlePage.content,
            cate_id: $scope.singlePage.cate.cate_id,
            is_recommend: $scope.singlePage.is_recommend.id
        }

        if($scope.singlePage.pic){
            Upload.upload({
                url:'../api/admin/singlePage.php?action=fileUpload',
                data:{file:$scope.singlePage.pic}
            }).then(function(resp){
                console.log(resp)
                if(resp.data.code){
                    $scope.singlePage.pic = resp.data.msg
                    data.pic = resp.data.msg
                    data.oldpic = $scope.singlePage.oldpic
                    // console.log(data.oldpic)
                    // return false;
                    if(!$scope.id){
                        singlePage.save(data).then(function(result){
                            if(result.status == 200){
                                if(result.data.code == 1){
                                    alert(result.data.msg);
                                    // $state 状态管理不是地址/admin/singlePage
                                    $state.go('admin.singlePage')
                                }else{
                                    $state.reload()
                                }
                            }
                        })
                    }else{
                        singlePage.update(data,$scope.id).then(function(result){
                            if(result.status == 200){
                                if(result.data.code == 1){
                                    alert(result.data.msg);
                
                                    $state.go('admin.singlePage')
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
                singlePage.save(data).then(function(result){
                    if(result.status == 200){
                        if(result.data.code == 1){
                            alert(result.data.msg);
                            // $state 状态管理不是地址/admin/singlePage
                            $state.go('admin.singlePage')
                        }else{
                            $state.reload()
                        }
                    }
                })
            }else{
                singlePage.update(data,$scope.id).then(function(result){
                    if(result.status == 200){
                        if(result.data.code == 1){
                            alert(result.data.msg);
        
                            $state.go('admin.singlePage')
                        }else{
                            alert(result.data.msg);
                        }
                    }
                })
            }
        }

    }
})
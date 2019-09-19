
app.controller('settingCtrl',function($scope,$stateParams, $resource, setting,$state,Form){
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
        setting.count().then(function(result){
            // console.log(result) 
            if(result.status == 200) {
                if(result.data['c']>0){// 有数据
                    // 总数
                    $scope.totalItems = result.data['c'];
                    // 下标
                    $scope.offset = ($scope.currentPage - 1) * $scope.limit;
                    // 分页查询
                    setting.page($scope.limit,$scope.offset).then(function(result){
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
        setting.deleteByIds(idsJson).then(function(result){
            if(result.status == 200){
                alert(result.data.msg)
                $state.reload()
            }
        })
    }
    // 删除一条
	$scope.del = function(id) { 
		setting.delete(id).then(function(result){
			// console.log(result)
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
			}
		})
	}

})

app.controller('settingAddCtrl',function($scope,$state,setting,$stateParams,Upload){
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
    $scope.setting = {}
    // 设置是否推荐默认值
    $scope.setting.is_recommend = $scope.recommendArr[0]
    $scope.id = $stateParams.id;
    // 展示功能
	// 获取分类
    setting.query().then(function(result){
        if(result.status = 200){
            console.log(result.data[0])
            // 设置分类默认值
            $scope.setting.cate = result.data[0];
            $scope.cates = result.data;
            // 查一条美食
            if($stateParams.id){
                setting.get($stateParams.id).then(function(result){
                    if(result.status == 200){
                        $scope.setting = result.data
                        $scope.setting.oldpic = result.data.pic
                        // console.log(setting.oldpic)
                        
                        // 重置推荐值
                        $scope.setting.is_recommend = $scope.recommendArr[$scope.setting.is_recommend]
                        // 重置分类值
                        setting.get($scope.setting.cate_id).then(function(res){
                            $scope.setting.cate = res.data
                        })
                    }
                })
            }
        }
    })

	// 添加功能
    $scope.save = function(){

        if($scope.setting.setting_name == undefined){
            alert('名称不能为空')
            return false;
        }
        if($scope.setting.setting_value == undefined){
            alert('内容不能为空')
            return false;
        }

        var data = {
            setting_name: $scope.setting.setting_name,
            setting_value: $scope.setting.setting_value,
        }

        if($scope.setting.pic){
            Upload.upload({
                url:'../api/admin/setting.php?action=fileUpload',
                data:{file:$scope.setting.pic}
            }).then(function(resp){
                if(resp.data.code){
                    console.log(3456)
                    $scope.setting.pic = resp.data.msg
                    data.pic = resp.data.msg
                    data.oldpic = $scope.setting.oldpic
                    // console.log(data.oldpic)
                    // return false;
                    if(!$scope.id){
                        setting.save(data).then(function(result){
                            if(result.status == 200){
                                if(result.data.code == 1){
                                    alert(result.data.msg);
                                    // $state 状态管理不是地址/admin/setting
                                    $state.go('admin.setting')
                                }else{
                                    $state.reload()
                                }
                            }
                        })
                    }else{
                        setting.update(data,$scope.id).then(function(result){
                            if(result.status == 200){
                                if(result.data.code == 1){
                                    alert(result.data.msg);
                
                                    $state.go('admin.setting')
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
                setting.save(data).then(function(result){
                    if(result.status == 200){
                        if(result.data.code == 1){
                            alert(result.data.msg);
                            // $state 状态管理不是地址/admin/setting
                            $state.go('admin.setting')
                        }else{
                            $state.reload()
                        }
                    }
                })
            }else{
                setting.update(data,$scope.id).then(function(result){
                    if(result.status == 200){
                        if(result.data.code == 1){
                            alert(result.data.msg);
        
                            $state.go('admin.setting')
                        }else{
                            alert(result.data.msg);
                        }
                    }
                })
            }
        }

    }
})
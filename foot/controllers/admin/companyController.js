
app.controller('companyCtrl',function($scope,$stateParams, $resource, company,$state,Form){
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
        company.count().then(function(result){
            // console.log(result) 
            if(result.status == 200) {
                if(result.data['c']>0){// 有数据
                    // 总数
                    $scope.totalItems = result.data['c'];
                    // 下标
                    $scope.offset = ($scope.currentPage - 1) * $scope.limit;
                    // 分页查询
                    company.page($scope.limit,$scope.offset).then(function(result){
                        // console.log(result)
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
        company.deleteByIds(idsJson).then(function(result){
            if(result.status == 200){
                alert(result.data.msg)
                $state.reload()
            }
        })
    }
    // 删除一条
	$scope.del = function(id) { 
		company.delete(id).then(function(result){
			// console.log(result)
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
			}
		})
	}

})

app.controller('companyAddCtrl',function($scope,$state,company,$stateParams,Upload){
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
    $scope.company = {}
    // 设置是否推荐默认值
    $scope.company.is_recommend = $scope.recommendArr[0]
    $scope.id = $stateParams.id;
    // 展示功能
	// 获取分类
    company.query().then(function(result){
        if(result.status = 200){
            console.log(result.data[0])
            // 设置分类默认值
            $scope.company.cate = result.data[0];
            $scope.cates = result.data;
            // 查一条美食
            if($stateParams.id){
                company.get($stateParams.id).then(function(result){
                    if(result.status == 200){
                        $scope.company = result.data
                        $scope.company.oldpic = result.data.pic
                        // console.log(company.oldpic)
                        
                        // 重置推荐值
                        $scope.company.is_recommend = $scope.recommendArr[$scope.company.is_recommend]
                        // 重置分类值
                        company.get($scope.company.cate_id).then(function(res){
                            $scope.company.cate = res.data
                        })
                    }
                })
            }
        }
    })

	// 添加功能
    $scope.save = function(){

        if($scope.company.title == undefined){
            alert('标题不能为空')
            return false;
        }
        if($scope.company.phone == undefined){
            alert('电话不能为空')
            return false;
        }
        if($scope.company.address == undefined){
            alert('地址不能为空')
            return false;
        }

        var data = {
            title: $scope.company.title,
            phone: $scope.company.phone,
            address: $scope.company.address,
            tel: $scope.company.tel,
            postal_code: $scope.company.postal_code,
        }

        if($scope.company.pic){
            Upload.upload({
                url:'../api/admin/company.php?action=fileUpload',
                data:{file:$scope.company.pic}
            }).then(function(resp){
                console.log(resp)
                if(resp.data.code){
                    $scope.company.pic = resp.data.msg
                    data.pic = resp.data.msg
                    data.oldpic = $scope.company.oldpic
                    // console.log(data.oldpic)
                    // return false;
                    if(!$scope.id){
                        company.save(data).then(function(result){
                            if(result.status == 200){
                                if(result.data.code == 1){
                                    alert(result.data.msg);
                                    // $state 状态管理不是地址/admin/company
                                    $state.go('admin.company')
                                }else{
                                    $state.reload()
                                }
                            }
                        })
                    }else{
                        company.update(data,$scope.id).then(function(result){
                            if(result.status == 200){
                                if(result.data.code == 1){
                                    alert(result.data.msg);
                
                                    $state.go('admin.company')
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
                company.save(data).then(function(result){
                    if(result.status == 200){
                        if(result.data.code == 1){
                            alert(result.data.msg);
                            // $state 状态管理不是地址/admin/company
                            $state.go('admin.company')
                        }else{
                            $state.reload()
                        }
                    }
                })
            }else{
                company.update(data,$scope.id).then(function(result){
                    if(result.status == 200){
                        if(result.data.code == 1){
                            alert(result.data.msg);
        
                            $state.go('admin.company')
                        }else{
                            alert(result.data.msg);
                        }
                    }
                })
            }
        }

    }
})
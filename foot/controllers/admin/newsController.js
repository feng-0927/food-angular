
app.controller('newsCtrl',function($scope,$stateParams, $resource, News,$state,Form){
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
        News.count().then(function(result){
            // console.log(result) 
            if(result.status == 200) {
                if(result.data['c']>0){// 有数据
                    // 总数
                    $scope.totalItems = result.data['c'];
                    // 下标
                    $scope.offset = ($scope.currentPage - 1) * $scope.limit;
                    // 分页查询
                    News.page($scope.limit,$scope.offset).then(function(result){
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
        News.deleteByIds(idsJson).then(function(result){
            if(result.status == 200){
                alert(result.data.msg)
                $state.reload()
            }
        })
    }
    // 删除一条
	$scope.del = function(id) { 
		News.delete(id).then(function(result){
			// console.log(result)
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
			}
		})
	}

})

app.controller('newsAddCtrl',function($scope,$state,News,$stateParams,Upload){
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
    $scope.news = {}
    // 设置是否推荐默认值
    $scope.news.is_recommend = $scope.recommendArr[0]
    $scope.id = $stateParams.id;
    // 展示功能
	// 获取分类
    News.query().then(function(result){
        if(result.status = 200){
            console.log(result.data[0])
            // 设置分类默认值
            $scope.news.cate = result.data[0];
            $scope.cates = result.data;
            // 查一条美食
            if($stateParams.id){
                News.get($stateParams.id).then(function(result){
                    if(result.status == 200){
                        $scope.news = result.data
                        $scope.news.oldpic = result.data.pic
                        // console.log(news.oldpic)
                        
                        // 重置推荐值
                        $scope.news.is_recommend = $scope.recommendArr[$scope.news.is_recommend]
                        // 重置分类值
                        News.get($scope.news.cate_id).then(function(res){
                            $scope.news.cate = res.data
                        })
                    }
                })
            }
        }
    })

	// 添加功能
    $scope.save = function(){

        if($scope.news.title == undefined){
            alert('标题不能为空')
            return false;
        }
        if($scope.news.create_time == undefined){
            alert('时间不能为空')
            return false;
        }
        if($scope.news.description == undefined){
            alert('简介不能为空')
            return false;
        }

        var data = {
            title: $scope.news.title,
            create_time: $scope.news.create_time,
            content: $scope.news.content,
            description: $scope.news.description,
        }

        if($scope.news.pic){
            Upload.upload({
                url:'../api/admin/news.php?action=fileUpload',
                data:{file:$scope.news.pic}
            }).then(function(resp){
                console.log(resp)
                if(resp.data.code){
                    $scope.news.pic = resp.data.msg
                    data.pic = resp.data.msg
                    data.oldpic = $scope.news.oldpic
                    // console.log(data.oldpic)
                    // return false;
                    if(!$scope.id){
                        News.save(data).then(function(result){
                            if(result.status == 200){
                                if(result.data.code == 1){
                                    alert(result.data.msg);
                                    // $state 状态管理不是地址/admin/news
                                    $state.go('admin.news')
                                }else{
                                    $state.reload()
                                }
                            }
                        })
                    }else{
                        News.update(data,$scope.id).then(function(result){
                            if(result.status == 200){
                                if(result.data.code == 1){
                                    alert(result.data.msg);
                
                                    $state.go('admin.news')
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
                News.save(data).then(function(result){
                    if(result.status == 200){
                        if(result.data.code == 1){
                            alert(result.data.msg);
                            // $state 状态管理不是地址/admin/news
                            $state.go('admin.news')
                        }else{
                            $state.reload()
                        }
                    }
                })
            }else{
                News.update(data,$scope.id).then(function(result){
                    if(result.status == 200){
                        if(result.data.code == 1){
                            alert(result.data.msg);
        
                            $state.go('admin.news')
                        }else{
                            alert(result.data.msg);
                        }
                    }
                })
            }
        }

    }
})
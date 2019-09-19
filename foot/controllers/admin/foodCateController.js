
app.controller('foodCateCtrl',function($scope,$stateParams, $resource, FoodCate,$state,Form){
    $scope.maxSize = 2;
    $scope.limit = 3;
    $scope.currentPage = 1
    $scope.totalItems = 0

    Form.checkedAction($scope,'.ids')

    $scope.page = function(currentPage) {

        $scope.currentPage = currentPage || 1
        // 总共有多少条数据
        // totalItems
        FoodCate.catecount().then(function(result){
            // console.log(result) 
            if(result.status == 200) {
                if(result.data['c']>0){
                    $scope.totalItems = result.data['c'];
                    
                    $scope.offset = ($scope.currentPage - 1) * $scope.limit;

                    FoodCate.page($scope.limit,$scope.offset).then(function(result){
                        // console.log(result)
                        if(result.status == 200){
                            $scope.data = result.data;
                            console.log(11)
                        }
                    })
                }
            }
        })
    }
	$scope.page()

    $scope.delAll = function(){
        var idsJson = Form.checkedValToJson('.ids')
        FoodCate.deleteByIds(idsJson).then(function(result){
            if(result.status == 200){
                alert(result.data.msg)
                $state.reload()
            }
        })
    }

	$scope.del = function(id) { 
		FoodCate.delete(id).then(function(result){
			// console.log(result)
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
			}
		})
	}

})

app.controller('foodCateAddCtrl',function($scope,$state,FoodCate,FoodCate,$stateParams){
    $scope.id = $stateParams.id;
    FoodCate.cate().then(function(result){
        console.log(result.data)
        if(result.status = 200){
            // $scope.cate = result.data[0];
            $scope.cates = result.data;
            if($stateParams.id){
                FoodCate.get($stateParams.id).then(function(result){
                    if(result.status == 200){
                        $scope.food = result.data
                        $scope.cate = FoodCate.get($scope.food.cate_id).then(function(res){
                            console.log(res.data.cate_name)
                            $scope.cate = res.data
                        })
                    }
                })
            }
        }
    })


    $scope.save = function(){
        console.log(34)
        var data = {
            cate_name: $scope.cate.cate_name,
        }
        // console.log(data.cate_name);
        if(!$scope.id){
            console.log(23)
            FoodCate.save(data).then(function(result){
                if(result.status == 200){
                    if(result.data.code == 1){
                        alert(result.data.msg);
                        $state.go('admin.foodCate')
                    }else{
                        $state.reload()
                    }
                }
            })
        }else{
            FoodCate.update(data,$scope.id).then(function(result){
                if(result.data.code == 1){
                    alert(result.data.msg);

                    $state.go('admin.foodCate')
                }else{
                    alert(result.data.msg);
                }
            })
        }
    }
})
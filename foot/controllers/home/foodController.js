app.controller("foodCtrl",function($scope,FoodCate,Food,$stateParams){
     	// api->servers->index.html(引入服务)->controller->xxx.html
	// FoodCate.cates().then(function(result){
	// 	$scope.indexsingleP = result.data
	// }),
	Food.gets($stateParams.id).then(function(result){
		$scope.foodone = result.data
	}),
	Food.queryAll().then(function(result){
		$scope.food = result.data
	}),
	FoodCate.cateAll().then(function(result){
		$scope.foodCate = result.data
	})
	$scope.slt = 'one';
	$scope.opt = function(name){
		if(name=='one'){
			console.log("one");
			$scope.slt = 'one';
		}else if(name=='twe'){
			console.log("twe");
			$scope.slt = 'twe';
		}else if(name=='three'){
			console.log("three");
			$scope.slt = 'three';
		}
	}
})
app.controller("shopCtrl",function($scope,Shop,$stateParams,Region){
     	// api->servers->index.html(引入服务)->controller->xxx.html
	// ShopCate.cates().then(function(result){
	// 	$scope.indexsingleP = result.data
	// }),
	Shop.gets($stateParams.id).then(function(result){
		$scope.shopone = result.data
	}),
	Shop.queryAll().then(function(result){
		$scope.shop = result.data
	}),
	Region.queryAll().then(function(result){
		$scope.region = result.data
	})
})
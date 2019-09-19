app.controller("newsCtrl",function($scope,News,$stateParams){
     	// api->servers->index.html(引入服务)->controller->xxx.html
	// FoodCate.cates().then(function(result){
	// 	$scope.indexsingleP = result.data
	// }),
	News.gets($stateParams.id).then(function(result){
		$scope.newsone = result.data
	}),
	News.querys().then(function(result){
		$scope.news = result.data
		// console.log($scope.food)
	})
})
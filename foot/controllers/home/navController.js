app.controller("navCtrl",function($scope,nav){
     	// api->servers->index.html(引入服务)->controller->xxx.html
	nav.querys().then(function(result){
		$scope.indexNav = result.data
	})
})
app.controller("singlePageCtrl",function($scope,singlePage){
     	// api->servers->index.html(引入服务)->controller->xxx.html
		singlePage.querys().then(function(result){
		$scope.pinpai = result.data
	})
})
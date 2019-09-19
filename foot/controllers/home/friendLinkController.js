app.controller("friendLinkCtrl",function($scope,friendLink){
     	// api->servers->index.html(引入服务)->controller->xxx.html
		 friendLink.querys().then(function(result){
		$scope.indexFriend = result.data
	})
})
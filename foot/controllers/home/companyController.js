app.controller("companyCtrl",function($scope,company){
     	// api->servers->index.html(引入服务)->controller->xxx.html
		company.querys().then(function(result){
		$scope.company = result.data
		// console.log(result.data)
	})
})
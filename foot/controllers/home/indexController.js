app.controller("indexCtrl",function($scope,News,singlePage,Food){
     	// api->servers->index.html(引入服务)->controller->xxx.html
	News.querys().then(function(result){
		$scope.indexNews = result.data
	}),
	singlePage.querys().then(function(result){
		$scope.indexsingleP = result.data
	}),
	Food.querys().then(function(result){
		$scope.indexfood = result.data
	}),
	Food.queryAll().then(function(result){
		$scope.indexfoodAll = result.data
	})
	$scope.slt = 'one';
	$scope.opt = function(id){
		if(id=='one'){
			console.log("one");
			$scope.slt = 'one';
		}else if(id=='twe'){
			console.log("twe");
			$scope.slt = 'twe';
		}else if(id=='three'){
			console.log("three");
			$scope.slt = 'three';
		}
	}
})
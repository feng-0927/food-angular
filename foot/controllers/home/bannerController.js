app.controller("bannerCtrl",function($scope,banner){
    // api->servers->index.html(引入服务)->controller->xxx.html
banner.querys().then(function(result){
   $scope.indexbanner = result.data
})
})
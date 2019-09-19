app.factory('News', function ($http) {
	var APIS = './api/admin/news.php?action='
	var API = '../api/admin/news.php?action='
	return {
		gets: function(id){ // 查询一条
			return $http.get( `${APIS}newsOne&id=${id}` ) // promise
		},
		querys: function(){ // 查询所有
			return $http.get( `${APIS}news` ) // promise
		}
	};
})
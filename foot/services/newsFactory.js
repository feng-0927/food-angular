app.factory('News', function ($http) {
	var APIS = './api/admin/news.php?action='
	var API = '../api/admin/news.php?action='

	return {
		get: function(id){
			return $http.get(`${API}newsOne&id=${id}`)
		},
		gets: function(id){ // 查询一条
			return $http.get( `${APIS}newsOne&id=${id}` ) // promise
		},
		querys: function(){ // 查询所有
			return $http.get( `${APIS}news` ) // promise
		},
		query: function(){
			return $http.get( `${API}news` ) // promise
		},
		queryAll: function(){
			return $http.get( `${APIS}newsAll` ) // promise
		},
		page: function(limit, offset){
			return $http.get( `${API}news&limit=${limit}&offset=${offset}` ) // promise
		},
		count: function() {
			return $http.get( `${API}newsCount` )
		},
		delete: function(id) {
			return $http.delete(`${API}newsDelete&id=${id}`)
		},
		deleteByIds: function(ids) {
			return $http.delete(`${API}newsDeleteByIds&ids=${ids}`)
		},
		save: function(data) {
			return $http.post(`${API}newsAdd`,data)
		},
		update: function(data,id){
			return $http.post(`${API}newsAdd&id=${id}`,data)
		}
	};
})
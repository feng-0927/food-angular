app.factory('Food', function ($http) {
	var APIS = './api/admin/food.php?action='
	var API = '../api/admin/food.php?action='

	return {
		get: function(id){
			return $http.get(`${API}foodOne&id=${id}`)
		},
		gets: function(id){
			return $http.get(`${APIS}foodOne&id=${id}`)
		},
		query: function(){
			return $http.get( `${API}food` ) // promise
		},
		querys: function(){
			return $http.get( `${APIS}foods&limit=8` ) // promise
		},
		queryAll: function(){
			return $http.get( `${APIS}foodAll` ) // promise
		},
		page: function(limit, offset){
			return $http.get( `${API}food&limit=${limit}&offset=${offset}` ) // promise
		},
		count: function() {
			return $http.get( `${API}foodCount` )
		},
		delete: function(id) {
			return $http.delete(`${API}foodDelete&id=${id}`)
		},
		deleteByIds: function(ids) {
			return $http.delete(`${API}foodDeleteByIds&ids=${ids}`)
		},
		save: function(data) {
			return $http.post(`${API}foodAdd`,data)
		},
		update: function(data,id){
			return $http.post(`${API}foodAdd&id=${id}`,data)
		}
	};
})
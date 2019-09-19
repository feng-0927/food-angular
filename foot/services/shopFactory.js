app.factory('Shop', function ($http) {
	var APIS = './api/admin/shop.php?action='
	var API = '../api/admin/shop.php?action='

	return {
		get: function(id){
			return $http.get(`${API}shopOne&id=${id}`)
		},
		gets: function(id){
			return $http.get(`${APIS}shopOne&id=${id}`)
		},
		query: function(){
			return $http.get( `${API}shop` ) // promise
		},
		querys: function(){
			return $http.get( `${APIS}shops&limit=8` ) // promise
		},
		queryAll: function(){
			return $http.get( `${APIS}shopAll` )  // promise
		},
		page: function(limit, offset){
			return $http.get( `${API}shop&limit=${limit}&offset=${offset}` ) // promise
		},
		count: function() {
			return $http.get( `${API}shopCount` )
		},
		delete: function(id) {
			return $http.delete(`${API}shopDelete&id=${id}`)
		},
		deleteByIds: function(ids) {
			return $http.delete(`${API}shopDeleteByIds&ids=${ids}`)
		},
		save: function(data) {
			return $http.post(`${API}shopAdd`,data)
		},
		update: function(data,id){
			return $http.post(`${API}shopAdd&id=${id}`,data)
		}
	};
})
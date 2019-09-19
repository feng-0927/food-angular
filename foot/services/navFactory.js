app.factory('nav', function ($http) {
	var APIS = './api/admin/nav.php?action='
	var API = '../api/admin/nav.php?action='

	return {
		get: function(id){
			return $http.get(`${API}navOne&id=${id}`)
		},
		query: function(){
			return $http.get( `${API}nav` ) // promise
		},
		querys: function(){
			return $http.get( `${APIS}nav&limit=6` ) // promise
		},
		page: function(limit, offset){
			return $http.get( `${API}nav&limit=${limit}&offset=${offset}` ) // promise
		},
		count: function() {
			return $http.get( `${API}navCount` )
		},
		delete: function(id) {
			return $http.delete(`${API}navDelete&id=${id}`)
		},
		deleteByIds: function(ids) {
			return $http.delete(`${API}navDeleteByIds&ids=${ids}`)
		},
		save: function(data) {
			return $http.post(`${API}navAdd`,data)
		},
		update: function(data,id){
			return $http.post(`${API}navAdd&id=${id}`,data)
		}
	};
})
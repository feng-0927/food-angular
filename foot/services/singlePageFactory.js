app.factory('singlePage', function ($http) {
	var APIS = './api/admin/singlePage.php?action='
	var API = '../api/admin/singlePage.php?action='

	return {
		get: function(id){
			return $http.get(`${API}singlePageOne&id=${id}`)
		},
		query: function(){
			return $http.get( `${API}singlePage` ) // promise
		},
		querys: function(){
			return $http.get( `${APIS}singlePage` ) // promise
		},
		page: function(limit, offset){
			return $http.get( `${API}singlePage&limit=${limit}&offset=${offset}` ) // promise
		},
		count: function() {
			return $http.get( `${API}singlePageCount` )
		},
		delete: function(id) {
			return $http.delete(`${API}singlePageDelete&id=${id}`)
		},
		deleteByIds: function(ids) {
			return $http.delete(`${API}singlePageDeleteByIds&ids=${ids}`)
		},
		save: function(data) {
			return $http.post(`${API}singlePageAdd`,data)
		},
		update: function(data,id){
			return $http.post(`${API}singlePageAdd&id=${id}`,data)
		}
	};
})
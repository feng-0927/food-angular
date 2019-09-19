app.factory('Region', function ($http) {
	var APIS = './api/admin/region.php?action='
	var API = '../api/admin/region.php?action='

	return {
		get: function(id){
			return $http.get(`${API}regionOne&id=${id}`)
		},
		query: function(){
			return $http.get( `${API}region` ) // promise
		},
		queryAll: function(){
			return $http.get( `${APIS}regionAll` ) // promise
		},
		page: function(limit, offset){
			return $http.get( `${API}region&limit=${limit}&offset=${offset}` ) // promise
		},
		count: function() {
			return $http.get( `${API}regionCount` )
		},
		delete: function(id) {
			return $http.delete(`${API}regionDelete&id=${id}`)
		},
		deleteByIds: function(ids) {
			return $http.delete(`${API}regionDeleteByIds&ids=${ids}`)
		},
		save: function(data) {
			return $http.post(`${API}regionAdd`,data)
		},
		update: function(data,id){
			return $http.post(`${API}regionAdd&id=${id}`,data)
		}
	};
})
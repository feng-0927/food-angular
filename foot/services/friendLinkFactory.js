app.factory('friendLink', function ($http) {
	var APIS = './api/admin/friendLink.php?action='
	var API = '../api/admin/friendLink.php?action='

	return {
		get: function(id){
			return $http.get(`${API}friendLinkOne&id=${id}`)
		},
		query: function(){
			return $http.get( `${API}friendLink` ) // promise
		},
		querys: function(){
			return $http.get( `${APIS}friendLink&limit=6` ) // promise
		},
		page: function(limit, offset){
			return $http.get( `${API}friendLink&limit=${limit}&offset=${offset}` ) // promise
		},
		count: function() {
			return $http.get( `${API}friendLinkCount` )
		},
		delete: function(id) {
			return $http.delete(`${API}friendLinkDelete&id=${id}`)
		},
		deleteByIds: function(ids) {
			return $http.delete(`${API}friendLinkDeleteByIds&ids=${ids}`)
		},
		save: function(data) {
			return $http.post(`${API}friendLinkAdd`,data)
		},
		update: function(data,id){
			return $http.post(`${API}friendLinkAdd&id=${id}`,data)
		}
	};
})
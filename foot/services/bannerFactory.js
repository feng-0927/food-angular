app.factory('banner', function ($http) {
	var APIS = './api/admin/banner.php?action='
	var API = '../api/admin/banner.php?action='

	return {
		get: function(id){
			return $http.get(`${API}bannerOne&id=${id}`)
		},
		query: function(){
			return $http.get( `${API}banner` ) // promise
		},
		querys: function(){
			return $http.get( `${APIS}banner&limit=1` ) // promise
		},
		page: function(limit, offset){
			return $http.get( `${API}banner&limit=${limit}&offset=${offset}` ) // promise
		},
		count: function() {
			return $http.get( `${API}bannerCount` )
		},
		delete: function(id) {
			return $http.delete(`${API}bannerDelete&id=${id}`)
		},
		deleteByIds: function(ids) {
			return $http.delete(`${API}bannerDeleteByIds&ids=${ids}`)
		},
		save: function(data) {
			return $http.post(`${API}bannerAdd`,data)
		},
		update: function(data,id){
			return $http.post(`${API}bannerAdd&id=${id}`,data)
		}
	};
})
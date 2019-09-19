app.factory('company', function ($http) {
	var APIS = './api/admin/company.php?action='
	var API = '../api/admin/company.php?action='

	return {
		get: function(id){
			return $http.get(`${API}companyOne&id=${id}`)
		},
		query: function(){
			return $http.get( `${API}company` ) // promise
		},
		querys: function(){
			return $http.get( `${APIS}company&limit=6` ) // promise
		},
		page: function(limit, offset){
			return $http.get( `${API}company&limit=${limit}&offset=${offset}` ) // promise
		},
		count: function() {
			return $http.get( `${API}companyCount` )
		},
		delete: function(id) {
			return $http.delete(`${API}companyDelete&id=${id}`)
		},
		deleteByIds: function(ids) {
			return $http.delete(`${API}companyDeleteByIds&ids=${ids}`)
		},
		save: function(data) {
			return $http.post(`${API}companyAdd`,data)
		},
		update: function(data,id){
			return $http.post(`${API}companyAdd&id=${id}`,data)
		}
	};
})
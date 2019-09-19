app.factory('setting', function ($http) {
	var APIS = './api/admin/setting.php?action='
	var API = '../api/admin/setting.php?action='

	return {
		get: function(id){
			return $http.get(`${API}settingOne&id=${id}`)
		},
		query: function(){
			return $http.get( `${API}setting` ) // promise
		},
		querys: function(){
			return $http.get( `${APIS}setting&limit=6` ) // promise
		},
		page: function(limit, offset){
			return $http.get( `${API}setting&limit=${limit}&offset=${offset}` ) // promise
		},
		count: function() {
			return $http.get( `${API}settingCount` )
		},
		delete: function(id) {
			return $http.delete(`${API}settingDelete&id=${id}`)
		},
		deleteByIds: function(ids) {
			return $http.delete(`${API}settingDeleteByIds&ids=${ids}`)
		},
		save: function(data) {
			return $http.post(`${API}settingAdd`,data)
		},
		update: function(data,id){
			return $http.post(`${API}settingAdd&id=${id}`,data)
		}
	};
})
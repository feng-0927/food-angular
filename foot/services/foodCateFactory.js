app.factory('FoodCate', function ($http) {
	var FOODCATES = './api/admin/foodcate.php?action='
	var FOODCATE = '../api/admin/foodcate.php?action='

	return {
		get: function(id){
			return $http.get(`${FOODCATE}foodCateOne&id=${id}`)
		},
		cate: function(){
			return $http.get( `${FOODCATE}foodCate` ) // promise
		},
		cateAll: function(){
			return $http.get( `${FOODCATES}foodCateAll` ) // promise
		},
		page: function(limit, offset){
			return $http.get( `${FOODCATE}foodCate&limit=${limit}&offset=${offset}` ) // promise
		},
		catecount: function() {
			return $http.get( `${FOODCATE}foodCateCount` )
		},
		delete: function(id) {
			return $http.delete(`${FOODCATE}foodCateDelete&id=${id}`)
		},
		deleteByIds: function(ids) {
			// console.log(ids);
			return $http.delete(`${FOODCATE}foodCateDeleteByIds&ids=${ids}`)
		},
		update: function(data,id){
			return $http.post(`${FOODCATE}foodCateAdd&id=${id}`,data)
		},
		save: function(data) {
			return $http.post(`${FOODCATE}foodCateAdd`,data)
		}
	};
})
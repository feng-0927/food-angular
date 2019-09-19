app.config(function($stateProvider,$urlRouterProvider){ 
    $urlRouterProvider.otherwise('/index')
    $urlRouterProvider.when('','/index')
    $stateProvider
    .state({
        name:'index',
        url:'/index',
        views:{
            "nav":{
                templateUrl:"views/public/nav.html",
                controller: "navCtrl"
            },
            "banner":{
                templateUrl:"views/public/banner.html",
                controller: "bannerCtrl"
            },
            "content":{
                templateUrl:"views/index.html",
				controller: "indexCtrl"
            },
            "footer":{
                templateUrl:"views/public/footer.html",
                controller: "friendLinkCtrl"
            },
        }
    })
    .state({
        name:'index.news',
        url:'/news',
        views:{
            "content@":{
                templateUrl:"views/news.html",
                controller: "newsCtrl"
            }
        }
    })
    .state({
        name:'index.news.detail',
        url:'/detail/:id',
        views:{
            "content@":{
                templateUrl:"views/news-con.html",
                controller: "newsCtrl"
            }
        }
    })
    .state({
        name:'index.pinpai',
        url:'/pinpai',
        views:{
            "content@":{
                templateUrl:"views/pinpai.html",
                controller: "singlePageCtrl"
            }
        }
    })
    .state({
        name:'index.meishi',
        url:'/meishi',
        views:{
            "content@":{
                templateUrl:"views/meishi.html",
                controller: "foodCtrl"
            },
        }
    })
    .state({
        name:'index.meishi.detail',
        url:'/detail/:id',
        views:{
            "content@":{
                templateUrl:"views/meishi-con.html",
                controller: "foodCtrl"
            },
        }
    })
    .state({
        name:'index.about',
        url:'/about-us',
        views:{
            "content@":{
                templateUrl:"views/about-us.html",
                controller: "companyCtrl"
            },
        }
    })
    .state({
        name:'index.shop',
        url:'/shop',
        views:{
            "content@":{
                templateUrl:"views/shop.html",
                controller: "shopCtrl"
            },
        }
    })
    .state({
        name:'index.shop.detail',
        url:'/detail/:id',
        views:{
            "content@":{
                templateUrl:"views/shop-con.html",
                controller: "shopCtrl"
            },
        }
    })
})
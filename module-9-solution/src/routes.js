(
  function () {
    angular.module('data').config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider

      .state('categories', {
          url: '/categories',
          templateUrl: 'src/categories.template.html',
          controller: 'CategoriesController as categories',
          resolve: {
            items: ['MenuDataService', function (MenuDataService) { 
              return MenuDataService.getAllCategories();
            }]
          }  
        }
      )

     .state('items', {
          url: '/items/{itemId}',
          templateUrl: 'src/items.template.html',
          controller: 'ItemsController as items',
          resolve: {
            item: ['$stateParams', 'MenuDataService',
                    function ($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.itemId).then(function (items) {
                          return items.menu_items;
                        });
                  }]
          }
        }
      )

      .state('home', {
          url: '/',
          templateUrl: 'src/home.template.html'
        }
      )
    }
  }
)();

(
    function () {
        angular.module('data').service('MenuDataService', MenuDataService);

        MenuDataService.$inject = ['$http', '$q'];

        function MenuDataService($http, $q) {
            var menuDataService = this;
            var items = [];

            menuDataService.getAllCategories = function () {
                var defer = $q.defer();

                $http.get('https://davids-restaurant.herokuapp.com/categories.json')
                .success(
                    function(data) {
                        menuDataService.items = data;

                        defer.resolve(data);
                    }
                )

                return defer.promise;
            };

            menuDataService.getItemsForCategory = function (categoryShortName) {     
                var defer = $q.defer();
                
                $http.get('https://davids-restaurant.herokuapp.com/menu_items.json?category=' + categoryShortName)
                .success(
                    function(data) {
                        menuDataService.items = data;
                    
                        defer.resolve(data);
                    }
                )

                return defer.promise;
            };
        }

    }
)();

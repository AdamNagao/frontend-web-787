(
    function () {
        angular
            .module("NarrowItDownApp", [])
            .controller("NarrowItDownController", NarrowItDownController)
            .service("MenuSearchService", MenuSearchService)
            .directive("foundItems", FoundItemsDirective);

        MenuSearchService.$inject = ["$http"];
        NarrowItDownController.$inject = ["$scope", "MenuSearchService"];

        function MenuSearchService($http) {
            var service = this;

            service.getMatchedMenuItems = function (searchTerm) {
                var foundItems = [];

                return $http({method: "GET", url: "https://davids-restaurant.herokuapp.com/menu_items.json",}).then(function (response) {
                    var items = response.data.menu_items;

                    for (var i = 0; i < items.length; i++) {
                        if (items[i].description.indexOf(searchTerm) >= 0)
                            foundItems.push(items[i]);
                    }

                    return foundItems;
                });
            }
        }

        function NarrowItDownController($scope, MenuSearchService) {
            var narrowItDown = this;

            narrowItDown.narrowIt = function () {
                if(!$scope.searchTerm){
                    return;
                }

                MenuSearchService.getMatchedMenuItems($scope.searchTerm).then(function (response) {
                    narrowItDown.found = response;
                });
            }

            narrowItDown.removeItem = function (index) {
                narrowItDown.found.splice(index, 1);
            };
        }

        function FoundItemsDirectiveController() {
            var foundItemsDirective = this;
        }

        function FoundItemsDirective() {
            var foundItemsDirective = {
                templateUrl: "foundItems.html",
                scope: {
                    foundItems: "<",
                    onRemove: "&",
                },
                controller: FoundItemsDirectiveController,
                controllerAs: "list",
                bindToController: true,
            };

            return foundItemsDirective;
        }
    }
)();

(
	function () {
	    angular.module('data').controller('CategoriesController', CategoriesController);

	    CategoriesController.$inject = ['MenuDataService', 'items'];

	    function CategoriesController(MenuDataService, items) {
	        var mainList = this;
	        mainList.items = items;
	    }
	}
)();

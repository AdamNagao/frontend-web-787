(
	function () {
		angular.module('data').controller('ItemsController', ItemsController);

		ItemsController.$inject = ['$stateParams', 'item', '$scope'];

		function ItemsController($stateParams, item, $scope) {    
		    var items = this;
		    items.name = $stateParams.itemId;

		    var selectedItems = [];

		    for (var i = 0; i < item.length; i++) 
		    { 
		        selectedItems.push('(' + item[i].short_name + ') - ' + item[i].name + ' - '+ item[i].description + ' - ' + ' Small: $' + item[i].price_small + ' - Large: $'+ item[i].price_large);
		    }
		    
		    $scope.selectedItems = selectedItems;
		}
	}
)();

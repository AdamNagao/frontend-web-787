(
    function() {
        angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService) 
        .filter('itemTotal', itemTotalFilter);

        function ShoppingListCheckOffService() {
            var service = this;

            service.itemsToBuy = [  { name:'Oranges', quantity: 10, pricePerItem: 1 }, 
                                    { name: 'Apples', quantity: 5, pricePerItem: 2 }, 
                                    { name: 'Plums', quantity: 8, pricePerItem: 1.5 },
                                    { name: 'Pears', quantity: 3, pricePerItem: 3 },
                                    { name: 'Pineapples', quantity: 1, pricePerItem: 10 },
                                    { name: 'Peaches', quantity: 6, pricePerItem: 4 }
                                 ];

            service.boughtItems = [];

            service.buyItem = function (index, items) {
                var boughtItem = {
                    name: '',
                    quantity: '',
                    pricePerItem: ''
                }

                boughtItem.name = items[index].name;
                boughtItem.quantity = items[index].quantity;
                boughtItem.pricePerItem = items[index].pricePerItem;

                items.splice(index, 1);
                service.boughtItems.push(boughtItem);
            };
        };

        ToBuyController.$inject = ['ShoppingListCheckOffService'];
        AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

        function ToBuyController(ShoppingListCheckOffService) {
            var toBuy = this;
            toBuy.itemsToBuy = ShoppingListCheckOffService.itemsToBuy;

            toBuy.buyItem = function(itemIndex) {
                ShoppingListCheckOffService.buyItem(itemIndex, toBuy.itemsToBuy);
            }         
        };


        function AlreadyBoughtController(ShoppingListCheckOffService) {
            var alreadyBought = this;  
            alreadyBought.boughtItems = ShoppingListCheckOffService.boughtItems;
        };

        function itemTotalFilter(){
            return function(item) {
                return '$$$' + item.quantity * item.pricePerItem
            }
        }
    }
)();
(
    function () {
        angular.module('LunchCheck',[])

        .controller('LunchCheckController', function($scope) {
            $scope.items = '';
            $scope.message = '';

            $scope.submit = function (){
                var items = $scope.items.split(',');
                var numberOfItems = 0;

                items.forEach((item) => {
                    if (item != false) {
                        numberOfItems++;
                    }
                });

                if(numberOfItems > 0 && numberOfItems <= 3) {
                    $scope.messageClass = 'green'
                    $scope.message = 'Enjoy!';
                }
                else if(numberOfItems > 3) {
                    $scope.messageClass = 'green'
                    $scope.message = 'Too much!';                    
                }
                else {
                    $scope.messageClass = 'red'
                    $scope.message = 'Please enter data first';
                }
            }
        } );   
    }
)();
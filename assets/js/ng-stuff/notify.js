codesa
.controller("NotifyController", ["$scope", "$rootScope", function($scope, $rootScope){
    
    $scope.notifications = [];
    
    $scope.removePush = function(push){
        var ind = seek(push);
        if (ind !== -1){
            removePush(ind);
        }
    }
    
    function seek(push){
        var ind = -1;
        for (var i = 0; i < $scope.notifications.length; i++) {
            if ($scope.notifications[i].id === push.id){
                ind = i;
                break;
            }
        }
        return ind;
    }
    
    function removePush(ind){
        $scope.notifications.splice(ind,1);
    }
    
    $rootScope.$on("push", function (event, push) {
        $scope.notifications.push(push);
        ($scope.notifications.length > 5) && $scope.notifications.splice(0,1); //remove primer push si hay mas de 5
        //set time to remove
        setTimeout(function(){
            $scope.removePush(push);
            $scope.$apply();
        }, 5000);
    });
}]);
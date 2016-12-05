  angular.module("myapp",[]).controller("ctrl",function($scope,$http){
    url = "/binstatus";
    $scope.bins = [];
    setInterval(function(){
      $http.get(url).success(function(data){
        $scope.bins = data;

      })
      .error(function(){

      });
    },500);


      $scope.getHeight = function(filled){
        return (100-filled)*2.4;
      }
  })

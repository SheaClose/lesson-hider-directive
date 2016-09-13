angular.module('directivePractice')
.controller("lessonCtrl", function($scope){
  $scope.lessons = ['Services', 'Routing', 'Directives', 'Review', 'Firebase', 'No server project', 'Node', 'Express', 'Mongo'];
  $scope.test="Two Way Binding!";
  $scope.announceDay = function(lesson, day) {
    if (!day) {alert(lesson + ' is not scheduled')}
    else{
    alert(lesson + ' is active on ' + day + '.');
    }
    $scope.strikeText = function(lesson) {
    }
  }
})

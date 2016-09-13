angular.module('directivePractice')
.directive("lessonHider", function(){
  return {
      templateUrl: "./lessonHider.html"
    , scope: {
        lesson: "="
      , dayAlert: "&"
    }
    , link: function(scope, elem, attr){
        scope.getSchedule().then(function(response){
          scope.schedule = response.data;
          // console.log(response.data)
          scope.schedule.forEach(function( scheduleDay ) {
            if (scheduleDay.lesson === scope.lesson) {
              elem.css('text-decoration', 'line-through');
              scope.lessonDay = scheduleDay.weekday;
              // console.log(scope.lesson)
              return;
            }

          });
        })
    }
    , controller: function ($scope, lessonService){
      $scope.getSchedule = lessonService.getSchedule;
      }
    }
})

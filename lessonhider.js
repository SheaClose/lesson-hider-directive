angular.module('directivePractice')
.directive("lessonHider", function(){
  return {
      templateUrl: "./lessonHider.html"
    , scope: {
      lessons: "="
    }
    , link: function(scope, elem, attr){

    }
  }
})

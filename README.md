```javascript
angular.module('directivePractice')
.directive('lessonHider', function() {

  return {
    templateUrl: 'lessonHider.html',
    restrict: 'E',
    scope: {
      lesson: '='
    },
    controller: function( $scope, lessonService ) {
      $scope.getSchedule = lessonService.getSchedule;
    },
    link: function( scope, element, attributes ) {
      scope.getSchedule().then(function( response ) {
        scope.schedule = response.data;
      });
    }
  }

});
```

Now we have all the data we need for basic functionality! Time to make use of that data inside our link function. The link function in directives is primarily
used when you need to manipulate the DOM, and it will feel a lot like jQuery (because Angular is using a pared down version of jQuery called jqLite). So now
we're going back to some basics.

First of all we will need to loop through our schedule array and check whether `scope.lesson` matches a lesson that is already scheduled. If we find the value
then we need to do some basic jQuery to strike throuh that list item. It's also a good idea to tell your function to also `return;` if it finds the value,
preventing your loop from continuing to run after you've found the lesson.

Our directive now has functionality and is an example of a real world use case! But there's still more we can do!

## Step 7: Passing a function to our directive

What if the user wants to know on which day a lesson would be active? Right now all they know is that some lessons are active somewhere in the schedule. Let's
fix this!

Before adding more functionality, let's make sure we're up to speed. Here is what your directive should look like now:

```javascript
angular.module('directivePractice')
.directive('lessonHider', function() {

  return {
    templateUrl: 'lessonHider.html',
    restrict: 'E',
    scope: {
      lesson: '='
    },
    controller: function( $scope, lessonService ) {
      $scope.getSchedule = lessonService.getSchedule();
    },
    link: function( scope, element, attributes ) {

      scope.getSchedule.then(function( response ) {
        scope.schedule = response.data;

        scope.schedule.forEach(function( scheduleDay ) {
          if (scheduleDay.lesson === scope.lesson) {
            element.css('text-decoration', 'line-through');
            return;
          }
        });
      });

    }
  }

});
```

First we will need to add a new property onto our scope object. Let's call this property `dayAlert:`. We will be passing this value a function, so remember that
we want to use the `'&'` instead of the `'='`. Now that we have that property on our scope, we need to give it a value, so let's go back to our `lessonCtrl` and
write a new function named `announceDay()`. This function will be nice and simple. It should take two parameters: lesson and day. It should alert `lesson + ' is
active on ' + day + '.'`.

Our next step is to pass this new function to our directive. Don't forget that Angular will swap camelCase to snake-case in your html! The directive element
inside your index.html should now look something like this:

```html
<lesson-hider ng-repeat="lesson in lessons" lesson="lesson" day-alert="announceDay(lesson, day)"></lesson-hider>
```

Now that we have access to our new function inside of our directive we need to change a few things. First off, we will need to save a reference to the lesson's
day on our scope. So inside our link function's `if` statement we will create a new property called `scope.lessonDay` and set it equal to the day in the
schedule's `weekday` property. With this reference we are ready to make `dayAlert` available to our users.

Inside our directive's template, let's add a button element and give that element an ng-click attribute with the value of `ng-click="dayAlert({ lesson: lesson,
day: lessonDay })"`. This syntax is a little strange, but it is just a quirk of directives.

We pass the function call a single object with key names that match the parameter names we gave `day-alert` in our html and then give those keys the values of
the arguments we would like to pass to the function. In this case we want to pass our `scope.lesson` property as the first argument to `lesson` and our
`scope.lessonDay` property as the second argument that will be passed to `day`.

## Step 8: Next steps

Congratulations! You have written a new custom directive that utilizes the restrictions, a templateUrl, isolate scope, a controller, and a link function!
Directives can be a lot to wrap your head around, so here are a few options to familiarize yourself further:

1. Try to fix out `dayAlert()`, which currently alerts `'Lesson is active on undefined'` if we select a lesson that's not in the schedule.
1. Add a checkbox to toggle whether lessons in the schedule are crossed out or not.
1. Allow users to remove lessons from the schedule; have your directive update when a lesson is removed.

Directives are an incredibly intricate and powerful piece of AngularJS, so keep practicing and searching out new use-cases for them. Once again, congratulations
on your first fully-fledged custom directive!

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master
repo and branch.

## Copyright

© DevMountain LLC, 2015. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly
prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original
content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">

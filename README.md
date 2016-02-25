## Shippable

### My Solution

This immediately jumped out as a straightforward sinlge-page app, with Angular.js being a great option. 

#### Interface
The UI is basic with an input box and a table that we want to show populate with dynamic data after we hit the github API with an HTTP request. There are some basic Angular validations on the front end to ensure that the text being input is a valid github url. 

#### Controller
The file `scripts/app.js` contains a controller that handles a submit event. It deconstructs the user's input and puts together a query string for the `$http` request.

#### Services
The file `scripts/services.js` contains a factory and helper function to take the list of issues from the `$http` request, map out relevant data, and count how many will fit into each category denoted by the table headers. My method was to convert each date into Unix epoch format using `Date.parse()` and measuring the difference between each date and the current date/time. It returns an object that is plugged directly into the `$scope` at repo.tableData.

#### Server
Very basic Node/Express server to simply serve the static files to each user.

#### Deployment
I customized an AWS EC2 instance and used Forever.js to run the app indefinitely. 

[Live demo](http://52.36.236.43/)

### Given More Time

I would return much more data to the front-end and use `ng-click` and `ng-show` directives to expand the counts for each time window category into a list of issue names, with the assignee and other details, while also linking to the issue's URL. I would also return the repo owner's image to the UI as a purely aesthetic addition.
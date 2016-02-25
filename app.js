angular.module('RepoDetails', ['data'])

.controller('MainController', ['$scope', '$http', '$q', 'dataServices', function ($scope, $http, $q, dataServices) {
	$scope.repo = {};

	$scope.urlSubmit = function(text) {
		// make sure it's a github url
		if (text.indexOf('github.com') == -1) {
			$scope.invalid = true;
		} else {
			var path = text.slice(text.indexOf('.com') + 5).split('/');
			var owner = path[0];
			var repoName = path[1];
			var api = 'https://api.github.com/repos/';
			var params = 'state=open&sort=created';
			var querystring = api + owner + '/' + repoName + '/issues?' + params;

			// hit the api
			$http.get(querystring)
			.success(function(issues) {
				$scope.success = true;
				$scope.repo.owner = owner;
				$scope.repo.name = repoName;

				// link table data with results from service
				$scope.repo.tableData = dataServices.processData(issues);
			})
			.error(function(data) {
				$scope.fail = true;
			});

			$scope.repo.url = '';
		}
	};

}]);
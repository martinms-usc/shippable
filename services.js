angular.module('data', [])

.factory('dataServices', function() {

	// return table-ready issue information
	var processData = function(data) {
		var tableData = {};
		var current = Date.parse(new Date());
		var issues = data.map(function(issue) {
			return {
				opened: Date.parse(issue.created_at), 
				url: issue.repository_url
			};
		});
		var counts = getCounts(issues, current);

		tableData.total = issues.length;
		tableData.url = issues[0].url;
		tableData.lastDay = counts.lastDay;
		tableData.lastWeek = counts.lastWeek;
		tableData.weekPlus = issues.length - tableData.lastDay - tableData.lastWeek;

		return tableData;
	};

	// compare repo created_at dates with current time/date
	function getCounts(array, now) {
		var msInDay = 86400000;
		var msInWeek = 604800000;
		var counts = {
			lastDay: 0,
			lastWeek: 0
		};

		for (var i = 0; i < array.length; i++) {
			var diff = now - array[i].opened;

			if (diff <= msInDay) {
				counts.lastDay++;
			} else if (diff > msInDay && diff <= msInWeek) {
				counts.lastWeek++;
			}
		}

		return counts;
	}

	return {
		processData: processData
	}

});
var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
	
	$http({
		method : "GET",
		url    : "http://tjrapp.wpi.edu:5353/api/v1/activity-entries",
		params : {}
	}).then(function mySuccess(response){
		$scope.activityList=response.data;
	},function myError(response){
		$scope.activityList=response.statusText;
	});

	function JSONToCSVConvertor(JSONData,ReportTitle,ShowLabel){
		var arrData=typeof JSONData !="object" ? JSON.parse(JSONData) : JSONData;

		var csv='';

		csv +=ReportTitle + '\r\n\n';
		if(ShowLabel){
			var row="";

			for(var index in arrData[0]){
				row +=index+',';
			}

			row=row.slice(0,-1);

			csv +=row+'\r\n';
		}
		for(var i=0;i<arrData.length;i++){
			var row="";

			for(var index in arrData[i]){
				row +='"' + arrData[i][index]+'",';
			}
			row.slice(0,row.length-1);

			csv +=row+'\r\n';

		}
		if(csv ==''){
			alert('Invalid data');
			return;
		}

		var fileName="Activity_";

		fileName+=ReportTitle.replace(/ /g,"_");

		var uri='data:text/csv:charset=utf-8,'+escape(csv);

		var link=document.createElement("a");
		link.href=uri;

		link.style="visibility:hidden";
		link.download=fileName+".csv";


		document.body.appendChild(link);

		link.click();
		document.body.removeChild(link);
	}

	$scope.createCsv=function(){
		alert("Hello");
        JSONToCSVConvertor($scope.activityList,'ALL_data_Angular_King',true);
	}
}]);
'use strict';

angular.module('xoApp')
  .controller('MatchPlayerCtrl', function ($scope, angularFire, $location) {
	$scope.waitingRoom = {};    

    var waitingRoomRef = new Firebase("https://hkwdi-tictactoe.firebaseio.com/waiting_room");
  	
  	$scope.p = angularFire(waitingRoomRef, $scope, "waitingRoom");


  	//step 1
  	/*$scope.p.then(function() {
  		$scope.waitingRoom = {xJoined: true, gameBoardNumber: generateGameBoardNumber()};
  	});*/

	//STEP 2  	
  	// $scope.p.then (function() {
  	// 	$scope.createWaitingRoom();
  	// });

  	// $scope.createWaitingRoom = function() {
  	// 	$scope.waitingRoom = {xJoined: true, gameBoardNumber: generateGameBoardNumber()};
  	// 	$scope.noticeMessage = "You are x, waiting for opponent.";
  	// }

  	//STEP 3
	$scope.p.then (function() {
		if($scope.waitingRoom.xJoined == true) {
			$scope.joinWaitingRoom();
		}
		else{
			$scope.createWaitingRoom();
		}	
  	});

  	$scope.createWaitingRoom = function() {
  		$scope.waitingRoom = {xJoined: true, gameBoardNumber: generateGameBoardNumber()};
  		$scope.noticeMessage = "You are player x, waiting for opponent.....";

  		waitingRoomRef.on('child_removed', function(snapshot) { //child_removed event
  			// TODO should double check if the I am paired
  			$location.path('multi_game/' + $scope.waitingRoom.gameBoardNumber + '/x');
  		});
  	}

  	$scope.joinWaitingRoom = function() {
  		var gameBoardNumber = $scope.waitingRoom.gameBoardNumber;
  		$scope.waitingRoom = {};

  		$location.path('multi_game/' + gameBoardNumber + '/o');
  	}

  	// TODO what happens if I refresh the page
  	// TODO how to check if the opponent is alive?
  	// TODO how to check if the opponent is matching you?
  	// TODO make sure id is unique


  	function generateGameBoardNumber() {
  		return Math.floor(Math.random() * 16777215).toString(16);
  	}

  });

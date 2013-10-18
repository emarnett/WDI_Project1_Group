'use strict';

angular.module('xoApp')
    .controller('GameCtrl', function($scope, localStorageService, $timeout, angularFire, $routeParams) {

        //var ref = new Firebase("https://hkwdi-tictactoe.firebaseio.com/");

        //var p = angularFire(ref, $scope, "leaderData");


        // p.then(function() {
        // 	console.log("data loaded");
        // });

        /*$scope.getName = function() {
  		$scope.userName = prompt("What is your name?");
  		localStorageService.add("name", $scope.userName);
  	};

  	$scope.addWinToLeaderboard = function() {
  		if($scope.userName) {
  			if($scope.leaderData.user.hasOwnProperty($scope.userName)) {
  				$scope.leaderData.user[$scope.userName]++;
  			}
  			else{
  				$scope.leaderData.user[$scope.userName] = 1;
  			}
  		}
  	};*/



        $scope.xCount = localStorageService.get("xWins");
        $scope.oCount = localStorageService.get("oWins");

        $scope.hideStartButtons = false;
        $scope.showGameboard = false;
        $scope.empty = " ";
        $scope.currentPlayer;
        $scope.computerOpponent;
        $scope.finished;
        $scope.showRestartButton = $scope.finished;
        $scope.cells = [];
        $scope.info;

        $scope.minutes = "0";
        $scope.counterMinutes = "0" + $scope.minutes;
        $scope.seconds = "0";
        $scope.counterSeconds = "0" + $scope.seconds;
        var stop;

        $scope.stopTimer = function() {
            $timeout.cancel(stop);
        };

        $scope.startTimer = function() {
            stop = $timeout(function() {

                if ($scope.seconds == "59") {
                    $scope.minutes++;
                    if ($scope.minutes <= 9) {
                        $scope.counterMinutes = "0" + $scope.minutes;
                    } else {
                        $scope.counterMinutes = $scope.minutes;
                    }
                    $scope.seconds = "0";
                    $scope.counterSeconds = "0" + $scope.seconds;
                } else {
                    $scope.seconds++;
                    if ($scope.seconds <= 9) {
                        $scope.counterSeconds = "0" + $scope.seconds;
                    } else {
                        $scope.counterSeconds = $scope.seconds;
                    }
                }

                $scope.startTimer();

            }, 1000);
        };

        $scope.refreshTimer = function() {

            $scope.minutes = "0";
            $scope.counterMinutes = "0" + $scope.minutes;
            $scope.seconds = "0";
            $scope.counterSeconds = "0" + $scope.seconds;
        };

        $scope.startGameWithComputer = function() {
            $scope.initialize(true);
        };

        $scope.startGameWithFriend = function() {
            $scope.initialize(false);
        };

        $scope.initialize = function(computer) {
            if (localStorageService.get("name")) {
                //$scope.userName = localStorageService.get("name");
                //alert("Hello " + $scope.userName);
            } else {
                //$scope.getName();
            }
            $scope.hideStartButtons = true;
            $scope.showGameboard = true;
            $('#gameboard').addClass('animated bounceIn');
            $scope.refresh();
            $scope.randomizePlayer(computer);
        }

        $scope.randomizePlayer = function(computer) {
            var random = Math.floor(Math.random() * 2) + 1;

            if (random == 1) {
                $scope.currentPlayer = "x";
            } else {
                $scope.currentPlayer = "o";
            }
            $scope.info = $scope.currentPlayer + "'s turn!";

            if (computer) {
                var random2 = Math.floor(Math.random() * 2) + 1;
                if (random2 == 1) {
                    if ($scope.currentPlayer == "x") {
                        $scope.computerOpponent = "x";
                    } else {
                        $scope.computerOpponent = "o";
                    }

                    $scope.makeOpponentMove();
                    $scope.info = "Your turn as " + $scope.currentPlayer;
                } else {
                    var random3 = Math.floor(Math.random() * 2) + 1;
                    if (random3 == 1) {
                        $scope.currentPlayer = "x";
                        $scope.computerOpponent = "o";
                    } else {
                        $scope.currentPlayer = "o";
                        $scope.computerOpponent = "x";
                    };
                    $scope.info = "You play first, as " + $scope.currentPlayer;
                }
            }
        }

        $scope.refresh = function() {
            $scope.finished = false;
            $scope.showRestartButton = $scope.finished;

            for (var i = 0; i < 9; i++) {
                $scope.cells[i] = $scope.empty;
            };
            $('#gameboard').addClass('animated bounceIn');
            if ($scope.computerOpponent) {
                if ($scope.currentPlayer == $scope.computerOpponent) {
                    $scope.makeOpponentMove();
                } else {
                    $scope.info = "Your turn as " + $scope.currentPlayer;
                }
            } else {
                $scope.info = $scope.currentPlayer + "'s turn!";
            }
        };

        $scope.makeNextMove = function(location) {
            $scope.cells[location - 1] = $scope.currentPlayer;

            $('#gameboard').removeClass('animated bounceIn');
            if ($scope.isWinning() == true) {
                $scope.finished = true;

                if ($scope.computerOpponent) {
                    if ($scope.computerOpponent == $scope.currentPlayer) {
                        $scope.info = "computer wins!";
                    } else {
                        $scope.info = "you win!";
                    };
                } else {
                    $scope.info = $scope.currentPlayer + " wins!";
                };

                var winner = $scope.currentPlayer;

                if (winner == "x") {
                    $scope.xCount++;
                    localStorageService.add("xWins", $scope.xCount);
                } else {
                    $scope.oCount++;
                    localStorageService.add("oWins", $scope.oCount);
                }

                //addWinToLeaderboard();

            } else {
                if ($scope.isATie()) {
                    $scope.finished = true;
                    $scope.info = "It's a tie!";
                } else {
                    if ($scope.currentPlayer == "x") {
                        $scope.currentPlayer = "o";
                    } else {
                        $scope.currentPlayer = "x";
                    };
                    if ($scope.computerOpponent) {
                        if ($scope.computerOpponent == $scope.currentPlayer) {
                            $scope.makeOpponentMove();
                        } else {
                            $scope.info = "Your turn as " + $scope.currentPlayer;
                        }
                    } else {
                        $scope.info = $scope.currentPlayer + "'s turn!";
                    }
                };
            };

        };

        $scope.handleClick = function(location) {

            if ($scope.computerOpponent == $scope.currentPlayer) {} else {
                if ($scope.finished == true) {} else {
                    if ($scope.currentSquareClickedAlready(location)) {} else {
                        $scope.makeNextMove(location);
                    };
                };
            };
            $scope.showRestartButton = $scope.finished;
        };

        $scope.currentSquareClickedAlready = function(location) {
            if ($scope.cells[location - 1] != false) {
                return true;
            };
        }


        $scope.isWinning = function() {
            if ($scope.isHorizontalThreeOccupiedByMe($scope.currentPlayer) || $scope.isVerticalThreeOccupiedByMe($scope.currentPlayer) || $scope.isDiagonalThreeOccupiedByMe($scope.currentPlayer)) {
                return true;
            };
        }

        $scope.isHorizontalThreeOccupiedByMe = function(player) {

            var result = true;

            for (var i = 0; i < 3; i++) {
                if ($scope.cells[i] != player) {
                    result = false;
                };
            };

            if (result == false) {
                result = true;
                for (var i = 3; i < 6; i++) {
                    if ($scope.cells[i] != player) {
                        result = false;
                    };
                };
            }

            if (result == false) {
                result = true;
                for (var i = 6; i < 9; i++) {
                    if ($scope.cells[i] != player) {
                        result = false;
                    };
                };
            }
            return result;
        }

        $scope.isVerticalThreeOccupiedByMe = function(player) {

            var result = true;

            for (var i = 0; i < 9; i += 3) {
                if ($scope.cells[i] != player) {
                    result = false;
                };
            };

            if (result == false) {
                result = true;
                for (var i = 1; i < 9; i += 3) {
                    if ($scope.cells[i] != player) {
                        result = false;
                    };
                };
            }

            if (result == false) {
                result = true;
                for (var i = 2; i < 9; i += 3) {
                    if ($scope.cells[i] != player) {
                        result = false;
                    };
                };
            }

            return result;
        }

        $scope.isDiagonalThreeOccupiedByMe = function(player) {

            var result = true;

            for (var i = 0; i < 9; i += 4) {
                if ($scope.cells[i] != player) {
                    result = false;
                };
            };

            if (result == false) {
                result = true;
                for (var i = 2; i < 7; i += 2) {
                    if ($scope.cells[i] != player) {
                        result = false;
                    };
                };
            };

            return result;
        }

        $scope.makeOpponentMove = function() {
            do {
                var random = Math.floor(Math.random() * 9) + 1;
            }
            while ($scope.cells[random - 1] != $scope.empty)

            $scope.makeNextMove(random);
        }

        $scope.isATie = function() {
            var result = true;

            for (var i = 0; i < 9; i++) {
                if ($scope.cells[i] == $scope.empty) {
                    result = false;
                };
            };

            return result;
        };

    });
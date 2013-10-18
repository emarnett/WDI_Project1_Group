'use strict';

angular.module('xoApp')
    .controller('MultiGameCtrl', function($scope, localStorageService, $timeout, angularFire, $routeParams) {

        $scope.gameBoardId = $routeParams.id;
        $scope.mySymbol = $routeParams.mySymbol;
        $scope.currentPlayer = 'x';
        $scope.cells = [];
        $scope.showLeaderBoard = false;

        var gameBoardRef = new Firebase("https://hkwdi-tictactoe.firebaseio.com/" + $routeParams.id + "/room");
        var ref = new Firebase("https://hkwdi-tictactoe.firebaseio.com/" + $routeParams.id + "/leaderData");

        $scope.promise = angularFire(gameBoardRef, $scope, "cells");

        $scope.leaderData = {};
        $scope.p = angularFire(ref, $scope, "leaderData");

        $scope.promise.then(function() {
            $scope.userName = prompt("What is your name?");
            $scope.cells = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
            if ($routeParams.mySymbol == 'x') {
                console.log("I am First Move: Symbol: " + $routeParams.mySymbol);
                $scope.myTurn = true;
                $scope.info = "You start as player x";
                $scope.leaderData[$scope.userName] = 0;

            } else {
                console.log("I am Second Move: Symbol: " + $routeParams.mySymbol);
                $scope.myTurn = false;
                $scope.info = "You are player o Player x moves first";
                $scope.leaderData[$scope.userName] = 0;
            }
        });

        $scope.getName = function() {
            $scope.userName = prompt("What is your name?");
        };

        $scope.addWinToLeaderboard = function() {
            if ($scope.userName) {
                if ($scope.leaderData.hasOwnProperty($scope.userName)) {
                    $scope.leaderData[$scope.userName]++;
                } else {
                    $scope.leaderData[$scope.userName] = 1;
                }
            }
        };



        gameBoardRef.on('value', function(snapshot) {
            console.log("wait received!");
            if ($scope.finished == true) {
                //if(snapshot.val() != null) {
                if (!arrays_equal(snapshot.val(), $scope.cells)) {
                    console.log("my turn - diff gameboard");
                    console.log("refresh!");
                    $scope.refresh();

                } else {
                    console.log("same gameboard");
                }
                //} else {
                //	console.log("snapshot is empty");
                //}

            }
            if (!$scope.myTurn) {
                if (snapshot.val() != null) {
                    if (!arrays_equal(snapshot.val(), $scope.cells)) {
                        console.log("diff gameboard");

                        $scope.cells = snapshot.val();

                        if ($scope.cells == [" ", " ", " ", " ", " ", " ", " ", " ", " "]) {
                            console.log("refresh!");
                            $scope.refresh();
                        } else {
                            $scope.myTurn = true;
                            $scope.info = "Your turn!";
                        }

                        if ($scope.isWinning('x') || $scope.isWinning('o')) {
                            console.log("Won!");
                            $scope.finished = true;
                            if ($scope.isWinning('x')) {
                                $scope.info = "x wins!";
                            } else {
                                $scope.info = "o wins!";
                            }
                        }
                        if ($scope.isDraw()) {
                            console.log("Draw!");
                            $scope.finished = true;
                            $scope.info = "It's a draw!";
                        }
                        $scope.showRestartButton = $scope.finished;
                    } else {
                        console.log("same gameboard");
                    }
                } else {
                    console.log("snapshot is empty");
                }
            } else {
                console.log("it is my turn but I receive ");
            }
        });


        function arrays_equal(a, b) {
            return !(a < b || b < a);
        }


        $scope.handleClick = function(location) {
            $('#gameboard').removeClass('animated bounceIn');
            if ($scope.myTurn) {
                if ($scope.finished == true) {} else {
                    if ($scope.currentSquareClickedAlready(location)) {} else {

                        $scope.cells[location] = $scope.mySymbol;
                        $scope.myTurn = false;
                        if ($scope.isWinning($scope.mySymbol)) {
                            $scope.info = "You win!!";
                            $scope.finished = true;
                            console.log("Won inside click!");
                            $scope.addWinToLeaderboard();
                        } else if ($scope.isDraw()) {
                            $scope.finished = true;
                            console.log("Draw!");
                            $scope.info = "It's a draw!";
                        } else {
                            if ($scope.mySymbol == 'x') {
                                $scope.info = "player o's turn!";
                            } else {
                                $scope.info = "player x's turn!";
                            }
                        }
                    };
                };

            } else {
                console.log("Not my turn!");
            }
            $scope.showRestartButton = $scope.finished;


        }

        $scope.currentSquareClickedAlready = function(location) {

            if ($scope.cells[location] == " ") {
                return false;
            } else {
                return true;
            }
        }

        $scope.isWinning = function(player) {
            if ($scope.isHorizontalThreeOccupiedByMe(player) || $scope.isVerticalThreeOccupiedByMe(player) || $scope.isDiagonalThreeOccupiedByMe(player)) {
                return true;
            };
        }

        $scope.isDraw = function() {
            var result = true;

            for (var i = 0; i < 9; i++) {
                if ($scope.cells[i] == " " || $scope.cells[i] == null) {
                    result = false;
                };
            };

            return result;
        }

        $scope.refresh = function() {
            $scope.finished = false;

            $('#gameboard').addClass('animated bounceIn');
            $scope.cells = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

            $scope.showRestartButton = $scope.finished;
            $scope.showLeaderBoard = true;

            if ($scope.myTurn) {
                console.log("I am First Move: Symbol: " + $routeParams.mySymbol);
                $scope.info = "You start as player " + $routeParams.mySymbol;
            } else {
                console.log("I am Second Move: Symbol: " + $routeParams.mySymbol);
                $scope.myTurn = false;
                $scope.info = "You are player " + $routeParams.mySymbol + ": Your opponent moves first";
            }
        };

        $scope.finished = false;
        $scope.showRestartButton = $scope.finished;

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



    });
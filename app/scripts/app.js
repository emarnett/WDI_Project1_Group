/*

var empty = "";
var currentPlayer;
var xCount = 0;
var oCount = 0;
var computerOpponent;
var finished;

function initialize(computer) {
	randomizePlayer(computer);
}

function randomizePlayer(computer) {
	var random = Math.floor(Math.random() * 2) + 1;
	if(random == 1) {
		currentPlayer = "x";
		document.getElementById("currentPlayer").innerHTML = currentPlayer + "'s turn!";
	} else {
		currentPlayer = "o";
		document.getElementById("currentPlayer").innerHTML = currentPlayer + "'s turn!";
	}
	
	if (computer){
		var random2 = Math.floor(Math.random() * 2) + 1;
		if(random2 == 1) {
			if ( currentPlayer == "x") {
				computerOpponent = "x";
			}
			else {
				computerOpponent = "o";
			}

			makeOpponentMove();
		} else {
			var random3 = Math.floor(Math.random() * 2) + 1;
			if(random3 == 1) {
				currentPlayer = "x";
				computerOpponent = "o";
			} else {
				currentPlayer = "o";
				computerOpponent = "x";
			};

			document.getElementById("currentPlayer").innerHTML = "You play first, as " 
																				+ currentPlayer;
		}
	}
}

function refresh() {
	finished = false;
	for (i=1; i<10; i++) {
		var currentCell = document.getElementById('cell' + i);
		currentCell.innerHTML = empty;
		currentCell.classList.remove("x");
		currentCell.classList.remove("o");
	};
	$('#gameboard').addClass('animated bounceIn');
	if (computerOpponent) {
		if (currentPlayer == computerOpponent) {
			makeOpponentMove();
		}
		else {
			document.getElementById("currentPlayer").innerHTML = "Your turn as " + currentPlayer;
		}
	}
	else {
		document.getElementById("currentPlayer").innerHTML = currentPlayer + "'s turn!";
	}
};

function changeSquareContent(location, player) {
	document.getElementById('cell' + location).innerHTML = player;
	if (player == "x") {
		document.getElementById('cell' + location).classList.toggle(player);
	} else {

	document.getElementById('cell' + location).classList.toggle(player);
	}
};

function makeNextMove(location) {
	changeSquareContent(location, currentPlayer);
	$('#gameboard').removeClass('animated bounceIn');
	if ( isWinning() == true) {
		finished = true;
		if(computerOpponent) {
			if (computerOpponent == currentPlayer) {
				document.getElementById("currentPlayer").innerHTML = "computer wins!";
			} else {
				document.getElementById("currentPlayer").innerHTML = "you win!";
				};
		}
		else {
			document.getElementById("currentPlayer").innerHTML = currentPlayer + " wins!";
		};

		var winner = currentPlayer;

		if (winner == "x") {
			xCount++;
		}
		else {
			oCount++;
		}

		updateLeaderBoard();
		//refresh();
	} else {
		if (isATie()) {
			finished = true;
			document.getElementById("currentPlayer").innerHTML = "It's a tie!";
		} else {
			if (currentPlayer == "x") {
				currentPlayer = "o";	
			} else {
				currentPlayer = "x";
			};
			if (computerOpponent) {
				if (computerOpponent == currentPlayer) {
					makeOpponentMove();
				} else {
					document.getElementById("currentPlayer").innerHTML = "Your turn as " + currentPlayer;
				}
			} else {
				document.getElementById("currentPlayer").innerHTML = currentPlayer + "'s turn!";
			}
		};
	};
	
};

function handleClick(location) {
	if (computerOpponent == currentPlayer) {

	}
	else {
		if (currentSquareClickedAlready(location)) {
		}
		else {
		makeNextMove(location);
		};
	};
};

function currentSquareClickedAlready(location) {
	if (document.getElementById('cell' + location).innerHTML != empty) {
		return true;	
	};
}

function isTopHorizontalThreeOccupiedByMe(player) {
	var result = true;
	for (i=1; i<4; i++) {
		if (document.getElementById('cell' + i).innerHTML != player) {
			result = false;
		};
	};
	if (result == true) {	
		alert(player + " wins!");
	};
}

function isWinning() {

	if (isHorizontalThreeOccupiedByMe(currentPlayer) || isVerticalThreeOccupiedByMe(currentPlayer)
	 || isDiagonalThreeOccupiedByMe(currentPlayer)) {
		return true;
		
	};

}

function isHorizontalThreeOccupiedByMe(player) {
	
	var result = true;

	for (i=1; i<4; i++) {
		if (document.getElementById('cell' + i).innerHTML != player) {
			result = false;
		};
	};

	if(result == false) {
		result = true;
		for (i=4; i<7; i++) {
			if (document.getElementById('cell' + i).innerHTML != player) {
				result = false;
			};
		};
	}

	if(result == false) {
		result = true;
		for (i=7; i<10; i++) {
			if (document.getElementById('cell' + i).innerHTML != player) {
				result = false;
			};
		};
	}


	return result;
}

function isVerticalThreeOccupiedByMe(player) {
	
	var result = true;

	for (i=1; i<10; i+=3) {
		if (document.getElementById('cell' + i).innerHTML != player) {
			result = false;
		};
	};

	if(result == false) {
		result = true;
		for (i=2; i<10; i+=3) {
			if (document.getElementById('cell' + i).innerHTML != player) {
				result = false;
			};
		};
	}

	if(result == false) {
		result = true;
		for (i=3; i<10; i+=3) {
			if (document.getElementById('cell' + i).innerHTML != player) {
				result = false;
			};
		};
	}

	return result;
}

function isDiagonalThreeOccupiedByMe(player) {
	
	var result = true;

	for (i=1; i<10; i+=4) {
		if (document.getElementById('cell' + i).innerHTML != player) {
			result = false;
		};
	};

	if (result == false) {
		result = true;
		for (i=3; i<8; i+=2) {
			if (document.getElementById('cell' + i).innerHTML != player) {
				result = false;
			};
		};
	};

	return result;
}

function updateLeaderBoard() {
	document.getElementById("xcount").innerHTML = xCount;
	document.getElementById("ocount").innerHTML = oCount;
}

function makeOpponentMove() {
	do {
	var random = Math.floor(Math.random() * 9) + 1;
	}
	while (document.getElementById('cell' + random).innerHTML != empty) 
	makeNextMove(random);
}

function isATie() {
	var result = true;

	for (i=1; i<10; i++) {
		if (document.getElementById('cell' + i).innerHTML == empty) {
			result = false;
		};
	};

	return result;

};*/

angular.module('LocalStorageModule').value('prefix', 'gaDatabase');
angular.module('xoApp', ['LocalStorageModule', 'firebase'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/how_to', {
                templateUrl: 'views/how_to.html',
                controller: 'HowToCtrl'
            })
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/game', {
                templateUrl: 'views/game.html',
                controller: 'GameCtrl'
            })
            .when('/match_player', {
                templateUrl: 'views/match_player.html',
                controller: 'MatchPlayerCtrl'
            })
            .when('/multi_game/:id/:mySymbol', {
                templateUrl: 'views/multi_game.html',
                controller: 'MultiGameCtrl'
            })
            .otherwise({
                redirectTo: '/'
            })
    })
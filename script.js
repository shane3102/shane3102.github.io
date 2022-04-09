var panelIds = ["loremPanel","gamePanel","imagePanel"];

var gamestate = [[" "," "," "],
				 [" "," "," "],
				 [" "," "," "]];
var who = 0;
var isGameWon = false;
var infoTemplate = "Wygral gracz grajacy: "
	
function restart(){
	gamestate = [[" "," "," "],
				 [" "," "," "],
				 [" "," "," "]];

	for(let i = 1; i<=3; i++){
		for(let j = 1; j<=3; j++){
			document.getElementById("square" + i + j).innerHTML = " ";
		}
	}
	document.getElementById("info").innerHTML = " ";
	isGameWon = false;
}

function isMoveAvailable(){
	for(let i = 1; i<=3; i++){
		for(let j = 1; j<=3; j++){
			if(gamestate[i-1][j-1]==" ") return true;
		}
	}
	return false;
}
	
function isWon(){
	let result = isWonDiagonally();
	if(result==" "){
		result = isWonHorisontally();
	}
	if(result==" "){
		result = isWonVertically();
	}
	return result;
}

function isWonHorisontally(){
	let result = ' ';
	for(let i=1; i<=3; i++){
		var searched = gamestate[i-1][0];
		for(let j=2;j<=3;j++){
			if(searched!=gamestate[i-1][j-1]){
				searched = " ";
			}
		}
		if(searched!=" ") return searched;
	}
	return " ";
}

function isWonVertically(){
	let result = " ";
	for(let i=1; i<=3; i++){
		var searched = gamestate[0][i-1];
		for(let j=2;j<=3;j++){
			if(searched!=gamestate[j-1][i-1]){
				searched = " ";
			}
		}
		if(searched!=" ") return searched;
	}
	return " ";
}


function isWonDiagonally(){
	if(gamestate[0][0]==gamestate[1][1] && gamestate[1][1]==gamestate[2][2]){
		return gamestate[0][0];
	}
	if(gamestate[0][2]==gamestate[1][1] && gamestate[1][1]==gamestate[2][0]){
		return gamestate[0][2];
	}
	return " ";
}

function dodaj(i,j){
	if(!isGameWon){
		let XorO = who == 0 ? "X" : "O"
		document.getElementById("square" + i + j).innerHTML = XorO;
		gamestate[i-1][j-1] = XorO;
		who = (who % 2 + 1) % 2;
	}
	let result = isWon();
	if(result!=" ") {
		isGameWon = true;
		document.getElementById("info").innerHTML = infoTemplate + result;
	} else if(!isMoveAvailable()){
		isGameWon = true;
		document.getElementById("info").innerHTML = "Brak dostepnego ruchu - padl remis";
	}
}

function changeDisplay(number){
	for(let i = 1;i<=3;i++){
		document.getElementById(panelIds[parseInt(i-1)]).style.display = "none";
	}
	
	document.getElementById(panelIds[parseInt(number)]).style.display = "inline";
}
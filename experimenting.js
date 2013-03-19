var firstLine = "What's your name, Stranger?",
	secondLine = "Are you sure this is where you want to be?",
	color = "white",
	timerId;

window.onload = flashText(firstLine);

function flashText(text_string){	
	document.getElementById("screen_text").innerHTML = text_string.fontcolor(color);
	//timerId = setInterval(function(){document.getElementById("screen_text").innerHTML = text_string.fontcolor(switchColor());}, 500);
}

function switchColor(){
	color = (color == "black")? "white":"black";
	return color;
}

function greeting(){
	//if (timerId) clearInterval(timerId);
	//document.getElementById("screen_text").innerHTML = secondLine;
	window.open("greeting.html","_self");

}



/*  how to do scrolling text
var temp = "";
	while (i<text_string.length){
		temp +=text_string.charAt(i);
		document.getElementById("screen_text").innerHTML = temp;
		i++;

		*/

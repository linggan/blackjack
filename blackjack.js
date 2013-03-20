
window.onload = firstLoad;
var deal_hand = document.getElementById('deal'),
    risk_it = document.getElementById("risk"),
    tip_it = document.getElementById("tip"),
    redeal_it = document.getElementById("redeal");


//**INITITALIZATION FUNCTIONS**

function firstLoad(){
	initEverything();
}	
function initEverything(){
	number_of_cards_left = 52;
	deck_one_notdrawn = [];
	deck_two_notdrawn = [];
	hands_dealt = 0;
  gender = (getRandomInt(0, 100)%2 === 0)?"he":"she";
  pronoun = (gender === "she")?"her":"his";

	deckInit();
}

function deckInit(){
	for (var i = 0; i<52;  i++){
		deck_one_notdrawn[i] = i;  //each index contains a value referring to a card name
		deck_two_notdrawn[i] = i;
	} 
}

//**COOKIE FUNCTIONS**  (adapted from class examples)
/*
function setCookie(name, value, expires, path, domain, secure) {
  var curCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}

// name - name of the cookie
// [path] - path of the cookie (must be same as path used to create cookie)
// [domain] - domain of the cookie (must be same as domain used to create cookie)
// * path and domain default if assigned null or omitted if no explicit argument proceeds
function deleteCookie(name, path, domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" + 
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

// date - any instance of the Date object
// * hand all instances of the Date object to this function for "repairs"
function fixDate(date) {
  var base = new Date(0);
  var skew = base.getTime();
  if (skew > 0)
    date.setTime(date.getTime() - skew);
}

//welcome screen
var now = new Date();
now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000);
var username = getCookie("name");
var blackjack_count = getCookie("tally");
if (username) {
  alert("So you've found your way back here, " + name + ".  Your tally is currently at " + blackjack_count + ".");
} else {
  blackjack_count = 0; 
  username = prompt("What's your name Stranger?", "");
  setCookie("name", username, now);
  setCookie("tally", blackjack_count, now);
}*/

//***HELPER FUNCTIONS***

function removeValueFromArray(array, value){
	if(array.indexOf(value) != -1) { // Make sure the value exists
        array.splice(array.indexOf(value), 1);
    }  
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function calculateCardValueFromNum(number){
	var card_value = Math.ceil(number/4);
	
	if(card_value>4){  //not a face card
		return 13-card_value+2;
	}
	if (card_value === 1){ //ace
		return 11;
	}	
	if (card_value > 1 && card_value <5){  //face card
		return 10;
	}
}


//***MAIN GAME LOOP***
//***description of algorithm:  
//init two decks s.t. each index corresponds to one of the cards
//chooses random card
//based on picture name (the way the png is named was arbitrary; that's just how the files were downloaded), calculate the value
//display.  add values.  remove index from array.

deal_hand.onclick = function (e) {
	
	//parameters must account for zero-based indexing 
	var new_card_one = getRandomInt(2, number_of_cards_left),
	    new_card_two = getRandomInt(2, number_of_cards_left);
	
	var card_one = deck_one_notdrawn[new_card_one-1],  
		  card_two = deck_two_notdrawn[new_card_two-1];
		
	var value_one = calculateCardValueFromNum(card_one),
   		value_two = calculateCardValueFromNum(card_two);

   	var two_aces = (value_one+value_two == 22)? true: false; //if two aces, set boolean to be true
	
	//display new image for deck_one and deck_two
	document.getElementById('deck_one_pic').src = "cards/" + card_one + ".png";
	document.getElementById('deck_two_pic').src = "cards/" + card_two + ".png";
	
	//display actual card string for debugging purposes
	/*
	document.getElementById("one").innerHTML = "cards/" + card_one + ".png" + " has value" + value_one; 
	document.getElementById("two").innerHTML = "cards/" + card_two + ".png" + " has value" + value_two; 
	document.getElementById("three").innerHTML = value_one + value_two;
	*/

	//document.getElementById("card_one_field").value = value_one; 
	//document.getElementById("card_two_field").value = value_two; 
	//document.getElementById("total_of_cards_field").value = (two_aces == false) ? value_one + value_two: 21;
  hands_dealt++;
  number_of_cards_left -= 1;

	document.getElementById("hands_dealt").innerHTML = "number of hands dealt: " + hands_dealt;
  document.getElementById("cards_left").innerHTML = "cards left: " + number_of_cards_left;
   
   	removeValueFromArray(deck_one_notdrawn, card_one);
   	removeValueFromArray(deck_two_notdrawn, card_two);
   	
   	
   	if (value_one+value_two === 21){
   		alert("blackjack!");
   	}
   	
   	if (number_of_cards_left == 0){
   	document.getElementById("hacky_alert_box").style.zIndex = 1;
    document.getElementById("hacky_alert_box").innerHTML = "how about another go?";
    var j = 0, k = 0;   //arbitrarily chose twenty as increment
    while(j<=20){
      k = (j === 20) ? 0: Math.sin(Math.PI/20*j);   //rounding errors makes the actual calculations sligthly off
      hacky_animation(k, 120*j);
      j++;
    }  
    setTimeout(function(){document.getElementById("hacky_alert_box").style.zIndex = -1;}, 120*20);

   		initEverything();
   		
   	}

};

risk_it.onclick = function(e){
    var i;
    var half_deck = number_of_cards_left/2;

    document.getElementById("hacky_alert_box").style.zIndex = 1;
    document.getElementById("hacky_alert_box").innerHTML = "removed half of cards left";
    for (i = 0; i<half_deck; i++){
      var one = getRandomInt(2, number_of_cards_left),
          two = getRandomInt(2, number_of_cards_left);

          removeValueFromArray(deck_one_notdrawn, one);
          removeValueFromArray(deck_two_notdrawn, two);

        number_of_cards_left -= 1;
    }
    
    var j = 0, k = 0;   //arbitrarily chose twenty as increment
    while(j<=20){
      k = (j === 20) ? 0: Math.sin(Math.PI/20*j);   //rounding errors makes the actual calculations sligthly off
      hacky_animation(k, 120*j);
      j++;
    }  
    
    document.getElementById("cards_left").innerHTML = "cards left: " + number_of_cards_left;
    setTimeout(function(){document.getElementById("hacky_alert_box").style.zIndex = -1;}, 120*20);
    
};

function hacky_animation(alpha, timing){
      setTimeout(function(){document.getElementById("hacky_alert_box").style.opacity = alpha;}, timing);
}

function hacky_animation_two(alpha, timing){
      setTimeout(function(){document.getElementById("hacky_choice_box").style.opacity = alpha;}, timing);
}
tip_it.onclick = function(e){
  //don't know how to get this to work
  /*
    document.getElementById("hacky_choice_box").style.zIndex = 1;
    document.getElementById("tip_one").style.display = 'inline';
    document.getElementById("tip_two").style.display = 'inline';
    document.getElementById("tip_three").style.display = 'inline';
    document.getElementById("cheapskate").style.display = 'inline';

    var j = 0, k = 0;   //arbitrarily chose ten as increment
    while(j<=10){
      k = Math.sin(Math.PI/2/10*j);   //rounding errors makes the actual calculations sligthly off
      hacky_animation_two(k, 120*j);
      j++;
    }     */   

    document.getElementById("hacky_alert_box").style.zIndex = 1;
    document.getElementById("hacky_alert_box").innerHTML = "tipped the dealer a fiver.";

    var j = 0, k = 0;   //arbitrarily chose ten as increment
    while(j<=10){
      k = Math.sin(Math.PI/2/10*j);   //rounding errors makes the actual calculations sligthly off
      hacky_animation(k, 120*j);
      j++;
    } 

    var chance = getRandomInt(0, 100);

    if (chance<75){
      var index = getRandomInt(2, number_of_cards_left);
      setTimeout(function(){document.getElementById("hacky_alert_box").innerHTML = gender + " smiles and winks back.";}, 120*10);
      deck_one_notdrawn[index] = 0;  //swaps card at random index to ace
      deck_two_notdrawn[index] = 0;  
      
    }
    if (chance>=75){
      setTimeout(function(){document.getElementById("hacky_alert_box").innerHTML = gender + " narrows " + pronoun +" eyes.";}, 120*10);
      removeValueFromArray(deck_one_notdrawn, 0);  //removes ace from each deck
      removeValueFromArray(deck_two_notdrawn, 0);
      number_of_cards_left--;
      document.getElementById("cards_left").innerHTML = "cards left: " + number_of_cards_left;

    }

    
    var j = 0, k = 0;   //arbitrarily chose ten as increment
    while(j<=10){
      k = (j === 10)?0:Math.cos(Math.PI/2/10*j);   //rounding errors makes the actual calculations sligthly off
      hacky_animation(k, 120*j+120*10);
      j++;
    } 

    setTimeout(function(){document.getElementById("hacky_alert_box").style.zIndex = -1;}, 2400);


};

redeal_it.onclick = function(e){
    document.getElementById("hacky_alert_box").style.zIndex = 1;
    document.getElementById("hacky_alert_box").innerHTML = "reset and reshuffled. it'll cost ya.";
    var j = 0, k = 0;   
    while(j<=30){
      k = (j === 30) ? 0: Math.sin(Math.PI/30*j);   //rounding errors makes the actual calculations slightly off
      hacky_animation(k, 120*j);
      j++;
    }  
    setTimeout(function(){document.getElementById("hacky_alert_box").style.zIndex = -1;}, 120*30);

    initEverything();      
    document.getElementById("cards_left").innerHTML = "cards left: " + number_of_cards_left;
    document.getElementById("hands_dealt").innerHTML = "number of hands dealt: " + hands_dealt;


        
};



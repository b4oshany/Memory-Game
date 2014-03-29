// start of submission //
A = "position:absolute;";
W = "width:120px;height:160px;";
var audioElement = document.getElementById("audio");
var username = document.querySelector("#profilename");
var userturn = document.querySelector("#turns");
var userpic = document.querySelector("#gamer_photo");
var holder = document.querySelector("#wrapperholder");
var mode = 1;
var supportStorage = false;
var userdata = {"username": "Player 1", "turn": 0, "photo": null, "points": 0};
var apponentdata = {"username": "Player 2", "turn":0, "photo":null, "points": 0};

holder.innerHTML="<div id='wrapper'><div id='playoptions'><input onclick='setGameMode(\"single\")'  type='button' value='Single Player' class='play_option'/><input onclick='setGameMode(\"two\")' type='button' value='VS Mode' class='play_option'/></div></div>";
//<input onclick='setGameMode(\"network\")' type='button' value='Network Mode' class='play_option'/><
holder.style.height = window.innerHeight+"px";

if(typeof(Storage) !== undefined){
    supportStorage = true;
    if(localStorage.gamer === undefined) saveData(userdata);
    else{
        userdata = JSON.parse(localStorage.gamer); 
        if(userdata.username != null) username.innerHTML = "Hi, "+userdata.username;
        if(userdata.photo != null) userpic.setAttribute("src", userdata.photo);        
    }
    mode = (localStorage.mode == undefined)? 1 : parseInt(localStorage.mode);             
    if(mode == 2){
        if(localStorage.apponent == undefined)
            saveApponentData(apponentdata)
        else
            apponentdata = JSON.parse(localStorage.apponent);
        userturn.innerHTML = 12;     
    }
    if(localStorage.gamedata == undefined)
        alert("This is a memory game. For each correct answer you get 3 points, while for each wrong answer 1 point will be deducted from your score. \n\r Note. the game will automatically save your progress"); 
}

function twoPlayerMode(){    
    if(mode == 2) {
        apponent_turn = (supportStorage && !isNaN(apponentdata.turn))? parseInt(apponentdata.turn): 0;  
        if(apponentdata.username != null) document.querySelector("#apponent_profilename").innerHTML = "Hi, "+apponentdata.username;
        if(apponentdata.photo != null) document.querySelector("#apponent_pic").setAttribute("src", apponentdata.photo);   
        apponturn = document.querySelector("#apponent_turns");
        apponturn.innerHTML = 12 - apponent_turn; 
        document.querySelector("#apponent_profilename").onclick=function(){
            var usr = prompt("Please enter your username");
            apponentdata.username = usr;
            saveApponentData(apponentdata);
            if(usr != null) this.innerHTML = "Hi, "+usr;
        }
        document.querySelector("#apponent_pic").onclick=function(){
            var photo = prompt("Enter url for profile image");
            apponentdata.photo = photo;
            saveApponentData(apponentdata);
            if(photo != null) this.setAttribute("src", photo);
        }    
    }
}

function saveData(userdata){
    if(supportStorage)
        localStorage.gamer = JSON.stringify(userdata)
}

function saveApponentData(apponentData){
    if(supportStorage)
        localStorage.apponent = JSON.stringify(apponentData)
}

function saveGameData(data){
    if(supportStorage)
        localStorage.gamedata = data
}

function loadGameData(){
    l = 8;
    if(supportStorage && localStorage.gamedata != undefined) b.innerHTML = localStorage.gamedata;
    else D();
}

window.onload = function(){
    opholder = document.querySelector("#playoptions");
    opholder.style.top = "-"+(opholder.clientHeight/2)+"px"; 
    opholder.style.left = "-"+(opholder.clientWidth/2)+"px";
    if(userdata.username != null) username.innerHTML = userdata.username;
    if(userdata.photo != null) userpic.setAttribute("src", userdata.photo);   
    saveData(userdata);
    turn = (supportStorage && !isNaN(userdata.turn))? parseInt(userdata.turn): 0;
    userturn.innerHTML = (mode == 1)? 24 - turn : 12 - turn;
}

function restart(){
        if(supportStorage) localStorage.clear();
        location.reload()
}

function C(e, c) {
    e.className = "w " + c
}

function P(s) {
    return ";-webkit-" + s + ";-moz-" + s + ";-o-" + s
}

function R(a) {
    return a.splice(0 | a.length * Math.random(), 1)[0]
}

function S(y){
    if(y){
        audioElement.setAttribute("src", "/static/sound/flip.mp3");
        audioElement.play();
    }else{        
        audioElement.setAttribute("src", "/static/sound/won.mp3");
        audioElement.play();
    }
}

var show = ".w.v .c.b {z-index: 900;-webkit-transform: rotatey(180deg);opacity: 0;}"
 +".w.v .c.f {z-index: 1000;-webkit-transform: rotatey(0deg);opacity: 1; background: white;}";
var hide = ".c.b { -webkit-transform-style: preserve- 3 d;  -webkit-backface-visibility: hidden;  -webkit-transition: all ease-in-out 0.4s;   z-index: 900;}"
+".c.f {position: absolute; top: 0; left: 0; z-index: 800; -webkit-transform: rotatey(-180deg); -webkit-transform-style: preserve- 3 d; -webkit-backface-visibility: hidden;"
 +"-webkit-transition: all ease-in-out 0.4s;opacity: 0;}";

document.querySelector("head").innerHTML = "<style>.w{" + W + "position: relative; "+P("perspective: 700")+"border:1px solid #777;text-align:center;margin:5px;float:left" + "; }.v .b,.p .b{" + P("transform:scale(0)") + "}.c{" + W + A + "font-size:80px}b{" + A + "font-size:24px;left:5px}.b,.r{color:red}.b{background: black url(http://jbrown72.files.wordpress.com/2010/12/yugioh-card-back.jpg) no-repeat; background-size: cover; " + P("transition:1s") +"} .txt{position: absolute; top: 30%; ;left: 10%;} "+hide+show+"</style>";

var clicks = 0;
function RS(){ 
	var con = confirm("Do you want to start a new game?");
	if(con){b.innerHTML = ""; D(); turn = 1; clicks = 0;}
}

function F(t) {
    if(t.className.indexOf("p")){
	clicks++;
	skip = false;
	if(turn == ((mode == 1)? 24 : 12)){ RS(); return};
    v = b.querySelectorAll(".v");
    x = v[0];
    y = v[1];
    if (y) C(x, ""), C(y, "");
    if (x && !y && x != t && x.innerHTML == t.innerHTML) C(x, "p"), C(t, "p"), l--, (mode == 1)? userdata.points += 3 : (turn == apponent_turn)? userdata.points += 3: apponentdata.points += 3, skip = true;
    else{ 
        C(t, "v"); 
        if (clicks%2==0 && x != t) 
            if(skip) skip = false 
            else if(mode == 1) turn++, userdata.points = parseInt(userdata.points) - 1;
            else if(mode == 2) 
                if(turn == apponent_turn) turn++, userdata.points = parseInt(userdata.points) - 1
                else apponent_turn++, apponentdata.points = parseInt(apponentdata.points) - 1;
        userdata.turn = turn, saveData(userdata), document.querySelector("#turns").innerHTML = (mode == 1)? 24 - turn : 12 - turn; 
        if(mode == 2) apponentdata.turn = apponent_turn, saveApponentData(apponentdata), document.querySelector("#apponent_turns").innerHTML = 12 - apponent_turn;
    }
    document.querySelector("#profilepoints").innerHTML = userdata.points;
    if(mode == 2) document.querySelector("#apponentpoints").innerHTML = apponentdata.points;
    S(true);
    if (!l) S(false), whowon = (mode == 1)? "You are smart!" : (userdata.points > apponentdata.points)? userdata.name+" won!" : (userdata.points < apponentdata.points)? apponentdata.name+" won!" : "Sadly, its a draw"; if(supportStorage) localStorage.clear(); setTimeout( function(){alert(whowon); location.reload(); }, 2000)
    saveGameData(b.innerHTML);
    }
}
function D(){
	q = "0A23456789JQK♥♠♦♣".split("");
	q[0] = 10;
	p = [];
	for (c = 13; c < 17; c++)
		for (i = 0; i < 13; i++) p.push([c % 2 ? ' r' : '', c, q[i]]);
	d = [];
	for (i = 0; i < 8; i++) d[i] = d[i + 8] = R(p);
	h = '<div class="flip" style="width:530px">';
	for (i = 16; i; i--) c = R(d), h += '<div class="w" onclick="F(this)"><div class="c f' + c[0] + '"><b>' + q[c[1]] + '</b>' + '<span class="txt" >'+c[2]+'</span>' + '</div><div class="c b"></div></div>';
	b.innerHTML = h + '</div>'
}

function setGameMode(play_mode){
    mode = (play_mode == 'single')? 1 : (play_mode == 'two')? 2 : 1;    
    if(mode == 2) document.querySelector("#gamers").innerHTML += "<p id='vs'>VS</p><div id='apponent'><p><span id='apponent_profilename'>Player 2</span> (edit)</p><p>Your points, <span id='apponentpoints'>0</span></p><div id='apponent_pic'><img src='static/148871.jpg' id='apponent_photo' /><p id='note'>Click to change profile pic</p><p>Number of turns leave: <span id='apponent_turns'>0</span></p></div>";
    if(supportStorage) localStorage.mode = mode;   
    document.body.removeChild(holder);    
    loadGameData();
    document.querySelector("#gamer").style.display = "block";
    if(mode == 2) twoPlayerMode();
}

username.onclick=function(){
    var usr = prompt("Please enter your username");
    userdata.username = usr;
    saveData(userdata);
    if(usr != null) this.innerHTML = "Hi, "+usr;
}

userpic.onclick=function(){
    var photo = prompt("Enter url for profile image");
    userdata.photo = photo;
    saveData(userdata);
    if(photo != null) this.setAttribute("src", photo);
}
// end of submission //

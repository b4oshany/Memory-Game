// start of submission //
A = "position:absolute;";
W = "width:120px;height:160px;";
var audioElement = document.getElementById("audio");
var username = document.querySelector("#profilename");
var userturn = document.querySelector("#turns");
var userpic = document.querySelector("#gamer_photo");
var holder = document.querySelector("#wrapperholder");
var mode = 1;
var user_turn = 0;
var supportStorage = false;
var userdata = {"username": "Player 1", "turn": 0, "photo": null, "points": 0};
var apponentdata = {"username": "Player 2", "turn":0, "photo":null, "points": 0};

holder.innerHTML="<div id='wrapper'><div id='playoptions'><input onclick='setGameMode(\"single\")'  type='button' value='Single Player' class='play_option'/><input onclick='setGameMode(\"two\")' type='button' value='VS Mode' class='play_option'/></div></div>";
//<input onclick='setGameMode(\"network\")' type='button' value='Network Mode' class='play_option'/><
holder.style.height = window.innerHeight+"px";

if(typeof(Storage) !== undefined){
    supportStorage = true;
}

function getUserMode(mode){
    return (mode == 1)? localStorage.gamer : localStorage.gamern;
}

function twoPlayerMode(){    
    if(mode == 2) {
        apponent_turn = apponentdata.turn;         
        if(apponentdata.username != null) document.querySelector("#apponent_profilename").innerHTML = "Hi, "+apponentdata.username;
        if(apponentdata.photo != null) document.querySelector("#apponent_pic").setAttribute("src", apponentdata.photo);   
        apponturn = document.querySelector("#apponent_turns");
        apponturn.innerHTML = apponent_turn; 
        document.querySelector("#apponentpoints").innerHTML = apponentdata.points;
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
            if(photo != null) document.querySelector("#apponent_photo").setAttribute("src", photo);
        }    
    }
}

function saveData(userdata){
    if(supportStorage)
        (mode == 1)? localStorage.gamer = JSON.stringify(userdata): localStorage.gamern = JSON.stringify(userdata);
}

function saveApponentData(apponentData){
    if(supportStorage)
        localStorage.apponent = JSON.stringify(apponentData)
}

function saveGameData(data, matches){
    if(supportStorage)
        if(mode == 1) localStorage.single_gamedata = data, localStorage.single_matchesleft = matches;
        else if(mode == 2) localStorage.vs_gamedata = data, localStorage.vs_matchesleft = matches;
}

function loadGameData(){
    l = 8;
    var gamedata = (mode == 1)? localStorage.single_gamedata : localStorage.vs_gamedata;
    var matchesleft = (mode == 1)? localStorage.single_matchesleft : localStorage.vs_matchesleft;
    if(supportStorage && gamedata !== undefined){ 
        b.innerHTML = gamedata;
        if(matchesleft !== undefined) l = parseInt(matchesleft);}
    else D();
}

window.onload = function(){
    opholder = document.querySelector("#playoptions");
    opholder.style.top = "-"+(opholder.clientHeight/2)+"px"; 
    opholder.style.left = "-"+(opholder.clientWidth/2)+"px";
}

function startSession(){
    if(supportStorage){
    mode = (localStorage.mode == undefined)? 1 : parseInt(localStorage.mode); 
    if(getUserMode(mode) === undefined) saveData(userdata);
    else{
        userdata = JSON.parse(getUserMode(mode)); 
        if(userdata.username != null) username.innerHTML = "Hi, "+userdata.username;
        if(userdata.photo != null) userpic.setAttribute("src", userdata.photo);  
        user_turn = (supportStorage && !isNaN(userdata.turn))? parseInt(userdata.turn): 0;      
        document.querySelector("#profilepoints").innerHTML = userdata.points;
    }            
    if(mode == 2){
        if(localStorage.apponent == undefined)
            saveApponentData(apponentdata)
        else
            apponentdata = JSON.parse(localStorage.apponent);
    }
     alert("This is a memory game. For each correct answer you get 3 points, while for each wrong answer 1 point will be deducted from your score. \n\r Note. the game will automatically save your progress");     
    }
    if(userdata.username != null) username.innerHTML = userdata.username;
    if(userdata.photo != null) userpic.setAttribute("src", userdata.photo);   
    saveData(userdata);    
    userturn.innerHTML = user_turn;
}


function restart(){
        userdata.turn = 0;
        userdata.points = 0;
        if(mode == 2) {
            apponentdata.turn = 0;
            apponentdata.points = 0;
         }
        saveData(userdata);
        if(supportStorage)    
            if(mode == 1) localStorage.removeItem("single_matchesleft"), localStorage.removeItem("single_gamedata");
            else if(mode == 2) localStorage.removeItem("vs_matchesleft"), localStorage.removeItem("vs_gamedata"), saveApponentData(apponentdata);
        location.reload();
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
        return true;
    }
}

var show = ".w.v .c.b {z-index: 900;-webkit-transform: rotatey(180deg);opacity: 0;}"
 +".w.v .c.f {z-index: 1000;-webkit-transform: rotatey(0deg);opacity: 1; background: white;}";
var hide = ".c.b { -webkit-transform-style: preserve- 3 d;  -webkit-backface-visibility: hidden;  -webkit-transition: all ease-in-out 0.4s;   z-index: 900;}"
+".c.f {position: absolute; top: 0; left: 0; z-index: 800; -webkit-transform: rotatey(-180deg); -webkit-transform-style: preserve- 3 d; -webkit-backface-visibility: hidden;"
 +"-webkit-transition: all ease-in-out 0.4s;opacity: 0;}";

document.querySelector("head").innerHTML = "<style>.w{" + W + "position: relative; "+P("perspective: 700")+"border:1px solid #777;text-align:center;margin:5px;float:left" + "; }.v .b,.p .b{" + P("transform:scale(0)") + "}.c{" + W + A + "font-size:80px}b{" + A + "font-size:24px;left:5px}.b,.r{color:red}.b{background: black url(static/yugioh-card-back.jpg) no-repeat; background-size: cover; " + P("transition:1s") +"} .txt{position: absolute; top: 30%; ;left: 10%;} "+hide+show+"</style>";

var clicks = 0;
function RS(){ 
    S(false)
    var whowon = (mode == 1)? "You are smart!" : (userdata.points > apponentdata.points)? userdata.username+" won!" : (userdata.points < apponentdata.points)? apponentdata.username+" won!" : "Sadly, its a draw";
    setTimeout(function(){
    alert(whowon);
    restart();
	}, 1000);
	
}

function F(t) {
    if(t.className.indexOf("p") == -1){
	clicks++;
	skip = false;
    v = b.querySelectorAll(".v");
    x = v[0];
    y = v[1];
    if (y) C(x, ""), C(y, "");
    if (x && !y && x != t && x.innerHTML == t.innerHTML) C(x, "p"), C(t, "p"), l--, (mode == 1)? userdata.points += 3 : (user_turn == apponent_turn)? userdata.points += 3: apponentdata.points += 3, skip = true;
    else{ 
        C(t, "v"); 
        if (clicks%2==0 && x != t) 
            if(skip) skip = false 
            else if(mode == 1) user_turn++, userdata.points = parseInt(userdata.points) - 1;
            else if(mode == 2) {                
                var apponent = document.querySelector("#apponent")
                var gamer = document.querySelector("#gamer");
                if(user_turn == apponent_turn) user_turn++, userdata.points = parseInt(userdata.points) - 1, gamer.setAttribute("turn", "inactive"), apponent.setAttribute("turn", "active");
                else apponent_turn++, apponentdata.points = parseInt(apponentdata.points) - 1, gamer.setAttribute("turn", "active"), apponent.setAttribute("turn", "inactive");
                }
        userdata.turn = user_turn; saveData(userdata); document.querySelector("#turns").innerHTML = user_turn; 
        if(mode == 2) apponentdata.turn = apponent_turn, saveApponentData(apponentdata), document.querySelector("#apponent_turns").innerHTML = apponent_turn;
    }
    document.querySelector("#profilepoints").innerHTML = userdata.points;
    if(mode == 2) document.querySelector("#apponentpoints").innerHTML = apponentdata.points;
    S(true);
    if (!l) RS();
    saveGameData(b.innerHTML, l);
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
    if(mode == 2) document.querySelector("#gamers").innerHTML += "<p id='vs'>VS</p><div id='apponent'><p><span id='apponent_profilename'>Player 2</span> (edit)</p><p>Your points, <span id='apponentpoints'>0</span></p><div id='apponent_pic'><img src='static/148871.jpg' id='apponent_photo' /><p id='note'>Click to change profile pic</p><p>Number of turns: <span id='apponent_turns'>0</span></p></div>";
    if(supportStorage) localStorage.mode = mode;   
    document.body.removeChild(holder);    
    loadGameData();
    document.querySelector("#gamer").style.display = "block";
    startSession();
    if(mode == 2) twoPlayerMode();    
    document.querySelector("#profilename").onclick=function(){
        var usr = prompt("Please enter your username");
        userdata.username = usr;
        saveData(userdata);
        if(usr != null) this.innerHTML = "Hi, "+usr;
    }

    document.querySelector("#pic").onclick=function(){
        var photo = prompt("Enter url for profile image");
        userdata.photo = photo;
        saveData(userdata);
        if(photo != null) document.querySelector("#gamer_photo").setAttribute("src", photo);
    }
}
// end of submission //

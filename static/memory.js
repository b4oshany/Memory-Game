// start of submission //
A = "position:absolute;";
W = "width:120px;height:160px;";
var audioElement = document.getElementById("audio");

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
    if(y){ alert("OK");
        audioElement.setAttribute("src", "/static/sound/flip.mp3");
        audioElement.play();
    }else{        
        audioElement.setAttribute("src", "/static/sound/won.mp3");
        audioElement.play();
    }
}

var show = ".w.v .c.b {z-index: 900;-webkit-transform: rotatey(180deg);opacity: 0;}"
 +".w.v .c.f {z-index: 1000;-webkit-transform: rotatey(0deg);opacity: 1;}";
var hide = ".c.b { -webkit-transform-style: preserve- 3 d;  -webkit-backface-visibility: hidden;  -webkit-transition: all ease-in-out 0.4s;   z-index: 900;}"
+".c.f {position: absolute; top: 0; left: 0; z-index: 800; -webkit-transform: rotatey(-180deg); -webkit-transform-style: preserve- 3 d; -webkit-backface-visibility: hidden;"
 +"-webkit-transition: all ease-in-out 0.4s;opacity: 0;}";

document.querySelector("head").innerHTML = "<style>.w{" + W + "position: relative; "+P("perspective: 700")+"border:1px solid #777;text-align:center;margin:5px;float:left" + "}.v .b,.p .b{" + P("transform:scale(0)") + "}.c{" + W + A + "font-size:80px}b{" + A + "font-size:24px;left:5px}.b,.r{color:red}.b{background: black url(http://jbrown72.files.wordpress.com/2010/12/yugioh-card-back.jpg) no-repeat; background-size: cover; " + P("transition:1s") +"} .txt{position: absolute; top: 30%; ;left: 10%;} "+hide+show+"</style>";

var turn = 1; var clicks = 0;
function RS(){ 
	var con = confirm("Do you want to start a new game?");
	if(con){b.innerHTML = ""; D(); turn = 1; clicks = 0;}
}

function F(t) {
	console.log("turn "+turn);
	clicks++;
	if(turn == 5){ RS(); return};
    v = b.querySelectorAll(".v");
    x = v[0];
    y = v[1];
    if (y) C(x, ""), C(y, "");
    if (x && !y && x != t && x.innerHTML == t.innerHTML) C(x, "p"), C(t, "p"), l--;
    else C(t, "v"), (clicks%2==0)?turn++:''; 
    S(true);
    if (!l) S(false), setTimeout( function(){alert("I ♥ U!")}, 2000) 
}
function D(){
	l = 8;
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
D();

// end of submission //

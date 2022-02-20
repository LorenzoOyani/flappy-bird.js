var cvs = document.getElementById("canvas")
var ctx =cvs.getContext("2d")



var bird =new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth= new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

var gap = 85;
var constant = pipeNorth.height + gap;



var bx =10;
var by = 150;

var gravity = 1.5;

var score = 0;

var fly = new Audio();
var scores = new Audio();

fly.src = "sounds/sounds_fly.mp3"
scores.src = "sounds/sounds_score.mp3"






document.addEventListener("keydown", moveUp);
function moveUp(){
    by -=25;
    fly.play();

}

var pipe = [];

pipe[0] = {
    x :cvs.width,
    y :0
}

function draw(){
    ctx.drawImage(bg,0,0);

    for(var i=0; i<pipe.length; i++){
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if(pipe[i].x == 135){
            pipe.push ({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height) -
                pipeNorth.height

            });


//conditions for page reload
        }
        if((bx + bird.width >= pipe[i].x && bx<= pipe[i].x + pipeNorth.width )
            && (by <= pipe[i].y + pipeNorth.height || by + bird.height>= pipe[i].y + constant) || (by + bird.height >= cvs.height -fg.height)){
                location.reload(); 
            }

            if(pipe[i].x== 5){
                score ++;
                scores.play()
            }
            

    }

    
    // ctx.drawImage(pipeNorth, 100,0);
    // ctx.drawImage(pipeSouth, 100, 0+ constant);
    ctx.drawImage(fg,0,cvs.height-fg.height);

    ctx.drawImage(bird, bx, by);
    by += gravity

    ctx.fillstyle = "#000";

    ctx.font = "20px verdana";
    ctx.fillText("score: " +score,15, cvs.height-20);

    requestAnimationFrame(draw)
}

draw();


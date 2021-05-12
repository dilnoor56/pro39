var player,playerImg,database,position,bg,run,input,form;
var bg1,back_ground,gameState=0;
var ground;
var carrot,carrot_,cherry,cherry_,chilly,chilly_,garlic,garlic_,reddish,reddish_;
var rand;
var C,c,G,R,Ce
var scream,spray,bottle,bottle_,bullet,bullet_
var temp_arrow
var Camera;
var kills;

function preload(){
 bg=loadImage("Photos/intro.png")
 bg1=loadImage("Photos/bg1.jpg")
 playerImg=loadImage("Photos/farmer.png")
 carrot_=loadImage("Photos/carrot.png")
 cherry_=loadAnimation("Photos/cherry1.png","Photos/cherry2.png","Photos/cherry3.png","Photos/cherry4.png")
 chilly_=loadImage("Photos/chilly.png")
 garlic_=loadImage("Photos/garlic.png")
 reddish_=loadImage("Photos/reddish.png")
 scream=loadSound("Audio/scream.mp3")
 spray=loadSound("Audio/spray.wav")
 bottle_=loadImage("Photos/spray.png")
 bullet_=loadImage("Photos/water surrican.png")
}
 
function setup(){
    createCanvas(displayWidth-20,displayHeight-30);
    kills=0
    run=createButton("run")
    run.position(700,500)
    run.mousePressed(change)
    input=createInput()
    input.position(displayWidth/2-40,displayHeight/2-80)
    back_ground=createSprite(600,250,displayWidth*5,displayHeight*5)
    back_ground.scale=4.8
    back_ground.addImage("bg",bg)
    back_ground.addImage("bg1",bg1)
    player = createSprite(1050,550,50,50);
    player.addImage("player",playerImg)
    player.setCollider("rectangle",0,0,210,210)
    player.debug=false
    player.visible=false
    bottle=createSprite(player.x-50,player.y,50,50)
    bottle.addImage("bottle",bottle_)
    bottle.scale=0.3
    bottle.visible=false
    Camera=createSprite(1006,1006,50,50)
    Camera.visible=false;
    C=new Group()
    c=new Group()
    G=new Group()
    R=new Group()
    Ce=new Group()
   
}

function draw(){
    background(0);
    bottle.x=player.x-50
    bottle.y=player.y
   if(gameState===1){
     
    console.log("frame",frameCount)
    if(keyDown("space")) {
      player.velocityY = -12;
  }
  if(player.y <= 200){
    player.velocityY = player.velocityY + 0.8
  }
  if(player.y>550){
    player.y=550
  }
  if(keyDown("left")) {
    player.x=player.x-3
}
  Camera.x=Camera.x+1
    // release arrow when space key is pressed
    if (keyDown("enter")) {
      temp_arrow = createBullet();
      temp_arrow.addImage(bullet_);
       temp_arrow.y = bottle.y;
       spray.play()
       bottle.visible=true
       if(temp_arrow.isTouching(C)){
        C.destroyEach()
        kills=kills+1
      }else if(temp_arrow.bounceOff(c)){
        c.destroyEach()
         kills=kills+3
      }else if(temp_arrow.bounceOff(G)){
        G.destroyEach()
        kills=kills+2
      }else if(temp_arrow.bounceOff(R)){
        R.destroyEach()
        kills=kills+3
      }else if(temp_arrow.bounceOff(Ce)){
        Ce.destroyEach()
       kills=kills+4
      }
    }
  console.log("frame",frameCount)
  rand=Math.round(random(1,5))
  if(rand===1){
    Spawn_carrot()
  }else if(rand===2){
    Spawn_chilly()
  }else if(rand===3){
    Spawn_cherry()
  }else if(rand===4){
    Spawn_garlic()
  }else if(rand===5){
    Spawn_reddish()
  }
  if(player.bounceOff(C)||player.bounceOff(c)||player.bounceOff(Ce)||player.bounceOff(G)||player.bounceOff(R)){
    gameState=2;
    scream.play()
  }
  console.log("camera",camera.x)
    drawSprites();
    fill("yellow")
    textSize(100)
    text("Evil  farm  2",550,100)
  if(input.value()==="purbita"){
    fill("red")
    textSize(40)
    text("Hello mam!",displayWidth/2-70,displayHeight/4)
  }else if(input.value()==="dilnoor"){
    text("red")
    textSize(40)
    text("Excuse me! you entered my name",displayWidth/2-70,displayHeight/4)
  }
  else{
  fill("red")
  textSize(40)
  text("Run run "+input.value(),displayWidth/2-70,displayHeight/4)
  }
  fill("orange")
  textSize(40)
  text("Press Space To Jump",50,100)
  text("Press Enter To Spray",50,200)
  text("Kills:"+kills,470,200)
}else if(gameState===2){
    fill("red")
    textSize(40)
    text("You Die "+input.value(),displayWidth/2-70,displayHeight/4)
    if(keyDown("r")){
      gameState=0;
    }
}else if(gameState===0){
       back_ground.changeAnimation("bg",bg)
       C.setLifetimeEach(0)
       c.setLifetimeEach(0)
       G.setLifetimeEach(0)
       R.setLifetimeEach(0)
       Ce.setLifetimeEach(0)
       player.visible=false
       drawSprites()
       fill("yellow")
       textSize(100)
       text("Evil  farm ",550,100)
     if(input.value()==="purbita"){
       fill("red")
       textSize(40)
       text("Hello mam!",displayWidth/2-70,displayHeight/4)
     }else if(input.value()==="dilnoor"){
       text("red")
       textSize(40)
       text("Excuse me! you entered my name",displayWidth/2-70,displayHeight/4)
     }
     else{
     fill("red")
     textSize(40)
     text("Run run "+input.value(),displayWidth/2-70,displayHeight/4)
     }
   
}
 
}
function change(){
  run.hide()
  input.hide()
  player.visible=true
  back_ground.changeAnimation("bg1",bg1)
  gameState=1;
  back_ground.scale=5
}
function Spawn_carrot(){
    if(Camera.x%60===0){
      carrot=createSprite(0,Math.round(random(0,650)),50,50)
      carrot.addImage("carrot",carrot_)
      carrot.scale=0.3
      carrot.velocityX=(2+kills/50)
      C.add(carrot)
    }
    
}
function Spawn_chilly(){
  if(Camera.x%60===0){
    chilly=createSprite(0,Math.round(random(0,650)))
    chilly.addImage("chilly",chilly_)
    chilly.scale=0.2
    chilly.velocityX=(2+kills/50)
    c.add(chilly)
  }     
}
function Spawn_cherry(){
  if(Camera.x%60===0){
    cherry=createSprite(0,650)
    cherry.addAnimation("cherry",cherry_)
    cherry.scale=0.3
    cherry.velocityX=(2+kills/50)
    Ce.add(cherry)
  }
}
function Spawn_garlic(){
  if(Camera.x%60===0){
    garlic=createSprite(Math.round(random(0,950)),0)
    garlic.addImage("garlic",garlic_)
    garlic.scale=0.3
    garlic.velocityY=2
    if(garlic.y>=player.y){
      garlic.velocityX=(2+kills/50)
    }
    G.add(garlic)
  }
}
function Spawn_reddish(){
  if(Camera.x%60===0){
    reddish=createSprite(0,Math.round(random(0,650)))
    reddish.addImage("reddish",reddish_)
    reddish.scale=0.3
    reddish.velocityX=(2+kills/50)
    R.add(reddish)
  }
}
function createBullet() {
  bullet= createSprite(bottle.x-50, 100, 5, 10);
  bullet.velocityX = -6;
  bullet.scale = 0.3;
  bullet.lifetime=200
  return bullet;
}

var bg,bgImg,zombies,zombieImg,bullets,shootSound,bulletImg;
var player, shooterImg, shooter_shooting;
var gameState = "play", score = 0,x,y,life =3,heart1,heart2,heart3,heart;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  bulletImg = loadImage("assets/bulletImg.png")
  shootSound = loadSound("assets/GunShot.mp3")
  heart1= loadImage("assets/heart_1.png");
  heart2= loadImage("assets/heart_2.png");
  heart3= loadImage("assets/heart_3.png");
}

function setup() {
  zombies = createGroup();
  bullets = createGroup();
  createCanvas(windowWidth,windowHeight);
  // 
  
  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
heart = createSprite(windowWidth-200,30,30,30);
  heart.addImage(heart1,"h1");
  heart.addImage(heart2,"h2");
  heart.addImage(heart3,"h3");
  heart.scale = 0.5;
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


}

function draw() {
  background(0); 
if(gameState == "play"){

  
  if(life == 2){
    heart.changeImage("h2");
  }else if(life == 1){
    heart.changeImage("h1");
  }
  console.log(life);

  text(score,10,10);
  zombies.setVelocityXEach(-3);
  bullets.setVelocityXEach(20);
  spawnZombies();

  bullets.collide(zombies,zombieDeath)
  
  if(score >10){
    gameState = "end";
  }
  
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0 || keyDown("W")){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0||keyDown("S")){
 player.y = player.y+30
}
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  shoot();
  shootSound.play();
}
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
  x = player.x;
  y = player.y;

}
else if(gameState =="end"){
  zombies.setVelocityXEach(0);
  bullets.setVelocityXEach(0);
  
  player.x = x;
  player.y = y;
}
drawSprites();

}

function spawnZombies(){
  if(frameCount %60 == 0){
    var sprite = createSprite(windowWidth,random(windowHeight/4+200,windowHeight),10,50);
    sprite.addImage(zombieImg);
    sprite.scale=0.15;
    zombies.add(sprite);
    
   
  }
}
function zombieDeath(bullet,zombie){
zombie.remove();
bullet.remove();
console.log("zombie Shot");
    
    score++
}
function shoot(){
    var sprite = createSprite(player.x+50,player.y-25,10,10);
    sprite.addImage(bulletImg);
    sprite.scale=0.1;
    bullets.add(sprite);
}

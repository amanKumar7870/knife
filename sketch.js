var knife,knifeImage;
var PLAY=1;
var END=0;
var score;
var gameState=PLAY;
var enemy,enemyImage;
var enemy2,enemy2Image;
var fruit,fruit2,fruit3,fruit4,fruitImage,fruit2Image,fruit3Image,fruit4Image;
var fruitGroup;
var enemyGroup;
var gameOver,gameOverImage;
var knifeSound,gameOverSound;


function preload(){
  
  knifeImage=loadImage('sword.png');
  enemyImage=loadImage('alien1.png');
  enemy2Image=loadImage('alien2.png');
  fruitImage=loadImage('fruit1.png');
  fruit2Image=loadImage('fruit2.png');
  fruit3Image=loadImage('fruit3.png');
  fruit4Image=loadImage('fruit4.png');
  gameOverImage=loadImage('gameover.png');
  knifeSound=loadSound('a.mp3');
  gameOverSound=loadSound('gameover.mp3');
 
  
}

function setup() {
  createCanvas(500, 500);
  
  knife=createSprite(250,250,10,10);
  knife.addImage(knifeImage);
  knife.scale=0.5
  
  score=0;
  
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
  
  
}

function draw(){

  background('blue');
  
  
  if(gameState===PLAY){

    textSize(20);
    text('Score:'+score,400,50);
    
    if(frameCount%100===0){
      fruit=createSprite(500,200,10,10);
      fruit.velocityX=-3;
      var rand=Math.round(random(1,4));
      switch (rand){
        case 1:fruit.addImage(fruitImage);
          fruit.scale=0.3;
          break;
          case 2:fruit.addImage(fruit2Image);
          fruit.scale=0.3;
          break;
          case 3 :fruit.addImage(fruit3Image);
          fruit.scale=0.3;
          break;
          case 4 :fruit.addImage(fruit4Image);
          fruit.scale=0.3;
          break;
          default : break;
          
      }
      fruit.y=Math.round(random(100,450));
      fruit.lifetime=600;
      fruitGroup.add(fruit);
      
      var position=Math.round(random(1,2));
      if(score>5){
        if(position===1){

          fruit.x=500;
          fruit.velocityX=-(5+score/5);
        }else{
          if(position===2){
            fruit.x=-100;
            fruit.velocityX=(5+score/5);
          }
        }
      }
      
    }
    if(frameCount%550===0){
      
      enemy=createSprite(500,200,10,10);
      enemy.velocityX=-4;
      var ran=Math.round(random(1,2));
      switch(ran){
          
        case 1:enemy.addImage(enemyImage);
          break;
          case 2 :enemy.addImage(enemy2Image);
          break;
          default : break;
      }
      enemy.lifetime=600;
      enemy.y=Math.round(random(100,450));
      enemyGroup.add(enemy);
      
        var position=Math.round(random(1,2));
      if(score>5){
        if(position===1){

          enemy.x=500;
          enemy.velocityX=-(5+score/5);
        }else{
          if(position===2){
            enemy.x=-100;
            enemy.velocityX=(5+score/5);
          }
        }
      }
    }
    
    if(fruitGroup.isTouching(knife)){
      score=score+1;
      fruitGroup.destroyEach();
      knifeSound.play();
    }
    
    if(enemyGroup.isTouching(knife)){

      enemyGroup.destroyEach();
         gameOverSound.play();
      gameState=END;
    }
    
    knife.x=World.mouseX
    knife.y=World.mouseY
  
  }
  else if(gameState===END){
    
 
    knife.addImage(gameOverImage);
    knife.x=250;
    knife.y=250;
    knife.scale=2;
  }
  
  drawSprites();
}

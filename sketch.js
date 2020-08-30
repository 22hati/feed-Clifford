var dog,happyDog,database,foodStock,foodObj;
var foodS=1;
var fedTime=0;
var lastFed=0;

function preload() {
  database = firebase.database();

  dog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");

  foodStock=database.ref("food");
  foodStock.on("value",readStock);
}

function setup() {
  createCanvas(500, 500);
  
  feed=createButton("Feed Clifford");
  feed.position(700,65);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(620,65);
  addFood.mousePressed(addFood);

  foodObj = new Food();
  
  doggy= createSprite(250,250);
  doggy.addImage(dog);
  doggy.scale=0.15;
}


function draw() { 
  background("green"); 

  textSize(15);
  textAlign(CENTER);
  fill("white");
  if(lastFed>=12) {
    text("Last Fed : "+lastFed%12 +"PM",200,30);
  }else if(lastFed===0) {
    text("Last Fed : 12 AM",200,30);
  }else {
    text("Last Fed : "+lastFed +"AM",200,30);
  }

  foodObj.display();

  drawSprites();
  //add styles here

}

function readStock(data) {
  foodS=data.val();
  
}

function feedDog() {
  doggy.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    food:foodObj.getFoodStock(),
    feedTime:hour()
  });
}

function addFood() {
  doggy.addImage(dog);

  foodS++

  database.ref("/").update({
    food:foodS
  });
}




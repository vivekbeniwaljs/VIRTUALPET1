var dog,sadDog,happyDog;
var foodObj;
var foodS,foodStock;
var fedTime, lastFed, feed, addFood;
 
function preload()
{
	sadDog=loadImage("Images/Dog.png")
  happyDog=loadImage("Images/happy dog.png")

}

function setup() {
	database = firebase.database( )
  createCanvas(1000, 400);
  foodObj = newFood ()

    foodStock = database.ref('food');
    foodStock.on("value", readStock);

    dog=createSprite(800,200,150,150);
    dog.addImage(sadDog);
    dog.scale=0.15;

    feed = createButton("Feed the dog")
    feed.position(700,95)
    feed.mousePressed(feedDog)

    addFood = createButton("Add food")
    addFood.position(800,95)
    addFood.mousePressed(addFoods)
  
}


function draw() {  
  background(46,139,87)

  foodObj.display()

  fedTime = database.ref('fedTime')
  fedTime.on("value",function(data){
    lastFed = data.val()
  })
  fill(255,255,254)
  textSize(15)
  if(lastFed >=12){
    text("Last Feed:"+ lastFed%12 + "PM",350,30)
  }
 else {
   text("Last Feed:"+lastFed + "AM",350,30)
 }

  drawSprites();

}
function readStock(data){
  foodS = data.val()
  foodObj.updateFoodStock(foodS)
}
function feedDog(){
  dog.addImage(happyDog)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime: hour()               
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:FoodS
  })
}

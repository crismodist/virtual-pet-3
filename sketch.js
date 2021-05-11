var database ,dog,dog1,dog2;
var position;
//var form
var feed,add;
var foodobject;
var Feedtime;
var Lastfeed;
var bedroom;
var garden;
var washroom;
var sadDog
//Create variables here

function preload()

{
  dogimg1 = loadImage("dogImg.png");
  dogimg2 = loadImage("dogImg1.png");
  bedroom = loadImage("virtual pet images/Bed Room.png");
  garden = loadImage("virtual pet images/Garden.png");
  washroom = loadImage("virtual pet images/Wash Room.png");
  sadDog = loadImage("virtual pet images/deadDog.png")


	//load images here
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject = new Food();
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  feed = createButton("FEED DRAGO")
  feed.position(500,15)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(AddFood)

} 

function draw(){
 background(46,139,87);

 foodobject.display()
 
 drawSprites();
  
 fill(255,255,254);
 textSize(15);

 readState = database.ref('gameState');
 readState.on("value", function(data){
       gameState=data.val();
 });

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

  if (gameSate!="Hungry"){
    feed.hide();
    AddFood.hide();
    dog.remove()
  }else{
    feed.show();
    ddFood.show();
    dog.addImage("sadDog")
  }



}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}

function update(state){
  database.ref('/').update({
    gameState: state
  })
}







class Food {
  constructor(){
    this.foodStock;
    this.lastFed;
    this.image=loadImage("images/Milk.png");
  }

  getFoodStock() {
    this.foodStock=database.ref("food");
    this.foodStock.on("value",function(data){
      foodS=data.val();
    });
  }

  updateFoodStock(x) {
    database.ref("/").update({
      food:x
    });
  }

  deductFood() {
    foodS-1;

    database.ref("/").update({
      food:foodS
    });
  }

  display() {
    var x=80,y=100;
      
    imageMode(CENTER);
    image(this.image,720,220,70,70);

    if(this.foodStock!=0) {
      for(var i=0;i<this.foodStock;i++) {
        if(i%10===0) {
          x=80;
          y=y+50;
        }

        image(this.image,x,y,50,50);
        x=x+30
      }
    }
  }
}
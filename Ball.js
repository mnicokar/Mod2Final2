class Ball{

    constructor(x,y,radius,xSpeed,ySpeed){
        
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.ySpeed = ySpeed;
        this.xSpeed = xSpeed;
    }



    get getX(){
      return this.x;
    }

    get getY(){
      return this.y;
    }

    get getRadius(){
      return this.radius;
    }

    set changeX(value){
      this.x = value;
    }

    set changeY(value){
      this.y = value;
    }

    set changeRadius(value){
      this.radius = value;
    }

}
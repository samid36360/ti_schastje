// when a circ stops it will become bright
// and while it moves it is grey





class circ {
	constructor (x, y, vx, vy, r) {
		this.x=x
		this.y=y
		this.vx=vx
		this.vy=vy
		this.r=r
	}
	updatePos(){
		this.x=this.x+this.vx
		this.y=this.y+this.vy
	}
	edge(){
		if (((this.y+(this.r/2))>windH)||((this.y-(this.r/2))<0)){
			this.vy=-this.vy
			this.y = constrain(this.y, (this.r/2), windH-(this.r/2))
		} else if (((this.x+(this.r/2))>windW)||((this.x-(this.r/2))<0)){
			this.vx=-this.vx
			this.x = constrain(this.x, (this.r/2), windW-(this.r/2))
		}
	}
	addVel(xx,yy){
		this.vx = this.vx + xx
		this.vy = this.vy + yy
	}
	draw(){
		if (this.vx==0 && this.vy==0){
			fill(255)
		} else {
			fill(127)
		}
		circle(this.x, this.y, this.r)
	}
	checkPixel(){
		let pixel = get(this.x, this.y)
		if (pixel[0]==hc/* && pixel[1]==hc && pixel[2]==hc*/){
			this.vx=0
			this.vy=0
		}
	}
}





function spawnCirc(x,y){
	newCirc = new circ(mouseX, mouseY, 0, 0, 10*scale)
	aCount = agents.push(newCirc)
}





let agents=[]
let aCount = 0
let hc = 1
let scale = 1



function setup() {
	windW=windowWidth
	windH=windowHeight*0.95
	sCenterX=windW/2
	sCenterY=windH/2
	//for desktop
	if (windW>windH){
		scale=2
	}
	
	noStroke()
	createCanvas(windW,windH)
	background(0)
	textAlign(CENTER, CENTER);
	textSize(50*scale)
	textStyle(BOLD)
}





function draw() {
	background(0)
	fill(hc, hc-1, hc-1)
	text('Т Ы', sCenterX, sCenterY-(30*scale))
	text('С Ч А С Т Ь Е', sCenterX, sCenterY+(30*scale))
	fill(255)
	for (i=0; i<aCount; i++){
		agents[i].checkPixel()
		agents[i].updatePos()
		agents[i].edge()
		agents[i].draw()
	}
}



function mouseClicked(){
	spawnCirc(mouseX,mouseY)
	agents[aCount-1].addVel(random(-2*scale,2*scale),random(-2*scale,2*scale))
}
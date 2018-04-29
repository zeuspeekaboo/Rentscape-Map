var allData = [];
var img;
var rt;
var ele;
var counter = 0;
var submit;
var rm = true;
var ic;

var rent = [0, 1300, 2550, 3100, 2950, 3400, 3650, 6000, 8000];
var income = [200,1500,2130,4500,3400,5200,6150,9100,12100];
var elevation = [-12, 0, 20, 30, 80, 140, 270, 475, 925];
var locationX = [0,300,122,89,247,18,264,159,191];
var locationY = [0,49,151,178,249,207,285,92,37];
var inputRent;
var inputEle;
var inputInc;
var camera;
var rot = 0;


var s = function(p) {
  p.setup = function() {
  p.createCanvas(2400, 1870);
  img = p.loadImage('san francisco map.jpg');
  inputRent = p.select("#rent");
  inputEle = p.select("#elevation");
  inputIc = p.select("#income");
}

p.draw = function() {
  p.background(220);
  p.image(img,0,0);
for (var i=0; i<allData.length; i++) {
    //p.ellipse(allData[i].x,allData[i].y,allData[i].r,allData[i].e);
  }
}

p.Data = function(x,y,r,e,c) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.e = e;
  this.c = c;
}

p.mousePressed = function(){
  if(counter == 0 && rm == true){
	rt = p.createInput('Rent');
  rt.mouseClicked(p.clr);
  rt.position(p.mouseX,p.mouseY);
  ele = p.createInput('Elevation');
  ele.mouseClicked(p.clr2);
  ele.position(p.mouseX,p.mouseY+50);
  ic = p.createInput('Income');
  ic.mouseClicked(p.clr3);
  ic.position(p.mouseX,p.mouseY+100);
  p.submit = p.createButton('submit');
  p.submit.position(p.mouseX,p.mouseY+150);
    counter = 1;
  p.submit.mousePressed (p.inputRe);
  
    
	p.append(allData, new p.Data(p.mouseX,p.mouseY,rt.value(),ele.value(),ic.value()));
  p.append(locationX, p.mouseX);
  p.append(locationY, p.mouseY);
  //Data.r = inputRent;
  //Data.e = inputEle;
	console.log(allData.length);
  console.log(allData[allData.length-1]);
      }
  
  if (rm==false) {
    
    rt.remove();
    ele.remove();
    ic.remove();
    p.submit.remove();
    rm = true;
  }
} 

p.clr = function() {
  rt.value('');
}
p.clr2 = function() {
  ele.value('');
}
p.clr3 = function(){
  ic.value('');
}

p.inputRe = function(){
    var data = allData[0];
    data.r = parseInt(rt.value());
    data.e = parseInt(ele.value());
    data.c = parseInt(ic.value());
  p.append(rent, rt.value());
  p.append(elevation, ele.value());
  p.append(income, ic.value());
    	console.log(allData.length);
  console.log(allData[0]);
    counter = 0;
        rm = false;
}
}
var myp5 = new p5(s,'c1');


var t = function(p) {
p.preload = function(){
  img = p.loadImage('san francisco map.jpg');
}
p.setup = function() {
    p.createCanvas(500,500, p.WEBGL);  
  
}

p.inputDot = function(){
  p.append(rent, inputRent.value());
  p.append(elevation, inputEle.value());
  //sort(rent);
  //sort(elevation);
}

p.draw = function() {
    p.background(175);
    
        
    var camheight = p.mouseX*0.5;
    p.camera(p.width / 2, 1000, camheight*2, p.width / 2, p.height / 2, 0, 0, 1, 0);
    //pointLight(255, 255, 255, 0, 50, 10000);
    //pointLight(200, 0, 150, 0, 2000, 1000);
		p.rotateZ(p.radians(rot)/10);
    rot++;
  
    p.texture(img);
    p.plane(img.height,img.width);
    
    //sphere(20); 
  
    p.rect(0,0,0,p.width,p.height);
    for (var j = 0; j < rent.length; j++) {

        var f = rent[j];
        var e = elevation[j];
        var i = income[j];
        var s = rent[j];
        s = p.map(s, 0, 8000, 0, p.max(elevation));
        i = p.map(i, 200, 12100, 0, p.max(elevation));
        f = p.map(f, 0, 8000, 0, 255);
        e = p.map(e, -12, 925, 0, 255);
        s = p.map(s, -12, p.max(elevation), 0, p.width);
        f = p.map(f, -12, p.max(elevation), 0, p.height);
        p.ambientMaterial(255,0,200);
        p.noStroke();
        p.push();
        p.translate(locationX[j]-img.height/2,locationY[j]-img.width/2,0);
        p.rotateX(p.radians(90));
        p.cone(10,i-s);
        //translate(0,0,-e/2);
        //box(5,5,e);
        p.pop();

    }
}
}
var myp5 = new p5(t,'c2');
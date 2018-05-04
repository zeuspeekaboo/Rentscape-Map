//coded by Zeus

var allData = [];
var img;
var rt;
var ele;
var counter = 0;
var submit;
var rm = true;
var ic;
var minus;

var rent = [0];
var income = [0];
var elevation = [0];
var locationX = [0];
var locationY = [0];
var cha = [0];
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
  if(counter == 0 && rm == true && p.mouseX < 2400 && p.mouseY <1870){
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
  minus = ic.value() - rt.value();
        console.log(minus);
        p.append(cha,minus);
        console.log(cha);
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
    p.createCanvas(2000,2000, p.WEBGL);  
  
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
    p.camera(p.width/2, 2500, camheight*6, p.width, p.height, 0, 0, 1, 0);
    //pointLight(255, 255, 255, 0, 50, 10000);
    //pointLight(200, 0, 150, 0, 2000, 1000);
		p.rotateZ(p.radians(rot)/10);
    rot++;
  
    p.texture(img);
    p.plane(img.width,img.height);
    
    //sphere(20); 
  
    p.rect(0,0,0,p.width,p.height);
    for (var j = 0; j < rent.length; j++) {

        var f = rent[j];
        var e = elevation[j];
        var l = elevation[j];
        var i = income[j];
        var o = income[j];
        var s = rent[j];
        //s = p.map(s, p.min(rent), p.max(rent), 0, 3000);
        //i = p.map(i, p.min(income), p.max(income), 0, 3000);
        
        var v = cha[j];
        v = p.map(v, p.min(cha), p.max(cha),-40 ,400);
        e = p.map(e, p.min(elevation), p.max(elevation), 0, 250);
        f = p.map(f, p.min(rent), p.max(rent), 0, 255);
        l = p.map(l, p.min(elevation), p.max(elevation), 0, 255);
        o = p.map(o, p.min(income), p.max(income), 0, 255);
        //s = p.map(s, -12, p.max(elevation), 0, p.width);
        //f = p.map(f, -12, p.max(elevation), 0, p.height);
        p.ambientMaterial(l,f,o);
        p.noStroke();
        p.push();
        p.translate(locationX[j]-img.width/2,locationY[j]-img.height/2,e);
        p.rotateX(p.radians(90));
        p.cone(10,v);
        //translate(0,0,-e/2);
        //box(5,5,e);
        p.pop();

    }
}
}
var myp5 = new p5(t,'c2');

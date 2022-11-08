int cols, rows;
int scale = 25;

int w = 2000;
int h = 1600;

float[][] terrain;

float flying = 0;

void setup() {
  size(600, 600, P3D);
  
  cols = w / scale;
  rows = h / scale;
  terrain = new float [cols][rows];
   
}

void draw() {
  background(#300350); 
  
  flying -= 0.1;
  
  float yOffset = flying;
   for (int y = 0; y < rows; y++) {
    float xOffset = 0;
    
    for (int x = 0; x < cols; x++) {
      //terrain[x][y] = random(-15, 15);
      terrain[x][y] = map(noise(xOffset, yOffset), 0, 1, -100, 100);
      
      if (x >= 100) {
        fill(255);
      } else {
        fill(0);
      }

      
      xOffset += 0.2;
    }
    yOffset += 0.2;
  }
  
  pushMatrix();
  noStroke();
  lights();
  fill(#f4ff61);
  translate(width/2, 0, -1200);
  sphere(400);
  popMatrix();
  
  fill(#300350);
  strokeWeight(1);
  stroke(#f62e97);
  
  
  //background(#300350); 
  
  //stroke(#f62e97);
 
  
  //fill(#300350);
  
  translate(width / 2, height / 2+50);
  
  rotateX(PI/3);
  
  translate(-w / 2, -h / 2);
  

  
  for (int y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (int x = 0; x < cols; x++) {
     vertex(x * scale, y * scale, terrain[x][y]);
     vertex(x * scale, (y+1) * scale, terrain[x][y+1]);
      //rect(x * scale, y * scale, scale, scale);
    }
    endShape();
  }
  

}

void keyPressed() {
  noLoop(); 
}

void keyReleased() {
  loop(); 
}
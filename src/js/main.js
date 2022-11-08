import '../scss/style.scss'
import p5 from "p5";

const sketch = (p5) => {
  let cols, rows, terrain, flying = 0, yOffset, xOffset;
  const scale = 25;
  const w = window.innerWidth;
  const h = window.innerHeight;

  p5.setup = () => {
    p5.createCanvas(w, h, p5.WEBGL);
    cols = w / scale;
    rows = h / scale;
    // terrain = [cols][rows];
    terrain = {
      cols: 0,
      rows: 0
    };
  };

  p5.draw = () => {
    p5.background("#300350");

    flying -= 0.1;

    yOffset = flying;

    for (let y = 0; y < rows; y++) {
      xOffset = 0;

      for (let x = 0; x < cols; x++) {
        // terrain = p5.random(-15, 15);
        terrain = p5.map(p5.noise(xOffset, yOffset), 0, 1, -100, 100);

        if (x >= 100) {
          p5.fill(255);
        } else {
          p5.fill(0);
        }


        xOffset += 0.2;
      }
      yOffset += 0.2;
    }

    p5.push();
    p5.noStroke();
    p5.lights();
    p5.fill("#f4ff61");
    // p5.translate(w/2, 0, -1200);
    p5.sphere(200);
    p5.pop();

    p5.fill("#300350");
    p5.strokeWeight(1);
    p5.stroke("#f62e97");

    // p5.translate(w / 2, h / 2+50);

    p5.rotateX(p5.PI/3);

    p5.translate(-w / 2, -h / 2);

    for (let y = 0; y < rows-1; y++) {
      p5.beginShape(p5.TRIANGLE_STRIP);
      for (let x = 0; x < cols; x++) {
        p5.vertex(x * scale, y * scale, [Math.sin(x)], [y]);
        p5.vertex(x * scale, (y+1) * scale, [x], [y+1]);
        //rect(x * scale, y * scale, scale, scale);
      }
      p5.endShape();
    }
  };
};

new p5(sketch);
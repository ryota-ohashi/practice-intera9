import '../scss/style.scss'
import p5 from "p5";

const sketch = (p5) => {
  let cols, rows, terrain, flying = 0, yOffset, xOffset, time = 0;
  const scale = 25;
  const w = window.innerWidth;
  const h = window.innerHeight;

  p5.setup = () => {
    p5.createCanvas(w, h, p5.WEBGL);

    // 二次元配列の要素数を算出
    cols = Math.floor(w / scale);
    rows = Math.floor(h / scale);

    // 配列の初期化
    terrain = new Array(cols);
    for(let x = 0; x < cols; x++) {
      terrain[x] = new Array(rows);
      for(let y = 0; y < rows; y++) {
        terrain[x][y] = 0;
      }
    }
    // console.log(terrain);
  };

  p5.draw = () => {
    time++;
    if(time % 3 !== 0) return;

    p5.background("#300350");

    flying -= 0.1;
    yOffset = flying;

    for (let y = 0; y < rows; y++) {
      xOffset = 0;

      for (let x = 0; x < cols; x++) {
        terrain[x][y] = p5.map(p5.noise(xOffset, yOffset), 0, 1, -100, 100);
        // map(入力値, 最小値, 最大値, 新しい最小値, 新しい最大値)
        xOffset += 0.2;
      }

      yOffset += 0.2;
    }

    p5.push();
    p5.noStroke();
    p5.lights();
    p5.fill("#f4ff61");
    p5.translate(0, -h / 4, -500);
    p5.sphere(200);
    p5.pop();

    p5.fill("#300350");
    p5.strokeWeight(1);
    p5.stroke("#f62e97");
    p5.rotateX(p5.PI/3);
    p5.translate(-w / 2, -h / 2);

    for (let y = 0; y < rows-1; y++) {
      p5.beginShape(p5.TRIANGLE_STRIP);
      for (let x = 0; x < cols; x++) {
        p5.vertex(x * scale, y * scale, terrain[x][y]);
        p5.vertex(x * scale, (y+1) * scale, terrain[x][y+1]);
      }
      p5.endShape();
    }
  };
};

new p5(sketch);
const verifyCanvas = (canvas) => {
  if (canvas) {
    return canvas.getContext("2d");
  }

  return false;
}

const clearCanvas = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const strokeColor = (n1, n2, n3) => {
  return `rgb(
    ${Math.floor(255 - 42.5 * n1)} 
    ${Math.floor(255 - 42.5 * n2)} 
    ${Math.floor(255 - 42.5 * n3,)}
  )`;
}

/**
 * creates something that looks like you are zooming in on
 * a map or something like that
 * 
 * @param {Number} cs control point step amount
 * @param {Number} ps position step amount
 */
const zoomies = (cs, ps) => {
  const ctx = verifyCanvas(document.getElementById("canvas"));
  const start = 0;

  clearCanvas();

  for (let i = 0; i < 100; i++) {
    ctx.beginPath();
    for (let j = 0; j < 100; j++) {
      ctx.strokeStyle = strokeColor(i * j, i, j);
      ctx.quadraticCurveTo(
        start + i * cs,
        start + j * cs,
        start + i * ps,
        start + j * ps);
    }
    ctx.stroke();
  }
}

/**
 * adapts the example from:
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#arcs
 * 
 * every step, the radious grows by rs
 * @param {Number} rs 
 */
const splashes = (cs, ps) => {
  const ctx = verifyCanvas(document.getElementById("canvas"));

  clearCanvas();

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      ctx.beginPath();
      ctx.fillStyle = strokeColor(i, j, (i * j) % 255);
      ctx.arc(
        25 + j * 50, 
        25 + i * 50,
        cs,
        0,
        ps * Math.PI
      );
      ctx.fill();
    }
  }
}

/**
 * carries out the drawing of the cellular automata
 * 
 * @param {Function} automata a function that draws a CA
 * @returns 
 */
const drawAutomata = (automata) => {
  return () => {
    let step = 0;
    let cs = 2;
    let ps = .25;

    const interval = setInterval(() => {
      if (step++ > 1000) {
        return clearInterval(interval);
      }

      automata(cs++, ps += 0.01);
    }, 250);
  }
}


window.addEventListener("load", drawAutomata(splashes));

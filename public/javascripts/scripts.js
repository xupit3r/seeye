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

const strokeColor = (n1, n2, rs) => {
  return `rgb(
    ${Math.floor(255 - 42.5 * n1)} 
    ${Math.floor(255 - 42.5 * n2)} 
    ${Math.floor(255 - 42.5 * rs,)}
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

  ctx.beginPath();
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      ctx.quadraticCurveTo(
        start + i * cs,
        start + j * cs,
        start + i * ps,
        start + j * ps);
    }
  }
  ctx.stroke();
}

/**
 * adapts the example from:
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#arcs
 * 
 * every step, the radious grows by rs
 * @param {Number} rs 
 */
const splashes = (rs) => {
  const ctx = verifyCanvas(document.getElementById("canvas"));

  clearCanvas();

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      ctx.beginPath();
      ctx.strokeStyle = strokeColor(i, j, rs);
      ctx.arc(
        25 + j * 50, 
        25 + i * 50, 
        // just grow the radious
        rs, 
        0, 
        2* Math.PI
      );
      ctx.stroke();
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
    let steps = 10;
    let cs = 2;
    let ps = 4;
    const interval = setInterval(() => {
      if (steps++ > 1000) {
        return clearInterval(interval);
      }

      automata(cs += 1, ps += 1);
    }, 250);
  }
}


window.addEventListener("load", drawAutomata(splashes));

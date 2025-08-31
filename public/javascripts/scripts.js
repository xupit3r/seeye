const verifyCanvas = () => {
  const canvas = document.getElementById("canvas");

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

const color = (n1, n2, n3) => {
  return `rgb(
    ${Math.floor(n1)} 
    ${Math.floor(n2)} 
    ${Math.floor(n3)}
  )`;
}

/**
 * creates a snall shell like thing....
 * 
 * @param {Number} step current step of the animation 
 */
const shell = (step) => {
  const ctx = verifyCanvas();

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.strokeStyle = color(255, 0, 255)
      ctx.arc(
        200, 
        200,
        i * j * step,
        step % 360,
        Math.PI
      );
      ctx.stroke();
    }
  }
}

/**
 * creates a small scene of a ship running through rough
 * waters
 * 
 * @param {Number} step current step of the animation 
 */
const roughWaters = (step) => {
  const ctx = verifyCanvas();

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.strokeStyle = color(255, 0, 255)
      ctx.arc(
        j * step, 
        i * step,
        i * j,
        step % 360,
        Math.PI
      );
      ctx.stroke();
    }
  }
}

/**
 * creates an infinitely dividing checkboard....
 * 
 * @param {Number} step the current step of the animation
 */
const checkers = (step) => {
  const ctx = verifyCanvas();
  
  for (let i = 0; i < 20; i++) {
    for(let j = 0; j < 20; j++) {
      if ((i + j) % 3 === 1) {
        ctx.fillStyle = color(50, 50, 255)
      } else if ((i + j) % 3 == 2) {
        ctx.fillStyle = color(50, 255, 50)
      } else {
        ctx.fillStyle = color(255, 50, 50)
      }

      ctx.fillRect(i * step % 400, j * step % 400, 10, 10);
    }
  }
}

/**
 * creates something that looks like you are zooming in on
 * a map or something like that
 * 
 * @param {Number} cs control point step amount
 * @param {Number} ps position step amount
 */
const zoomies = (step, cs, ps) => {
  const ctx = verifyCanvas();
  const start = 0;

  clearCanvas();

  for (let i = 0; i < 100; i++) {
    ctx.beginPath();
    for (let j = 0; j < 100; j++) {
      ctx.strokeStyle = color(i * j, i, j);
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
const splashes = (step, cs, ps) => {
  const ctx = verifyCanvas(document.getElementById("canvas"));

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      ctx.beginPath();
      ctx.strokeStyle = color(i * j, 100, cs * ps);
      ctx.arc(
        25 + j * 50, 
        25 + i * 50,
        cs,
        0,
        ps * Math.PI
      );
      ctx.stroke();
    }
  }
}

const all = (step, cs, rs) => {
  clearCanvas();
  shell(step, cs, rs);
}

/**
 * carries out the drawing of the cellular automata
 * 
 * @param {Function} automata a function that draws a CA
 * @returns an interval for the animation
 */
const drawAutomata = (automata) => {
  return () => {
    let step = 0;
    let cs = 2;
    let ps = .25;

    const interval = setInterval(() => {
      if (step++ > 1600) {
        return clearInterval(interval);
      }

      automata(step, cs++, ps += 0.5);
    }, 250);

    return interval;
  }
}


window.addEventListener("load", drawAutomata(all));

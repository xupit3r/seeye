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

const bound =  (step, lower, upper) => {
  const distance = upper - lower;

  return (Math.floor(step / distance) % 2
    ? upper - step % distance
    : lower + step % distance
  );
}

const copyState = (state, newState) => {
  for (let i = 0; i < 40; i++) {
    for (let j = 0; j < 40; j++) {
      state[i][j] = newState[i][j];
    }
  }
}

const initState = () => {
  let state = [];

  for (let i = 0; i < 40; i++) {
    for (let j = 0; j < 40; j++) {
      if (!state[i]) {
        state[i] = [];
      }

      state[i][j] = Math.random() > .6 ? 1 : 0;
    }
  }

  return state;
}

// global state of the canvas
const TIME_BETWEEN_DRAWS = 300;
const state = initState();
const m = state.length;
const n = state[0].length;
const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [1, 1],
  [-1, -1],
  [1, -1], 
  [-1, 1]
];

const paint = (i, j) => {
  const s = state[i][j];

  if (s == 0) {
    return color(100, 100, 100);
  } else if (s === 1) {
    return color(255, 255, 255);
  } else if (s === 2) {
    return color(255, 100, 100);
  } else if (s === 3) {
    return color(100, 255, 100)
  } else if (s === 4) {
    return color(100, 100, 255);
  }
}

const conway = (step) => {
  const ctx = verifyCanvas();

  const newState = [];
  
  for (let i = 0; i < 40; i++) {
    for (let j = 0; j < 40; j++) {
      let live = 0;

      if (!newState[i]) {
        newState[i] = [];
      }

      for (let [dx, dy] of directions) {
        let x = i + dx;
        let y = j + dy;

        if (x >= 0 && x < m && y >= 0 && y < n
          && (state[x][y] === 1)) {
          live++;
        }
      }

      if (state[i][j] === 1 && live < 2) {
        newState[i][j] = 0;
      } else if (state[i][j] === 1 && (live === 2 || live === 3)) {
        newState[i][j] = 1;
      } else if (state[i][j] === 1 && live > 3) {
        newState[i][j] = 0;
      } else if (state[i][j] === 0 && live === 3) {
        newState[i][j] = 1;
      } else {
        newState[i][j] = state[i][j];
      }

      ctx.beginPath();
      ctx.fillStyle = paint(i, j);
      ctx.arc(i * 10 + 5, j * 10 + 5, 5, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  copyState(state, newState);
}

const manifestDarkness = (step) => {
  const ctx = verifyCanvas();
  
  for (let i = 0; i < 400; i++) {
    for(let j = 0; j < 400; j++) {
      if (Math.random() * j > step) {
        ctx.beginPath();
        ctx.fillStyle = color(255, 255, 255);
        ctx.arc(i, j, 1, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
}

const wheat = (step) => {
  const ctx = verifyCanvas();

  for (let i = 0; i < 10; i++) {
    ctx.moveTo(0, 0);
    ctx.beginPath();
    ctx.strokeStyle = color(255, 255, i * 25);
    ctx.bezierCurveTo(
      bound(step, i * 5, 50),
      bound(step, i * 10, 100),
      bound(step, 0, 200),
      bound(step, 0, 300),
      400,
      400
    );
    ctx.stroke();
  }
}


/**
 * a boom pattern with interferance
 * @param {Number} step  
 */
const boom = (step) => {
  const ctx = verifyCanvas();

  for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    ctx.strokeStyle = color(255, bound(step, i, 255), 255)
    ctx.arc(
      200, 
      200,
      bound(step, i * 10, 200),
      0,
      2 * Math.PI
    );
    ctx.stroke();
  }
}

/*
 * simple interval oscillator
 * 
 * @param {Number} step the current step of the animation
 */
const oscillate = (step) => {
  const ctx = verifyCanvas();
  const x = bound(step, 0, 300);
  const y = bound(step, 0, 200);

  ctx.fillStyle = color(255, 75, 255)
  ctx.fillRect(x, y, 25, 25);
}

/*
 * squares can create choas too
 * 
 * @param {Number} step the current step of the animation
 */
const squareChaos = (step) => {
  const ctx = verifyCanvas();
  
  for (let i = 5; i < 20; i++) {
    for(let j = 5; j < 20; j++) {
      ctx.strokeRect(
        i * step % 400,
        j * step % 400,
        j * step % 20, 
        i * step % 20
      );
    }
  }
}


/**
 * some speaker-ish fun
 * 
 * @param {Number} step the current step of the animation 
 */
const beepboop = (step) => {
  const ctx = verifyCanvas();

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      ctx.beginPath();
      ctx.strokeStyle = color(100 + i * j, 100 + i, 100 + j)
      ctx.arc(
        200, 
        200,
        Math.floor(i + j + (step * Math.random())),
        0,
        2 * Math.PI
      );
      ctx.stroke();
    }
  }
}

/**
 * a hot lower right corner, gives way to cooling embers
 * 
 * @param {Number} step the current step of the animation 
 */
const cooling = (step) => {
  const ctx = verifyCanvas();

  for (let i = 0; i < 400; i++) {
    for (let j = 0; j < 400; j++) {
      let x = Math.floor(i + (step * Math.random()));
      let y = Math.floor(j + (step * Math.random()));
      ctx.beginPath();
      ctx.strokeStyle = color(50 + i * j, 50 + i, 50 + j)
      ctx.arc(
        x, 
        y,
        1,
        0,
        2 * Math.PI
      );
      ctx.stroke();
    }
  }
}

/**
 * simulates going through a tunnel
 * 
 * @param {Number} step the current step in the animation 
 */
const tunnel = (step) => {
  const ctx = verifyCanvas();

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      ctx.beginPath();
      ctx.strokeStyle = color(255, 0, 255)
      ctx.arc(
        200, 
        200,
        i * j + step,
        0,
        2 * Math.PI
      );
      ctx.stroke();
    }
  }
}

/**
 * creates a snall shell like
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
  conway(step, cs, rs);
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
    }, TIME_BETWEEN_DRAWS);

    return interval;
  }
}


window.addEventListener("load", drawAutomata(all));
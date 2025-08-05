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

const rule1 = (cs, ps) => {
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

const drawAutomata = () => {
  let steps = 10;
  let cs = 2;
  let ps = 4;
  const interval = setInterval(() => {
    if (steps++ > 1000) {
      return clearInterval(interval);
    }

    rule1(cs += 1, ps += 1);
  }, 250);
}


window.addEventListener("load", drawAutomata);

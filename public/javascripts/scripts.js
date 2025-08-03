const draw = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const origin = {
    x: 25,
    y: 25
  };
  const width = 20;
  const padding = 2;

  for (let i = 0; i < 10; i++) {
    const x = origin.x + (width * i) + (padding * i);
    const y = origin.y;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x, y + width);
    ctx.fill();
  }
}

window.addEventListener("load", draw);

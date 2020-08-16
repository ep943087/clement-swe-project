import Sorting from "./sorting.js";

window.onload = () => {
  draw();
};

const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
const sortingSim = new Sorting(c);

const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const scrambleButton = document.querySelector("#scramble");
const sortType = document.querySelector("#sort-type");
const sortSize = document.querySelector("#sort-size");
const sortSpeed = document.querySelector("#sort-speed");
const drawType = document.querySelector("#draw-type");
const color = document.querySelector("#color");

startButton.onclick = () => sortingSim.initSolve();
stopButton.onclick = () => sortingSim.stop();
scrambleButton.onclick = () => sortingSim.scramble();
sortType.onchange = (e) => sortingSim.setType(e.target.value);
sortSize.onchange = (e) => sortingSim.setSize(parseInt(e.target.value));
sortSpeed.onchange = (e) => sortingSim.setSpeed(parseInt(e.target.value));
drawType.onchange = (e) => sortingSim.setDrawType(e.target.value);
color.onchange = (e) => sortingSim.setColor();

c.height = 500;
c.width = 500;

const draw = () => {
  requestAnimationFrame(draw);

  ctx.fillStyle = sortingSim.background;

  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillRect(0, 0, c.width, c.height);

  sortingSim.solve();
  sortingSim.draw();
};

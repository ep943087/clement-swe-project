class Sorting {
  size = 25;
  list = [];
  solving = false;
  solveType = "bubble";
  speed = 1;
  drawType = "rectangles";
  color = true;
  background = "black";
  defaultColor = "white";
  constructor(c) {
    this.c = c;
    this.scramble();
  }
  solve() {
    if (this.solving) {
      for (let i = 0; i < this.speed; i++) this.performSolve();
    }
  }
  swap(i, j) {
    const x = this.list[i];
    this.list[i] = this.list[j];
    this.list[j] = x;
  }
  initBubble() {
    this.i = 0;
    this.last = this.size - 1;
  }
  solveBubble() {
    if (this.last >= 0) {
      if (this.i < this.last) {
        if (this.list[this.i] > this.list[this.i + 1]) {
          this.swap(this.i, this.i + 1);
        }
        this.i++;
      } else {
        this.i = 0;
        this.last--;
      }
    } else {
      this.solving = false;
    }
  }
  initInsert() {
    this.i = 0;
    this.j = 0;
  }
  solveInsert() {
    const { i, j, size } = this;

    if (i < size) {
      if (j > 0 && this.list[j] < this.list[j - 1]) {
        this.swap(j, j - 1);
        this.j--;
      } else {
        this.i++;
        this.j = this.i;
      }
    } else {
      this.solving = false;
    }
  }
  initSelect() {
    this.i = this.j = this.s = 0;
  }
  solveSelect() {
    const { i, j, s, size } = this;

    if (i < size) {
      if (j < size) {
        if (this.list[j] < this.list[s]) {
          this.s = this.j;
        }
        this.j++;
      } else {
        this.swap(i, s);
        this.i++;
        this.j = this.i;
        this.s = this.i;
      }
    }
  }
  quickSwap(i, j) {
    const x = this.tmp[i];
    this.tmp[i] = this.tmp[j];
    this.tmp[j] = x;
  }
  quickTmp(low, high) {
    if (low < high) {
      this.lowhigh.push({ low, high });
      const j = this.quickPartition(low, high);
      this.quickTmp(low, j - 1);
      this.quickTmp(j + 1, high);
    }
  }
  quickPartition(low, high) {
    let j = low;
    const pivot = this.tmp[high];
    for (let i = low; i < high; i++) {
      if (this.tmp[i] < pivot) {
        this.quickSwap(i, j);
        j++;
      }
    }
    this.quickSwap(j, high);
    return j;
  }
  quickVariables() {
    this.low = this.lowhigh[this.x].low;
    this.high = this.lowhigh[this.x].high;
    this.pivot = this.list[this.high];
    this.i = this.low;
    this.j = this.low;
  }
  initQuick() {
    this.tmp = [];
    this.lowhigh = [];
    for (let item of this.list) this.tmp.push(item);
    this.quickTmp(0, this.size - 1);

    // init variables
    this.x = 0;
    this.quickVariables();
  }
  solveQuick() {
    if (this.x < this.lowhigh.length) {
      if (this.i < this.high) {
        if (this.list[this.i] < this.pivot) {
          this.swap(this.i, this.j);
          this.j++;
        }
        this.i++;
      } else {
        this.swap(this.j, this.high);
        this.x++;
        if (this.x < this.lowhigh.length) this.quickVariables();
      }
    } else {
      this.solving = false;
    }
  }

  mergeTmp(low, high) {
    if (low < high) {
      const mid = Math.floor((low + high) / 2);
      this.mergeTmp(low, mid);
      this.mergeTmp(mid + 1, high);
      this.lmh.push({ low, mid, high });
    }
  }

  mergeVariables() {
    this.tmp = [];

    this.low = this.lmh[this.x].low;
    this.mid = this.lmh[this.x].mid;
    this.high = this.lmh[this.x].high;
    this.i = this.low;
    this.j = this.mid + 1;
    this.m = 0;
    this.n = this.low;
  }

  initMerge() {
    this.lmh = [];
    this.mergeTmp(0, this.size - 1);
    this.x = 0;
    this.mergeVariables();
  }
  solveMerge() {
    if (this.x < this.lmh.length) {
      if (this.i <= this.mid && this.j <= this.high) {
        if (this.list[this.i] < this.list[this.j]) {
          this.tmp.push(this.list[this.i]);
          this.i++;
        } else {
          this.tmp.push(this.list[this.j]);
          this.j++;
        }
      } else if (this.i <= this.mid) {
        this.tmp.push(this.list[this.i]);
        this.i++;
      } else if (this.j <= this.high) {
        this.tmp.push(this.list[this.j]);
        this.j++;
      } else if (this.n <= this.high) {
        this.list[this.n] = this.tmp[this.m];
        this.m++;
        this.n++;
      } else {
        this.x++;
        if (this.x < this.lmh.length) {
          this.mergeVariables();
        }
      }
    } else {
      this.solving = false;
    }
  }
  initSolve() {
    switch (this.solveType) {
      case "bubble":
        this.initBubble();
        break;
      case "select":
        this.initSelect();
        break;
      case "insert":
        this.initInsert();
        break;
      case "quick":
        this.initQuick();
        break;
      case "merge":
        this.initMerge();
        break;
    }
    this.solving = true;
  }
  performSolve() {
    switch (this.solveType) {
      case "bubble":
        this.solveBubble();
        break;
      case "select":
        this.solveSelect();
        break;
      case "insert":
        this.solveInsert();
        break;
      case "quick":
        this.solveQuick();
        break;
      case "merge":
        this.solveMerge();
        break;
      default:
        console.log(this.solveType);
        break;
    }
  }
  stop() {
    this.solving = false;
  }

  // Setters
  setType(type) {
    this.solveType = type;
    this.scramble();
  }
  setSize(size) {
    this.size = size;
    this.scramble();
  }
  setSpeed(speed) {
    this.speed = speed;
  }
  scramble() {
    this.solving = false;
    this.list = [];
    const tmp = [];
    for (let i = 0; i < this.size; i++) {
      tmp.push(i + 1);
    }
    while (tmp.length > 0) {
      const r = Math.floor(Math.random() * tmp.length);
      this.list.push(tmp[r]);
      tmp.splice(r, 1);
    }
  }
  setDrawType(type) {
    this.drawType = type;
  }
  setColor() {
    this.color = !this.color;
  }

  // init variables for drawing
  initCanvasVariable() {
    return { c: this.c, ctx: this.c.getContext("2d") };
  }
  initWidthHeight() {
    return { w: c.width / this.size, h: (0.8 * c.height) / this.size };
  }

  getHSL(i) {
    const hsl = (this.list[i] / this.size) * 360;
    const value = `hsl(${hsl},50%,50%)`;

    if (!this.solving) return value;
    switch (this.solveType) {
      case "bubble":
        if (i === this.i) return this.background;
        break;
      case "select":
        if (i === this.j) return this.background;
        else if (i === this.s) return this.background;
        break;
      case "insert":
        if (i === this.j) return this.background;
        break;
      case "quick":
        if (i === this.i || i === this.j) return this.background;
        break;
      case "merge":
        if (i === this.i && this.n === this.low) return this.background;
        else if (i === this.j && this.n === this.low) return this.background;
        else if (i === this.n && this.m > 0) return this.background;
    }

    return value;
  }

  // get color of item
  getColor(i) {
    if (!this.solving) return this.defaultColor;
    switch (this.solveType) {
      case "bubble":
        if (i === this.i) return "red";
        break;
      case "select":
        if (i === this.j) return "red";
        else if (i === this.s) return "blue";
        break;
      case "insert":
        if (i === this.j) return "red";
        break;
      case "quick":
        if (i === this.i || i === this.j) return "red";
        break;
      case "merge":
        if (i === this.i && this.n === this.low) return "red";
        else if (i === this.j && this.n === this.low) return "red";
        else if (i === this.n && this.m > 0) return "rgba(0,255,0)";
    }
    return this.defaultColor;
  }

  drawRectangles() {
    const { c, ctx } = this.initCanvasVariable();
    const { w, h } = this.initWidthHeight();
    for (let i = 0; i < this.list.length; i++) {
      ctx.fillStyle = this.color ? this.getHSL(i) : this.getColor(i);
      ctx.fillRect(i * w, c.height - this.list[i] * h, w, this.list[i] * h);
    }
  }

  drawSpots() {
    const { c, ctx } = this.initCanvasVariable();
    const { w, h } = this.initWidthHeight();
    for (let i = 0; i < this.list.length; i++) {
      ctx.fillStyle = this.color ? this.getHSL(i) : this.getColor(i);
      ctx.beginPath();
      ctx.arc(i * w, c.height - this.list[i] * h, w / 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  drawLines() {
    const { c, ctx } = this.initCanvasVariable();
    const { w, h } = this.initWidthHeight();
    for (let i = 0; i < this.list.length - 1; i++) {
      ctx.strokeStyle = this.getColor(i);
      ctx.strokeStyle = this.color ? this.getHSL(i) : this.getColor(i);
      ctx.strokeWidth = 3;
      ctx.beginPath();
      ctx.moveTo(i * w, c.height - this.list[i] * h);
      ctx.lineTo(i * w + w, c.height - this.list[i + 1] * h);
      ctx.stroke();
    }
  }

  drawPyramid() {
    const { c, ctx } = this.initCanvasVariable();
    const { w, h } = this.initWidthHeight();
    for (let i = 0; i < this.list.length; i++) {
      ctx.fillStyle = this.color ? this.getHSL(i) : this.getColor(i);

      // ctx.fillRect(i * w, c.height - this.list[i] * h, w, this.list[i] * h);
      const x = c.width / 2 - (w * this.list[i]) / 2;
      const y = i * h;
      ctx.fillRect(x, y + c.height * 0.2, w * this.list[i], h);
    }
  }

  // draw the simulation based on drawType
  draw() {
    switch (this.drawType) {
      case "rectangles":
        this.drawRectangles();
        break;
      case "spots":
        this.drawSpots();
        break;
      case "lines":
        this.drawLines();
        break;
      case "pyramid":
        this.drawPyramid();
      default:
        console.log(this.drawType);
        break;
    }
  }
}

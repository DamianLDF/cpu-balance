// create the audio context
var ac = new AudioContext(),
  // get the current Web Audio timestamp (this is when playback should begin)
  when = ac.currentTime,
  // set the tempo
  tempo = 132,
  // initialize some vars
  sequence1,
  sequence2,
  sequence3,
  // create an array of "note strings" that can be passed to a sequence
  lead = [
    '-   e',
    'Bb3 e',
    'A3  e',
    'Bb3 e',
    'G3  e',
    'A3  e',
    'F3  e',
    'G3  e',

    'E3  e',
    'F3  e',
    'G3  e',
    'F3  e',
    'E3  e',
    'F3  e',
    'D3  q',

    '-   e',
    'Bb3 s',
    'A3  s',
    'Bb3 e',
    'G3  e',
    'A3  e',
    'G3  e',
    'F3  e',
    'G3  e',

    'E3  e',
    'F3  e',
    'G3  e',
    'F3  e',
    'E3  s',
    'F3  s',
    'E3  e',
    'D3  q'
  ],
  harmony = [
    '-   e',
    'D4  e',
    'C4  e',
    'D4  e',
    'Bb3 e',
    'C4  e',
    'A3  e',
    'Bb3 e',

    'G3  e',
    'A3  e',
    'Bb3 e',
    'A3  e',
    'G3  e',
    'A3  e',
    'F3  q',

    '-   e',
    'D4  s',
    'C4  s',
    'D4  e',
    'Bb3 e',
    'C4  e',
    'Bb3 e',
    'A3  e',
    'Bb3 e',

    'G3  e',
    'A3  e',
    'Bb3 e',
    'A3  e',
    'G3  s',
    'A3  s',
    'G3  e',
    'F3  q'
  ],
  bass = [
    'D3  q',
    '-   h',
    'D3  q',

    'A2  q',
    '-   h',
    'A2  q',

    'Bb2 q',
    '-   h',
    'Bb2 q',

    'F2  h',
    'A2  h'
  ];

const FPS = 30;
let ctx;

let l1 = ["00000", "00P00", "00000", "010A0", "00000"];
let l2 = ["00000", "002A0", "0P000", "001B0", "00000"];
let l3 = ["00P00", "01010", "00000", "00B00", "00000"];
let l4 = ["0P000", "00000", "0-1-0", "0-K-0", "00000"];
let test_lvl = [
  "P00000000000",
  "0123456789X0",
  "000000000000",
  "0123456789X0",
  "0000---00000",
  "0ABCDEFGHIJ0",
  "000000000000",
];

let cpu_merge = {
  "1": "2",
  "2": "3",
  "3": "4",
  "4": "5",
  "5": "6",
  "6": "7",
  "7": "8",
  "8": "9",
  "9": "X",
  "X": "X",
}

let cpu_nrg = {
  "1": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
  "2": ["B", "C", "D", "E", "F", "G", "H", "I", "J"],
  "3": ["C", "D", "E", "F", "G", "H", "I", "J"],
  "4": ["D", "E", "F", "G", "H", "I", "J"],
  "5": ["E", "F", "G", "H", "I", "J"],
  "6": ["F", "G", "H", "I", "J"],
  "7": ["G", "H", "I", "J"],
  "8": ["H", "I", "J"],
  "9": ["I", "J"],
  "X": ["J"],
}

let kb = {}
let msg = {}


let fl; //floor
let cp; //movable items
let pl; //player
let lvl = {}

function key_down(e) {
  switch_key(e, true);
}
function key_up(e) {
  switch_key(e, false);
}

function switch_key(e, v) {
  switch (e.which) {
    case 87: case 38: // W/Up
      e.preventDefault();
      kb.u = v;
      break;
    case 68: case 39: // D/Right
      e.preventDefault();
      kb.r = v;
      break;
    case 83: case 40: // S/Down
      e.preventDefault();
      kb.d = v;
      break;
    case 65: case 37: // A/Left
      e.preventDefault();
      kb.l = v;
      break;
    case 82: case 8: // R/Backspace
      e.preventDefault();
      kb.rst = v;
      break;
  }
}

function page_load() {

  let canvas = document.getElementById("cnv");
  ctx = canvas.getContext("2d");
  document.addEventListener("keydown", key_down, false);
  document.addEventListener("keyup", key_up, false);
  let timer = setInterval(process, 1000 / FPS);
  load_level(test_lvl);

  // create 3 new sequences (one for lead, one for harmony, one for bass)
  sequence1 = new TinyMusic.Sequence(ac, tempo, lead);
  sequence2 = new TinyMusic.Sequence(ac, tempo, harmony);
  sequence3 = new TinyMusic.Sequence(ac, tempo, bass);

  // set staccato and smoothing values for maximum coolness
  sequence1.staccato = 0.55;
  sequence2.staccato = 0.55;
  sequence3.staccato = 0.05;
  sequence3.smoothing = 0.4;

  // adjust the levels so the bass and harmony aren't too loud
  sequence1.gain.gain.value = 0.25;
  sequence2.gain.gain.value = 0.2;
  sequence3.gain.gain.value = 0.1875;

  // apply EQ settings
  sequence1.mid.frequency.value = 800;
  sequence1.mid.gain.value = -10;
  sequence2.mid.frequency.value = 1200;
  sequence3.mid.gain.value = -10;
  sequence3.bass.gain.value = -7;
  sequence3.bass.frequency.value = 80;
  sequence3.mid.gain.value = -16;
  sequence3.mid.frequency.value = 500;
  sequence3.treble.gain.value = -12;
  sequence3.treble.frequency.value = 1400;


  //start the lead part immediately
  sequence1.play(when);
  // delay the harmony by 16 beats
  sequence2.play(when + (60 / tempo) * 16);
  // start the bass part immediately
  sequence3.play(when);

}

function process() {
  ctx.fillStyle = "#EEEEEE";
  ctx.fillRect(0, 0, 800, 600);

  if (msg.show) {

  } else {
    if (kb.rst) {
      reload_level();
    } else if (pl.s === 0) { // idle player
      if (kb.u) {
        pl.d = 0; // up
        if (can_walk()) {
          pl.s = 1; // walk
          pl.t = 32;
          pl.o = get_obj_pushed();
        }
      } else if (kb.d) {
        pl.d = 2; // down
        if (can_walk()) {
          pl.s = 1; // walk
          pl.t = 32;
          pl.o = get_obj_pushed();
        }
      } else if (kb.l) {
        pl.d = 3; // left
        if (can_walk()) {
          pl.s = 1; // walk
          pl.t = 32;
          pl.o = get_obj_pushed();
        }
      } else if (kb.r) {
        pl.d = 1; // right
        if (can_walk()) {
          pl.s = 1; // walk
          pl.t = 32;
          pl.o = get_obj_pushed();
        }
      }
    } else if (pl.s === 1) {
      let d = 32 / FPS * 3;
      pl.t -= d;
      if (pl.t > 0) {
        if (pl.d === 0) pl.dy -= d;
        if (pl.d === 1) pl.dx += d;
        if (pl.d === 2) pl.dy += d;
        if (pl.d === 3) pl.dx -= d;
        for (let i = 0; i < pl.o.length; i++) {
          if (pl.d === 0) pl.o[i].dy -= d;
          if (pl.d === 1) pl.o[i].dx += d;
          if (pl.d === 2) pl.o[i].dy += d;
          if (pl.d === 3) pl.o[i].dx -= d;
        }
      } else {
        pl.dx = 0;
        pl.dy = 0;
        if (pl.d === 0) pl.y -= 1;
        if (pl.d === 1) pl.x += 1;
        if (pl.d === 2) pl.y += 1;
        if (pl.d === 3) pl.x -= 1;
        for (let i = 0; i < pl.o.length - 1; i++) {
          if (pl.d === 0) pl.o[i].y -= 1;
          if (pl.d === 1) pl.o[i].x += 1;
          if (pl.d === 2) pl.o[i].y += 1;
          if (pl.d === 3) pl.o[i].x -= 1;
          pl.o[i].dx = 0;
          pl.o[i].dy = 0;
        }
        if (pl.o.length > 0) {
          let item = pl.o[pl.o.length - 1]
          let nx = item.x;
          let ny = item.y;
          if (pl.d === 0) ny -= 1;
          if (pl.d === 1) nx += 1;
          if (pl.d === 2) ny += 1;
          if (pl.d === 3) nx -= 1;
          let fl_item = get_item(nx, ny)
          if (fl_item !== null && cpu_merge[fl_item.t]) { // merge
            fl_item.t = cpu_merge[fl_item.t];
            item.x = -1;
          } else { // move
            item.x = nx;
            item.y = ny;
          }
          item.dx = 0;
          item.dy = 0;
        }
        pl.s = 0;
      }
    }
  }

  let sx = 800 / (lvl.x * 32);
  let sy = 600 / (lvl.y * 32);
  let s = sx < sy ? sx : sy;
  for (let i = 0; i < lvl.x; i++) {
    for (let j = 0; j < lvl.y; j++) {
      let f = get_floor(i, j);
      if (f === "-") draw_wall(i * 32 * s, j * 32 * s, s);
      if (f === "0") draw_floor(i * 32 * s, j * 32 * s, s);
      if (["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].includes(f)) draw_socket(i * 32 * s, j * 32 * s, s, f);
    }
  }
  for (let i = 0; i < cp.length; i++) {
    draw_chip(cp[i].x * 32 * s + cp[i].dx * s, cp[i].y * 32 * s + cp[i].dy * s, s, cp[i].t, get_chip_nrg(cp[i]));
  }
  draw_player_idle(pl.x * 32 * s + pl.dx * s, pl.y * 32 * s + pl.dy * s, s, pl.d);
}

function reload_level() {
  load_level(lvl.l)
}

function load_level(l) {
  lvl.x = 0;
  lvl.y = 0;
  lvl.l = l
  fl = {};
  cp = [];
  pl = {};
  for (let i = 0; i < l.length; i++) {
    for (let j = 0; j < l[i].length; j++) {
      if (["0", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].includes(l[i][j])) {
        add_floor(j + 1, i + 1, l[i][j]);
      } else if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "X"].includes(l[i][j])) {
        add_floor(j + 1, i + 1, "0");
        cp.push({ x: j + 1, y: i + 1, dx: 0, dy: 0, t: l[i][j] })
      } else if (l[i][j] === "K") {
        add_floor(j + 1, i + 1, "B");
        cp.push({ x: j + 1, y: i + 1, dx: 0, dy: 0, t: "1" });
      } else if (l[i][j] === "P") {
        pl.x = j + 1;
        pl.y = i + 1;
        pl.d = 2;
        pl.dx = 0;
        pl.dy = 0;
        pl.s = 0;
        add_floor(j + 1, i + 1, "0");
      }
    }
  }
}

function add_floor(x, y, f) {
  if (!fl[x]) fl[x] = {};
  fl[x][y] = f
  if (x + 2 > lvl.x) lvl.x = x + 2;
  if (y + 2 > lvl.y) lvl.y = y + 2;
}
function get_floor(x, y) {
  if (!fl[x]) return "-";
  if (!fl[x][y]) return "-";
  return fl[x][y];
}
function get_item(x, y) {
  for (let i = 0; i < cp.length; i++) {
    if (cp[i].x === x && cp[i].y === y) return cp[i];
  }
  return null;
}

function can_walk() {
  let can = false; // can walk
  let chk = true; // continue checking tiles
  let td = 1; // tile distance
  let pri = null; // previous item type
  while (chk) {
    let f; // floor tile
    if (pl.d === 0) f = get_floor(pl.x, pl.y - td);
    else if (pl.d === 1) f = get_floor(pl.x + td, pl.y);
    else if (pl.d === 2) f = get_floor(pl.x, pl.y + td);
    else if (pl.d === 3) f = get_floor(pl.x - td, pl.y);

    if (f === "-") { // against a wall
      can = false;
      chk = false;
    } else {
      let item;
      if (pl.d === 0) item = get_item(pl.x, pl.y - td);
      else if (pl.d === 1) item = get_item(pl.x + td, pl.y);
      else if (pl.d === 2) item = get_item(pl.x, pl.y + td);
      else if (pl.d === 3) item = get_item(pl.x - td, pl.y);
      if (item) {
        if (item.t === pri) {
          if (f === "0") { // can merge
            can = true;
            chk = false;
          }
        }
        pri = item.t
      } else { // can move
        can = true;
        chk = false;
      }
    }
    td++;
  }
  return can;
}

function get_obj_pushed() {
  let obj = []; // objects
  let chk = true; // continue checking tiles
  let td = 1; // tile distance
  let pri = null; // previous item type
  while (chk) {
    let f; // floor tile
    if (pl.d === 0) f = get_floor(pl.x, pl.y - td);
    else if (pl.d === 1) f = get_floor(pl.x + td, pl.y);
    else if (pl.d === 2) f = get_floor(pl.x, pl.y + td);
    else if (pl.d === 3) f = get_floor(pl.x - td, pl.y);

    if (f === "-") { // against a wall
      chk = false;
      obj = [];
    } else {
      let item;
      if (pl.d === 0) item = get_item(pl.x, pl.y - td);
      else if (pl.d === 1) item = get_item(pl.x + td, pl.y);
      else if (pl.d === 2) item = get_item(pl.x, pl.y + td);
      else if (pl.d === 3) item = get_item(pl.x - td, pl.y);
      if (item) {
        if (item.t === pri && f === "0") { // can merge
          chk = false;
        } else { // object is pushed
          obj.push(item);
        }
        pri = item.t
      } else { // no more objects to push
        chk = false;
      }
    }
    td++;
  }
  return obj;
}

function get_chip_nrg(cpu) {
  let f = get_floor(cpu.x, cpu.y);
  let on = "#FFFF88";
  let unp = "#FF0000"; // underpowered
  let off = "#2222CC";
  if (f === "0" || cpu.dx != 0 || cpu.dy != 0) return off;
  else if (cpu.dx === 0 && cpu.dy === 0) {
    if (cpu_nrg[cpu.t]) {
      if (cpu_nrg[cpu.t].includes(f)) return on;
      else return unp;
    }
  }
  return "#0000FF";
}

////////// Graphics //////////

function draw_floor(x, y, s) {
  ctx.fillStyle = "#FFFFFF"
  ctx.strokeStyle = "#111111"
  fill_tile(x, y, s)
  ctx.stroke();
}
function draw_wall(x, y, s) {
  ctx.fillStyle = "#FFFFFF"
  ctx.strokeStyle = "#111111"
  fill_tile(x, y, s)
  for (let i = 1; i <= 3; i++) {
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y + 8 * i * s);
    ctx.lineTo(x + 32 * s, y + 8 * i * s);
    ctx.stroke();
  }
  for (let i = 0; i < 2; i++) {
    ctx.beginPath();
    ctx.moveTo(x + 11 * s, y + 16 * s * i);
    ctx.lineTo(x + 11 * s, y + 8 * s + 16 * s * i);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + 22 * s, y + 8 * s + 16 * s * i);
    ctx.lineTo(x + 22 * s, y + 16 * s + 16 * s * i);
    ctx.stroke();
  }
}

function draw_chip(x, y, s, t, nrg) {
  ctx.fillStyle = "#222222";
  ctx.strokeStyle = "#222222";
  draw_chip_shape(x, y, s);

  ctx.fillStyle = nrg;
  switch (t) {
    case "3":
      ctx.fillRect(x + 9 * s, y + 8 * s, 2 * s, 16 * s);
      ctx.fillRect(x + 21 * s, y + 8 * s, 2 * s, 16 * s);
    case "1":
      ctx.fillRect(x + 15 * s, y + 8 * s, 2 * s, 16 * s);
      break;
    case "2":
      ctx.fillRect(x + 12 * s, y + 8 * s, 2 * s, 16 * s);
      ctx.fillRect(x + 18 * s, y + 8 * s, 2 * s, 16 * s);
      break;
    case "4":
      ctx.fillRect(x + 9 * s, y + 8 * s, 2 * s, 16 * s);
      ctx.beginPath();
      ctx.moveTo(x + 13 * s, y + 8 * s);
      ctx.lineTo(x + 17 * s, y + 24 * s);
      ctx.lineTo(x + 19 * s, y + 24 * s);
      ctx.lineTo(x + 23 * s, y + 8 * s);
      ctx.lineTo(x + 21 * s, y + 8 * s);
      ctx.lineTo(x + 18 * s, y + 22 * s);
      ctx.lineTo(x + 15 * s, y + 8 * s);
      ctx.fill();
      break;
    case "5":
      ctx.beginPath();
      ctx.moveTo(x + 9 * s, y + 8 * s);
      ctx.lineTo(x + 15 * s, y + 24 * s);
      ctx.lineTo(x + 17 * s, y + 24 * s);
      ctx.lineTo(x + 23 * s, y + 8 * s);
      ctx.lineTo(x + 21 * s, y + 8 * s);
      ctx.lineTo(x + 16 * s, y + 22 * s);
      ctx.lineTo(x + 11 * s, y + 8 * s);
      ctx.fill();
      break;
    case "6":
      ctx.fillRect(x + 21 * s, y + 8 * s, 2 * s, 16 * s);
      ctx.beginPath();
      ctx.moveTo(x + 9 * s, y + 8 * s);
      ctx.lineTo(x + 13 * s, y + 24 * s);
      ctx.lineTo(x + 15 * s, y + 24 * s);
      ctx.lineTo(x + 19 * s, y + 8 * s);
      ctx.lineTo(x + 17 * s, y + 8 * s);
      ctx.lineTo(x + 14 * s, y + 22 * s);
      ctx.lineTo(x + 11 * s, y + 8 * s);
      ctx.fill();
      break;
    case "7":
      ctx.beginPath();
      ctx.moveTo(x + 9 * s, y + 8 * s);
      ctx.lineTo(x + 13 * s, y + 24 * s);
      ctx.lineTo(x + 15 * s, y + 24 * s);
      ctx.lineTo(x + 19 * s, y + 8 * s);
      ctx.lineTo(x + 17 * s, y + 8 * s);
      ctx.lineTo(x + 14 * s, y + 22 * s);
      ctx.lineTo(x + 11 * s, y + 8 * s);
      ctx.fill();
      ctx.fillRect(x + 18 * s, y + 8 * s, 2 * s, 16 * s);
      ctx.fillRect(x + 22 * s, y + 8 * s, 2 * s, 16 * s);
      break;
    case "8":
      ctx.beginPath();
      ctx.moveTo(x + 7 * s, y + 8 * s);
      ctx.lineTo(x + 11 * s, y + 24 * s);
      ctx.lineTo(x + 13 * s, y + 24 * s);
      ctx.lineTo(x + 17 * s, y + 8 * s);
      ctx.lineTo(x + 15 * s, y + 8 * s);
      ctx.lineTo(x + 12 * s, y + 22 * s);
      ctx.lineTo(x + 9 * s, y + 8 * s);
      ctx.fill();
      ctx.fillRect(x + 16 * s, y + 8 * s, 2 * s, 16 * s);
      ctx.fillRect(x + 19 * s, y + 8 * s, 2 * s, 16 * s);
      ctx.fillRect(x + 22 * s, y + 8 * s, 2 * s, 16 * s);
      break;
    case "9":
      ctx.fillRect(x + 9 * s, y + 8 * s, 2 * s, 16 * s);
      ctx.beginPath();
      ctx.moveTo(x + 13 * s, y + 8 * s);
      ctx.lineTo(x + 21 * s, y + 24 * s);
      ctx.lineTo(x + 23 * s, y + 24 * s);
      ctx.lineTo(x + 15 * s, y + 8 * s);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x + 13 * s, y + 24 * s);
      ctx.lineTo(x + 21 * s, y + 8 * s);
      ctx.lineTo(x + 23 * s, y + 8 * s);
      ctx.lineTo(x + 15 * s, y + 24 * s);
      ctx.fill();
      break;
    case "X":
      ctx.beginPath();
      ctx.moveTo(x + 9 * s, y + 8 * s);
      ctx.lineTo(x + 19 * s, y + 24 * s);
      ctx.lineTo(x + 23 * s, y + 24 * s);
      ctx.lineTo(x + 13 * s, y + 8 * s);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x + 9 * s, y + 24 * s);
      ctx.lineTo(x + 19 * s, y + 8 * s);
      ctx.lineTo(x + 23 * s, y + 8 * s);
      ctx.lineTo(x + 13 * s, y + 24 * s);
      ctx.fill();
      break;

  }
}

function draw_socket(x, y, s, t) {
  ctx.fillStyle = "#444444"
  ctx.strokeStyle = "#111111"
  ctx.beginPath();
  fill_tile(x, y, s)
  ctx.stroke();
  ctx.fillStyle = "#FFFFFF"
  draw_chip_shape(x, y, s)

  ctx.fillStyle = "#AAAAAA";
  if (["A", "C", "E", "G", "I"].includes(t)) {
    ctx.beginPath();
    ctx.arc(x + 16 * s, y + 16 * s, 3 * s, 0, 2 * Math.PI);
    ctx.fill();
  }
  if (["B", "C", "D", "E", "F", "G", "H", "I"].includes(t)) {
    ctx.beginPath();
    ctx.arc(x + 10 * s, y + 10 * s, 3 * s, 0, 2 * Math.PI);
    ctx.fill();
  }
  if (["B", "C", "D", "E", "F", "G", "H", "I"].includes(t)) {
    ctx.beginPath();
    ctx.arc(x + 22 * s, y + 22 * s, 3 * s, 0, 2 * Math.PI);
    ctx.fill();
  }
  if (["D", "E", "F", "G", "H", "I"].includes(t)) {
    ctx.beginPath();
    ctx.arc(x + 10 * s, y + 22 * s, 3 * s, 0, 2 * Math.PI);
    ctx.fill();
  }
  if (["D", "E", "F", "G", "H", "I"].includes(t)) {
    ctx.beginPath();
    ctx.arc(x + 22 * s, y + 10 * s, 3 * s, 0, 2 * Math.PI);
    ctx.fill();
  }
  if (["F", "G", "H", "I"].includes(t)) {
    ctx.beginPath();
    ctx.arc(x + 10 * s, y + 16 * s, 3 * s, 0, 2 * Math.PI);
    ctx.fill();
  }
  if (["F", "G", "H", "I"].includes(t)) {
    ctx.beginPath();
    ctx.arc(x + 22 * s, y + 16 * s, 3 * s, 0, 2 * Math.PI);
    ctx.fill();
  }
  if (["H", "I"].includes(t)) {
    ctx.beginPath();
    ctx.arc(x + 16 * s, y + 10 * s, 3 * s, 0, 2 * Math.PI);
    ctx.fill();
  }
  if (["H", "I"].includes(t)) {
    ctx.beginPath();
    ctx.arc(x + 16 * s, y + 22 * s, 3 * s, 0, 2 * Math.PI);
    ctx.fill();
  }
  if (t === "J") {
    ctx.beginPath();
    ctx.moveTo(x + 9 * s, y + 8 * s);
    ctx.lineTo(x + 19 * s, y + 24 * s);
    ctx.lineTo(x + 23 * s, y + 24 * s);
    ctx.lineTo(x + 13 * s, y + 8 * s);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x + 9 * s, y + 24 * s);
    ctx.lineTo(x + 19 * s, y + 8 * s);
    ctx.lineTo(x + 23 * s, y + 8 * s);
    ctx.lineTo(x + 13 * s, y + 24 * s);
    ctx.fill();
  }
}

function fill_tile(x, y, s) {
  if (!s) s = 1;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 32 * s, y);
  ctx.lineTo(x + 32 * s, y + 32 * s);
  ctx.lineTo(x, y + 32 * s);
  ctx.lineTo(x, y);
  ctx.fill();
}

function draw_chip_shape(x, y, s) {
  if (!s) s = 1;
  ctx.beginPath();
  ctx.moveTo(x + 5 * s, y + 5 * s);
  ctx.lineTo(x + 27 * s, y + 5 * s);
  ctx.lineTo(x + 27 * s, y + 27 * s);
  ctx.lineTo(x + 5 * s, y + 27 * s);
  ctx.fill();

  for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.moveTo(x + 6 * s + i * 3 * s, y + 30 * s);
    ctx.lineTo(x + 6 * s + i * 3 * s, y + 2 * s);
    ctx.lineTo(x + 7 * s + i * 3 * s, y + 2 * s);
    ctx.lineTo(x + 7 * s + i * 3 * s, y + 30 * s);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x + 30 * s, y + 6 * s + i * 3 * s);
    ctx.lineTo(x + 2 * s, y + 6 * s + i * 3 * s);
    ctx.lineTo(x + 2 * s, y + 7 * s + i * 3 * s);
    ctx.lineTo(x + 30 * s, y + 7 * s + i * 3 * s);
    ctx.fill();
  }
}

function draw_player_idle(x, y, s, d) {
  if (!s) s = 1;
  let cx = x + 16 * s;
  let cy = y + 16 * s;
  if (d == 0 || d == 2) { // facing up or down
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath(); // torso
    ctx.moveTo(cx - 9 * s, cy - 2 * s);
    ctx.quadraticCurveTo(cx - 14 * s, cy, cx - 14 * s, cy + 8 * s);
    ctx.quadraticCurveTo(cx - 12 * s, cy + 10 * s, cx - 10 * s, cy + 8 * s);
    ctx.lineTo(cx - 10 * s, cy + 4 * s);
    ctx.lineTo(cx - 9 * s, cy + 7 * s);
    ctx.lineTo(cx + 9 * s, cy + 7 * s);
    ctx.lineTo(cx + 10 * s, cy + 4 * s);
    ctx.lineTo(cx + 10 * s, cy + 8 * s);
    ctx.quadraticCurveTo(cx + 12 * s, cy + 10 * s, cx + 14 * s, cy + 8 * s);
    ctx.quadraticCurveTo(cx + 14 * s, cy, cx + 9 * s, cy - 2 * s);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath(); // head
    ctx.moveTo(cx - 9 * s, cy - 2 * s);
    ctx.quadraticCurveTo(cx - 14 * s, cy - 8 * s, cx - 7 * s, cy - 14 * s);
    ctx.quadraticCurveTo(cx, cy - 16 * s, cx + 7 * s, cy - 14 * s);
    ctx.quadraticCurveTo(cx + 14 * s, cy - 8 * s, cx + 9 * s, cy - 2 * s);
    ctx.quadraticCurveTo(cx, cy, cx - 9 * s, cy - 2 * s);
    ctx.stroke();
    if (d == 2) { // facing down
      ctx.fill();
      ctx.fillStyle = "#000000";
    } else { // facing up
      ctx.fillStyle = "#000000";
      ctx.fill();
    }
    ctx.beginPath(); // legs
    ctx.moveTo(cx - 9 * s, cy + 7 * s);
    ctx.lineTo(cx - 7 * s, cy + 14 * s);
    ctx.quadraticCurveTo(cx - 5 * s, cy + 16 * s, cx - 3 * s, cy + 14 * s);
    ctx.lineTo(cx, cy + 10 * s);
    ctx.lineTo(cx + 3 * s, cy + 14 * s);
    ctx.quadraticCurveTo(cx + 5 * s, cy + 16 * s, cx + 7 * s, cy + 14 * s);
    ctx.lineTo(cx + 9 * s, cy + 7 * s);
    ctx.lineTo(cx - 9 * s, cy + 7 * s);
    ctx.stroke();
    ctx.fill();

    if (d == 2) { // facing down
      ctx.beginPath(); // hair
      ctx.moveTo(cx - 7 * s, cy - 14 * s);
      ctx.quadraticCurveTo(cx, cy - 16 * s, cx + 7 * s, cy - 14 * s);
      ctx.quadraticCurveTo(cx, cy - 11 * s, cx - 7 * s, cy - 14 * s);
      ctx.fill();
      ctx.beginPath(); // eyes
      ctx.arc(cx - 6 * s, cy - 8 * s, 2 * s, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx + 6 * s, cy - 8 * s, 2 * s, 0, 2 * Math.PI);
      ctx.fill();
    }
  } else {
    let fd = d == 1 ? 1 : -1;

    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath(); // torso
    ctx.moveTo(cx - 7 * s, cy - 2 * s);
    ctx.lineTo(cx - 5 * s, cy + 7 * s);
    ctx.lineTo(cx + 5 * s, cy + 7 * s);
    ctx.lineTo(cx + 7 * s, cy - 2 * s);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath(); // head
    ctx.moveTo(cx - 7 * s, cy - 2 * s);
    ctx.quadraticCurveTo(cx - 10 * s, cy - 8 * s, cx - 7 * s, cy - 14 * s);
    ctx.quadraticCurveTo(cx, cy - 16 * s, cx + 7 * s, cy - 14 * s);
    ctx.quadraticCurveTo(cx + 10 * s, cy - 8 * s, cx + 7 * s, cy - 2 * s);
    ctx.quadraticCurveTo(cx, cy, cx - 7 * s, cy - 2 * s);
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "#000000";
    ctx.beginPath(); // hair
    ctx.moveTo(cx - 7 * s * fd, cy - 2 * s);
    ctx.quadraticCurveTo(cx - 10 * s * fd, cy - 8 * s, cx - 7 * s * fd, cy - 14 * s);
    ctx.quadraticCurveTo(cx, cy - 16 * s, cx + 7 * s * fd, cy - 14 * s);
    ctx.quadraticCurveTo(cx + 1 * s * fd, cy - 10 * s, cx - 5 * s * fd, cy - 12 * s);
    ctx.quadraticCurveTo(cx - 5 * s * fd, cy - 5 * s, cx - 7 * s * fd, cy - 2 * s);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath(); // eye
    ctx.arc(cx + 4 * s * fd, cy - 8 * s, 2 * s, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath(); // leg
    ctx.moveTo(cx - 5 * s, cy + 7 * s);
    ctx.lineTo(cx - 2 * s, cy + 14 * s);
    ctx.quadraticCurveTo(cx, cy + 16 * s, cx + 2 * s, cy + 14 * s);
    ctx.lineTo(cx + 5 * s, cy + 7 * s);
    ctx.stroke();
    ctx.fill();


    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath(); // arm
    ctx.moveTo(cx - 2 * s, cy + 4 * s);
    ctx.lineTo(cx - 2 * s, cy + 8 * s);
    ctx.quadraticCurveTo(cx, cy + 10 * s, cx + 2 * s, cy + 8 * s);
    ctx.lineTo(cx + 2 * s, cy + 4 * s);
    ctx.stroke();
    ctx.fill();
  }

}

window.addEventListener("load", page_load, false);
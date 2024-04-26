
const FPS = 30;
const BTNW = 100;
const BTNH = 50;
let ctx;

let l1 = ["00000", "00P00", "00000", "010A0", "00000"];
let l2 = ["00000", "002A0", "0P000", "001B0", "00000"];
let l3 = ["00P00", "01010", "00000", "00B00", "00000"];
let l4 = ["0P000", "00100", "0-0-0", "0-K-0", "00000"];
let l5 = ["0000000", "P111AAA", "-00", "-00"];
let l6 = ["00P00", "0-1-0", "01C10", "0-1-0", "00000"];
let l7 = ["--C", "02A20", "0-K-0", "0-2-0", "01B10", "0-2-0", "00P00"];
let l8 = ["000P000", "0321230", "01-C-10", "02C-C20", "01-C-10", "0311130", "0000000"];
let lr2 = ["-00P00", "0123210", "02-D-20", "03C-D30", "02-D-20", "0123210", "-00000"];
let l9 = ["--000", "0111110", "0111110", "011P110", "---0", "---0", "0000000", "0000000", "0-0-0-0", "A-C-C-A"];
let lx = [
  "-------C",
  "003000C0C",
  "00-----0",
  "-2-0000000",
  "0020-0-3-0",
  "0000000000",
  "-0-0-0-P-0",
  "0000000000",
];
let lx2 = [
  "-----G",
  "12106212123",
  "11212124222",
  "12121212121",
  "21212121112",
  "12121222222",
  "21212131212",
  "00000P00000",
];
let lx3 = [
  "----D",
  "411221212",
  "211212222",
  "212121212",
  "221112111",
  "212122222",
  "0000P0000",
];
let test_lvl = [
  "------------",
  "P00000000000",
  "0123456789X0",
  "000000000000",
  "0123456789X0",
  "0000---00000",
  "0ABCDEFGHIJ0",
  "000000000000",
  "-----0------",
  "------------",
];
let endlvl = [
  "0000000G00000000",
  "0101011110100100",
  "0111010010100100",
  "0010010010100100",
  "0010011110111100",
  "0000000P00000000",
  "0101010111010010",
  "0101010101011010",
  "0101010101011110",
  "0110110111010110",
  "0000000000000000",
];

let lvls = [l1, l2, l3, l4, l5, l6, lr2, l7, lx3, l8, l9, lx, lx2, endlvl];
let ln = 0;

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
  "1": ["A"],
  "2": ["B", "A"],
  "3": ["C", "B", "A"],
  "4": ["D", "C", "B", "A"],
  "5": ["E", "D", "C", "B", "A"],
  "6": ["F", "E", "D", "C", "B", "A"],
  "7": ["G", "F", "E", "D", "C", "B", "A"],
  "8": ["H", "G", "F", "E", "D", "C", "B", "A"],
  "9": ["I", "H", "G", "F", "E", "D", "C", "B", "A"],
  "X": ["J", "I", "H", "G", "F", "E", "D", "C", "B", "A"],
}

let kb = {}
let msg = {}
let game = {}
let logo = new Image();
let logo_src = "data:image/png;base64,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";
let ok_snd = new Audio("data:audio/x-wav;base64,UklGRsYBAABXQVZFZm10IBAAAAABAAEAiBUAAIgVAAABAAgAZGF0YaIBAABvi5V5aICXhGp1kY90bIaWfml7lIlucYySeWqBloNrd5GNc26HlH1qfZSHbnOMkHhsgpSBbHmQi3Nwh5J8bH6ThW91jI53boOTgG16kIlzcoiQe21/koRvd4yMd3CEkX9ufI+Hc3SIj3tvgJCDcHiMindxhJB+b32PhnN1iI16cIGPgnF6jIl2c4WOfnB+joVzd4mLenKCjoFxe4yHdnWFjX1yf42DdHiJinpzgo2AcnyLhnZ2hot8c4CMgnR6iYh5dYOLf3N9ioV3eIaKfHSAi4F1e4iHeXaDin91foqDd3mGiHx2gYqBdnyIhXp4g4l+dn+Jg3h6hYd8d4GJgHd9h4R6eYOHfnd/iIJ4e4WFfHiDgniChXl/hnx8hn96hIJ5gYV6foZ9e4WAeoOCeoCEe36FfnuEgHqCg3uAhHx9hH58g4F7gYN7f4R9fYR/fIKBfIGDfH+Dfn2DgHyCgXyAgn1/g359goB9gYF9gIJ+foJ/foGAfYCBfn+Bfn+Bf36BgH6AgX5/gX9/gX9/gIB/gIB/f4B/f4CAf4CAf4CAf3+A");
let no_snd = new Audio("data:audio/x-wav;base64,UklGRhQBAABXQVZFZm10IBAAAAABAAEAiBUAAIgVAAABAAgAZGF0YfAAAACJiYmJiYmJiYmJgXZ2dnZ2dnZ2dnZ4iYmJiYmJiYmJiYl3dnZ2dnZ2dnZ2dnaHiYmJiYmJiYmJiYl4dnZ2dnZ2dnd3d3d4iIiIiIiIiIiIiIiIg3d3eHh4eHh4eHh4eHh/h4eHh4eHhoaGhoaGhnx5eXl5eXl5eXl5eXl6eoOFhYWFhYWFhYWFhYWFhHp6ent7e3t7e3t7e3t7e3uChISEhISDg4ODg4ODg4ODfnx8fHx8fHx8fH19fX19fX19goKCgoKCgoKCgoKBgYGBgYGAfn5+fn5+fn5+fn5+fn9/f39/f4CAgICAgICAgICAgIA=");

let fl; //floor
let sk; // cpu sockets
let cp; //movable items
let pl; //player
let lvl = {}; // current level state

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
    case 32: case 13: // Space/Enter
      e.preventDefault();
      kb.menu = v;
      break;
    case 78: // N
      e.preventDefault();
      kb.skipNext = v;
      break;
    case 80: // P
      e.preventDefault();
      kb.skipPrev = v;
      break;
  }
}

function page_load() {

  let canvas = document.getElementById("cnv");
  ctx = canvas.getContext("2d");
  document.addEventListener("keydown", key_down, false);
  document.addEventListener("keyup", key_up, false);
  game.in_menu = true;
  game.menu = [{ text: "PLAY", x: 350, y: 400 }];
  let timer = setInterval(process, 1000 / FPS);
  load_level(lvls[ln]);
  logo.src = logo_src;
  music_start();

}

function music_start() {

  var ac = new AudioContext(),
    when = ac.currentTime,
    tempo = 132,
    sq1,
    sq2,
    sq3,
    tk1 = [
      'G4  q',
      'D4  e',
      'D4  e',
      '-   e',
      'F4  q',

      'F4  q',

      'G4  e',
      'E4  q',
      'E4  q',
      '-   q',

      'A4  q',
      '-   qh',

      'G4   e',
      'G4   e',
      '-   e',
      '-   e',
      '-   h',
    ],
    tk2 = [
      'G3  h',

      'C4  e',
      '-   qe',
      '-  h',

      '-   w',

      '-   e',
      'A4  q',
      '-   eh',

      '-   q',
      'D4  q',
    ],
    tk3 = [
      'C3  e',
      'C3  e',
      'E3  e',
      'G3  e',
      '-   h',

      'A2  e',
      'A2  e',
      'C3  e',
      'E3  e',
      '-   h',

      'D3  e',
      'D3  e',
      'F3  e',
      'A3  e',
      '-   h',

      'G2  e',
      'B2  e',
      'G2  s',
      'D3  e',
      '-   s',
      'G2  e',
      'B2  e',
      'G2  s',
      'G3  e',
      '-   s'
    ];

  sq1 = new TinyMusic.Sequence(ac, tempo, tk1);
  sq2 = new TinyMusic.Sequence(ac, tempo, tk2);
  sq3 = new TinyMusic.Sequence(ac, tempo, tk3);

  sq1.staccato = 0.55;
  sq2.staccato = 0.1;
  sq2.smoothing = 0.4;
  sq3.staccato = 0.5;

  sq1.gain.gain.value = 0.025;
  sq2.gain.gain.value = 0.0125;
  sq3.gain.gain.value = 0.025;

  sq1.mid.frequency.value = 800;
  sq1.mid.gain.value = -10;
  sq3.mid.frequency.value = 1200;
  sq3.mid.gain.value = -10;
  sq3.bass.gain.value = -7;
  sq3.bass.frequency.value = 80;
  sq3.mid.gain.value = -16;
  sq3.mid.frequency.value = 500;
  sq3.treble.gain.value = -12;
  sq3.treble.frequency.value = 1400;

  sq1.play(when + (60 / tempo) * 16);
  sq2.play(when + (60 / tempo) * 14);
  sq3.play(when);
}

function process() {
  ctx.fillStyle = "#EEEEEE";
  ctx.fillRect(0, 0, 800, 600);

  if (msg.show) {
    if (kb.menu) {
      msg.show = false;
      kb.menu = false;
      skip_lvl(1)
    }
  } else if (game.in_menu) {
    if (kb.menu) {
      game.in_menu = false;
      kb.menu = false;
    } else if (kb.skipNext) {
      game.in_menu = false;
      kb.skipNext = false;
      skip_lvl(1);
    } else if (kb.skipPrev) {
      game.in_menu = false;
      kb.skipPrev = false;
      skip_lvl(-1);
    }

  } else { // game loop
    if (kb.rst) {
      reload_level();
    } else if (pl.s === 0) { // idle player
      if (kb.u) {
        pl.d = 0; // up
        player_move();
      } else if (kb.d) {
        pl.d = 2; // down
        player_move();
      } else if (kb.l) {
        pl.d = 3; // left
        player_move();
      } else if (kb.r) {
        pl.d = 1; // right
        player_move();
      } else if (kb.menu) {
        game.in_menu = true;
        kb.menu = false;
      } else if (kb.skipNext) {
        kb.skipNext = false;
        skip_lvl(1);
      } else if (kb.skipPrev) {
        kb.skipPrev = false;
        skip_lvl(-1);
      }
    } else if (pl.s === 1) { // walk
      let d = 32 / FPS * 5;
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
      } else { // finish step
        pl.dx = 0;
        pl.dy = 0;
        if (pl.d === 0) pl.y -= 1;
        if (pl.d === 1) pl.x += 1;
        if (pl.d === 2) pl.y += 1;
        if (pl.d === 3) pl.x -= 1;
        let socket_power = 0;
        for (let i = 0; i < pl.o.length - 1; i++) {
          if (pl.d === 0) pl.o[i].y -= 1;
          if (pl.d === 1) pl.o[i].x += 1;
          if (pl.d === 2) pl.o[i].y += 1;
          if (pl.d === 3) pl.o[i].x -= 1;
          pl.o[i].dx = 0;
          pl.o[i].dy = 0;
          let cpu_pwr = get_chip_pwr(pl.o[i]);
          if (cpu_pwr === -1) socket_power = -1;
          else if (cpu_pwr === 1 && socket_power !== -1) socket_power = 1;
        }
        if (pl.o.length > 0) { // pushed at least 1 object
          let item = pl.o[pl.o.length - 1]
          let nx = item.x;
          let ny = item.y;
          if (pl.d === 0) ny -= 1;
          if (pl.d === 1) nx += 1;
          if (pl.d === 2) ny += 1;
          if (pl.d === 3) nx -= 1;
          let fl_item = get_item(nx, ny)
          if (fl_item !== null && cpu_merge[fl_item.t]) { // merge
            ok_snd.play();
            item.t = cpu_merge[fl_item.t];
            fl_item.x = -1;
          }
          item.x = nx;
          item.y = ny;
          item.dx = 0;
          item.dy = 0;
          let cpu_pwr = get_chip_pwr(item);
          if (cpu_pwr === -1) socket_power = -1;
          else if (cpu_pwr === 1 && socket_power !== -1) socket_power = 1;
          if (socket_power === -1) no_snd.play();
          if (socket_power === 1) ok_snd.play();
          if (check_win_level()) msg.show = true;
        }
        pl.s = 0;
      }
    } else if (pl.s === 2) {
      let d = 32 / FPS * 3;
      pl.t -= d;
      if (pl.t <= 0) {
        pl.dx = 0;
        pl.dy = 0;
        pl.s = 0; // idle
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
    draw_chip(cp[i].x * 32 * s + cp[i].dx * s, cp[i].y * 32 * s + cp[i].dy * s, s, cp[i].t, get_chip_pwr_color(cp[i]));
  }
  if (pl.s === 1) {
    if(pl.o.length > 0) draw_player_push(pl.x * 32 * s + pl.dx * s, pl.y * 32 * s + pl.dy * s, s, pl.d, pl.t);
    else draw_player_walk(pl.x * 32 * s + pl.dx * s, pl.y * 32 * s + pl.dy * s, s, pl.d, pl.t);
  } else draw_player_idle(pl.x * 32 * s + pl.dx * s, pl.y * 32 * s + pl.dy * s, s, pl.d);
  if (msg.show) {
    ctx.fillStyle = "#EEEEEE";
    ctx.strokeStyle = "#111111";
    draw_box(100, 200, 600, 200);

    ctx.fillStyle = "#222222";
    ctx.font = "italic bold 50px Arial Black";
    ctx.fillText("You won!", 250, 300, 300);
    
    ctx.fillStyle = "#222222";
    ctx.font = "italic bold 20px Arial Black";
    ctx.fillText("Move count: " + String(lvl.mc), 300, 375, 300);

  } else if (game.in_menu) {
    ctx.fillStyle = "#EEEEEE";
    ctx.strokeStyle = "#111111";
    draw_box(200, 50, 400, 450);

    ctx.fillStyle = "#222222";
    ctx.font = "italic bold 20px Arial Black";
    ctx.fillText("Level: " + String(ln + 1), 350, 325, 300);

    ctx.drawImage(logo, 300, 75);

    for (let i = 0; i < game.menu.length; i++) {
      ctx.fillStyle = "#EEEEEE";
      ctx.strokeStyle = "#111111";
      draw_box(game.menu[i].x, game.menu[i].y, BTNW, BTNH)
      ctx.fillStyle = "#222222";
      ctx.font = "bold 30px Verdana";
      ctx.fillText(game.menu[i].text, game.menu[i].x, game.menu[i].y + BTNH / 2, BTNW);
    }
  }
}

function reload_level() {
  load_level(lvl.l)
}

function load_level(l) {
  lvl.x = 0;
  lvl.y = 0;
  lvl.l = l;
  lvl.mc = 0; // move count
  fl = {};
  sk = [];
  cp = [];
  pl = {};
  for (let i = 0; i < l.length; i++) {
    for (let j = 0; j < l[i].length; j++) {
      if (["0", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].includes(l[i][j])) {
        add_floor(j + 1, i + 1, l[i][j]);
        if (l[i][j] != "0") sk.push({ x: j + 1, y: i + 1, t: l[i][j] })
      } else if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "X"].includes(l[i][j])) {
        add_floor(j + 1, i + 1, "0");
        cp.push({ x: j + 1, y: i + 1, dx: 0, dy: 0, t: l[i][j] })
      } else if (l[i][j] === "K") {
        add_floor(j + 1, i + 1, "B");
        sk.push({ x: j + 1, y: i + 1, t: "B" })
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

function skip_lvl(d) {
  ln += d;
  if (ln >= lvls.length) ln = 0;
  else if (ln < 0) ln = 0;
  load_level(lvls[ln]);
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

function player_move() {
  lvl.mc += 1;
  if (can_walk()) {
    pl.s = 1; // walk
    pl.t = 32;
    pl.o = get_obj_pushed();
  } else {
    no_snd.play();
    pl.s = 2; // blocked
    pl.t = 16;
  }
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

function check_win_level() {
  for (let i = 0; i < sk.length; i++) {
    let cpu = get_item(sk[i].x, sk[i].y);
    if (!cpu || get_socket_pwr(sk[i].t, cpu) !== 1) return false;
  }
  return true;
}

function get_chip_pwr(cpu) {
  let f = get_floor(cpu.x, cpu.y);
  return get_socket_pwr(f, cpu);
}

function get_socket_pwr(f, cpu) {
  let on = 1;
  let unp = -1; // underpowered socket
  let off = 0;
  if (f === "0" || cpu.dx != 0 || cpu.dy != 0) return off;
  else if (cpu.dx === 0 && cpu.dy === 0) {
    if (cpu_nrg[cpu.t]) {
      if (cpu_nrg[cpu.t].includes(f)) return on;
      else return unp;
    }
  }
  return 0;

}

////////// Graphics //////////

function get_chip_pwr_color(cpu) {
  let nrg = get_chip_pwr(cpu);
  switch (nrg) {
    case -1: return "#FF0000";
    case 0: return "#2222CC";
    case 1: return "#FFFF88";
  }
}

function draw_box(x, y, w, h) {
  bp();
  ctx.moveTo(x, y);
  lt(x + w, y);
  lt(x + w, y + h);
  lt(x, y + h);
  lt(x, y);
  ctx.fill();
  ctx.stroke();
}
function draw_v(x, y, w, s) {
  bp();
  ctx.moveTo(x, y);
  lt(x + w, y + 16 * s);
  lt(x + w + 2 * s, y + 16 * s);
  lt(x + 2 * w + 2 * s, y);
  lt(x + 2 * w, y);
  lt(x + w + s, y + 14 * s);
  lt(x + 2 * s, y);
  ctx.fill();
}

function draw_floor(x, y, s) {
  ctx.fillStyle = "#FFFFFF"
  ctx.strokeStyle = "#111111"
  fill_tile(x, y, s)
}
function draw_wall(x, y, s) {
  ctx.fillStyle = "#FFFFFF"
  ctx.strokeStyle = "#111111"
  fill_tile(x, y, s)
  for (let i = 1; i <= 3; i++) {
    bp();
    ctx.moveTo(x, y + 8 * i * s);
    lt(x + 32 * s, y + 8 * i * s);
    ctx.stroke();
  }
  for (let i = 0; i < 2; i++) {
    bp();
    ctx.moveTo(x + 11 * s, y + 16 * s * i);
    lt(x + 11 * s, y + 8 * s + 16 * s * i);
    ctx.stroke();
    bp();
    ctx.moveTo(x + 22 * s, y + 8 * s + 16 * s * i);
    lt(x + 22 * s, y + 16 * s + 16 * s * i);
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
      draw_v(x + 13 * s, y + 8 * s, 4 * s, s);
      break;
    case "5":
      draw_v(x + 9 * s, y + 8 * s, 6 * s, s);
      break;
    case "6":
      ctx.fillRect(x + 21 * s, y + 8 * s, 2 * s, 16 * s);
      draw_v(x + 9 * s, y + 8 * s, 4 * s, s);
      break;
    case "7":
      draw_v(x + 9 * s, y + 8 * s, 4 * s, s);
      ctx.fillRect(x + 18 * s, y + 8 * s, 2 * s, 16 * s);
      ctx.fillRect(x + 22 * s, y + 8 * s, 2 * s, 16 * s);
      break;
    case "8":
      draw_v(x + 7 * s, y + 8 * s, 3 * s, s);
      ctx.fillRect(x + 16 * s, y + 8 * s, 2 * s, 16 * s);
      ctx.fillRect(x + 19 * s, y + 8 * s, 2 * s, 16 * s);
      ctx.fillRect(x + 22 * s, y + 8 * s, 2 * s, 16 * s);
      break;
    case "9":
      ctx.fillRect(x + 9 * s, y + 8 * s, 2 * s, 16 * s);
      bp();
      ctx.moveTo(x + 13 * s, y + 8 * s);
      lt(x + 21 * s, y + 24 * s);
      lt(x + 23 * s, y + 24 * s);
      lt(x + 15 * s, y + 8 * s);
      ctx.fill();
      bp();
      ctx.moveTo(x + 13 * s, y + 24 * s);
      lt(x + 21 * s, y + 8 * s);
      lt(x + 23 * s, y + 8 * s);
      lt(x + 15 * s, y + 24 * s);
      ctx.fill();
      break;
    case "X":
      bp();
      ctx.moveTo(x + 9 * s, y + 8 * s);
      lt(x + 19 * s, y + 24 * s);
      lt(x + 23 * s, y + 24 * s);
      lt(x + 13 * s, y + 8 * s);
      ctx.fill();
      bp();
      ctx.moveTo(x + 9 * s, y + 24 * s);
      lt(x + 19 * s, y + 8 * s);
      lt(x + 23 * s, y + 8 * s);
      lt(x + 13 * s, y + 24 * s);
      ctx.fill();
      break;

  }
}

function draw_socket(x, y, s, t) {
  ctx.fillStyle = "#444444"
  ctx.strokeStyle = "#111111"
  bp();
  fill_tile(x, y, s)
  ctx.fillStyle = "#FFFFFF"
  draw_chip_shape(x, y, s)

  ctx.fillStyle = "#AAAAAA";
  if (["A", "C", "E", "G", "I"].includes(t)) draw_dot(x + 16 * s, y + 16 * s, s);
  if (["B", "C", "D", "E", "F", "G", "H", "I"].includes(t)) draw_dot(x + 10 * s, y + 10 * s, s);
  if (["B", "C", "D", "E", "F", "G", "H", "I"].includes(t)) draw_dot(x + 22 * s, y + 22 * s, s);
  if (["D", "E", "F", "G", "H", "I"].includes(t)) draw_dot(x + 10 * s, y + 22 * s, s);
  if (["D", "E", "F", "G", "H", "I"].includes(t)) draw_dot(x + 22 * s, y + 10 * s, s);
  if (["F", "G", "H", "I"].includes(t)) draw_dot(x + 10 * s, y + 16 * s, s);
  if (["F", "G", "H", "I"].includes(t)) draw_dot(x + 22 * s, y + 16 * s, s);
  if (["H", "I"].includes(t)) draw_dot(x + 16 * s, y + 10 * s, s);
  if (["H", "I"].includes(t)) draw_dot(x + 16 * s, y + 22 * s, s);
  if (t === "J") {
    bp();
    ctx.moveTo(x + 9 * s, y + 8 * s);
    lt(x + 19 * s, y + 24 * s);
    lt(x + 23 * s, y + 24 * s);
    lt(x + 13 * s, y + 8 * s);
    ctx.fill();
    bp();
    ctx.moveTo(x + 9 * s, y + 24 * s);
    lt(x + 19 * s, y + 8 * s);
    lt(x + 23 * s, y + 8 * s);
    lt(x + 13 * s, y + 24 * s);
    ctx.fill();
  }
}

function draw_dot(x, y, s) {
  bp();
  ctx.arc(x, y, 2.5 * s, 0, 2 * Math.PI);
  ctx.fill();
}

function fill_tile(x, y, s) {
  if (!s) s = 1;
  draw_box(x, y, 32 * s, 32 * s);
}

function draw_chip_shape(x, y, s) {
  if (!s) s = 1;
  bp();
  ctx.moveTo(x + 5 * s, y + 5 * s);
  lt(x + 27 * s, y + 5 * s);
  lt(x + 27 * s, y + 27 * s);
  lt(x + 5 * s, y + 27 * s);
  ctx.fill();

  for (let i = 0; i < 7; i++) {
    bp();
    ctx.moveTo(x + 6 * s + i * 3 * s, y + 30 * s);
    lt(x + 6 * s + i * 3 * s, y + 2 * s);
    lt(x + 7 * s + i * 3 * s, y + 2 * s);
    lt(x + 7 * s + i * 3 * s, y + 30 * s);
    ctx.fill();
    bp();
    ctx.moveTo(x + 30 * s, y + 6 * s + i * 3 * s);
    lt(x + 2 * s, y + 6 * s + i * 3 * s);
    lt(x + 2 * s, y + 7 * s + i * 3 * s);
    lt(x + 30 * s, y + 7 * s + i * 3 * s);
    ctx.fill();
  }
}

function draw_player_idle(x, y, s, d) {
  if (!s) s = 1;
  let cx = x + 16 * s;
  let cy = y + 16 * s;
  if (d == 0 || d == 2) { // facing up or down
    ctx.fillStyle = "#FFFFFF";
    bp(); // torso
    ctx.moveTo(cx - 9 * s, cy - 2 * s);
    qc(cx - 14 * s, cy, cx - 14 * s, cy + 8 * s);
    qc(cx - 12 * s, cy + 10 * s, cx - 10 * s, cy + 8 * s);
    lt(cx - 10 * s, cy + 4 * s);
    lt(cx - 9 * s, cy + 7 * s);
    lt(cx + 9 * s, cy + 7 * s);
    lt(cx + 10 * s, cy + 4 * s);
    lt(cx + 10 * s, cy + 8 * s);
    qc(cx + 12 * s, cy + 10 * s, cx + 14 * s, cy + 8 * s);
    qc(cx + 14 * s, cy, cx + 9 * s, cy - 2 * s);
    ctx.stroke();
    ctx.fill();

    bp(); // head
    ctx.moveTo(cx - 9 * s, cy - 2 * s);
    qc(cx - 14 * s, cy - 8 * s, cx - 7 * s, cy - 14 * s);
    qc(cx, cy - 16 * s, cx + 7 * s, cy - 14 * s);
    qc(cx + 14 * s, cy - 8 * s, cx + 9 * s, cy - 2 * s);
    qc(cx, cy, cx - 9 * s, cy - 2 * s);
    ctx.stroke();
    if (d == 2) { // facing down
      ctx.fill();
      ctx.fillStyle = "#000000";
    } else { // facing up
      ctx.fillStyle = "#000000";
      ctx.fill();
    }
    bp(); // legs
    ctx.moveTo(cx - 9 * s, cy + 7 * s);
    lt(cx - 7 * s, cy + 14 * s);
    qc(cx - 5 * s, cy + 16 * s, cx - 3 * s, cy + 14 * s);
    lt(cx, cy + 10 * s);
    lt(cx + 3 * s, cy + 14 * s);
    qc(cx + 5 * s, cy + 16 * s, cx + 7 * s, cy + 14 * s);
    lt(cx + 9 * s, cy + 7 * s);
    lt(cx - 9 * s, cy + 7 * s);
    ctx.stroke();
    ctx.fill();

    if (d == 2) { // facing down
      bp(); // hair
      ctx.moveTo(cx - 7 * s, cy - 14 * s);
      qc(cx, cy - 16 * s, cx + 7 * s, cy - 14 * s);
      qc(cx, cy - 11 * s, cx - 7 * s, cy - 14 * s);
      ctx.fill();
      bp(); // eyes
      ctx.arc(cx - 6 * s, cy - 8 * s, 2 * s, 0, 2 * Math.PI);
      ctx.fill();
      bp();
      ctx.arc(cx + 6 * s, cy - 8 * s, 2 * s, 0, 2 * Math.PI);
      ctx.fill();
    }
  } else {
    let fd = d == 1 ? 1 : -1;

    ctx.fillStyle = "#FFFFFF";
    bp(); // torso
    ctx.moveTo(cx - 7 * s, cy - 2 * s);
    lt(cx - 5 * s, cy + 7 * s);
    lt(cx + 5 * s, cy + 7 * s);
    lt(cx + 7 * s, cy - 2 * s);
    ctx.stroke();
    ctx.fill();

    bp(); // head
    ctx.moveTo(cx - 7 * s, cy - 2 * s);
    qc(cx - 10 * s, cy - 8 * s, cx - 7 * s, cy - 14 * s);
    qc(cx, cy - 16 * s, cx + 7 * s, cy - 14 * s);
    qc(cx + 10 * s, cy - 8 * s, cx + 7 * s, cy - 2 * s);
    qc(cx, cy, cx - 7 * s, cy - 2 * s);
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "#000000";
    bp(); // hair
    ctx.moveTo(cx - 7 * s * fd, cy - 2 * s);
    qc(cx - 10 * s * fd, cy - 8 * s, cx - 7 * s * fd, cy - 14 * s);
    qc(cx, cy - 16 * s, cx + 7 * s * fd, cy - 14 * s);
    qc(cx + 1 * s * fd, cy - 10 * s, cx - 5 * s * fd, cy - 12 * s);
    qc(cx - 5 * s * fd, cy - 5 * s, cx - 7 * s * fd, cy - 2 * s);
    ctx.stroke();
    ctx.fill();

    bp(); // eye
    ctx.arc(cx + 4 * s * fd, cy - 8 * s, 2 * s, 0, 2 * Math.PI);
    ctx.fill();

    bp(); // leg
    ctx.moveTo(cx - 5 * s, cy + 7 * s);
    lt(cx - 2 * s, cy + 14 * s);
    qc(cx, cy + 16 * s, cx + 2 * s, cy + 14 * s);
    lt(cx + 5 * s, cy + 7 * s);
    ctx.stroke();
    ctx.fill();


    ctx.fillStyle = "#FFFFFF";
    bp(); // arm
    ctx.moveTo(cx - 2 * s, cy + 4 * s);
    lt(cx - 2 * s, cy + 8 * s);
    qc(cx, cy + 10 * s, cx + 2 * s, cy + 8 * s);
    lt(cx + 2 * s, cy + 4 * s);
    ctx.stroke();
    ctx.fill();
  }
}

function draw_player_push(x, y, s, d, t) {
  if (!s) s = 1;
  let cx = x + 16 * s;
  let cy = y + 16 * s;
  if (d == 0 || d == 2) { // facing up or down
    draw_player_idle(x,y,s,d);
  } else {
    let fd = d == 1 ? 1 : -1;

    ctx.fillStyle = "#FFFFFF";
    bp(); // torso
    ctx.moveTo(cx - 7 * s, cy - 2 * s);
    lt(cx - 5 * s, cy + 7 * s);
    lt(cx + 5 * s, cy + 7 * s);
    lt(cx + 7 * s, cy - 2 * s);
    ctx.stroke();
    ctx.fill();

    bp(); // head
    ctx.moveTo(cx - 7 * s, cy - 2 * s);
    qc(cx - 10 * s, cy - 8 * s, cx - 7 * s, cy - 14 * s);
    qc(cx, cy - 16 * s, cx + 7 * s, cy - 14 * s);
    qc(cx + 10 * s, cy - 8 * s, cx + 7 * s, cy - 2 * s);
    qc(cx, cy, cx - 7 * s, cy - 2 * s);
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "#000000";
    bp(); // hair
    ctx.moveTo(cx - 7 * s * fd, cy - 2 * s);
    qc(cx - 10 * s * fd, cy - 8 * s, cx - 7 * s * fd, cy - 14 * s);
    qc(cx, cy - 16 * s, cx + 7 * s * fd, cy - 14 * s);
    qc(cx + 1 * s * fd, cy - 10 * s, cx - 5 * s * fd, cy - 12 * s);
    qc(cx - 5 * s * fd, cy - 5 * s, cx - 7 * s * fd, cy - 2 * s);
    ctx.stroke();
    ctx.fill();

    bp(); // eye
    ctx.arc(cx + 4 * s * fd, cy - 8 * s, 2 * s, 0, 2 * Math.PI);
    ctx.fill();

    bp(); // legs
    ctx.moveTo(cx - 5 * s*fd, cy + 7 * s);
    lt(cx - 7 * s*fd, cy + 13 * s);
    qc(cx - 5 * s*fd, cy + 15 * s, cx - 3 * s*fd, cy + 13 * s);
    lt(cx, cy + 10 * s);
    lt(cx + 3 * s*fd, cy + 13 * s);
    qc(cx + 5 * s*fd, cy + 15 * s, cx + 7 * s*fd, cy + 13 * s);
    lt(cx + 5 * s*fd, cy + 7 * s);
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    bp(); // arm
    ctx.moveTo(cx, cy);
    lt(cx + 14*s*fd, cy);
    qc(cx + 16*s*fd, cy + 2*s, cx+ 14*s*fd, cy + 4 * s);
    lt(cx, cy + 4 * s);

    ctx.stroke();
    ctx.fill();
  }
}

function draw_player_walk(x, y, s, d, t) {
  if (!s) s = 1;
  let f = (Math.floor(t)/3) % 4;
  if (f === 1 || f === 3) {
    draw_player_idle(x,y,s,d);
    return;
  }
  let cx = x + 16 * s;
  let cy = y + 17 * s;
  if (d == 0 || d == 2) { // facing up or down
    let fd = f === 0 ? 1 : -1;
    ctx.fillStyle = "#FFFFFF";
    bp(); // torso
    ctx.moveTo(cx - 9*s*fd, cy - 2 * s);
    qc(cx - 14 * s*fd, cy, cx - 14 * s*fd, cy + 6 * s);
    qc(cx - 12 * s*fd, cy + 8 * s, cx - 10 * s*fd, cy + 6 * s);
    lt(cx - 10 * s*fd, cy + 4 * s);
    lt(cx - 9 * s*fd, cy + 7 * s);
    lt(cx + 9 * s*fd, cy + 7 * s);
    lt(cx + 10 * s*fd, cy + 4 * s);
    lt(cx + 10 * s*fd, cy + 10 * s);
    qc(cx + 12 * s*fd, cy + 12 * s, cx + 14 * s*fd, cy + 10 * s);
    qc(cx + 14 * s*fd, cy, cx + 9*s*fd, cy - 2 * s);
    ctx.stroke();
    ctx.fill();

    bp(); // head
    ctx.moveTo(cx - 9 * s, cy - 2 * s);
    qc(cx - 14 * s, cy - 8 * s, cx - 7 * s, cy - 14 * s);
    qc(cx, cy - 16 * s, cx + 7 * s, cy - 14 * s);
    qc(cx + 14 * s, cy - 8 * s, cx + 9 * s, cy - 2 * s);
    qc(cx, cy, cx - 9 * s, cy - 2 * s);
    ctx.stroke();
    if (d == 2) { // facing down
      ctx.fill();
      ctx.fillStyle = "#000000";
    } else { // facing up
      ctx.fillStyle = "#000000";
      ctx.fill();
    }
    bp(); // legs
    ctx.moveTo(cx - 9 * s*fd, cy + 7 * s);
    lt(cx - 7 * s*fd, cy + 14 * s);
    qc(cx - 5 * s*fd, cy + 16 * s, cx - 3 * s*fd, cy + 14 * s);
    lt(cx, cy + 10 * s);
    lt(cx + 3 * s*fd, cy + 12 * s);
    qc(cx + 5 * s*fd, cy + 14 * s, cx + 7 * s*fd, cy + 12 * s);
    lt(cx + 9 * s*fd, cy + 7 * s);
    lt(cx - 9 * s*fd, cy + 7 * s);
    ctx.stroke();
    ctx.fill();

    if (d == 2) { // facing down
      bp(); // hair
      ctx.moveTo(cx - 7 * s, cy - 14 * s);
      qc(cx, cy - 16 * s, cx + 7 * s, cy - 14 * s);
      qc(cx, cy - 11 * s, cx - 7 * s, cy - 14 * s);
      ctx.fill();
      bp(); // eyes
      ctx.arc(cx - 6 * s, cy - 8 * s, 2 * s, 0, 2 * Math.PI);
      ctx.fill();
      bp();
      ctx.arc(cx + 6 * s, cy - 8 * s, 2 * s, 0, 2 * Math.PI);
      ctx.fill();
    }
  } else {
    let fd = d == 1 ? 1 : -1;
    let hfd = f == 0 ? 1 : -1;

    ctx.fillStyle = "#FFFFFF";
    bp(); // torso
    ctx.moveTo(cx - 7 * s, cy - 2 * s);
    lt(cx - 5 * s, cy + 7 * s);
    lt(cx + 5 * s, cy + 7 * s);
    lt(cx + 7 * s, cy - 2 * s);
    ctx.stroke();
    ctx.fill();

    bp(); // head
    ctx.moveTo(cx - 7 * s, cy - 2 * s);
    qc(cx - 10 * s, cy - 8 * s, cx - 7 * s, cy - 14 * s);
    qc(cx, cy - 16 * s, cx + 7 * s, cy - 14 * s);
    qc(cx + 10 * s, cy - 8 * s, cx + 7 * s, cy - 2 * s);
    qc(cx, cy, cx - 7 * s, cy - 2 * s);
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "#000000";
    bp(); // hair
    ctx.moveTo(cx - 7 * s * fd, cy - 2 * s);
    qc(cx - 10 * s * fd, cy - 8 * s, cx - 7 * s * fd, cy - 14 * s);
    qc(cx, cy - 16 * s, cx + 7 * s * fd, cy - 14 * s);
    qc(cx + 1 * s * fd, cy - 10 * s, cx - 5 * s * fd, cy - 12 * s);
    qc(cx - 5 * s * fd, cy - 5 * s, cx - 7 * s * fd, cy - 2 * s);
    ctx.stroke();
    ctx.fill();

    bp(); // eye
    ctx.arc(cx + 4 * s * fd, cy - 8 * s, 2 * s, 0, 2 * Math.PI);
    ctx.fill();

    bp(); // legs
    ctx.moveTo(cx - 5 * s*fd, cy + 7 * s);
    lt(cx - 7 * s*fd, cy + 13 * s);
    qc(cx - 5 * s*fd, cy + 15 * s, cx - 3 * s*fd, cy + 13 * s);
    lt(cx, cy + 10 * s);
    lt(cx + 3 * s*fd, cy + 13 * s);
    qc(cx + 5 * s*fd, cy + 15 * s, cx + 7 * s*fd, cy + 13 * s);
    lt(cx + 5 * s*fd, cy + 7 * s);
    ctx.stroke();
    ctx.fill();


    ctx.fillStyle = "#FFFFFF";
    bp(); // arm
    ctx.moveTo(cx - 2 * s, cy + 4 * s);
    lt(cx - 2 * s, cy + 8 * s);
    qc(cx, cy + 10 * s, cx + 2 * s, cy + 8 * s);
    lt(cx + 2 * s, cy + 4 * s);
    ctx.stroke();
    ctx.fill();
  }
}

////////// wrappers //////////
function bp() {
  ctx.beginPath();
}
function lt(x, y) {
  ctx.lineTo(x, y);
}
function qc(cpx, cpy, x, y) {
  ctx.quadraticCurveTo(cpx, cpy, x, y);
}

window.addEventListener("load", page_load, false);
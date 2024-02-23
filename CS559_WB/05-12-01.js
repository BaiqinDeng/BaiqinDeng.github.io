// Attribution: Yeefong Wu

let canvas = document.getElementById("canvas1");
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");

let context = canvas.getContext("2d");


function calculateHermitePoint(t, p0, p1, p2, p3) {
  // Convert Bezier control points to Hermite endpoints and tangents
  const h0 = p0; // Start point
  const h1 = p3; // End point
  const m0 = { x: 3 * (p1.x - p0.x), y: 3 * (p1.y - p0.y) }; // Tangent at start
  const m1 = { x: 3 * (p3.x - p2.x), y: 3 * (p3.y - p2.y) }; // Tangent at end

  // Calculate Hermite point
  const h = (2 * Math.pow(t, 3) - 3 * Math.pow(t, 2) + 1);
  const t0 = (Math.pow(t, 3) - 2 * Math.pow(t, 2) + t);
  const t1 = (-2 * Math.pow(t, 3) + 3 * Math.pow(t, 2));
  const t2 = (Math.pow(t, 3) - Math.pow(t, 2));

  const x = h * h0.x + t0 * m0.x + t1 * h1.x + t2 * m1.x;
  const y = h * h0.y + t0 * m0.y + t1 * h1.y + t2 * m1.y;

  return { x, y };
}


function calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}


context.bezierCurveTo(50 + (350 - 50) / 6, 150 + (150 - 50) / 6, 350 + (50 - 350) / 6, 150 + (150 - 50) / 6, 350, 150);
context.bezierCurveTo(350 + (350 - 50) / 6, 150 + (50 - 150) / 6, 350 + (350 - 200) / 6, 50 + (150 - 100) / 6, 350, 50);
context.bezierCurveTo(350 + (200 - 350) / 6, 50 + (100 - 150) / 6, 200 + (350 - 50) / 6, 100 + (50 - 50) / 6, 200, 100);
context.bezierCurveTo(200 + (50 - 350) / 6, 100 + (50 - 50) / 6, 50 + (200 - 50) / 6, 50 + (100 - 150) / 6, 50, 50);
context.bezierCurveTo(50 + (50 - 200) / 6, 50 + (150 - 100) / 6, 50 + (50 - 350) / 6, 150 + (50 - 150) / 6, 50, 150);

let ab0 = {x: 50, y: 150};
let ab1 = {x: 50 + (350 - 50) / 6, y: 150 + (150 - 50) / 6};
let ab2 = {x: 350 + (50 - 350) / 6, y: 150 + (150 - 50) / 6};
let ab3 = {x: 350, y: 150};

let bc0 = {x: 350, y: 150}; // This is the same as ab3
let bc1 = {x: 350 + (350 - 50) / 6, y: 150 + (50 - 150) / 6};
let bc2 = {x: 350 + (350 - 200) / 6, y: 50 + (150 - 100) / 6};
let bc3 = {x: 350, y: 50};

let cd0 = {x: 350, y: 50}; // This is the same as bc3
let cd1 = {x: 350 + (200 - 350) / 6, y: 50 + (100 - 150) / 6};
let cd2 = {x: 200 + (350 - 50) / 6, y: 100 + (50 - 50) / 6};
let cd3 = {x: 200, y: 100};

let de0 = {x: 200, y: 100}; // This is the same as cd3
let de1 = {x: 200 + (50 - 350) / 6, y: 100 + (50 - 50) / 6};
let de2 = {x: 50 + (200 - 50) / 6, y: 50 + (100 - 150) / 6};
let de3 = {x: 50, y: 50};

let ea0 = {x: 50, y: 50}; // This is the same as de3
let ea1 = {x: 50 + (50 - 200) / 6, y: 50 + (150 - 100) / 6};
let ea2 = {x: 50 + (50 - 350) / 6, y: 150 + (50 - 150) / 6};
let ea3 = {x: 50, y: 150};


context.beginPath();

context.moveTo(50,150);     // you don't need to change this line

context.bezierCurveTo(ab1.x, ab1.y, ab2.x, ab2.y, ab3.x, ab3.y);
context.bezierCurveTo(bc1.x, bc1.y, bc2.x, bc2.y, bc3.x, bc3.y);
context.bezierCurveTo(cd1.x, cd1.y, cd2.x, cd2.y, cd3.x, cd3.y);
context.bezierCurveTo(de1.x, de1.y, de2.x, de2.y, de3.x, de3.y);
context.bezierCurveTo(ea1.x, ea1.y, ea2.x, ea2.y, ea3.x, ea3.y);
context.closePath();
context.lineWidth = 3;
context.stroke();


let seg1 = calculateDistance(ab0.x, ab0.y, ab1.x, ab1.y) 
+ calculateDistance(ab1.x, ab1.y, ab2.x, ab2.y)
+ calculateDistance(ab2.x, ab2.y, ab3.x, ab3.y);

let seg2 = calculateDistance(bc0.x, bc0.y, bc1.x, bc1.y)
+ calculateDistance(bc1.x, bc1.y, bc2.x, bc2.y)
+ calculateDistance(bc2.x, bc2.y, bc3.x, bc3.y);

let seg3 = calculateDistance(cd0.x, cd0.y, cd1.x, cd1.y)
+ calculateDistance(cd1.x, cd1.y, cd2.x, cd2.y)
+ calculateDistance(cd2.x, cd2.y, cd3.x, cd3.y);

let seg4 = calculateDistance(de0.x, de0.y, de1.x, de1.y)
+ calculateDistance(de1.x, de1.y, de2.x, de2.y)
+ calculateDistance(de2.x, de2.y, de3.x, de3.y);

let seg5 = calculateDistance(ea0.x, ea0.y, ea1.x, ea1.y)
+ calculateDistance(ea1.x, ea1.y, ea2.x, ea2.y)
+ calculateDistance(ea2.x, ea2.y, ea3.x, ea3.y);


let total = seg1+seg2+seg3+seg4+seg5;
let gap = total/20;
let count = 0;

for(let i = 0; i < total; i += gap){
    context.fillStyle = "blue";
    let x, y;
    let point; 

    if (i < seg1) {
        point = calculateHermitePoint(i / seg1, ab0, ab1, ab2, ab3);
    } else if (i < seg2+seg1) {
        point = calculateHermitePoint((i - seg1) / seg2, bc0, bc1, bc2, bc3);
    } else if (i < seg3+seg1+seg2) {
        point = calculateHermitePoint((i - seg1 - seg2) / seg3, cd0, cd1, cd2, cd3);
    } else if (i < seg4+seg1+seg2+seg3) {
        point = calculateHermitePoint((i - seg1 - seg2 - seg3) / seg4, de0, de1, de2, de3);
    } else {
        point = calculateHermitePoint((i - seg1 - seg2 - seg3 - seg4) / seg5, ea0, ea1, ea2, ea3);
    }

    x = point.x;
    y = point.y;
    context.fillRect(x, y, 5, 5); 
}


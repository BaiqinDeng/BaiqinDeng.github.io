// Attribution: Yeefong Wu

let canvas = document.getElementById("canvas1");
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");

let context = canvas.getContext("2d");
let table = [];
let points = [];

function findClosestIndex(table, targetDistance) {
    let left = 0;
    let right = table.length - 1;
  
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (table[mid] === targetDistance) {
        return mid;
      } else if (table[mid] < targetDistance) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  
    let leftDiff = targetDistance - table[right];
    let rightDiff = table[left] - targetDistance;
  
    return (leftDiff < rightDiff) ? right : left;
  }

function calculateHermitePoint(u, H0, T0, T1, H1) {
    const h00 = 2 * u * u * u - 3 * u * u + 1;
    const h10 = u * u * u - 2 * u * u + u;
    const h01 = -2 * u * u * u + 3 * u * u;
    const h11 = u * u * u - u * u;

    const x = h00 * H0.x + h10 * T0.x + h01 * H1.x + h11 * T1.x;
    const y = h00 * H0.y + h10 * T0.y + h01 * H1.y + h11 * T1.y;

    return { x, y };
}

function calculateBezierPoint(t, H0, T0, T1, H1) {
    // Convert Hermite parameters to Bezier control points
    const P0 = H0;
    const P1 = { x: H0.x + (1/3) * T0.x, y: H0.y + (1/3) * T0.y };
    const P2 = { x: H1.x - (1/3) * T1.x, y: H1.y - (1/3) * T1.y };
    const P3 = H1;

    // Apply De Casteljau's algorithm to calculate the Bezier curve point
    const p01 = interpolate(P0, P1, t);
    const p12 = interpolate(P1, P2, t);
    const p23 = interpolate(P2, P3, t);

    const p012 = interpolate(p01, p12, t);
    const p123 = interpolate(p12, p23, t);

    const p0123 = interpolate(p012, p123, t);

    return p0123;
}

function interpolate(pA, pB, t) {
    return {
        x: (1 - t) * pA.x + t * pB.x,
        y: (1 - t) * pA.y + t * pB.y
    };
}



function calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}


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

//hermite
let ab1_modified = {x: 150.0, y: 50.0};
let bc1_modified = {x: 150.0, y: -50.0};
let cd1_modified = {x: -75.0, y: -25.0};
let de1_modified = {x: -150.0, y: 0.0};
let ea1_modified = {x: -75.0, y: 25.0};

let ab2_modified = {x: 150.0, y: -50.0};
let bc2_modified = {x: -75.0, y: -25.0};
let cd2_modified = {x: -150.0, y: 0.0};
let de2_modified = {x: -75.0, y: 25.0};
let ea2_modified = {x: 150.0, y: 50.0};


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



let increment = 0.0001;
table.push(0);
points.push(calculateBezierPoint(0.001,ab0,ab1_modified,ab2_modified,ab3));
for(let u=increment;u<5;u+=increment){
    let point;
    let lastPointIndex = Math.floor(u/increment-1);
    if(u<1){
        point = calculateBezierPoint(u,ab0,ab1_modified,ab2_modified,ab3);
    }else if(u<2){
        point = calculateBezierPoint(u-1,bc0,bc1_modified,bc2_modified,bc3);
    }else if(u<3){
        point = calculateBezierPoint(u-2,cd0,cd1_modified,cd2_modified,cd3);
    }else if(u<4){
        point = calculateBezierPoint(u-3,de0,de1_modified,de2_modified,de3);
    }else{
        point = calculateBezierPoint(u-4,ea0,ea1_modified,ea2_modified,ea3);
    }
    points.push(point);
    let distance = calculateDistance(point.x,point.y,points[lastPointIndex].x,points[lastPointIndex].y);
    table.push(table[lastPointIndex] + distance);
}

let arcLength = table[table.length-1];

for(let i = 0;i<arcLength;i+=arcLength/20){
    context.fillStyle = "blue";
    let u = findClosestIndex(table,i)*increment;
    let point;
    if(u<1){
        point = calculateBezierPoint(u,ab0,ab1_modified,ab2_modified,ab3);
    }else if(u<2){
        point = calculateBezierPoint(u-1,bc0,bc1_modified,bc2_modified,bc3);
    }else if(u<3){
        point = calculateBezierPoint(u-2,cd0,cd1_modified,cd2_modified,cd3);
    }else if(u<4){
        point = calculateBezierPoint(u-3,de0,de1_modified,de2_modified,de3);
    }else{
        point = calculateBezierPoint(u-4,ea0,ea1_modified,ea2_modified,ea3);
    }
    x = point.x;
    y = point.y;
    context.beginPath(); 
    context.arc(x, y, 2.5, 0, Math.PI * 2, true); 
    context.fill();
}




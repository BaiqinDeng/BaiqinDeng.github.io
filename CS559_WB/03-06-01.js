// Attribution: CS559 2023_Spring solution

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('canvas1'));
const context = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));

let lasttime = undefined;

function animation(currtime) {
    if (lasttime === undefined) lasttime = currtime;
    
    const delta = (currtime - lasttime);
    drawBackground(context);
    drawQuadCopter1(context, delta, path1(delta, true));  
    window.requestAnimationFrame(animation);
    lasttime = currtime;
}
window.requestAnimationFrame(animation);

function makeQuadCopter(sval) {
    const propSpeed = [0.015, 0.020, 0.01, 0.005];  

    const bodyWD = 40;    
    const bodyHT = 50;    
    const armWD = 3;      
    const armHT = 30;     
    const propRD = 20;    
    const propWD = 4;     
    const dx = -5;
    const dy = -5;
    const armPos = [
        [+(bodyWD/2 + dx), +(bodyHT/2 + dy)],
        [+(bodyWD/2 + dx), -(bodyHT/2 + dy)],
        [-(bodyWD/2 + dx), +(bodyHT/2 + dy)],
        [-(bodyWD/2 + dx), -(bodyHT/2 + dy)],
    ];

    // armDir defines the direction for each arm
    const rho = Math.PI * 0.22;
    const armDir = [-rho, rho - Math.PI, rho, -rho - Math.PI];
    const scaleCoef = [sval, sval];
    const blk = getRGBA([40, 40, 40, 1]);

    // variables that will be updated dynamically
    let angles = [0, 0, 0, 0];
    
    function drawPropeller(context, theta) {
        context.save();
        {
            // TRANSFORMATION-2: defines local coordinates for the center of this propeller-pairs
            context.translate(0, armHT);

            context.save();
            {
                // TRANSFORMATION-3: dynamically updates rotation for this propeller-pairs
                context.rotate(theta);

                context.fillStyle = blk;
                context.fillRect(-propRD, -propWD/2, propRD * 2, propWD);
                context.fillRect(-propWD/2, -propRD, propWD, propRD * 2);
            }
            context.restore();
        }
        context.restore();
    }

    /**
     * This function dynamically does three things:
     * 1. updates key parameters that are determined by delta
     * 2. makes transformations to update some local coordinate systems
     * 3. draws each component in their updated local coordinate systems
     */
    function draw(context, delta, state) {
        angles.forEach((p, i) => angles[i] = (p + delta * propSpeed[i]) % (Math.PI * 2));
        
        // draws all components of this quadcopter
        context.save();
        {
            // TRANSFORMATION-0: defines local coordinates for the quadcopter
            context.translate(state.px, state.py);
            context.rotate(state.dir);
            context.scale.apply(context, scaleCoef);

            drawRect(context, bodyWD, bodyHT, blk, undefined);  
            for (let i = 0; i < 4; ++i) { // draw arms
                context.save();
                {
                    // TRANSFORMATION-1: defines local coordinates for current arm
                    context.translate.apply(context, armPos[i]);
                    context.rotate(armDir[i]);

                    drawCapsula(context, armWD, armHT, blk, undefined);  // draw this arm
                    drawPropeller(context, angles[i]);                  // draw propeller
                }
                context.restore();
            }
        }
        context.restore();
    }
    return draw;
}

const drawQuadCopter1 = makeQuadCopter(1); 

function circlePath(cx, cy, rd, speed) {
    const CX = cx;
    const CY = cy;
    const RD = rd;
    const moveSpeed = speed / RD;
    const movingDir = (moveSpeed >= 0) ? 0 : Math.PI;

    let beta = 0;

    function getCurrentPosAndDir(delta, showPath) {
        // update current direction
        beta = (beta + delta * moveSpeed) % (Math.PI * 2);

        const currentState = {
            px: CX + Math.cos(beta) * RD,  // current pos x
            py: CY + Math.sin(beta) * RD,  // current pos y
            dir: beta + movingDir,         // current direction
        }
        return currentState;
    }
    return getCurrentPosAndDir;
}

const path1 = circlePath(300, 300, 150, -0.10); 


function drawCapsula(context, r, h, fill, stroke) {
    context.save();
    {
        context.beginPath();
        context.arc(0, 0, r, Math.PI, 0, false);
        context.lineTo(r, h);
        context.arc(0, h, r, 0, Math.PI, false);
        context.closePath();

        if (fill) {
            context.fillStyle = fill;
            context.fill();
        }

        if (stroke) {
            context.strokeStyle = stroke;
            context.stroke();
        }
    }
    context.restore();
}

function drawRect(context, w, h, fill, stroke) {
    context.save();
    {
        if (fill) {
            context.fillStyle = fill;
            context.fillRect(-w/2, -h/2, w, h);
        }
        if (stroke) {
            context.strokeStyle = stroke;    
            context.strokeRect(-w/2, -h/2, w, h);
        }
    }
    context.restore();
}

function drawCircle(context, x, y, r, fill, stroke, w=1) {
    context.save();
    {
        context.beginPath();
        context.arc(x, y, r, 0, Math.PI * 2, false);
        context.closePath();

        if (fill) {
            context.fillStyle = fill;
            context.fill();
        }

        if (stroke) {
            context.lineWidth = w;
            context.strokeStyle = stroke;
            context.stroke();
        }
    }
    context.restore();
}

function drawBackground(context) {
    context.save();
    {
        context.fillStyle = getRGBA([255, 255, 255, 1]);
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    context.restore();
}

function getRGBA(c) {
    return `rgba(${c[0]},${c[1]},${c[2]},${c[3]})`;
}

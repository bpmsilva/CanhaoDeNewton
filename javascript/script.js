// Canvas
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// constants
const xc = canvas.width / 2;
const yc = canvas.height / 2;
const k = 0.005;
const m = 20000;
const planet_radius = 100;
const projectile_radius = 10;

// projectile
var projectile = {
    x: xc,
    y: yc - 200, // TODO: set this as input
    vx: 10,      // TODO: set this as input too
    vy: 0,
    ax: 0,
    ay: 0
}

// TODO create classes and move to separate file
function draw_circle(ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

window.requestAnimationFrame(function animationLoop() {

    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // draw planet
    draw_circle(context, xc, yc, planet_radius, 'blue');

    // draw projectile
    draw_circle(context, projectile.x, projectile.y, projectile_radius, 'green');

    // compute forces
    curr_distance = distance(projectile.x, projectile.y, xc, yc);
    let force = k*m/curr_distance;
    fx = force * (projectile.x - xc) / curr_distance;
    fy = force * (projectile.y - yc) / curr_distance;

    // update projectile
    projectile.ax = -fx;
    projectile.ay = -fy;

    projectile.vx += projectile.ax;
    projectile.vy += projectile.ay;

    projectile.x += projectile.vx;
    projectile.y += projectile.vy;

    window.requestAnimationFrame(animationLoop);
});

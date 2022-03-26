import { distance, draw_circle } from "./helpers.js";

// Canvas
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// constants
const xc = canvas.width / 2;
const yc = canvas.height / 2;
const k = 0.005;
const m = 20000;
const planet_radius = 100;

// inputs
var y = 200 - planet_radius;
var vx = 10;

class Projectile {
    constructor(x, y, vx, vy, ax=0, ay=0, radius=10, color='green') {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.ax = ax;
        this.ay = ay;

        this.radius = radius;
        this.color = color;
    }

    update(fx, fy) {
        this.ax = fx; // TODO: add mass
        this.ay = fy; // TODO: add mass
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx) {
        draw_circle(ctx, this.x, this.y, this.radius, this.color);
    }
}

var projectile = new Projectile(xc, y, vx, 0);

window.requestAnimationFrame(function animationLoop() {

    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // draw planet and projectile
    draw_circle(context, xc, yc, planet_radius, 'blue');
    projectile.draw(context);

    // compute forces
    let curr_distance = distance(projectile.x, projectile.y, xc, yc);
    let force = k*m/curr_distance;
    let fx = - force * (projectile.x - xc) / curr_distance;
    let fy = - force * (projectile.y - yc) / curr_distance;

    // update projectile
    projectile.update(fx, fy);

    window.requestAnimationFrame(animationLoop);
});

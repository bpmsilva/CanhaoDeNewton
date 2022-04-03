import { distance, draw_circle, detect_collision, apply_collision } from "./helpers.js";
import { Projectile } from "./objects.js";

// Canvas
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// constants
const xc = canvas.width / 2;
const yc = canvas.height / 2;
const k = 0.005;
const m = 2000;
const planet_radius = 100;

// inputs
var y = 1.5*planet_radius;
var vx = 5; 

var projectile = new Projectile(xc, y, vx, 0);

window.requestAnimationFrame(function animationLoop() {

    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // draw planet and projectile
    draw_circle(context, xc, yc, planet_radius, 'blue');
    projectile.draw(context);
    draw_circle(context, xc, y, projectile.radius, 'black');

    // check for collision
    if (detect_collision(projectile.x, projectile.y, projectile.radius, xc, yc, planet_radius)) {
        // numeric stability
        let ref_distance = planet_radius + projectile.radius;
        let curr_distance = distance(projectile.x, projectile.y, xc, yc);
        let diff = ref_distance - curr_distance;
        projectile.x += diff * (projectile.x - xc) / curr_distance;
        projectile.y += diff * (projectile.y - yc) / curr_distance;

        let velocities = apply_collision(projectile.x, projectile.y, projectile.vx, projectile.vy, xc, yc);
        projectile.vx = velocities[0];
        projectile.vy = velocities[1];
    }

    // compute forces
    let curr_distance = distance(projectile.x, projectile.y, xc, yc);
    let force = k*m/curr_distance;
    let fx = - force * (projectile.x - xc) / curr_distance;
    let fy = - force * (projectile.y - yc) / curr_distance;

    // update projectile
    projectile.update(fx, fy);

    window.requestAnimationFrame(animationLoop);
});

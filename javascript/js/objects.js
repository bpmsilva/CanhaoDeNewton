import { draw_circle } from "./helpers.js";

export class Projectile {
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

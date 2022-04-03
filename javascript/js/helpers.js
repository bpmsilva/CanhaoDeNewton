function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function detect_collision(x1, y1, r1, x2, y2, r2) {
    return distance(x1, y1, x2, y2) <= r1 + r2;
}

function apply_collision(x, y, vx, vy, xc, yc) {

    let hypotenuse = distance(x, y, xc, yc);
    let cos_theta =  (x - xc) / hypotenuse;
    let sin_theta = -(y - yc) / hypotenuse;

    // velocity in the direction of the collision
    let new_vx =   vx * sin_theta + vy * cos_theta;
    let new_vy = - vx * cos_theta + vy * sin_theta;

    // update the perpendicular velocity
    new_vy = - 0.9 * new_vy;

    // return the velocity to the original direction
    let final_vx = new_vx*sin_theta - new_vy*cos_theta;
    let final_vy = new_vx*cos_theta + new_vy*sin_theta;

    return [final_vx, final_vy];
}

function draw_circle(ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
}

export { distance, draw_circle, detect_collision, apply_collision };

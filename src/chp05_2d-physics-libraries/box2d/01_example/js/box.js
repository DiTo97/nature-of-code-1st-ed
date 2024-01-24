/**
 * A class that implements a 2D rectangular box object.
 * 
 * @property {p5} p5 An instance of p5.js
 * 
 * @property {number} w The width of the box
 * @property {number} h The height of the box
 * 
 * @property {box2d.b2Body} body The Box2D attached to the box
 */
export default class Box {
    /**
     * @param {number} x The position of the box along the X-axis
     * @param {number} y The position of the box along the Y-axis
     * 
     * @param {box2d.b2World} world The real Box2D world
     * 
     * @param {p5} _p5 An instance of p5.js
     */
    constructor(x, y, world, _p5 = p5.instance) {
        this.p5 = _p5;

        this.w = 16;
        this.h = 16;

        // Define a dynamic body
        let bd = new box2d.b2BodyDef();

        bd.type = box2d.b2BodyType.b2_dynamicBody;
        bd.position = box2d.p5Helper.scale_to_world(x, y);

        // Define a fixture
        let fd = new box2d.b2FixtureDef();

        fd.density = 1.0;
        fd.friction = 0.5;
        fd.restitution = 0.2;
        
        // Attach a shape to the fixture
        fd.shape = new box2d.b2PolygonShape();

        let c_x = box2d.p5Helper.scale_to_world(this.w / 2);
        let c_y = box2d.p5Helper.scale_to_world(this.h / 2);

        fd.shape.SetAsBox(c_x, c_y);

        // Create the body
        this.body = world.CreateBody(bd);

        // Attach the fixture to the body
        this.body.CreateFixture(fd);
    }

    /**
     * Display the Box2D box on the canvas.
     */
    display() {
        const {p5: _p5} = this;

        // Get the 2D position of the body
        let b2pos = this.body.GetPosition();
        let pos = box2d.p5Helper.scale_to_pixels(b2pos);

        // Get its heading
        let a = this.body.GetAngleRadians();

        _p5.push();
            _p5.rectMode(_p5.CENTER);

            _p5.translate(pos.x, pos.y);
            _p5.rotate(a);

            _p5.fill(127);
            _p5.stroke(200);
            _p5.strokeWeight(1.3);

            _p5.rect(0, 0, this.w, this.h);
        _p5.pop();
    }
}

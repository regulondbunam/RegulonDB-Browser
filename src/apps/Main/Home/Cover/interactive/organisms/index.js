import example from "./assets/example"

const defaultProperties = {
    size: 1,
    alive: true
}

class Organism {

    organismSVGS = {
        example: example
    }
    alive = true
    absolutePosition = {x:0,y:0}


    constructor(posX, posY, type="example", properties={}) {
        this.x = posX;
        this.y = posY;
        this.absolutePosition.x = posX;
        this.absolutePosition.y = posY;
        this.type = type;
        this.size = properties.size || defaultProperties.size;
        this.alive = properties.alive || defaultProperties.alive;
    }

    setStage(canva){
        this.canva = canva;
    }

    draw() {
        //const svgString = this.organismSVGS[this.type]; // Obtiene la cadena SVG
        const head = this.canva.rect(1, 15).fill('#999999').move(70,0).id("head");
        const cell = this.canva.path("M 0 0 C -8.333 0 -8.333 -16.667 0 -16.667 L 33.333 -16.667 C 41.667 -16.667 41.667 0 33.333 0 L 0 0")
            .fill('#999999')
            .move(30, 0);
        const scourge = this.canva.path("M 0 0 C 12.5 -6.25 18.75 6.25 28.125 0 C 25 0 25 3.125 15.625 0 C 6.25 -3.125 3.125 0 0 0")
            .fill('#999999')
            .move(0, 7);

        this.body = this.canva.group();
        this.body.add(head)
        this.body.add(cell)
        this.body.add(scourge)
        this.body.move(this.x,this.y)
        this.angle = getAngle();
        this.body.rotate(this.angle);
    }

    moveForward(speed=100){
        this.moveInterval = setInterval(()=>{
            this.body.move(this.body.x()+1, this.body.y());
        },speed)
    }

    async moveRotateTo(
        speed = 100,
        angleTarget =  (Math.floor(Math.random()*360)),
    ){
        let angle = Math.floor((this.body.transform().rotate % 360 + 360) % 360);
        angleTarget = Math.floor((angleTarget+180 % 360 + 360) % 360);
        const {direction} = getShortestRotation(angle, angleTarget);
        const time = angleTarget*100;
        this.moveInterval = setInterval(()=>{
            angle += direction;
            if(angle > 360) angle = 0;
            if(angle < 0) angle = 360;
            this.body.rotate(direction);
            this.body.move(this.body.x()+1, this.body.y());
        },speed)
        setTimeout(()=>{
            clearInterval(this.moveInterval)
        },time)
        await delay(time+100)
    }

    stop(){
        if(this.modeNpcOn) this.modeNpcOn = false;
        clearInterval(this.moveInterval)
    }

    startNPCMode(){
        this.modeNpcOn = true;
        const run = async ()=>{
            this.moveForward(100)
            const distance = Math.floor(Math.random()*100)
            const time = distance*100
            await delay(time)
            clearInterval(this.moveInterval)
            await this.moveRotateTo(100,getAngle())
        }
        const initMode = async ()=>{
            while (this.modeNpcOn){
                await run()
            }
        }
        initMode()
    }

    stopNPCMode(){
        this.modeNpcOn = false;
        clearInterval(this.moveInterval)
    }

    startFollowMode(x,y,speed = 100){
        this.stopNPCMode();
        const rotateTo = async (angleTarget)=>{
            if(this.isRotate) return;
            this.isRotate = true;
            let angle = Math.floor((this.body.transform().rotate % 360 + 360) % 360);
            angleTarget = Math.floor((angleTarget+180 % 360 + 360) % 360);
            const {direction} = getShortestRotation(angle, angleTarget);
            while(angle !== angleTarget){
                angle += direction;
                if(angle > 360) angle = 0;
                if(angle < 0) angle = 360;
                this.body.rotate(direction);
                await delay(5);
            }
            this.isRotate = false;
        }
        const checkEnd = ()=>{
            let position = this.getCurrentPosition();
            const dx = position.x - x;
            const dy = position.y - y;
            let distance = Math.floor(Math.sqrt(dx * dx + dy * dy));
            while(distance > 20){
                let position = this.getCurrentPosition();
                const dx = position.x - x;
                const dy = position.y - y;
                let distance = Math.floor(Math.sqrt(dx * dx + dy * dy));
                if(distance <= 20){
                    this.stop();
                }
            }

        }
        const currentPosition = this.getCurrentPosition()
        const dx = currentPosition.x - x;
        const dy = currentPosition.y - y;
        const angle = Math.atan2(dy, dx) * (180/ Math.PI);
        rotateTo(angle)
        this.moveForward(10)

    }

    getCurrentPosition(){
        return {
            x: this.body.rbox().x,
            y: this.body.rbox().y,
            rotation: this.body.transform().rotate
        }
    }



}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getAngle = () =>{
    return Math.floor(Math.random()*360)
}

const getHead = (group)=>{
    for(let i=0; i<group.children().length; i++){
        const child = group.children()[i];
        if(child.id()+"" === "head"){
            return child;
        }
    }
    return null;
}

const getShortestRotation = (currentAngle, targetAngle) => {

    let diff = targetAngle - currentAngle;

    if (diff > 180) {
        diff -= 360;
    } else if (diff < -180) {
        diff += 360;
    }

    const direction = Math.sign(diff); // +1 para horario, -1 para antihorario
    const absDiff = Math.abs(diff);

    return { direction, diff: absDiff };
};

function checkCollisionWithCanvas(group, canvasWidth, canvasHeight) {
    const bbox = group.rbox();

    let collision = {
        left: false,
        right: false,
        top: false,
        bottom: false,
        any: false // Para saber si hay alguna colisión
    };

    if (bbox.x < 0) {
        collision.left = true;
        collision.any = true;
    }
    if (bbox.x + bbox.width > canvasWidth) {
        collision.right = true;
        collision.any = true;
    }
    if (bbox.y < 0) {
        collision.top = true;
        collision.any = true;
    }
    if (bbox.y + bbox.height > canvasHeight) {
        collision.bottom = true;
        collision.any = true;
    }

    return collision;
}


export default Organism;
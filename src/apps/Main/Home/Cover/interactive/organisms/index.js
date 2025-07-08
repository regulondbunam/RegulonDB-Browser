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
        const head = this.canva.rect(1, 15).move(75,0).id("head");
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

    startNPCMode(){
        this.modeInterval = setInterval(()=>{
            this.lazyMove()
        })
    }

    stopNPCMode(){
        clearInterval(this.modeInterval);
    }

    async goTo(x,y,speed=10){

    }


    async lazyMove(){
        if(this.isMove) return;
        this.isMove = true;
        const height = this.canva.height();
        const width = this.canva.width();
        const head = getHead(this.body);
        const moveRotate = async (
                distance =  (Math.floor(Math.random()*360)),
                direction = Math.random() < 0.5 ? 1 : -1,
                speed = 100
        )=>{
            for(let i=0; i<distance; i++){
                let newX = this.body.x()+1;
                let newY = this.body.y()+0;
                this.body.move(newX, newY);
                this.body.rotate(direction);
                await delay(speed);
            }
        }
        const moveOn = async (distance)=>{
            for(let i=0; i<distance; i++){
                let newX = this.body.x()+1;
                let newY = this.body.y()+0;
                let collision = checkCollisionWithCanvas(head, width, height);
                if(!collision.any){
                    this.body.move(newX, newY);
                }else{
                    const direction =Math.random() < 0.5 ? 1 : -1
                    while (checkCollisionWithCanvas(head, width, height).any){
                        await moveRotate(5,direction,100);
                    }
                }
                await delay(100);
            }
            this.x = this.body.x();
            this.y = this.body.y();
        }
        const distance = (Math.floor(Math.random()*300))
        await moveOn(distance);
        //await moveRotate(getAngle());
        this.isMove = false;
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
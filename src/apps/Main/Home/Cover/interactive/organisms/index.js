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


    constructor(posX, posY, type="example", properties={}) {
        this.x = posX;
        this.y = posY;
        this.type = type;
        this.size = properties.size || defaultProperties.size;
        this.alive = properties.alive || defaultProperties.alive;
    }

    setStage(canva){
        this.canva = canva;
    }

    draw() {
        //const svgString = this.organismSVGS[this.type]; // Obtiene la cadena SVG
        const cell = this.canva.path("M 0 0 C -8.333 0 -8.333 -16.667 0 -16.667 L 33.333 -16.667 C 41.667 -16.667 41.667 0 33.333 0 L 0 0")
            .fill('#999999')
            .move(30, 0);
        const scourge = this.canva.path("M 0 0 C 12.5 -6.25 18.75 6.25 28.125 0 C 25 0 25 3.125 15.625 0 C 6.25 -3.125 3.125 0 0 0")
            .fill('#999999')
            .move(0, 7);
        this.body = this.canva.group();
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
        const moveRotate = async ()=>{
            const distance = (Math.floor(Math.random()*360))
            const direction = Math.random() < 0.5 ? 1 : -1;
            for(let i=0; i<distance; i++){
                let newX = this.body.x()+1;
                let newY = this.body.y()+0;
                if(newX > 0 || newX < width || newY > 0 || newY < height){
                    this.body.move(newX, newY);
                }
                this.body.rotate(direction);
                await delay(100);
            }
        }
        const moveOn = async (distance)=>{
            for(let i=0; i<distance; i++){
                let newX = this.body.x()+1;
                let newY = this.body.y()+0;
                if(newX > 0 || newX < width || newY > 0 || newY < height){
                    this.body.move(newX, newY);
                    await delay(100);
                }

            }
            this.x = this.body.x();
            this.y = this.body.y();
        }
        const distance = (Math.floor(Math.random()*300))
        await moveOn(distance);
        await moveRotate(getAngle());
        this.isMove = false;
    }


}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getAngle = () =>{
    return Math.floor(Math.random()*360)
}


export default Organism;
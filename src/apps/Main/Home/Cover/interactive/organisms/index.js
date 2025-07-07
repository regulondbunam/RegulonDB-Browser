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
        this.body = this.canva.circle(20).fill('#999999').move(this.x, this.y);
    }

    move(){
        const height = this.canva.height();
        const width = this.canva.width();
        const directions = [
            {x: 0, y: 0}, //none
            {x: 1, y: 0}, // right
            {x: -1, y: 0}, // left
            {x: 0, y: 1}, // down
            {x: 0, y: -1},// up
            {x:1, y: 1}, //right-down
            {x:-1, y: 1}, // left-down
            {x:1, y:-1}, //right-up
            {x:-1, y:-1}, // left-up
        ]

        const moveOn = async (direction, distance)=>{
            for(let i=0; i<distance; i++){
                let newX = this.body.x()+direction.x;
                let newY = this.body.y()+direction.y;
                if(newX > 0 || newX < width || newY > 0 || newY < height){
                    this.body.move(newX, newY);
                }
                await delay(100);
                newX+=direction.x;
                newY+=direction.y;
            }
            this.x = this.body.x();
            this.y = this.body.y();
        }
        const incress = Math.floor(Math.random()*100);
        console.log(incress)
        this.moveing = setInterval(()=>{
            const direction = directions[Math.floor(Math.random()*directions.length)];
            const distance = (Math.floor(Math.random()*incress))
            moveOn(direction, distance);
        },100*incress)

    }


}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export default Organism;
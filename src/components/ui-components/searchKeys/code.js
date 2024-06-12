/*
Hola compañero programador, si estas leyendo esto espero que
te encuentres muy bien, el codigo que estas por leer es parte
de los Easter Egg que se encuentran en regulonDB... este es facil de encontrar
porque quitarlo no representa una amenaza a la integridad de regulonDB.

Easter Egg "felicitaciones a los desarrolladores"
si es tu cumpleaños, escribe tu nombre en el buscador y saldrá confeti :3

<galarcon>
*/
import ConfettiExplosion from 'react-confetti-explosion';

export function Div({name}){
    const date = new Date();
    const birdDayInfo={
        andres: [3,10],
        Andres: [3,10],
        Felipe: [25,1],
        Elizabeth: [23,1],
        Karen: [6,8],
        parangaricutirimicuaro: [date.getDate(),date.getMonth()+1],
        Francisco: [11,11]
    }
    if(birdDayInfo[name]){
        
    let isBirdDay =  date.getDate() === birdDayInfo[name][0] && date.getMonth()+1 === birdDayInfo[name][1]
    console.log( date.getDate());
    if(isBirdDay){
        return <ConfettiExplosion />
    }
    }
    return null
}
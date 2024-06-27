export default function DrawTerminator({
  id,
  canva,
  width,
  height = 50,
  posX,
  posY,
  stroke = { color: "#000", width: 2, linecap: "round" },
}) {
  if (!canva) {
    return null;
  }
  //draw lines
  canva.line(posX, posY, posX + width / 2 - 5, posY).stroke(stroke);
  canva
    .line(posX + width / 2 - 5, posY, posX + width / 2 - 5, posY - height / 2)
    .stroke(stroke);
  canva
    .line(posX + width / 2 + 10, posY, posX + width / 2 + 10, posY - height / 2)
    .stroke(stroke);
  canva.line(posX + width / 2 + 10, posY, posX + width + 5, posY).stroke(stroke);
  // draw head
  let head = canva
    .path(
      "M 23.2 28 L 23.2 27.1 A 14.7 14.7 0 0 0 30 14.7 A 14.7 14.7 0 0 0 15.2 0 L 15.2 0 A 14.7 14.7 0 0 0 0.5 14.7 A 14.7 14.7 0 0 0 7.2 27.1 L 7.2 28"
    )
    .fill("none")
    .stroke(stroke);
  let headX = posX + width / 2 - 13;
  let headY = posY - height / 2 - 30;
  head.move(headX + 1, headY + 1);
  /*
    

    // console.log(height)
  
    
    */
  //group

  // reverse effect

  // group.add(text);
  // Toltip

  return {
    id: id,
    canva: canva,
    posX: posX,
    posY: posY,
    objectType: "promoter",
  };
}

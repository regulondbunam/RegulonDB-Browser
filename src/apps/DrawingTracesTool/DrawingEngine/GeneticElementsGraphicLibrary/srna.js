//Draw RNA v 0.9.0
/**
 *
 */
import { stroke_validate, font_validate, color_validate } from "./validation";
import { label } from "./label";
import { srna_dp } from "./features_default_properties";

export default function DrawRna({
  id,
  canva,
  anchor,
  dna,
  separation = 0,
  leftEndPosition = 0,
  rightEndPosition = 10,
  labelName = "Name",
  strand = "forward",
  color,
  opacity = 0,
  stroke = {},
  font = {},
  tooltip = "",
  height,
  onClick
}) {
  if (!canva || !dna || !id | (leftEndPosition > rightEndPosition)) {
    return null;
  }
  stroke = stroke_validate(stroke, srna_dp.stroke);
  font = font_validate(font, srna_dp.font);
  color = color_validate(color, srna_dp.fill);
  // scale
  let proportion = srna_dp.height;
  if (height) {
    proportion = height;
  }  

  // anchor effect
  if (anchor) {
    leftEndPosition = anchor.leftEndPosition;
    rightEndPosition = leftEndPosition + 10;
  }
  //attributes
  const srna_x = ((leftEndPosition - dna.leftEndPosition) * dna.widthActive) / dna.size;
  let srna_width = ((rightEndPosition - leftEndPosition) * dna.widthActive) / dna.size;
  let srnaGroup = canva.group();
  let posY = 0
  //body attributes
  let bodyHeight = proportion / 2;
  let posX = srna_x + dna.x;
  //fet attributes
  let lineHeight = proportion / 2;
  let lineSeparation = srna_dp.lineSeparation
  //Strand effect
  if(strand === "reverse"){
    posY = dna.y + separation +lineHeight
  }else{
    posY = dna.y - separation - proportion;
  }


  

  //Draw rect
  let body = canva.rect(srna_width, bodyHeight);
  body.move(posX, posY);
  body.stroke(stroke);
  body.fill(color);

  srnaGroup.add(body);

  //Draw lines
  for (let index = 0; index < srna_width; index = index + lineSeparation) {
    let line
    if (strand === "reverse") {
      line = canva
      .line(posX+index, posY, posX+index,  posY-lineHeight)
      .stroke(stroke)
    }else{
      line = canva
      .line(posX+index, posY+bodyHeight, posX+index,  posY+bodyHeight+lineHeight)
      .stroke(stroke)
    }
    
    srnaGroup.add(line);
  }


  //Draw label
  let text = label({
    canvas: canva,
    x: posX,
    element_y: posY,
    element_h: bodyHeight,
    element_w: srna_width,
    text: labelName,
    font: font
  });

  srnaGroup.add(text);
  
  //Actions
  if (onClick) {
    srnaGroup.attr({
      cursor: "pointer"
    })
    srnaGroup.click(onClick);
  }

  //srna.add(text);
  // Tooltip
  srnaGroup.attr({
    "data-tip": "",
    "data-for": `"${canva.node?.id}-${id}"`
  });
  return {
    id: id,
    canva: canva,
    draw: srnaGroup,
    posX: posX,
    posY: posY,
    srna_width: srna_width,
    height: height,
    dna: dna,
    separation: separation,
    leftEndPosition: leftEndPosition,
    rightEndPosition: rightEndPosition,
    labelName: labelName,
    strand: strand,
    color: color,
    opacity: color,
    stroke: stroke,
    font: font,
    objectType: "rna",
    tooltip: tooltip
  };
}

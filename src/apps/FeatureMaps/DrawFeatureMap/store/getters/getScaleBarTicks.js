import classifyTick from "../../model/scaleBar/classifyTick";

export default function getScaleBarTicks(document, fragment) {
  const widthSection = fragment.focus.width
  const step = 10;
  const ticks = [];
  const bpPx = document.scaleBar.width / widthSection;
  let iStep = 1
  for (let i = 0; i <= widthSection; i += iStep) {
    const xBp = fragment.focus.startPosition + i;
    if(xBp%10 === 0 && iStep !== step){
      iStep = step;
    }
    if(iStep === step){
      const x = bpPx * i;
      const kind = classifyTick(xBp);
      const showLabel = ((kind !== 'minor') && (kind !== 'mid')) || widthSection<101;
      ticks.push({ i, x, label:xBp, kind, showLabel });
    }
  }
  return ticks;
}
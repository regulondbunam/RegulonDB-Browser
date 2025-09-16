import classifyTick from "../../../model/scaleBar/classifyTick";

export const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

export default class Bar {
  limits = {
    start: 0,
    end: 0,
  };
  relativeWidth = 0; //px
  width = 0;
  labelEach = 100;
  step = 10;
  constructor(limitStart, limitEnd, relativeWidth) {
    this.limits = {
      start: limitStart,
      end: limitEnd,
    };
    this.width = Math.abs(limitEnd - limitStart);
    this.relativeWidth = relativeWidth;
  }

  getWidthPx(widthSection) {
    return (widthSection * this.relativeWidth) / this.width;
  }

  getRightPx(endPosition) {
    const delta = Math.abs(endPosition - this.limits.end);
    const pxBp = this.relativeWidth / this.width;
    return delta * pxBp;
  }

  //Obten la posicion en bp a partir de la posision relativa (px)
  getBasePairPosition(relativePosition, startPosition, widthSection) {
    return Math.round(
      startPosition + (relativePosition * widthSection) / this.relativeWidth
    );
  }

  getTicks(widthSection, startPosition, endPosition) {
    const ticks = [];
    const bpPx = this.relativeWidth / widthSection;
    let iStep = 1
    for (let i = 0; i <= widthSection; i += iStep) {
      const xBp = startPosition + i;
      if(xBp%10 === 0 && iStep !== this.step){
        iStep = this.step;
      }
      if(iStep === this.step){
        const x = bpPx * i;
        const kind = classifyTick(xBp);
        const showLabel = ((kind !== 'minor') && (kind !== 'mid')) || widthSection<101;
        ticks.push({ i, x, label:xBp, kind, showLabel });
      }
    }
    return ticks;
  }
}

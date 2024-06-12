import React, { useEffect } from "react";
import { SVG } from "@svgdotjs/svg.js";


/**
 * Spinner component to display a DNA-style loading animation.
 *
 * @param {Object} props - Properties of the component.
 * @param {string} props.id - The unique identifier of the component (optional).
 * @returns {*} React element to display the Spinner.
 * @export
 */
export default function Spinner({ id = "unknow" }) {
  
  /**
   * Description placeholder
   *
   * @type {string}
   */
  const idCanvas = `canva-${id}`;
  useEffect(() => {
    /**
     * Reference to the element where the Spinner will be displayed.
     *
     * @type {HTMLElement}
     */
    let drawPlace = document.getElementById(id);
     /**
     * Reference to the canvas element where the Spinner animation will be created.
     *
     * @type {SVG.Element}
     */
    let canvas = document.getElementById(idCanvas);
    if (drawPlace && canvas === null) {
      /**
       * Width of the drawing area.
       *
       * @type {number}
       */
      const width = drawPlace.clientWidth;
       /**
       * Height of the drawing area (half the height of the container).
       *
       * @type {number}
       */
      const height = drawPlace.clientHeight / 2;
      canvas = SVG().addTo(`#${id}`).size(width, height).id(idCanvas);
      
      /**
       * Description placeholder
       *
       * @type {string}
       */
      let azucar = "#3D779B";

      /**
       * Description placeholder
       *
       * @type {string}
       */
      let a = "#5AB2E8";

      /**
       * Description placeholder
       *
       * @type {string}
       */
      let t = "#7798AC";

      /**
       * Description placeholder
       *
       * @type {string}
       */
      let g = "#A0CCE8";

      /**
       * Description placeholder
       *
       * @type {string}
       */
      let c = "#295069";

      
      /**
       * Description placeholder
       *
       * @type {number}
       */
      let duration = 8000;

      /**
       * Description placeholder
       *
       * @type {number}
       */
      let size = 10;

      /**
       * Description placeholder
       *
       * @type {number}
       */
      let space = 2;

      /**
       * Description placeholder
       *
       * @type {number}
       */
      const n = width / (size + space) + 5;
      for (let i = -2; i < n; i++) {
        
        /**
         * Description placeholder
         *
         * @type {*}
         */
        let b1 = SelectAmino(a, t, c, g);
        
        /**
         * Description placeholder
         *
         * @type {*}
         */
        let b2 = Par(b1, a, t, c, g);
        
        /**
         * Description placeholder
         *
         * @type {number}
         */
        let x = i * (size + space);
        
        /**
         * Description placeholder
         *
         * @type {number}
         */
        let yi = 0;
        
        /**
         * Description placeholder
         *
         * @type {number}
         */
        let yf = height - size;

        
        /**
         * Description placeholder
         *
         * @type {number}
         */
        let ym = yf / 2;

        
        /**
         * Description placeholder
         *
         * @type {number}
         */
        let delay = i * (size + space);

        
        /**
         * Description placeholder
         *
         * @type {*}
         */
        let c1 = canvas.circle(size).move(x, yi).fill(azucar);

        
        /**
         * Description placeholder
         *
         * @type {*}
         */
        let r1 = canvas
          .rect(size / 2, ym / 2)
          .move(x + size / 2 / 2, size / 2)
          .fill(b1)
          .rx(20)
          .ry(20);

          
        /**
         * Description placeholder
         *
         * @type {*}
         */
        let c2 = canvas.circle(size).move(x, ym).fill(azucar);
        
        /**
         * Description placeholder
         *
         * @type {*}
         */
        let r2 = canvas
          .rect(size / 2, ym / 2)
          .move(x + size / 2 / 2, ym - ym / 2)
          .fill(b2)
          .rx(20)
          .ry(20);
          
        /**
         * Description placeholder
         *
         * @type {*}
         */
        let group = canvas.group();
        group.add(r1);
        group.add(r2);
        group.add(c1);
        group.add(c2);
        group
          .animate({
            duration: duration,
            delay: delay,
            times: 500
          })
          .rotate(360);
      }
      /*
      let txt = canvas.text("Loading...");
      txt.font({
        family: "Arial",
        size: 50,
        anchor: "middle",
        leading: "1.5em"
      });
      txt.move(-190, height / 2 - 30);
      txt
        .animate({
          duration: n * 150,
          delay: 0,
          times: 10000
        })
        .move(width, height / 2 - 30);
        */
      CAMINAR(canvas, width);
    }
    return function cleanup() {
      if (canvas !== null) {
        canvas.remove();
      }
    };
  });
  return (
    <div
      id={id}
      style={{
        height: "200px",
        width: "100%",
        position: "absolute",
        left: "0",
        zIndex: "-1"
      }}
    ></div>
  );
}


/**
 * Description placeholder
 *
 * @param {string} a - The first DNA base option.
 * @param {string} t - The second DNA base option.
 * @param {string} c - The third DNA base option.
 * @param {string} g - The fourth DNA base option.
 * @returns {string} - The randomly selected DNA base.
 */
function SelectAmino(a, t, c, g) {
  
  /**
   * Description placeholder
   *
   * @type {number}
   */
  let n = Math.floor(Math.random() * (4 - 1)) + 1;
  switch (n) {
    case 1:
      return a;
    case 2:
      return g;
    case 3:
      return t;
    default:
      return c;
  }
}

/**
 * Description placeholder
 *
 * @param {string} amn - The current DNA base.
 * @param {string} a - The first DNA base option.
 * @param {string} t - The second DNA base option.
 * @param {string} c - The third DNA base option.
 * @param {string} g - The fourth DNA base option.
 * @returns {string} - The paired DNA base.
 */
function Par(amn, a, t, c, g) {
  switch (amn) {
    case a:
      return t;
    case t:
      return a;
    case c:
      return g;
    default:
      return c;
  }
}


/**
 * Description placeholder
 *
 * @param {SVG} canvas - El lienzo SVG en el que se realizará la animación.
 * @param {number} width - El ancho del lienzo SVG.
 * @returns {null} - No devuelve ningún valor.
 */
function CAMINAR(canvas, width) {
  /**
   * Número aleatorio entre 1 y 10,000.
   *
   * @type {number}
   */
  let n = Math.floor(Math.random() * (10000 - 1)) + 1;
  //let n = 12
  if (n === 12) {
    
    /**
     * Description placeholder
     *
     * @type {SVG.Image}
     */
    let image = canvas.image("https://i.imgur.com/XJQeaix.gif");
    image.move(width, -50);
    image
      .animate({
        duration: n * 300,
        delay: 0,
        times: 1
      })
      .move(-2000, -50);
  }
  return null;
}

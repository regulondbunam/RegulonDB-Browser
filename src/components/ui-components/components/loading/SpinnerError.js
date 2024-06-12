import { SVG } from "@svgdotjs/svg.js";
import React, { useEffect } from "react";


/**
 * Description placeholder
 *
 * @export
 * @returns {function}
 */
export default function SpinnerError() {
  
  /**
   * Description placeholder
   *
   * @type {"amva1290Error"}
   */
  const idCanvas = "amva1290Error";
  useEffect(() => {
    
    /**
     * Description placeholder
     *
     * @type {HTMLElement}
     */
    let drawPlace = document.getElementById("loading");
    
    /**
     * Description placeholder
     *
     * @type {HTMLElement}
     */
    let canvas = document.getElementById(idCanvas);
    if (drawPlace && canvas === null) {
      
      /**
       * Description placeholder
       *
       * @type {number}
       */
      const width = drawPlace.clientWidth;
      /**
       * Description placeholder
       *
       * @type {number}
       */
      const height = drawPlace.clientHeight / 2;
      canvas = SVG().addTo(`#loading`).size(width, height).id(idCanvas);
      
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
      let size = 10;

      
      /**
       * Description placeholder
       * @date 10/5/2023 - 11:05:59 PM
       *
       * @type {number}
       */
      let space = 2;

        /**
       * Description placeholder
       * @date 10/5/2023 - 11:05:59 PM
       *
       * @type {number}
       */
      const n = width / (size + space) + 5;
      for (let i = -2; i < n; i++) {
        
        /**
         * Description placeholder
         *
         * @type {string}
         */
        let base = SelectAmino(a, t, c, g);
        
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
         * @date 10/5/2023 - 11:07:27 PM
         *
         * @type {*}
         */
        let r1 = canvas
          .rect(size / 2, ym / 2)
          .move(x + size / 2 / 2, size / 2)
          .fill(base)
          .rx(20)
          .ry(20);

          
        /**
         * Description placeholder
         *
         * @type {number}
         */
        let dura = SelectDuration();

        
        /**
         * Description placeholder
         *
         * @type {*}
         */
        let group = canvas.group();
        group.add(r1);
        group.add(c1);
        group
          .animate({
            duration: dura,
            delay: delay,
            times: 1
          })
          .rotate(getRot())
          .move(x, getY(-50));
          
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
          .fill(base)
          .rx(20)
          .ry(20);
        dura = SelectDuration();
          
        /**
         * Description placeholder
         *
         * @type {*}
         */
        let group2 = canvas.group();
        group2.add(r2);
        group2.add(c2);
        group2.move(x, ym - ym / 2);
        group2
          .animate({
            duration: dura,
            delay: delay,
            times: 1
          })
          .rotate(getRot() * -1)
          .move(x, getY(50));
      }
    }
    return function cleanup() {
      if (canvas !== null) {
        canvas.remove();
      }
    };
  });

  return (
    <div
      id="loading"
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
 * Generates a random rotation angle.
 * @param {number} size - The size parameter.
 * @returns {number} - The random rotation angle.
 */
function getRot(size) {
  return Math.floor(Math.random() * (360 - 180));
}
/**
 * Generates a random Y coordinate.
 * @param {number} size - The size parameter.
 * @returns {number} - The random Y coordinate.
 */
function getY(size) {
  return Math.floor(Math.random() * (size - 1)) + 1;
}
/**
 * Selects a random duration for animations.
 * @returns {number} - The selected duration in milliseconds.
 */
function SelectDuration() {
  let a = Math.floor(Math.random() * (5 - 1)) + 1;
  return a * 500;
}
/**
 * Selects a random amino acid color.
 * @param {string} a - Color option for amino acid 'A'.
 * @param {string} t - Color option for amino acid 'T'.
 * @param {string} c - Color option for amino acid 'C'.
 * @param {string} g - Color option for amino acid 'G'.
 * @returns {string} - The selected color.
 */
function SelectAmino(a, t, c, g) {
  
  /**
   * Description placeholder
   *
   * @type {*}
   */
  let n = Math.floor(Math.random() * (4 - 1)) + 1;
  switch (n) {
    case 1:
      return a;
    case 2:
      return g;
    case 3:
      return t;
    case 4:
    default:
      return c;
  }
}

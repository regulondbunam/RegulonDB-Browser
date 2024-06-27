import { SVG } from "@svgdotjs/svg.js";
import { DataVerifier } from "ui-components/utils";
import { FEATURE_TYPES } from "../statics";



/**
 * Class representing a sequence drawer.
 */
export default class DrawSequence {
  fontFamily = "'Courier New',Courier,monospace";
  stroke = { color: "#000000", width: 1 };
  features = [];
  sequence = "";
  canvas = undefined;


  /**
   * Create a DrawSequence.
   * @param {string} id - The ID of the drawing.
   * @param {HTMLElement} drawPlace - The HTML element where the sequence will be drawn.
   * @param {string} sequence - The sequence to be drawn.
   * @param {Array} features - Features of the sequence.
   * @param {number} bpWidth - The width of each base pair.
   * @param {number} bpHeight - The height of each base pair.
   */
  constructor(id, drawPlace, sequence, features = [], fontSize, bpWidth, bpHeight) {
    this.isFeatures = DataVerifier.isValidArray(features)
    this.drawPlace = drawPlace;
    this.id = id;
    this.sequence = sequence;
    this.features = features;
    this.bpWidth = bpWidth;
    this.fontSize = fontSize;
    this.originFontSize = fontSize
    this.bpHeight = bpHeight;
    this.width = (sequence.length + 2) * bpWidth;
    this.height = this.isFeatures ? bpHeight * 3 + 2 : bpHeight + 2;
    this.sequencePosX = bpHeight
    this.sequencePosY = this.isFeatures ? bpHeight : 0;
  }

  /**
   * Set up the SVG canvas.
   * @private
   */
  #setCanvas() {
    this.canvas = SVG()
      .addTo(`#${this.drawPlace.id}`)
      .size(this.width, this.height)
      .id(this.drawPlace.id + "_canvas");
  }

  /**
   * Set up the sequence on the canvas.
   * @private
   */
  #setSequence() {
    this.sequence.split("").forEach((bp, index) => {
      this.canvas
        .text(bp)
        .font({
          family: this.fontFamily,
          size: this.fontSize
        })
        .move(this.sequencePosX + index * this.bpWidth, this.sequencePosY);
    });
  }

  #setFeatures() {
    //console.log(this.features);
    this.features.forEach(feature => {
      switch (feature?.type) {
        case FEATURE_TYPES.PROMOTER:
          this.#drawPromoter({ ...feature })
          break;
        case FEATURE_TYPES.BOX:
          this.#drawBox({ ...feature })
          break;
        default:
          console.warn("feature: " + feature?.type + " no find");
          break;
      }
    })

  }

  #drawPromoter({
    id,
    label,
    posX,
  }) {
    this.sequence.split("").forEach((bp, index) => {
      if (index === posX) {
        this.canvas
          .text(label)
          .font({
            family: this.fontFamily,
            size: this.fontSize
          })
          .move(this.sequencePosX + index * this.bpWidth, 0);
      }
    });
  }

  #drawBox({
    id,
    label,
    posX,
    sequence
  }) {
    const boxWidth = sequence.length * this.bpWidth;
    this.sequence.split("").forEach((bp, index) => {
      if (index === posX) {
        this.canvas.rect(boxWidth, this.bpHeight)
          .fill('none')
          .stroke(this.stroke)
          .move(this.sequencePosX + index * this.bpWidth, this.sequencePosY);
        this.canvas
          .text(label)
          .font({
            family: this.fontFamily,
            size: this.fontSize
          })
          .move(this.sequencePosX + index * this.bpWidth, 0);
      }
    });
  }

  #drawTerminator({
    posX = 0,
    label = "",
    sequence = "",
  }) {
    const terminatorWidth = sequence.length * this.bpWidth;;
    const rX = posX * this.bpWidth;
    
  }

  /**
   * Draw the sequence on the canvas.
   * @returns {boolean} - Returns true if drawing succeeds, false otherwise.
   */
  draw() {
    try {
      this.#setCanvas();
      this.#setSequence();
      if (this.isFeatures) {
        this.#setFeatures();
      }
      return true;
    } catch (error) {
      console.error("try draw error", error);
      return false;
    }
  }

  resetDraw() {
    this.setFontSize(this.originFontSize)
    this.canvas.clear(); // Clear the existing canvas
    this.drawPlace.innerHTML = ""
    this.draw(); // Redraw with the new font size
    return { fontSize: this.originFontSize, bpHeight: this.bpHeight, bpWidth: this.bpWidth, }
  }

  /**
  * Set the font size and redraw the sequence.
  * @param {number} newFontSize - The new font size to set.
  */
  setFontSize(newFontSize) {
    this.fontSize = newFontSize;
    this.bpWidth = (newFontSize * 8) / 12
    this.bpHeight = this.bpWidth * 14 / 8;
    this.width = (this.sequence.length + 2) * this.bpWidth;
    this.height = this.isFeatures ? this.bpHeight * 3 + 2 : this.bpHeight + 2;
    this.sequencePosX = this.bpHeight
    this.sequencePosY = this.isFeatures ? this.bpHeight : 0;
    if (this.canvas) {
      this.canvas.clear(); // Clear the existing canvas
      this.drawPlace.innerHTML = ""
      this.draw(); // Redraw with the new font size
    }
    return {
      bpWidth: this.bpWidth,
      bpHeight: this.bpHeight,
    }
  }

  /**
   * Get the font family.
   * @returns {string} - The font family.
   */
  getFontFamily() {
    return this.fontFamily;
  }

  /**
   * Get the stroke.
   * @returns {Object} - The stroke object.
   */
  getStroke() {
    return this.stroke;
  }

  /**
   * Get the features.
   * @returns {Array} - The features array.
   */
  getFeatures() {
    return this.features;
  }

  /**
   * Get the sequence.
   * @returns {string} - The sequence string.
   */
  getSequence() {
    return this.sequence;
  }

  /**
   * Get the canvas.
   * @returns {Object|undefined} - The canvas object or undefined if not set.
   */
  getCanvas() {
    return this.canvas;
  }
}

import React, { Component } from "react";
import PropTypes from "prop-types";
import Controls from "./controls";
//import Style from "./dtt.module.css";
import WebServices from "../webservices/WebServices";
import { Track } from "../GeneticElementsGraphicLibrary";
import DttContext from "./context";

class DrawingTracesTool extends Component {
  drawPlaceId = `divCanvas_${this.props.context}Context${this.props.id}`;
  drawPlaceName = `${this.props.context}_${this.props.id}`;
  canvaId = `canvaGE_${this.props.id}`;

  constructor(props) {
    super(props);
    this.dttContext = new DttContext(
      this.props.context,
      this.props,
      this.props.id,
    );

    if (this.dttContext.getRegulator()) {
      this.Regulator = this.dttContext.getRegulator();
      this.regulatoryRegion = this.dttContext.getRegulatoryRegion();
    }
    this.leftEndPosition = this.dttContext.getLeftEndPosition();
    this.rightEndPosition = this.dttContext.getRightEndPosition();
    this.state = {
      zoom: 0.25,
      move: 0.15,
      currentLeftEndPosition: this.dttContext.getLeftEndPosition(),
      currentRightEndPosition: this.dttContext.getRightEndPosition(),
      geneticElements: undefined,
      expand: false,
    };
    this.draw = this.draw.bind(this);
  }

  draw(
    currentLeftEndPosition,
    currentRightEndPosition,
    geneticElements,
    dttContext,
  ) {
    let drawPlace = document.getElementById(this.drawPlaceId);
    if (drawPlace) {
      if (geneticElements) {
        let width = drawPlace.clientWidth;
        let height = this.props.height;
        const drawGenes = new Track({
          id: this.drawPlaceId,
          canva_id: this.canvaId,
          width: width,
          height: height,
          labelTitle: this.props.labelTitle,
        });
        //console.log(this.props.id);
        //
        let _geneticElements =
          dttContext.geneticElementsOnContext(geneticElements);
        //console.log(_geneticElements)
        drawGenes.draw(
          _geneticElements,
          currentLeftEndPosition,
          currentRightEndPosition,
        );
        //
        /*setTimeout(function () {
          set_geneticElements(undefined);
          set_posLeft(_posLeft - move);
          set_posRight(_posRight - move);
        }, 100);*/
      }
    }
  }

  render() {
    //console.log(this.props)
    const { currentLeftEndPosition, currentRightEndPosition, geneticElements } =
      this.state;
    return (
      <div>
        {!geneticElements && (
          <WebServices
            datamart_name="getGeneticElementsFromInterval"
            variables={{
              leftEndPosition: currentLeftEndPosition,
              rightEndPosition: currentRightEndPosition,
              covered: this.props.covered,
              objectType: this.props.objectType,
              strand: this.props.strand,
              organismId: this.props.organismId,
            }}
            getData={(data) => {
              this.props.getGeneticElements(data.GE);
              this.setState({ geneticElements: data.GE });
              this.draw(
                currentLeftEndPosition,
                currentRightEndPosition,
                data.GE,
                this.dttContext,
              );
            }}
            getState={(status) => {
              this.props.getStatus(status);
            }}
          />
        )}
        <div>
          {this.props.controls &&
            Controls({
              variant: this.props.variant,
              leftEndPosition: this.leftEndPosition,
              rightEndPosition: this.rightEndPosition,
              strand: this.props.strand,
              context: this.props.context,
              ...this.state,
              drawPlaceId: this.drawPlaceId,
              geneticElements: this.state.geneticElements,
              canvaId: this.canvaId,
              drawPlaceName: this.drawPlaceName,
              regulatoryRegion: this.regulatoryRegion,
              set_expand: (expand) => {
                this.setState({ expand: expand });
              },
              setGeneticElements: (ge) => {
                this.setState({ geneticElements: ge });
              },
              setPosLeft: (left) => {
                this.setState({ currentLeftEndPosition: left });
              },
              setPosRight: (right) => {
                this.setState({ currentRightEndPosition: right });
              },
            })}
        </div>
        <div>
          <div
            style={{ height: `${this.props.height}px`, width: "100%" }}
            id={this.drawPlaceId}
          />
        </div>
      </div>
    );
  }
}

const isContext = (props, propName, componentName) => {
  const validContext = ["gene", "operon", "dti", undefined];
  if (!validContext.find((e) => e === props[propName])) {
    return new Error(
      "Invalid prop `" +
        propName +
        "` supplied to" +
        " `" +
        componentName +
        "`. Validation failed," +
        "valid elements: " +
        validContext.join(","),
    );
  }
};

const isStrand = (props, propName, componentName) => {
  const validContext = ["forward", "reverse", "both"];
  if (!validContext.find((e) => e === props[propName])) {
    return new Error(
      "Invalid prop `" +
        propName +
        "` supplied to" +
        " `" +
        componentName +
        "`. Validation failed," +
        "valid elements: " +
        validContext.join(","),
    );
  }
};

DrawingTracesTool.defaultProps = {
  getGeneticElements: () => {},
  controls: true,
  height: 200,
  getStatus: () => {},
  labelTitle: "",
  strand: "both",
};

DrawingTracesTool.propTypes = {
  id: PropTypes.string.isRequired,
  labelTitle: PropTypes.string,
  relatedIds: PropTypes.array,
  height: PropTypes.number,
  context: isContext,
  leftEndPosition: PropTypes.number,
  rightEndPosition: PropTypes.number,
  covered: PropTypes.bool,
  objectType: PropTypes.array,
  //fragments: PropTypes.array,
  strand: isStrand,
  custom_geneticElements: PropTypes.array,
  getGeneticElements: PropTypes.func,
  getStatus: PropTypes.func,
  controls: PropTypes.bool,
};

export default DrawingTracesTool;

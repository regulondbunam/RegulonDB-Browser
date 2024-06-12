import { gql } from "@apollo/client";

export const query_GET_GE_Interval = gql`query GET_GE(
    $covered: Boolean = false
    $leftEndPosition: Int
    $objectType: [String]
    $rightEndPosition: Int
    $strand: String
  ) {
    getGeneticElementsFromInterval(
      covered: $covered
      leftEndPosition: $leftEndPosition
      objectType: $objectType
      rightEndPosition: $rightEndPosition
      strand: $strand
    ) {
      _id
      labelFont
      labelName
      labelRGBColor
      labelSize
      leftEndPosition
      lineRGBColor
      lineType
      lineWidth
      linkedObjectWhenNoPositions {
        _id
        leftEndPosition
        name
        rightEndPosition
        strand
        type
      }
      objectRGBColor
      objectType
      organism {
        _id
        name
      }
      relatedGenes {
        _id
        effect
        objectRGBColor
        strand
        tooltip
      }
      rightEndPosition
      strand
      tooltip
    }
  }
  `
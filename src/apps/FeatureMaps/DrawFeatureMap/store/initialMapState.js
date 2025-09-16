const initialMapState = {
  isMenuOpen: true,
  featureMapData: null,
  annotations: null,
  columns: null,
  columnMapping: null,
  tracks: null,
  document:{
    scaleBar: {
      width: null,
    },
    focusBar:{
      right: 0,
      width: null,
    },
    menu: {
      open: true,
    }
  },
  fragment: {
    width: 0,
    positions:{
      start: 0,
      end: 0,
    },
    focus: {
      startPosition: 0,
      endPosition: 0,
      width: 0,
    }
  },
}

export default initialMapState

/*
const initialMapState = {
  isMenuOpen: true,
  scaleBar: {
    width: 0,
    positions: {
      start: null,
      end: null,
      right: 0
    },
  },
  document:{
    scaleBar: {
      width: 0,
    }
  },
  featureMapData: null,
  annotations: null,
  columns: null,
  columnMapping: null,
  tracks: null,
}

* */
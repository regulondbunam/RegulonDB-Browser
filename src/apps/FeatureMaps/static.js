export const ACTIONS = {
    SET_ORIGIN_DATA: 0,
    SET_TITLE: 1,
    TO_DRAW: 2,
    SET_SCALE: 3,
    SET_MEASURE: 4,
    SET_START_LIMIT: 5,
    SET_END_LIMIT: 6,
    SET_BACKGROUND_COLOR: 7,
    SET_TRACK_HEIGHT: 8,
    SET_TRACK_COLOR: 9,
    SET_HANDLE_ANNOTATIONS: 10,
    SET_COLUMN_LABEL: 11,
    SET_BASE_COLOR: 12,
}

export const HANDLE_ANNOTATIONS = {
    label: 0,
    dot: 1,
}

export const FORMATS = {
    FEATURE_MAPS: "featureMaps"
}

export const SCALE_VAL = 1.0

export const FEATURE_MAP_COLUMNS = [
    "mapName",
    "type",
    "identifier",
    "strand",
    "startPosition",
    "endPosition",
    "sequence",
    "score",
    "evidence",
    "additional",
]

export const COLOR_PALETTE_OPTIONS = {
    color: "color",
    monochromatic: "monochromatic",
    //colorblindness: "colorblindness",
    ColorFile: "ColorFile"
}

export const COLOR_OPACITY_BY = {
    none: 'none',
    evidence : 'evidence',
    score: 'score'
}

/*
mapName: 0, //is a track name
    type: 1,
    identifier: 2,
    strand: 3,
    startPosition: 4,
    endPosition: 5,
    sequence: 6,
    score: 7,
    additional: 8
*/
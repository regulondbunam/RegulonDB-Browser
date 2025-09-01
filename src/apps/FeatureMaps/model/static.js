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
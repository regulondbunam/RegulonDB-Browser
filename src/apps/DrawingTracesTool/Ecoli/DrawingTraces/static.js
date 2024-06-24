export const MOVE = 0.15
export const ZOOM = 0.25
export const CONTROLS_POSITIONS ={
    UP_RIGHT: "ur",
    UP_LEFT: "ul",
    BOTTOM_RIGHT: "br",
    BOTTOM_LEFT: "bl"
}

export const FOCUS_TYPE = {
    BORDER: "border",
    ONLY_FOCUS: "onlyFocus",
    OPACITY: "opacity",

}

export const REDUCER ={
    MoveLeft: 0,
    MoveRight: 1,
    ZoomIn: 2,
    ZoomOut: 3,
    Reset: 4,
}

export const OBJECT_TYPES = [
    {
        "key": "gene",
        "label": "Gene",
        "isCheck": true
    },
    {
        "key": "promoter",
        "label": "Promoter",
        "isCheck": true
    },
    {
        "key": "tf_binding_site",
        "label": "TF Binding Site",
        "isCheck": true
    },
    {
        "key": "operon",
        "label": "Operon",
        "isCheck": true
    },
    {
        "key": "rna",
        "label": "RNA",
        "isCheck": true
    },
    {
        "key": "riboswitch",
        "label": "Riboswitch",
        "isCheck": true
    },
    {
        "key": "translational_attenuator",
        "label": "Translational Attenuator",
        "isCheck": true
    },
    {
        "key": "transcriptional_attenuator",
        "label": "Transcriptional Attenuator",
        "isCheck": true
    },
    {
        "key": "ppGpp",
        "label": "ppGpp",
        "isCheck": true
    }
]
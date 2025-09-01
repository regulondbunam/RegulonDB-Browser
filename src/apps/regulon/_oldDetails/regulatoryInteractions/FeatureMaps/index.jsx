import {
    DataVerifier,
} from "../../../../../components/ui-components";
import {useMemo} from "react";

export default function FeatureMap({ type="", regulatoryInteractions, allCitations, tfName}) {
    const data = useMemo(() => {
        return formatDataTracks(regulatoryInteractions, type);
    })
    console.log(data)
    return null;
}

function formatDataTracks(regulatoryInteractions = [], type ) {
    let tracks = {};
    const _governmentLabels = {}
    const _governmentSymbols = {}
    console.log(type)
    regulatoryInteractions.forEach(interaction => {
        if (type === "promoter"){
            if(DataVerifier.isValidNumber(interaction.distanceToPromoter)){
                const promoter = interaction.regulatedEntity
                const regulatoryBindingSite  =interaction.regulatoryBindingSites;
                const rbsSize = regulatoryBindingSite.rightEndPosition - regulatoryBindingSite.leftEndPosition;
                const activeConformation = interaction.activeConformation
                if(tracks[promoter.name] === undefined){
                    _governmentLabels[promoter.name] = ""
                    _governmentSymbols[promoter.name] = "m1 5a1 1 0 008 0A1 1 0 001 5"
                    tracks[promoter.name]= {
                        id: promoter._id,
                        type: "promoter",
                        name: promoter.name,
                        SEQ_START: 0,
                        SEQ_END: 0,
                        features: []
                    }
                }else{
                    tracks[promoter.name].features.push({
                        id: interaction._id,
                        type: "tfbs",
                        label: activeConformation.name,
                        strand: regulatoryBindingSite.strand === "reverse" ? "-" : "+",
                        leftEndPosition: interaction.distanceToPromoter * -1,
                        rightEndPosition: (interaction.distanceToPromoter + rbsSize)*-1,
                        sequence: regulatoryBindingSite.sequence,
                        score: 0,
                        trackKey: promoter.name,
                        identifier: activeConformation.name,
                    })
                }
            }
        }

    })
    return {...tracks, _governmentLabels, _governmentSymbols};
}
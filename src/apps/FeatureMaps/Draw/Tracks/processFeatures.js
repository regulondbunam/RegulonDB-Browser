import { HANDLE_ANNOTATIONS } from '../../static'

export default function processFeatures(features, _governmentSymbols, _governmentLabels, handleAnnotation, labelColumn) {
    let _features = []
    const maxScore = features.reduce((max, feature) => Math.max(max, feature.score), 0);
    const sortedFeatures = features.sort((a, b) => a.leftEndPosition - b.leftEndPosition);
    for (const feature of sortedFeatures) {
        const label = getLabelColumn(feature, labelColumn)
        const size = getSize(feature.label,handleAnnotation)
        _features.push({
            id: feature.id,
            feature: { ...feature },
            annotation: {
                handleAnnotation: handleAnnotation,
                isSymbol: handleAnnotation !== HANDLE_ANNOTATIONS.label,
                label: label,
                symbolPath: _governmentSymbols[feature.label],
                overlap: 0,
                position: feature.rightEndPosition,
                posLeft: feature.leftEndPosition,
                posRight: feature.rightEndPosition+size,
                size: size
            },
            maxScore: maxScore,
            color: _governmentLabels[feature[labelColumn]],
        })
    }
    if (handleAnnotation) {
        for (let i = 0; i < _features.length; i++) {
            const annotation = _features[i].annotation;
            for (let j = i + 1; j < _features.length; j++) {
                const annotation2 = _features[j].annotation;
                if (
                    annotation.posLeft <= annotation2.posRight &&
                    annotation.posRight >= annotation2.posLeft
                ) {
                    _features[j].annotation.overlap += 1
                    _features[j].annotation.posLeft += _features[i].annotation.size
                    _features[j].annotation.posRight += _features[i].annotation.size
                }
            }
        }
    }

    return _features
}

function getLabelColumn(feature, labelColumn) {
    return feature['label']
}

function getSize(label, handleAnnotation) {
    let size = 0
    switch (handleAnnotation) {
        case HANDLE_ANNOTATIONS.dot:
            size = 10
            break;
        case HANDLE_ANNOTATIONS.label:
            size = label.length * 10
            break;
        default:
            break;
    }
    return size
}
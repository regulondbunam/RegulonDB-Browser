import { Typography } from '@mui/material';
import PropTypes from 'prop-types';


/**
 * Description placeholder
 * 
 * @type {{ externalCrossReferenceId: any; externalCrossReferenceName: any; objectId: any; url: any; }}
 */
const PROP_TYPES = {
    externalCrossReferenceId: PropTypes.string.isRequired,
    externalCrossReferenceName: PropTypes.string,
    objectId: PropTypes.string,
    url: PropTypes.string,
}


/**
 * Description placeholder
 *
 * @param {{ externalCrossReferenceId?: string; externalCrossReferenceName?: string; objectId?: string; url?: string; variant?: string; }} {
    externalCrossReferenceId = "",
    externalCrossReferenceName = "",
    objectId = "",
    url = "",
    variant = "paragraph"
}
 * @returns {React.JSX}
 */
function ExternalCrossReference({
    externalCrossReferenceId = "",
    externalCrossReferenceName = "",
    objectId = "",
    url = "",
    variant = "paragraph"
}) {


    /**
     * Description placeholder
     * 
     * @type {{}}
     */
    let style = {}
    switch (variant) {
        case "list":
            break;
        default:
            style = { float: "left", marginRight: "5px" }
            break;
    }

    return <Typography variant='normal' > <a
        href={`${url}`}
        target="_blank"
        rel="noreferrer"
        style={{ fontSize: "12px" }}
    >
        {`${externalCrossReferenceName}`}
    </a> </Typography>
}

ExternalCrossReference.propTypes = PROP_TYPES


/**
 * Description placeholder
 *
 * @param {{ externalCrossReferences?: {}; variant?: string; }} {
    externalCrossReferences = [],
    variant = "paragraph",
}
 * @returns {React.JSX}
 */
function ExternalCrossReferences({
    externalCrossReferences = [],
    variant = "paragraph",
}) {
    return (
        <div>
            {externalCrossReferences.map(

                /**
                * Render an ExternalCrossReference component for each external cross-reference.
                *
                * @param {Object} ecr - The external cross-reference object.
                * @param {number} index - The index of the external cross-reference in the array.
                * @returns {React.JSX} The JSX for the ExternalCrossReference component.
                */
                (ecr, index) => {
                    return <ExternalCrossReference
                        key={`${ecr.externalCrossReferenceId}_${index}`}
                        variant={variant}
                        {...ecr}
                    />
                })}
        </div>
    )
}


export { ExternalCrossReference, ExternalCrossReferences };
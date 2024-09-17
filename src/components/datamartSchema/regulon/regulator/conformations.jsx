import { FilterTable } from "../../../ui-components"

const COLUMNS = [
    {
        id: 'conformationName',
        header: 'Name',
        filter: "fuzzyText",
        accessorKey: '_name'
    },
    {
        id: 'conformationType',
        header: 'Type',
        filter: "fuzzyText",
        accessorKey: '_type'
    },
    {
        id: 'conformationFunctionalType',
        header: 'FunctionalType',
        filter: "fuzzyText",
        accessorKey: '_functionalType'
    },
    {
        id: 'conformationEffector',
        header: 'Effector',
        filter: "fuzzyText",
        accessorKey: '_effector'
    },
    {
        id: 'conformationInteractionType',
        header: 'Interaction Type',
        filter: "fuzzyText",
        accessorKey: '_InteractionType'
    },
    {
        id: 'conformationConfidenceLevel',
        header: 'Confidence Level',
        filter: "fuzzyText",
        accessorKey: '_ConfidenceLevel'
    },
    {
        id: 'conformationCitations',
        header: 'Citations',
        filter: "fuzzyText",
        accessorKey: '_Citations'
    },
]

export default function Conformations({ conformations = [] }) {
    return (
        <table  >
            <thead>
                <tr>
                <th>Type</th>
                <th>Class</th>
                    <th>Name</th>
                   
                </tr>
            </thead>
            <tbody>
                {
                    conformations.map((conformation, index) => {
                        //console.log(conformation);
                        return <Conformation key={conformation._id + "_" + index + "Conformation"} {...conformation} />
                    })
                }
            </tbody>
        </table>
    )
}

function Conformation( props ) {
    const {
 //       _id = "",
 //       additiveEvidences = [],
  //      citations = [],
   //     confidenceLevel = "",
   //     effector,
  //      effectorInteractionType = "",
 //       functionalType = "",
        name = "",
 //       note = "",
        type = "",
    } = props

    return (
        <tr>
            <td>{type}</td>
            <td>{props.class}</td>
            <td>{name}</td>

        </tr>
    )
}
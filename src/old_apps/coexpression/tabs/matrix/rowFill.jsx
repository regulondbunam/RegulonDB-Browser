import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const QUERY_getRankFromGeneList = gql`
query getRankFromGeneList($geneId:String!, $geneIdList:[String]!){
    getRankFromGeneList(geneId:$geneId, geneIdList:$geneIdList){
        gene {
            _id
            name
        }
        rank
        rgbColor
    
    }
}
`
export function RowMatrix({ geneId, geneIdList = [] }) {

    const { loading, error, data } = useQuery(QUERY_getRankFromGeneList, { variables: { "geneId": geneId, "geneIdList": geneIdList } });

    if (loading) {
        return (
            <tr>
                <td>
                    <CircularProgress />
                </td>
            </tr>
        );
    } if (error) {
        console.error(error)
        return (
            <tr>
                <td />
            </tr>
        );
    } if (data) {

        const cells = data.getRankFromGeneList
        return (
            <tr>{
                cells.map((cell) => {
                    const rgbColor = cell.rgbColor
                    const rank = cell.rank
                    return (
                        <td style={{backgroundColor: "rgb("+rgbColor+")"}}>
                            {rank}
                        </td>
                    );
                })}
                
            </tr>
        );
    }
    return
}

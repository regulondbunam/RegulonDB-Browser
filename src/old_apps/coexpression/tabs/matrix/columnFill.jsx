import { useEffect, useState } from 'react';
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

export function fillCell(geneId, data) {
        data.getRankFromGeneList.forEach(coexpression => {
            const cell = document.getElementById(geneId + "_" + coexpression.gene[0]._id)
            if (cell) {
                cell.innerHTML = coexpression.rank.toFixed(2)
                cell.style.backgroundColor = "rgb(" + coexpression.rgbColor + ")"
            }

        });
}

export function ColumnFill({ geneId, rankingIdList, getData = ()=>{} }) {
    const { loading, error, data } = useQuery(QUERY_getRankFromGeneList, { variables: { "geneId": geneId, "geneIdList": rankingIdList } });

    useEffect(() => {
        if (data && !error) {
            getData(data)
        }
    }, [data,error,getData]);

    if (loading) {
        for (let index = 0; index < rankingIdList.length; index++) {
            const rankId = rankingIdList[index];
            const cell = document.getElementById(geneId + "_" + rankId)
            if(cell){
                cell.innerHTML = "loading"
            }
            
        }
    }
    if (data && !error) {
        fillCell(geneId,data)
    }

    return <></>
}
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { query_GET_PHRASE_OF } from './gql'


const GetPhraseOf = ({
    id,
    status = () => { },
    resoultsData = () => { },
}) => {
    const { loading, error, data } = useQuery(query_GET_PHRASE_OF, {
        variables: { id },
    });
    useEffect(() => {
        if (loading) {
            status('loading')
        }
        if (data ) {
            try {
                resoultsData(data.getPhraseOf)
                status('done')
            } catch (error) {
                status('error')
                console.log(error)
            }
        }
        if (error) {
            status('error')
            console.log(error)
        }

    }, [loading, error, status, data, resoultsData])
    return (<></>);
}

export default GetPhraseOf;
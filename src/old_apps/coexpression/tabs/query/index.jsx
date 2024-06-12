import * as React from 'react';
import Tools from "./tools";
import Querygene from "./queryGene";
import Style from "./query.module.css"
import ResultsTable from './resultsTable';

function Query({ geneList, setQuery, query, handleSearch, genesData, cleanInfo = () => { } }) {

    const [Reset, setReset] = React.useState(true);

    const handleReset = () => {
        setReset(!Reset)
    }

    React.useEffect(() => {
        if (!Reset) {
            setReset(true)
        }
    }, [Reset, setReset]);

    return (
        <div>

            {geneList && (
                <div>
                    <div id="co_query" className={Style.co_query} >
                        <div id="co_query_textArea">
                            <Querygene query={query} setQuery={setQuery}  />
                        </div>
                        {
                            Reset && (
                                <div id="co_query_tools" >
                                    <Tools geneList={geneList.getObjectList} handleSearch={handleSearch} query={query} setQuery={setQuery} handleReset={handleReset} cleanInfo = {cleanInfo} />
                                </div>
                            )
                        }


                    </div>
                    {genesData && (
                        <div>
                            <ResultsTable genesData={genesData.getGenesBy.data} />
                        </div>
                    )}

                </div>
            )}


        </div>
    );
}

export default Query;
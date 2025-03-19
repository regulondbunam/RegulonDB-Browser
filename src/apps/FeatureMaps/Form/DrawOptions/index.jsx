import React from 'react'
import Style from './style.module.css'
import Map from './Map'
import Tracks from './Tracks'
import Features from './Features'
import Annotations from './Annotations'

export {Map, Tracks, Features, Annotations}


export default function DrawOptions(props) {
    return (
        <div>
            <h2>Draw Options</h2>
            <div className={Style.gridContainer}>
                <div className={Style.gridItem}>
                    <Map {...props} />
                </div>
                <div className={Style.gridItem}>
                    <Tracks {...props} />
                </div>
                <div className={Style.gridItem}>
                    <Features {...props} />
                </div>
                <div className={Style.gridItem}>
                    <Annotations {...props} />
                </div>
            </div>
        </div>
    )
}

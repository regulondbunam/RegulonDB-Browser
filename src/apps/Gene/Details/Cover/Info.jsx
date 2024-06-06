import React from 'react'
import { Typography, Tooltip, Divider } from '@mui/material'
import { DataVerifier } from 'ui-components/utils'
import style from "./cover.module.css"

export default function Info({
    centisomePosition,
    gcContent,
    leftEndPosition,
    rightEndPosition,
    strand,
}) {
    return (
        <div>
            <div>
                {DataVerifier.isValidNumber(leftEndPosition) && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="relevantB" sx={{ mr: 1 }}>
                            Position:
                        </Typography>
                        <Tooltip title="left position">
                            <Typography variant="relevant">
                                {leftEndPosition} &nbsp;
                            </Typography>
                        </Tooltip>
                        <Typography variant="relevant">
                            {strand === "reverse" ? "<-" : "->"} &nbsp;
                        </Typography>
                        <Tooltip title="right position">
                            <Typography variant="relevant">
                                {rightEndPosition} &nbsp;
                            </Typography>
                        </Tooltip>
                        <Tooltip title="centisome position">
                            <Typography variant="relevant">
                                ({centisomePosition}&nbsp;centisome)&nbsp;
                            </Typography>
                        </Tooltip>
                        <Tooltip title="length">
                            <Typography variant="relevant">
                                ({1 + rightEndPosition - leftEndPosition + " bp"})
                            </Typography>
                        </Tooltip>

                    </div>
                )}
                <div className={style.properties}>
                    {DataVerifier.isValidString(strand) && (
                        <div>
                            <Typography variant="relevantB" sx={{ mr: 1 }}>
                                Strand:
                            </Typography>
                            <Typography variant="relevant" >
                                {strand}
                            </Typography>
                        </div>
                    )}
                    {DataVerifier.isValidNumber(gcContent) && (
                        <>
                        <Divider orientation="vertical" sx={{ height: "18px", ml: 1, mr: 1 }} />
                        <div>
                            <Typography variant="relevantB" sx={{ mr: 1 }}>
                                GC content:
                            </Typography>
                            <Typography variant="relevant" >
                                {gcContent.toFixed(2)}%
                            </Typography>
                        </div>
                        </>
                    )}
                    <Divider orientation="vertical" sx={{ height: "18px", ml: 1, mr: 1 }} />
                </div>


            </div>
            <div>

            </div>
        </div>
    )
}

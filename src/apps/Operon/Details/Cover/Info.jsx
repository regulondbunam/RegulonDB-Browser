import React from 'react'
import { Typography, Tooltip, Divider } from '@mui/material'
import { DataVerifier } from 'ui-components/utils'
import style from "./cover.module.css"

export default function Info({
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
                            Regulation Position:
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
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

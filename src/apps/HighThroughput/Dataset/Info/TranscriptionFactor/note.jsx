import React,{ useState } from 'react';

export default function Note({note = ""}) {

    const [_display, set_display] = useState(false)

    if (!note) {
        return null
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                        {
                            _display
                            ?<div>
                                <p dangerouslySetInnerHTML={{__html: note}}/>
                            </div>
                            :<p dangerouslySetInnerHTML={{__html: note.substring(0,200)}}/>
                        }
                        
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {
                                note.length>200
                                ?<button className="aBase" onClick={()=>{set_display(!_display)}} >
                                    {
                                        _display
                                        ?"Show Less"
                                        :"Show More"
                                    }
                                    </button>
                                : null
                            }
                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}



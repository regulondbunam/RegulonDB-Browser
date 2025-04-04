import React from 'react'
import Desktop from './Desktop';
import Mobile from './Mobile';
import {isMobile} from 'react-device-detect';

export const idMenu = "rdbMenu"

export default function Menu() {
    if(isMobile){
        return <Mobile />
    }
  return (
    <Desktop />
  )
}

import React from 'react'
import Desktop from './Desktop';
import { isMobile } from 'react-device-detect';

export default function Menu() {
  if (isMobile) {
    return <>Movil</>
  }
  return <Desktop />
}

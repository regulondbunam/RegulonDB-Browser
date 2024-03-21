import React from 'react'
import Desktop from './Desktop';
import { isMobile } from 'react-device-detect';
import Movil from './Movil';

export default function Menu() {
  if (isMobile) {
    return <Movil />
  }
  return <Desktop />
}

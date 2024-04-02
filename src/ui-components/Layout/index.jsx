import { Outlet } from "react-router-dom"
import { isMobile } from 'react-device-detect';
import Desktop from "./Desktop";
import Movil from "./Movil";

export default function Layout() {
  if (isMobile) {
    return (
      <Movil>
        <div className="rdb_Layout_Body">
          <Outlet />
        </div>
      </Movil>
    )
  }
  return (
    <Desktop>
      <div className="rdb_Layout_Body">
        <Outlet />
      </div>
    </Desktop>
  )
}

import Styles from "./positionbar.module.css"
import dny from "./assets/dnaYW.png"

export default function Position({ width }) {
  console.log(width);
  return <div className={Styles.content} >
    <div className={Styles.dnaImage} style={{backgroundImage: `url(${dny})` }} />
  </div>;
}
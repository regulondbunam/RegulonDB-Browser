import Styles from "./style.module.css";
import Scale from "./Scale";
import Position from "./Position";
import useHandlingBarVM from "../../../viewModel/canva/useHandlingBarVM";

export default function HandlingBar() {
  const { width, refBar, BarComponent } = useHandlingBarVM();
  return (
    <div className={Styles.content} ref={refBar}>
      {width && (
        <>
          <Position width={width} BarComponent={BarComponent} />
          <Scale width={width} BarComponent={BarComponent} />
        </>
      )}
    </div>
  );
}

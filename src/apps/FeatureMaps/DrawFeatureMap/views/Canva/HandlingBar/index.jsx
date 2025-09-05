import Styles from "./style.module.css";
import Scale from "./Scale";
import Position from "./Position";
import useHandlingBarVM from "../../../viewModel/canva/useHandlingBarVM";

export default function HandlingBar() {
  const { width, refBar } = useHandlingBarVM();
  return (
    <div className={Styles.content} ref={refBar}>
      {width && (
        <>
          <Position width={width} />
          <Scale width={width} />
        </>
      )}
    </div>
  );
}

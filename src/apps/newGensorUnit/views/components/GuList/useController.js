import { useRef, useState } from "react";
import filterByLabel from "../../../model/filterByLabel";
import filterBySecondaryLabel from "../../../model/filterBySecondaryLabel";

export default function useController(list) {
  const [filterA, setFilterA] = useState("");
  const [filterB, setFilterB] = useState("");
  const [rows, setRows] = useState(list);
  const throttleRef = useRef(false);

  const handleFilterA = (e) => {
    const value = e.target.value;
    if (value === "") {
      setFilterA(value);
      setRows(list)
      throttleRef.current = false;
      return;
    }
    if(!throttleRef.current){
      throttleRef.current = true;
      setTimeout(()=>{
        setFilterA(value);
        setRows(filterByLabel(list, value));
        throttleRef.current = false;
      }, 100)
    }
  }

  const handleFilterB = (e) => {
    const value = e.target.value;
    if (value === "") {
      setFilterB(value);
      setRows(list)
      throttleRef.current = false;
      return;
    }
    if(!throttleRef.current){
      throttleRef.current = true;
      setTimeout(()=>{
        setFilterB(value);
        setRows(filterBySecondaryLabel(list, value));
        throttleRef.current = false;
      }, 100)
    }
  }

  return {
     handleFilterA,
     handleFilterB,
     filterA,
     filterB,
     rows,
   }

}
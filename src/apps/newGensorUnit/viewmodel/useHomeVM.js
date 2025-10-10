import { useGetAllGus } from "../../../components/webservices";
import { useMemo, useState } from "react";
import sortGUsByName from "../model/sortGUsByName";
import sortGUsByFunctional from "../model/sortGUsByFunctional";



export default function useHomeVM(){
  const [option, setOption] = useState(0);
  const { gusData, error, loading } = useGetAllGus();

  const gusByName = useMemo(()=>sortGUsByName(gusData), [gusData]);
  const gusByFunctional = useMemo(()=>sortGUsByFunctional(gusData), [gusData]);

  const SORT_OPTIONS = ["Name", "Functional Group"]
  const guList = {
    0: gusByName,
    1: gusByFunctional,
  }

  return {
    SORT_OPTIONS,
    guList,
    option,
    error,
    loading,
    setOption,
  }
}
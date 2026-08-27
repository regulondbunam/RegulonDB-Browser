import { useSearchParams } from "react-router-dom";
import useGetObjectList from "../webservices/objectList";

export default function useObjectListPage({ datamartType, title}) {

  const [searchParams] = useSearchParams();
  const organismId = searchParams.get("organism");

  const DEFAULT_ORGANISM_ID = "RDBECOLIORC00001";
  const organismNotSupported = organismId && organismId !== DEFAULT_ORGANISM_ID && datamartType !== "gene";

  const {
    objectsList,
    loading,
    error,
  } = useGetObjectList({
    datamartType,
    organismId,
    skip: organismNotSupported
  });

  let state = "done";
  let currentTitle = title;

  if (loading) {
    state = "loading";
    currentTitle =
      `Loading ${title.toLowerCase()} list`;
  }

  if (organismNotSupported && title.toLowerCase() !== "genes") {
    state = "error";
    currentTitle =
      `No ${title.toLowerCase()} are currently available for the selected organism`;
  }

  if (error) {
    state = "error";
    currentTitle =
      "... Sorry, we have an error, try again later 🥲";
  }

  return {
    objectsList,
    loading,
    error,
    state,
    title: currentTitle,
    organismId,
  };
}
import React, { createContext, useState } from "react";
import WebServices from "./WebServices";

export const DataCONTEXT = createContext();

export function DataProvider({
  datamart_name,
  variables,
  children,
  getState = () => {},
  isGetRelatedIDs = false,
  isGetPhrases = false,
}) {
  const [_data, set_data] = useState();
  if (!_data) {
    return (
      <WebServices
        isGetRelatedIDs={isGetRelatedIDs}
        isGetPhrases={isGetPhrases}
        datamart_name={datamart_name}
        variables={variables}
        getData={(data) => {
          set_data(data);
        }}
        getState={getState}
      />
    );
  } else {
    return (
      <DataCONTEXT.Provider value={{ _data }}>{children}</DataCONTEXT.Provider>
    );
  }
}

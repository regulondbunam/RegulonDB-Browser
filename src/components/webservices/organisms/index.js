import { useQuery, useLazyQuery } from "@apollo/client";
import { get_all_organisms } from "./queries";
import { useState } from "react";
import { DataVerifier } from "../../ui-components";

export function useAllOrganisms(search) {
  const { data, loading, error } = useQuery(get_all_organisms, {
    variables: { search },
  });

  return {
    organismsData: data?.getAllOrganisms ?? [],
    loading,
    error,
  };
}
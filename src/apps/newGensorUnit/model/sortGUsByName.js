import { DataVerifier } from "../../../components/ui-components";

export default function sortGUsByName(gusData = []) {
  if (!DataVerifier.isValidArray(gusData)) return [];

  return gusData
      .map(({ gensorUnit: gu } = {}) => {
        const groupsArr = Array.isArray(gu?.groups)
          ? gu.groups.map((g) => {
            if(g==="undefined") return { id: null, label: null };
            return { id: null, label: g }
            })
          : [];
        if(gu?.id) return {name: null}
        const label = gu?.name || gu._id;
        return {
          label,
          primary:{
            id: gu._id,
            label,
          },
          secondary: groupsArr,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label, "es", { sensitivity: "base", numeric: true }));
}

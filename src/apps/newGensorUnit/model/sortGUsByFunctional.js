import { DataVerifier } from "../../../components/ui-components";

export default function sortGUsByFunctional(gusData = []) {
  if (!DataVerifier.isValidArray(gusData)) return [];

  const groupsMap = new Map(); // idGroup -> { id, _group, gensorUnits[] }

  const upsertGroup = (groupLabel, gu) => {
    const label = DataVerifier?.isValidString?.(groupLabel) ? groupLabel : "";
    const idGroup = label.replace(/\s+/g, "_"); // ID estable

    if (!groupsMap.has(idGroup)) {
      groupsMap.set(idGroup, { id: idGroup, group: label, gensorUnits: [] });
    }
    const row = groupsMap.get(idGroup);

    // Evita duplicados por _id
    if (!row.gensorUnits.some((u) => u?._id === gu?._id)) {
      row.gensorUnits.push({label: gu?.name || gu._id, id: gu._id});
    }
  };

  gusData.forEach(({ gensorUnit: gu } = {}) => {
    if (!gu) return;

    const rawGroups = Array.isArray(gu.groups) ? gu.groups : [];
    const cleanGroups = rawGroups.filter((g) => g && g !== "undefined");

    // Si no trae grupos válidos, mándalo al grupo vacío
    if (cleanGroups.length === 0) {
      upsertGroup("", gu);
    } else {
      cleanGroups.forEach((g) => upsertGroup(g, gu));
    }
  });

  // Arma el arreglo y ordena A-Z por el nombre del grupo (_group)
  return Array.from(groupsMap.values())
    .map((row) => ({
      label: row.group,
      primary: {
        id: null,
        label: row.group
      },
      secondary: row.gensorUnits,
      // (Opcional) ordena los GUs por nombre dentro de cada grupo
    }))
    .sort((a, b) =>
      (a.label ?? "").localeCompare(b.label ?? "", "es", {
        sensitivity: "base",
        numeric: true,
      }),
    );
}

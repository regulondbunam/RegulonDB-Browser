export default function filterBySecondaryLabel(list=[],query) {
  if (!query?.trim()) return list;
  return list.filter((item) => {
    let label = "";
    item.secondary.forEach((item) => {
      label += item.label + " "
    })
    return label.toLowerCase().match(query.toLowerCase())
  })
}
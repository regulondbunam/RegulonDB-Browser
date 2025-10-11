
export default function filterByLabel(list=[],query) {
  if (!query?.trim()) return list;
  return list.filter((item) => {
    return item.label.toLowerCase().match(query.toLowerCase())
  })
}
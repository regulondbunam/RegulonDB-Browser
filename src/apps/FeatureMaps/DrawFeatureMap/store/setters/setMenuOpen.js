export default function setMenuOpen(state) {
  return {
    ...state,
    document: {
      ...state.document,
      menu: { ...state.document.menu, open: !state.document.menu.open },
    },
  };
}

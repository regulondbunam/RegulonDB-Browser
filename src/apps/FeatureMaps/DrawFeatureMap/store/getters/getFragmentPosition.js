export default function getFragmentPosition(document, fragment, clientX) {
  return Math.round(
    fragment.positions.start +
      (clientX * fragment.focus.width) / document.scaleBar.width,
  );
}

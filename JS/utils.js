console.log('utils module loaded');

/**
 * Render Color History Squares
 */
export function renderColorsHistory(arrayOfColors) {
  return arrayOfColors.map(
    (color) => (document.createElement("div").className = "color-square")
  );
}

/**
 * Update Colors Array
 */
export function updateColorsArray() {
    colorsHistory.push(this.value);
}

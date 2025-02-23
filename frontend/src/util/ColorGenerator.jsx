export const generateRandomColor = () => {
  let color, luminance, r, g, b;

  do {
    color = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    r = parseInt(color.substring(0, 2), 16);
    g = parseInt(color.substring(2, 4), 16);
    b = parseInt(color.substring(4, 6), 16);

    luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  } while (luminance < 0.15 || luminance > 0.85 || (r === g && g === b));

  return `#${color}`;
};

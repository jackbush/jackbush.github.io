export const measureContainer = (containerId) => {
  const el = document.getElementById(containerId);
  const size = {};
  size.width = el.clientWidth;
  size.height = el.clientHeight;

  return size;
};

// This is used to give numbers a variance, defaulting to 10%
export const jitter = (number, factor) => {
  factor = factor || 0.1;
  const range = number * factor * Math.random() * 2;
  const variance = range - range / 2;
  return number + variance;
};

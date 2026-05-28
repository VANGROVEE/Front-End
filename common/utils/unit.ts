export const AreaConverter = {
  toMeter: (hectare: number | string): number => {
    return Number(hectare) * 10000;
  },

  toHectare: (meter: number | string): number => {
    const val = Number(meter) / 10000;

    return parseFloat(val.toFixed(4));
  },

  display: (meter: number | string): string => {
    return `${AreaConverter.toHectare(meter)} Ha`;
  },
};

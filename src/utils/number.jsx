import numeral from "numeral";

export const numberFormat = (value) => {
  return numeral(value).format("0,0.00");
};

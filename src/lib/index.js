export const numberFormat0 = (value) =>
  new Intl.NumberFormat([], {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);

export const numberFormat1 = (value) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "DKK",
  }).format(value);

export const numberFormat2 = (value) =>
  new Intl.NumberFormat({}).format(value);

export const numberFormat3 = (value) =>
  new Intl.NumberFormat([], {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export const numberFormat4 = (value) =>
  new Intl.NumberFormat([], {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  }).format(value);

export const numberFormat5 = (value) =>
  new Intl.NumberFormat([], {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
  }).format(value);

export const numberFormat6 = (value) =>
  new Intl.NumberFormat([], {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
    useGrouping: false,
  }).format(value);

export const numberFormat7 = (value) =>
  new Intl.NumberFormat([], {
    minimumFractionDigits: 6,
    maximumFractionDigits: 6,
    useGrouping: false,
  }).format(value);

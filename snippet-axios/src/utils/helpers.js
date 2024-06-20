import { baseUrl, oldUrl } from "../config";

const getDebounce = (delay) => {
  let debouncerTimer;
  return function (func, ...params) {
    clearTimeout(debouncerTimer);
    debouncerTimer = setTimeout(() => func(...params), delay);
  };
};

export const debounce = getDebounce(1000);

export const recreateUrl = (link) => {
  if (link?.includes(oldUrl)) {
    const storagePath = link?.split(oldUrl)[1];
    return baseUrl + storagePath;
  } else if (link?.includes("http://dashboard.clubpassports.com/")) {
    const storagePath = link?.split("http://dashboard.clubpassports.com/")[1];
    return baseUrl + storagePath;
  }
  return link;
};

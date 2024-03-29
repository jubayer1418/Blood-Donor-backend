const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
) => {
  const newObj: Partial<T> = {};
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
};
export default pick;

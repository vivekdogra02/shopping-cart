export function getUniqueItems<T extends Record<string, any>>(
  items: T[],
  key: keyof T
): Array<T> {
  const dups: Record<any, T> = {};

  items.forEach((item) => {
    if (dups[key]) return;
    dups[item[key]] = item;
  });

  return Object.values(dups);
}

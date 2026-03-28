export const getCurrentItemIndexes = ({
  total, skip, limit
}: {
  total: number,
  skip: number,
  limit: number
}) => {
  if (total < 2) {
    return total;
  }

  if (total < limit) {
    return `1 - ${ total }`;
  }

  const start = skip + 1;
  const end = skip + limit;

  return `${ start } - ${ end }`;
};
export const Rating = ({ value }: { value: number }) => {
  const styleByRate = value < 3
    ? { color: '#F11010' }
    : undefined;

  return <><span style={styleByRate}>{value}</span>/5</>;
};

export const joinStringArray = (texts: string[]): string => {
  return texts
    .map(
      (text, i, { length }) =>
        `${text}${i + 2 < length ? ", " : (i + 1 < length && " & ") || ""}`
    )
    .join("");
};

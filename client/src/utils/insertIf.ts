export const insertIf = (condition: boolean, ...elements: any) => {
  return condition ? elements : [];
};

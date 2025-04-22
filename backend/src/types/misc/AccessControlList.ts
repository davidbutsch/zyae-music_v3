export type AccessControlList<Options> = {
  default?: Options[];
  users?: {
    [key: string]: Options[];
  };
};

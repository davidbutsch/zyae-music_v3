export type AppResponse<T> = {
  data: {
    [key: string]: T;
  };
};

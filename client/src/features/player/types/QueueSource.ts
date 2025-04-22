export type QueueSource = {
  id?: string;
  type?: "album" | "playlist";
  title: string;
  queryParams?: string;
};

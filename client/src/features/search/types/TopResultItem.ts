import { Thumbnail } from "@/types";

export type TopResultItem = {
  id: string;
  type: string;
  head: string;
  sub: string;
  thumbnails: Thumbnail[];
  isExplicit?: boolean;
};

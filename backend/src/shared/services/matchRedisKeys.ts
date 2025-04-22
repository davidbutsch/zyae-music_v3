import { DeepPartial } from "@/types";
import { newInternalError } from "@/utils";
import { redis } from "@/loaders";

const isMatch = <T extends Record<string, any>>(
  data: T,
  filter: Record<string, any>
) => {
  for (const prop in filter) {
    if (prop.includes(".")) {
      const nestedProps = prop.split(".");
      var currentData = data;
      for (const nestedProp of nestedProps) {
        currentData = currentData[nestedProp];
        if (currentData === undefined) return false;
      }
      if (currentData !== filter[prop]) return false;
    } else if (typeof filter[prop] === "object" && filter[prop] !== null) {
      if (!isMatch<T>(data[prop], filter[prop])) return false;
    } else if (data[prop] !== filter[prop]) {
      return false;
    }
  }
  return true;
};

export const myVariable = "hello";

export const matchRedisKeys = async <T>(
  prefix: string,
  filter: DeepPartial<T>
): Promise<(T | void)[]> => {
  try {
    const { keys } = await redis.scan(0, {
      MATCH: `${prefix}:*`,
    });

    const matches: T[] = [];

    for (const key of keys) {
      const keyData = (await redis.json.get(key)) as T | null;
      if (!!keyData && isMatch(keyData, filter)) matches.push(keyData);
    }

    return matches;
  } catch (err) {
    throw newInternalError(err);
  }
};

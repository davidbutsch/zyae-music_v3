import { RedisClientType, createClient } from "redis";

import { Logger } from "./logger";
import { Server as SocketServer } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";

export let redis: RedisClientType;

export const redisLoader = async ({ io }: { io: SocketServer }) => {
  try {
    redis = createClient({
      url: "redis://127.0.0.1:6379",
    });

    const pubClient = redis;
    const subClient = redis.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    Logger.info(
      `Connected to Redis on address: ${(await redis.CLIENT_INFO()).laddr}`
    );

    io.adapter(createAdapter(pubClient, subClient));
  } catch (err) {
    Logger.error("Error while connecting to Redis: " + err);
  }
};

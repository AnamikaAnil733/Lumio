import pino from "pino";
import { createStream } from "rotating-file-stream";

const fileStream = createStream("app.log", {
  size: "10M",
  path: "./logs"
});

export const logger = pino(
  {},
  pino.multistream([
    { stream: process.stdout },
    { stream: fileStream }
  ])
);
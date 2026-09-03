import { NextFunction, Request, Response } from "express";

import { env } from "../config/env";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const startedAt = performance.now();

  res.on("finish", () => {
    const elapsed = performance.now() - startedAt;

    console.log(
      [
        `[${env.instanceId}]`,
        req.method,
        req.originalUrl,
        res.statusCode,
        `${elapsed.toFixed(0)}ms`,
      ].join(" "),
    );
  });

  next();
}

"use strict";

import * as Hapi from "@hapi/hapi";
import * as qs from "qs";

import { baseRoutes } from "./routes";

export const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    query: {
      parser: (query) => {
        return qs.parse(query, { allowPrototypes: false });
      },
    },
  });

  server.route([...baseRoutes]);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

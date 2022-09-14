// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { projectRouter } from "./projects";
import { projectMemberRouter } from "./projectMember";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("question.", protectedExampleRouter)
  .merge("project.", projectRouter)
  .merge("projectMember.", projectMemberRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

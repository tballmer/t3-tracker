import { z } from "zod";
import { createProtectedRouter } from "./protected-router";
import { ProjectRole } from "@prisma/client";

// Example router with queries that can only be hit if the user requesting is signed in
export const projectMemberRouter = createProtectedRouter().mutation(
  "addProjectMember",
  {
    input: z.object({
      projectId: z.string(),
      userId: z.string(),
      projectRole: z.nativeEnum(ProjectRole),
    }),
    async resolve({ ctx, input }) {
      try {
        return await ctx.prisma.projectMember.create({
          data: {
            projectId: input.projectId,
            userId: input.userId,
            project_role: input.projectRole,
          },
        });
      } catch (error) {
        console.log(error, "error");
      }
    },
  }
);

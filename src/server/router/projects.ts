import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

// Example router with queries that can only be hit if the user requesting is signed in
export const projectRouter = createProtectedRouter()
  .query("getAllProjects", {
    async resolve({ ctx }) {
      try {
        return await ctx.prisma.projectMember.findMany({
          where: {
            userId: ctx.session.user.id,
          },
          select: {
            project: {
              select: {
                title: true,
                description: true,
                id: true,
                creator: {
                  select: {
                    name: true,
                    image: true,
                  },
                },
              },
            },
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    },
  })
  .mutation("createProject", {
    input: z.object({
      title: z.string(),
      description: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        return await ctx.prisma.project.create({
          data: {
            title: input.title,
            description: input.description,
            creatorId: ctx.session.user.id,
          },
        });
      } catch (error) {
        console.log(error, "error");
      }
    },
  });

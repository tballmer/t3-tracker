import { createProtectedRouter } from "./protected-router";

// Example router with queries that can only be hit if the user requesting is signed in
export const projectRouter = createProtectedRouter()
  .query("getAllProjects", {
    async resolve({ ctx }) {
      try {
        return await ctx.prisma.project.findMany({
          where: {
            creatorId: ctx.session.user.id
          }
        })
      } catch (error) {
        console.log("error", error)
      }
    },
  })
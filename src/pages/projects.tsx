import Header from "../components/header";
import { trpc } from "../utils/trpc";
import type { NextPage } from "next";

const ProjectsList = () => {
  const { data: projects, isLoading } = trpc.useQuery([
    "project.getAllProjects",
  ]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // console.log(projects)
  return <div>Test</div>;
};

const Projects: NextPage = () => {
  // const { data: session, status } = useSession()
  // console.dir(projects)
  return (
    <>
      <Header />
      <ProjectsList />
    </>
  );
};

export default Projects;

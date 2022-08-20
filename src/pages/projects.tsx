import Header from "../components/header";
import { trpc } from "../utils/trpc";
import type { NextPage } from "next";
import Image from "next/image";

const ProjectsList = () => {
  const { data: projects, isLoading } = trpc.useQuery([
    "project.getAllProjects",
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Creator</th>
        </tr>
      </thead>
      <tbody>
        {projects?.map(
          ({
            project: {
              title,
              description,
              id,
              creator: { name, image },
            },
          }) => (
            <tr key={id}>
              <td>{title}</td>
              <td>{description}</td>
              <td>
                <Image
                  src={image ? image : "/circle-user-solid.svg"}
                  alt="User"
                  height={22}
                  width={22}
                  className="rounded-full"
                />
              </td>
              <td>{name}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

const Projects: NextPage = () => {
  return (
    <>
      <Header />
      <ProjectsList />
    </>
  );
};

export default Projects;

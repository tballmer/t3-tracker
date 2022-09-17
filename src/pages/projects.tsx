import Header from "../components/header";
import { trpc } from "../utils/trpc";
import type { NextPage } from "next";
import Image from "next/image";
import InputModal from "../components/inputModal";

const ProjectsList = () => {
  const { data: projects, isLoading } = trpc.useQuery([
    "project.getAllProjects",
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <table>
        <thead>
          <tr className="text-left">
            <th className="p-1">Title</th>
            <th className="p-1">Description</th>
            <th className="p-1">Creator</th>
            <th className="p-1">
              <InputModal />
            </th>
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
              <tr key={id} className="hover:bg-gray-100 hover:cursor-pointer">
                <td className="p-1">{title}</td>
                <td className="p-1">{description}</td>
                <td className="flex items-center p-1">
                  <Image
                    src={image ? image : "/circle-user-solid.svg"}
                    alt="User"
                    height={24}
                    width={24}
                    className="rounded-full"
                  />
                </td>
                <td className="p-1">{name}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
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

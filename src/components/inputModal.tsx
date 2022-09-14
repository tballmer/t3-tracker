import { useState } from "react";
import Image from "next/image";
import { trpc } from "../utils/trpc";

export default function InputModal() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const { title, description } = formData;

  const ctx = trpc.useContext();
  const addCreator = trpc.useMutation(["projectMember.addProjectMember"], {
    onMutate: async () => {
      await ctx.cancelQuery(["project.getAllProjects"]);
      let optimisticUpdate = ctx.getQueryData(["project.getAllProjects"]);
      if (optimisticUpdate) {
        ctx.setQueryData(["project.getAllProjects"], optimisticUpdate);
      }
    },
    onSettled: () => {
      ctx.invalidateQueries("project.getAllProjects");
    },
  });
  const createProject = trpc.useMutation(["project.createProject"], {
    onSuccess: (data) => {
      if (data) {
        addCreator.mutate({
          projectId: data.id,
          userId: data.creatorId,
          projectRole: "Creator",
        });
      } else {
        console.log("Error: Project undefined");
      }
    },
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onClose = () => {
    setShowModal(false);
    setFormData(() => ({
      title: "",
      description: "",
    }));
  };

  const onSubmit = () => {
    createProject.mutate(formData);
    onClose();
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        type="button"
        className="px-2 bg-violet-500 text-white whitespace-nowrap rounded-full hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700"
      >
        New Project
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto w-full sm:w-96">
              {/*content*/}
              <div className="p-2 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex flex-col items-end">
                  <button onClick={onClose}>
                    <Image src="/x-solid.svg" alt="X" height={18} width={18} />
                  </button>
                </div>
                <div>
                  <form action="" className="">
                    <div className="flex flex-col items-start">
                      <label htmlFor="" className="">
                        Title
                      </label>
                      <input
                        name="title"
                        value={title}
                        type="text"
                        className="p-1 w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        maxLength={50}
                        onChange={onChange}
                      />
                    </div>
                    <div className="flex flex-col items-start mt-2">
                      <label htmlFor="">Description</label>
                      <div>
                        <textarea
                          name="description"
                          value={description}
                          rows={3}
                          cols={50}
                          className="p-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 w-full sm:text-sm border border-gray-300 rounded-md"
                          onChange={onChange}
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex flex-col items-end mt-2">
                      <button
                        onClick={onSubmit}
                        type="button"
                        className="px-2 bg-violet-500 text-white whitespace-nowrap rounded-full hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700"
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

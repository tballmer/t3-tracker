import { useState } from "react";
import Image from "next/image";
import { trpc } from "../utils/trpc";
import { z } from "zod";

export default function InputModal() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputStatus, setInputStatus] = useState(false);
  const re = new RegExp("^(\\w|-)*$");

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

  const changeTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value);
    const titleSchema = z.string().min(1).regex(re);
    setInputStatus(titleSchema.safeParse(e.target.value).success);
  };

  const changeDescription = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const onClose = () => {
    setShowModal(false);
    setTitle("");
    setDescription("");
  };

  const onSubmit = () => {
    createProject.mutate({ title, description });
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
                        onChange={changeTitle}
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
                          onChange={changeDescription}
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex flex-column justify-between">
                      <div>
                        <p
                          className="text-sm text-red-600"
                          hidden={inputStatus}
                        >
                          Title must only contain letters, numbers, dashes, and
                          underscores
                        </p>
                      </div>
                      <div className="flex flex-col items-end mt-2">
                        <button
                          onClick={onSubmit}
                          type="button"
                          className="px-2 bg-violet-500 text-white whitespace-nowrap rounded-full hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 disabled:bg-violet-200"
                          disabled={!inputStatus}
                        >
                          Create
                        </button>
                      </div>
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

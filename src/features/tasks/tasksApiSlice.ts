import { apiSlice } from "../../app/api/apiSlice";
import { ITaskRequest, ITaskRequestToEdit, ITaskResponse } from "../../types/Types";

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrientUserTasks: builder.query<ITaskResponse[], void>({
      query: () => "/api/tasks/current-user-tasks",
    }),
    createTask: builder.mutation({
      query: (taskInfo: ITaskRequest) => ({
        url: "/api/tasks/new",
        method: "POST",
        body: {
          header: taskInfo.header,
          description: taskInfo.description,
          status: taskInfo.status,
          creationDate: taskInfo.creationDate,
          deadline: taskInfo.deadline,
          docId: taskInfo.docId,
          userEmails: taskInfo.userEmails,
        },
      }),
    }),
    deleteTaskById: builder.mutation({
      query: (taskId: number) => ({
        url: `/api/tasks/${taskId}`,
        method: "DELETE",
      }),
    }),
    updateTaskById: builder.mutation<void, ITaskRequestToEdit>({
      query: (dataToEdit: ITaskRequestToEdit) => ({
        url: "/api/tasks/update-task",
        method: "PUT",
        body: <ITaskRequestToEdit>{
          ...dataToEdit,
        },
      }),
    }),
  }),
});

export const {
  useGetCurrientUserTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskByIdMutation,
  useUpdateTaskByIdMutation,
} = tasksApiSlice;

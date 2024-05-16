import { apiSlice } from "../../app/api/apiSlice";
import { ITaskRequest, ITaskResponse } from "../../types/Types";

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
  }),
});

export const { useGetCurrientUserTasksQuery, useCreateTaskMutation, useDeleteTaskByIdMutation } = tasksApiSlice;

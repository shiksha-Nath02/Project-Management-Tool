import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4444/api",
        prepareHeaders: (headers, { getState }) => {
            // cookies sent automatically
            return headers;
        },
        credentials: 'include',
    }),

    tagTypes: ['Project', 'User','Task'],  //use to make cache under the tags provided
    endpoints: (builder) => ({

        // fetchUser: builder.query({
        //     query: () => '/auth/me',
        //     providesTags: ['User'],
        // }),

        fetchProjects: builder.query({
            query: () => '/project',
            providesTags: ['Project'],
        }),

        fetchTasks : builder.mutation({
            query: ({ projectId, taskType })=>({url: '/project/task/getTask', method: "POST", body:{projectId,taskType}}),
            invalidatesTags: ['Task']
        }),

        // fetchPostsByUserId: builder.query({
        //     query: () => `/post/user`,
        //     providesTags: ["Post"],
        // }),

        // createPost: builder.mutation({
        //     query: (post) => ({ url: '/post', method: 'POST', body: post }),
        //     invalidatesTags: ['Post'],
        // }),

        editTask: builder.mutation({
            query: ({ sourceCol, destCol, projectId,task }) => ({ url: "/project/task/updateTask", method: "PUT", body: { sourceCol, destCol, projectId,task } }),
            invalidatesTags: ["Task"]

        }),

        createProject: builder.mutation({
            query:({projectName})=>({url:"/project/create", method:"POST", body:{projectName}}),
            invalidatesTags:["Project"]
        }),

        fetchTaskCount: builder.query({
            query: ({projectId})=>({url:"/project/task/getTaskCount", method:"POST",body:{projectId}}),
            providesTags:["Task"]
        })

        // deletePost: builder.mutation({
        //     query: (id) => ({ url: `/post/${id}`, method: 'DELETE' }),
        //     invalidatesTags: ['Posts'],
        // }),
    }),
});

export const {
    // useSignupMutation,
    // useLoginMutation,
    useFetchProjectsQuery,
    useFetchTasksMutation,
    useEditTaskMutation,
    useCreateProjectMutation,
    useFetchTaskCountQuery,

} = api;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "../getBaseQuery";


export const postService = createApi({
  reducerPath: 'postService',
  baseQuery: getBaseQuery(),
  endpoints: (builder) => ({

    getAllPosts: builder.query({
      query: (body) => ({
        url: `/posts/parse`,
        method: 'POST',
        body: body,
        // params: { ...params }
      }),
    }),
  }),
})

export const { useLazyGetPostsQuery, useGetPostsQuery, useLazyGetAllPostsQuery, useGetAllPostsQuery } = postService

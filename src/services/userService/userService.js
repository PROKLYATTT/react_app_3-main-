import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userService = createApi({
  reducerPath: "userService",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:3555" }),
  endpoints: (builder) => ({
    registerUser: builder.query({
      query: (body) => ({
        url: `/auth/reg`,
        method: "POST",
        body: body,
      }),
    }),

    loginUser: builder.query({
      query: (body) => ({
        url: `/auth/login`,
        method: "POST",
        body: body,
      }),
    }),

    uploadAvatar: builder.query({
      query: (body) => ({
        url: `/user/upload-avatar`,
        method: "POST",
        body: body,
      }),
    }),

    changeName: builder.query({
      query: (body) => ({
        url: `/user/change-name`,
        method: "POST",
        body: body,
      }),
    }),

    changeNumber: builder.query({
      query: (body) => ({
        url: `/user/change-usernumber`,
        method: "POST",
        body: body,
      }),
    }),

    updateEmail: builder.query({
      query: (body) => ({
        url: `/user/update-email`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useLazyRegisterUserQuery,
  useLazyLoginUserQuery,
  useLazyUploadAvatarQuery,
  useLazyChangeNumberQuery,
  useLazyUpdateEmailQuery,
  useLazyChangeNameQuery,
} = userService;

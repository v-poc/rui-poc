import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/api/queryTodoList",
    method: "post", // @ts-ignore
    response: ({ body, query }) => {
      console.log("response-body: ", body, "\nresponse-query: ", query);

      return {
        code: 0,
        message: "success",
        result: [
          {
            text: "RUI PoC",
            done: false,
          },
          {
            text: "Vite plugin mock",
            done: true,
          },
          {
            text: "Migration to vpressify",
            done: true,
          },
        ],
      };
    },
  },
] as MockMethod[];

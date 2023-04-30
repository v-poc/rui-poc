import type { MockMethod, Recordable } from "vite-plugin-mock";

export default [
  {
    url: "/api/queryTodoList",
    method: "post",
    response: ({ body, query }: { body: Recordable; query: Recordable }) => {
      console.log("res-body: ", body, "\nres-query: ", query);

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

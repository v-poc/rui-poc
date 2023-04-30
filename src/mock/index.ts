import { createProdMockServer } from "vite-plugin-mock/client";
import todoMock from "./todo";

export const setupMock = () => {
  createProdMockServer([...todoMock]);
};

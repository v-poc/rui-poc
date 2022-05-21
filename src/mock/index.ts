import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import todoMock from "./todo";

export const setupMock = () => {
  createProdMockServer([...todoMock]);
};

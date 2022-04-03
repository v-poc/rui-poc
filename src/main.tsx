// import React from "react";
// import { render } from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import "rui-next/css"; // lib css
import "./index.less"; // app styles

// render(
//   <App />,
//   document.getElementById("root"),
// );
const container = document.getElementById("root") as any;
createRoot(container).render(<App />);

import React from "react";
import {
  Divider,
  Flex,
  Footer,
  Icon,
  NoticeBar,
  QRCode,
  Watermark,
} from "rui-next";
import TodoList from "./TodoList";
import pkg from "../package.json";

// App FC
const App: React.FC = () => {
  const handleBtnClick = () => {
    location.href = "https://nikoni.top/rui-next/";
  };

  return (
    <div className="watermark-wrapper">
      <Watermark content="RUI next" fontColor="rgba(0, 0, 0, .06)" />

      <NoticeBar
        type="alert"
        content="This is the playground for RUI.next. Please scan the QR code to access the examples on mobile/tablet device."
        extra={
          <Icon
            key="extra-button"
            type="ellipsis"
            className="mr"
            onClick={handleBtnClick}
          />
        }
        closeable
      />

      <Divider contentAlign="center">Todo List with animated progress</Divider>

      <TodoList />

      <Divider contentAlign="left">QR Code</Divider>

      <Flex justify="center">
        <QRCode value="https://nikoni.top/rui-next/" border color="#21b8a3" />
      </Flex>

      <Divider contentAlign="right">RUI PoC (v{pkg.version})</Divider>

      <Footer
        label="Released under the MIT License"
        links={[
          { text: "docs", url: "https://nikoni.top/rui-next/" },
          { text: "demos", url: "https://nikoni.top/rui-next/" },
          {
            text: "playground",
            url: "https://nikoni.top/rui-next/components/playground/playground.html",
          },
        ]}
        content="Copyright @ 2021-present RUI.next. Built with Vite & React."
        chips={[
          { content: "react-hooks" },
          { content: "vite 6" },
          { content: "typescript" },
        ]}
      />
    </div>
  );
};

export default App;

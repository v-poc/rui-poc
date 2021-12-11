import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button, Empty, Icon, Progress } from "rui-next";

// Item Type
export type ItemType = {
  text: string;
  done: boolean;
};

// TodoList FC
const TodoList: React.FC = () => {
  // the input task item
  const [taskItem, setTaskItem] = useState<string>("");
  // the tasks list
  const [tasks, setTasks] = useState<ItemType[]>([
    {
      text: "Foobar",
      done: false,
    },
    {
      text: "Fizzbuzz",
      done: false,
    },
  ]);

  // get completed count
  const getCompletedCount = () => {
    return tasks.filter((item: ItemType) => item.done).length;
  };

  // get remaining count
  const getRemainingCount = () => {
    return tasks.length - getCompletedCount();
  };

  // create task
  const createTask = () => {
    if (!taskItem) {
      return;
    }

    const arr = [...tasks];
    arr.push({
      text: taskItem,
      done: false,
    });

    setTaskItem("");
    setTasks(arr);
  };

  // delete task
  const deleteTask = (index: number) => {
    const arr = [...tasks];
    arr.splice(index, 1);
    setTasks(arr);
  };

  // mark task as completed
  const completeTask = (e: ChangeEvent, index: number) => {
    const checkFlag = (e.target as HTMLFormElement).checked;
    const arr = [...tasks];
    arr[index].done = checkFlag;
    setTasks(arr);
  };

  // input change for task item
  const inputChangeTaskItem = (e: ChangeEvent) => {
    const val = (e.target as HTMLInputElement).value || "";
    setTaskItem(val);
  };

  // input keydown for task item
  const inputKeydownTaskItem = (e: KeyboardEvent) => {
    if (e && (e.code === "Enter" || e.keyCode === 13)) {
      createTask();
    }
  };

  // calc task progress percent
  const taskProgress = tasks.length ? Math.round(100 * getCompletedCount() / tasks.length) : 0;

  return (
    <div className="todo-list-wrapper">
      <div className="main-hd">
        <div className="header">
          <input
            type="text"
            placeholder="What are you working on?"
            value={taskItem}
            onKeyDown={inputKeydownTaskItem}
            onChange={inputChangeTaskItem}
          />
          <Button
            type="primary"
            inline
            round
            size="small"
            icon="plus"
            disabled={!taskItem}
            onClick={createTask}
          ></Button>
        </div>
        <p className="tasks">Tasks: { tasks.length }</p>
      </div>
      <div className="main-bd">
        <p className="remaining">Remaining: { getRemainingCount() }</p>
        <p className="completed">Completed: { getCompletedCount() }</p>
        <div className="row-flex">
          <Progress
            mode="circle"
            percent={taskProgress}
            size={60}
            trackWidth={6}
          >
            {taskProgress}%
          </Progress>
        </div>
      </div>
      {tasks.length > 0 ? (
        <div
          className="main-ft"
        >
          {tasks.map((item: ItemType, index: number) => (
            <div
              key={`row${index}`}
              className="row"
            >
              <input
                key={`checkbox${index}`}
                type="checkbox"
                id={`checkbox${index}`}
                checked={item.done}
                onChange={(e: ChangeEvent) => completeTask(e, index)}
              />
              <label
                key={`label${index}`}
                className={`content${item.done ? " label-done": ""}`}
                htmlFor={`checkbox${index}`}
              >
                { item.text }
              </label>
              <div className="row-flex">
                {item.done && (
                  <Icon
                    key={`checkIcon${index}`}
                    type="check"
                    color="#36C"
                  />
                )}
                <Icon
                  key={`deleteIcon${index}`}
                  type="cross-circle-o"
                  color="#CCC"
                  onClick={() => deleteTask(index)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Empty
          message="No result"
        />
      )}
    </div>
  );
};

export default TodoList;

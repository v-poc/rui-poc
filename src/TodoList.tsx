import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { Button, Empty, Icon, Input, Progress } from "rui-next";

// Item type
export type ItemType = {
  text: string;
  done: boolean;
};

// TodoList FC
const TodoList: React.FC = () => {
  // the input task item
  const [taskItem, setTaskItem] = useState<string>("");
  // the tasks list
  const [tasks, setTasks] = useState<ItemType[]>([]);

  // fetch Todo List data
  const fetctTodoList = async () => {
    try {
      const res = await axios.post("/api/queryTodoList", {
        traceLogId: `rui_${Date.now()}`,
      });
      setTasks(res?.data?.result || []);
    } catch (err) {
      setTasks([]);
    }
  };

  // init
  useEffect(() => {
    fetctTodoList();
  }, []);

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

  // calc task progress percent
  const taskProgress = tasks.length ? Math.round(100 * getCompletedCount() / tasks.length) : 0;

  return (
    <div className="todo-list-wrapper">
      <div className="main-hd">
        <div className="header">
          <Input
            placeholder="What are you working on?"
            value={taskItem}
            onEnterKeyPress={createTask}
            onChange={(v: string) => setTaskItem(v)}
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

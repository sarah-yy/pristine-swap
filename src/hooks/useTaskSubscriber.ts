import { useMemo } from "react";
import useSelect from "./useSelect";

export default (...tasks: string[]): boolean => {
  const loadingTasksList = useSelect((store) => store.loadingTask.tasksList);
  return useMemo((): boolean => {
    for (let i = 0; i < tasks.length; i++) {
      if (loadingTasksList[tasks[i]]) {
        return true;
      }
    }
    return false;
  }, [tasks, loadingTasksList]);
};
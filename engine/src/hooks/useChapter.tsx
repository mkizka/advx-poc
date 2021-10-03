import { useHistory } from "react-router";
import { useCommand } from "./useCommand";

export function useChapter() {
  const command = useCommand();
  const history = useHistory();
  return {
    goto: (name: string) => {
      history.push(`/${name}`);
      command.resetIndex();
    },
  };
}

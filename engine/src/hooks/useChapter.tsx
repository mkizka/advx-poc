import { useHistory } from "react-router";
import { useMessage } from "./useMessage";

export function useChapter() {
  const message = useMessage();
  const history = useHistory();
  return {
    goto: (name: string) => {
      history.push(`/${name}`);
      message.resetIndex();
    },
  };
}

import { useHistory } from "react-router";

export function useChapter() {
  const history = useHistory();
  return {
    goto: (name: string) => history.push(`/${name}`),
  };
}

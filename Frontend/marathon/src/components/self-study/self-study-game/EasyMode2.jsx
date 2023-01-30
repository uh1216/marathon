import { useParams } from "react-router-dom";

export default function EasyMode1() {
  const stage = useParams().stage;

  return <>~~~~ {stage} 단계 게임하는 중 ~~~~</>;
}

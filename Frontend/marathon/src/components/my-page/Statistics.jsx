import { useEffect } from "react";
import { useDispatch } from "react-redux";
import style from "./Statistics.module.css";
import { changeNowSideNav } from "stores/toggle.store";
import StatisticsBox from "components/common/StatisticsBox";

export default function Statistics() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 사이드 나브 초기화
    dispatch(changeNowSideNav("스스로 학습 통계"));
  }, []);

  return (
    <>
      <StatisticsBox></StatisticsBox>
    </>
  );
}

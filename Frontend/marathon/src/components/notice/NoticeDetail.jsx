import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./NoticeDetail.module.css";

export default function NoticeDetail() {
  const navigate = useNavigate();
  const notice_content = `
  온라인 사회성 캠프는\n
  이화여대 언어병리학과 교수로\n
  아동 이중언어 분야 권위자이신 임동선 교수님과\n
  임동선 아이세이 언어연구소 연구원들과 수개월간 준비한 탄탄한 프로그램으로,\n
  \n
  언어발전소의 비대면 수업 노하우를 녹여\n
  화용언어에 어려움을 겪는 초등 저학년, 예비초등 아동에게\n
  실질적인 도움이 될 수 있도록 구성했습니다.\n
  코로나19 상황에서 초등학교에 입학한\n
  우리아이의 학교생활과 교우관계가 걱정되는 학부모님,\n
  \n
  담당 아동이 말/언어는 많이 좋아져서\n
  이제는 화용 그룹수업이 필요하다고 느끼는 SLP 선생님,\n
  \n
  지역 아동만으로는 그룹 수업 구성이 어려워\n
  온라인으로 그룹을 모아보고 싶은 센터장님,\n
  \n
  모두모두 주목해 주세요!`;

  return (
    <>
      <div className={style.container}>
        <div className={style.inner_container}>
          <div className={style.notice_body}>
            <div className={style.notice_top_interface}>
              <div>
                <button
                  className={style.right_menu + " " + style.notice_button}
                  //추후 props로 id 값 받아서 해당글의 제목, 내용 불러와서 호출하도록 코드 작성 예정
                  onClick={() => navigate("/notice/notice-update")}
                >
                  수정하기
                </button>
                <button
                  className={style.notice_button}
                  onClick={() => navigate("/notice/")}
                >
                  삭제하기
                </button>
              </div>
              <div>
                <button
                  className={style.notice_button}
                  onClick={() => navigate("/notice/")}
                >
                  목록으로
                </button>
              </div>
            </div>
            <div className={style.notice_detail_body}>
              <div className={style.notice_detail_body_header_grid}>
                <div className={style.notice_detail_body_header_item1}>
                  <h3>
                    만 6-8세 자녀를 둔 학부모님께 추천하는 "온라인 사회성 캠프"
                    참여자 모집
                  </h3>
                </div>
                <div className={style.notice_detail_body_header_item2}>
                  <p>작성일 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2022.12.25</p>
                </div>
                <div className={style.notice_detail_body_header_item3}></div>
                <div className={style.notice_detail_body_header_item4}>
                  <p>조회수 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;123456</p>
                </div>
                <div className={style.notice_detail_body_header_item5}></div>
              </div>
              <hr />
              <div className={style.notice_detail_body_content}>
                <p>{notice_content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

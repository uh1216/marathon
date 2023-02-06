import style from "./SendMessage.module.css";
import SelectBox from "components/common/SelectBox";
import { $ } from "util/axios";
import { useEffect, useState } from "react";

/**
 * commuSeq : 무슨 메시지 번호에 대한 답장인지 (0이면 그냥 새 메시지임)
 * senderSeq : 누가 보낸 메시지에 대한 답장인지 (0이면 그냥 새 메시지임)
 */
export default function SendMessage({
  setModalOpen,
  commuSeq,
  senderSeq,
  senderName,
}) {
  const [content, setContent] = useState("");
  const [userList, setUserList] = useState([]);
  const [receiverSeq, setReceiverSeq] = useState(0);

  /** 메시지 보낼 수 있는 회원 목록 불러오기 */
  useEffect(() => {
    // 새 메시지가 아닌 답장이라면
    if (commuSeq !== 0) {
      setUserList([{ name: senderName, value: senderSeq }]);
      setReceiverSeq(senderSeq);
    } else {
      $.get(`/user-commu/message?isNew=true&commuSeq=${commuSeq}`)
        .then((res) => {
          console.log(res);
          let options = [{ name: "받을 사람을 선택해주세요.", value: 0 }];
          res.data.forEach((item) => {
            options.push({ name: item.name, value: item.seq });
          });
          setUserList(options);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  /** 전송 버튼을 누르면 실행하는 함수 */
  const submitMessage = () => {
    if (receiverSeq === 0 && commuSeq === 0) {
      alert("받을 사람을 선택해주세요.");
      return;
    }
    console.log(receiverSeq, content);
    $.post(`/user-commu/message`, {
      receiverSeq: receiverSeq,
      content: content,
    })
      .then((res) => {
        alert("메시지가 성공적으로 전송되었습니다.");
        setModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /** 누구에게 메시지 보낼건지 선택 */
  const selectSeq = (x) => {
    setReceiverSeq(x);
  };

  return (
    <div className={style.modal_container}>
      <div className={style.box_1}>메시지 보내기</div>
      <div className={style.box_2}>
        <div>받는 사람</div>
        {commuSeq === 0 ? (
          <SelectBox
            options={userList}
            width="270px"
            onChange={(x) => selectSeq(x)}
            defaultValue={0}
          />
        ) : (
          <SelectBox
            options={userList}
            width="270px"
            onChange={(x) => selectSeq(x)}
            defaultValue={senderSeq}
            readonly={true}
          />
        )}
      </div>
      <textarea
        name=""
        cols="30"
        rows="10"
        className={style.box_3}
        placeholder="메시지를 입력하세요."
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <div className={style.box_4}>
        <button onClick={submitMessage}>전송</button>
      </div>
    </div>
  );
}

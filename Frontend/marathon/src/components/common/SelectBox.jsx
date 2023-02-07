import style from "./SelectBox.module.css";
import React, { forwardRef, useRef } from "react";

/**
 * 부모 컴포넌트에서는 다음과 같이 사용하기 (참고)
 * <SelectBox options={optionTest} onChange={(x) => selectTest(x)} width="" ref={sdajfsdl} readonly={true}/>
 * options : select 박스에 담고 싶은 옵션 객체 배열 (옵션 객체는 value와 name을 속성으로 가진다.)
 *
 * onChange : select 박스 선택값이 바꼈을 경우 실행되는 함수
 * x : 선택한 옵션의 value 값
 * width : select box 너비 (선택)
 * ref : ref 변수명
 * readonly : readonly로 하고 싶은지 (선택)
 */

const SelectBox = forwardRef((props, ref) => {
  /** Select Box에서 옵션 하나가 선택되었을 때,
   * 부모 컴포넌트에서 정의한 onChange 함수가
   * 선택된 옵션의 value값이 인자로 담겨서 실행됩니다.
   * */
  const handleChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <select
      className={style.select_box}
      onChange={handleChange}
      style={{ width: props.width }}
      ref={ref}
    >
      {props.options.map((option, idx) => (
        <option
          key={idx}
          value={option.value}
          defaultValue={props.defaultValue === option.value}
          disabled={props.hasOwnProperty("readonly")}
        >
          {option.name}
        </option>
      ))}
    </select>
  );
});

export default SelectBox;

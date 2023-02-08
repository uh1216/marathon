import style from "./Treat.module.css";

export default function Treat() {
  return (
    <div className={style.wrapper}>
      <div style={{ width: "474px", height: "530px" }}>
        <img
          style={{ width: "474px", height: "530px", objectFit: "cover" }}
          src="https://pickcon.co.kr/site/data/img_dir/2022/06/29/2022062980010_0.jpg"
          alt="임시 이미지"
        />
      </div>
      <div className={style.btn_container}></div>
    </div>
  );
}

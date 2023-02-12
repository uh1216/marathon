import style from "./ImageBoard.module.css";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const images = [
  "https://d1v10kml6l14kq.cloudfront.net/place/beach.jpg",
  "https://d1v10kml6l14kq.cloudfront.net/place/cinema.jpg",
  "https://d1v10kml6l14kq.cloudfront.net/place/coffeeShop.jpg",
  "https://d1v10kml6l14kq.cloudfront.net/place/concert.jpg",
  "https://d1v10kml6l14kq.cloudfront.net/place/fitness.jpg",
  "https://d1v10kml6l14kq.cloudfront.net/place/library.jpg",
  "https://d1v10kml6l14kq.cloudfront.net/place/meseum.jpg",
  "https://d1v10kml6l14kq.cloudfront.net/place/park.jpg",
  "https://d1v10kml6l14kq.cloudfront.net/place/restaurant.jpg",
  "https://d1v10kml6l14kq.cloudfront.net/place/shoppingMall.jpg",
  "https://d1v10kml6l14kq.cloudfront.net/place/soccer.jpg",
  "https://d1v10kml6l14kq.cloudfront.net/place/subway.jpg",
  "https://d1v10kml6l14kq.cloudfront.net/place/themePark.jpg",
  "https://d1v10kml6l14kq.cloudfront.net/place/zoo.jpg",
];

export default function ImageBoard({ channelId, stompClient, imageNo }) {
  /** 이전 질문 보기 */
  const prev = () => {
    stompClient.send(
      "/image",
      {},
      JSON.stringify({
        channelId: channelId,
        content: imageNo === 0 ? images.length - 1 : imageNo - 1,
      })
    );
  };

  /** 다음 질문 보기 */
  const changeImage = () => {
    let nextNo = Math.floor(Math.random() * images.length);
    while (nextNo === imageNo) {
      nextNo = Math.floor(Math.random() * images.length);
    }

    stompClient.send(
      "/image",
      {},
      JSON.stringify({
        channelId: channelId,
        content: nextNo,
      })
    );
  };
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        다음 사진에 대해 자유롭게 묘사해보세요.
      </div>
      <img
        className={style.image}
        src={0 <= imageNo && imageNo < images.length && images[imageNo]}
        alt="사진"
      />
      <button className={style.button} onClick={changeImage}>
        <FontAwesomeIcon icon={faRepeat} />
      </button>
    </div>
  );
}

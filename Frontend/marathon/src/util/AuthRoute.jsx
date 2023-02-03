import { useNavigate } from "react-router-dom";

export default function AuthRoute(props) {
  const navigate = useNavigate();
  const authenticated = true;

  if (!authenticated) {
    alert("로그인이 필요한 페이지입니다.");
    navigate("/user/login");
  } else {
    return <>{props.render()}</>;
  }
}

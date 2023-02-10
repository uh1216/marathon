import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthRoute(props) {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const authenticated = state.loginUser.userRole;

  useEffect(() => {
    if (authenticated) return;
    navigate("/user/login");
    alert("로그인이 필요한 페이지 입니다");
    // eslint-disable-next-line
  }, []);

  return <>{props.render()}</>;
}

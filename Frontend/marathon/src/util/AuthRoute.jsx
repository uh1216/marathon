import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AuthRoute(props) {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const authenticated = state.loginUser.userRole;

  useEffect(() => {
    if (authenticated) return;
    navigate("/user/login");
    Swal.fire({
      icon: "error",
      title: "",
      text: "로그인이 필요한 페이지 입니다.",
      confirmButtonText: "닫기",
    });
    // eslint-disable-next-line
  }, []);

  return <>{props.render()}</>;
}

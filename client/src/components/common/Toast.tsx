import { Container } from "./Toast.styles";
import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ERROR, INFO, SUCCESS } from "../../constants/toast";

interface ToastProps {
  type: "success" | "error" | "info";
  message?: string;
}

const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  pauseOnFocusLoss: true,
  closeButton: false,
};

export function showToast({ type, message }: ToastProps) {
  switch (type) {
    case SUCCESS:
      toast.success(message || "성공적으로 완료되었습니다.", toastOptions);
      return;

    case ERROR:
      toast.error(message || "다시 한번 시도해 주세요.", toastOptions);
      return;

    case INFO:
      toast.info(message || "다시 한번 시도해 주세요.", toastOptions);
      return;
  }
}

export default function Toast() {
  return <Container />;
}

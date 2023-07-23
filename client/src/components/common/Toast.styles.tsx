import { ToastContainer } from "react-toastify";
import styled from "styled-components";

export const Container = styled(ToastContainer)`
  .Toastify__toast {
    font-size: 16px;
    padding: 16px;
    color: #fff;
  }

  .Toastify__toast-icon {
    width: 22px;
    height: 22px;
  }

  .Toastify__toast--info {
    background: rgba(107, 115, 135, 0.8);
  }

  .Toastify__toast--success {
    color: #fff;
    background: rgba(48, 173, 120, 0.8);
  }

  .Toastify__toast--error {
    color: #fff;
    background: rgba(224, 72, 82, 0.8);
  }
`;

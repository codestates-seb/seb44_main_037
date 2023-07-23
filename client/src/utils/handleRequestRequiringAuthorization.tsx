import {
  DEMAND_LOGIN,
  INSUFFICIENT_POINT,
  INVALID_BODY,
  OK,
  TOKEN_REISSUED,
} from "../constants/messages";

const handleRequestRequiringAuthorization = async (
  res: any,
  memberFunc: any,
  body?: any
) => {
  if (res.status === 401 && res.message === TOKEN_REISSUED) {
    const accessToken: any = res.headers.get("token");
    const response = await memberFunc(accessToken, body);

    if (response.result === OK) {
      return {
        status: response.status,
        result: response.result,
        payload: { ...response.payload, accessToken },
      };
    }

    return {
      status: response.status,
      result: response.result,
      message: DEMAND_LOGIN,
    };
  }

  if (res.status === 401) {
    return {
      status: res.status,
      result: res.result,
      message: DEMAND_LOGIN,
    };
  }

  if (res.status === 400 && res.message === INSUFFICIENT_POINT) {
    return {
      status: res.status,
      result: res.result,
      message: INSUFFICIENT_POINT,
    };
  }

  if (res.status === 400) {
    return {
      status: res.status,
      result: res.result,
      message: INVALID_BODY,
    };
  }

  return {
    status: res.status,
    result: res.result,
    payload: res.payload,
  };
};

export default handleRequestRequiringAuthorization;

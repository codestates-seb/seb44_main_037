const UNEXPECTED_ERROR = "예상치 못한 오류가 발생하였습니다.";
const EXPIRED_TOKEN = "토큰이 만료되었습니다.";
const FAILURE_LOGIN = "로그인에 실패했습니다. 다시 시도해 주십시오.";
const FAILURE_LOGOUT = "로그아웃에 실패했습니다.";
const DEMAND_LOGIN = "로그인이 필요합니다.";
const FAILED_FULFILLMENT =
  "알 수 없는 이유로 요청하신 작업을 수행할 수 없습니다.";
const INVALID_REQUEST = "잘못된 요청입니다.";
const INCLUDING_SPECIAL_CHARACTER = "특수문자를 포함할 수 없습니다.";
const INCLUDING_SPACE = "공백을 포함할 수 없습니다.";
const DEMAND_INPUT = "하나 이상의 값을 입력해 주세요.";
const DEMAND_SPECIAL_CHARACTER = "하나 이상의 특수문자를 입력해 주세요.";
const DEMAND_PASSWORD_LENGTH = "여덟 글자 이상 입력해 주세요.";
const DEMAND_EMAIL = "이메일 형식이어야 합니다.";
const INSUFFICIENT_LENGTH = "두 글자 이상 입력해 주세요.";
const EXCESSIVE_NICKNAME_LENGTH = "최대 10자리까지 입력 가능합니다.";
const USER_INFORMATION_UPDATED = "정보가 수정되었습니다.";
const INSUFFICIENT_COMMENT_LENGTH = "한 글자 이상 작성해주세요.";
const CREATE_COMMENT_SUCCEEDED = "댓글이 작성되었습니다.";
const DELETE_COMMENT_SUCCEEDED = "댓글이 삭제되었습니다.";
const UPDATE_COMMENT_SUCCEEDED = "댓글이 수정되었습니다.";
const EXCESSIVE_IMAGE_SIZE = "첨부파일 사이즈는 500KB 이내여야 합니다.";
const INVALID_BODY = "양식에 맞게 작성해야 합니다.";
const INVALID_PAYMENT = "충전이 이미 완료된 주문입니다.";
const INSUFFICIENT_POINT = "포인트가 부족합니다.";
const OK = "ok";
const FAILED = "failed";

const FAILED_SEARCH = "검색에 실패했습니다.";
const FAILED_GET_MESSAGES = "메시지 내역을 불러오지 못했습니다.";
const FAILED_SEND_MESSAGE = "메시지를 전송할 수 없습니다.";
const FAILED_CHARGE_POINT = "포인트를 충전하지 못했습니다.";
const FAILED_POST_PRODUCT = "상품을 등록하지 못했습니다.";
const FAILED_USER_REGISTER = "회원가입에 실패했습니다.";

const SUCCESSFUL_AUCTION_CLOSE = "경매를 조기종료합니다.";
const SUCCESSFUL_BID = "성공적으로 입찰했습니다!";
const FAILED_AUCTION_CLOSE =
  "경매를 마감하지 못했습니다. 잠시 후에 다시 시도해 주십시오.";
const FAILED_INSTANT_BID = "낙찰 받지 못했습니다.";
const DOUBLE_BIDDING = "이미 최고 입찰자입니다.";

const SUCCESSFUL_BUY = "상품을 구매했습니다.";
const FAILED_GET_USER_INFO = "유저 정보를 불러오지 못했습니다.";
const INVALID_USER = "존재하지 않는 유저입니다.";
const TOKEN_REISSUED = "액세스 토큰이 재발급되었습니다.";
const REFRESH_TOKEN_EXPIRED = "리프레시 토큰이 만료되었습니다.";

export {
  UNEXPECTED_ERROR,
  EXPIRED_TOKEN,
  FAILURE_LOGIN,
  FAILURE_LOGOUT,
  DEMAND_LOGIN,
  FAILED_FULFILLMENT,
  INCLUDING_SPECIAL_CHARACTER,
  INCLUDING_SPACE,
  DEMAND_INPUT,
  DEMAND_SPECIAL_CHARACTER,
  DEMAND_PASSWORD_LENGTH,
  DEMAND_EMAIL,
  INSUFFICIENT_LENGTH,
  EXCESSIVE_NICKNAME_LENGTH,
  USER_INFORMATION_UPDATED,
  INSUFFICIENT_COMMENT_LENGTH,
  CREATE_COMMENT_SUCCEEDED,
  DELETE_COMMENT_SUCCEEDED,
  UPDATE_COMMENT_SUCCEEDED,
  EXCESSIVE_IMAGE_SIZE,
  INVALID_BODY,
  INVALID_PAYMENT,
  INSUFFICIENT_POINT,
  OK,
  FAILED,
  INVALID_USER,
  INVALID_REQUEST,
  TOKEN_REISSUED,
  REFRESH_TOKEN_EXPIRED,
  FAILED_SEARCH,
  FAILED_GET_MESSAGES,
  FAILED_SEND_MESSAGE,
  FAILED_CHARGE_POINT,
  FAILED_POST_PRODUCT,
  FAILED_USER_REGISTER,
  SUCCESSFUL_AUCTION_CLOSE,
  SUCCESSFUL_BID,
  FAILED_AUCTION_CLOSE,
  FAILED_INSTANT_BID,
  DOUBLE_BIDDING,
  SUCCESSFUL_BUY,
  FAILED_GET_USER_INFO,
};

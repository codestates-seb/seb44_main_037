const GENERAL = "general";
const AUCTION = "auction";
const FANZINE = "fanzine";
const STUFF = "stuff";
const DOLL = "doll";
const ONSALE = "onSale";
const NOT_ONSALE = "notOnSale";
const ALL = "all";
const BID_SUCCESS = "낙찰";
const BID_FAILED = "유찰";
const SOLD = "판매완료";

const ALL_KO = "전체";
const GENERAL_KO = "일반판매";
const AUCTION_KO = "경매";
const FANZINE_KO = "회지";
const STUFF_KO = "잡화/소품";
const DOLL_KO = "인형/피규어";
const ONSALE_KO = "판매중";
const NOT_ONSALE_KO = "판매완료";

const categoryList = [ALL_KO, FANZINE_KO, STUFF_KO, DOLL_KO];
const typeList = [ALL_KO, GENERAL_KO, AUCTION_KO];
const statusList = [ALL_KO, ONSALE_KO, NOT_ONSALE_KO];

const categoryRegisterList = [FANZINE_KO, STUFF_KO, DOLL_KO];
const typeRegisterist = [GENERAL_KO, AUCTION_KO];

export {
  GENERAL,
  AUCTION,
  FANZINE,
  STUFF,
  DOLL,
  ONSALE,
  NOT_ONSALE,
  ALL,
  BID_SUCCESS,
  BID_FAILED,
  SOLD,
  categoryList,
  ALL_KO,
  GENERAL_KO,
  AUCTION_KO,
  FANZINE_KO,
  STUFF_KO,
  DOLL_KO,
  typeList,
  statusList,
  categoryRegisterList,
  typeRegisterist,
};

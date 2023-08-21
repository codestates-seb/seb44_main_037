declare module "userAPI" {
  export type SuccessState<P> = {
    result: string;
    status: number;
    payload: P;
    message?: string;
    headers?: any;
  };

  export type FailState = {
    result: string;
    status: number;
    payload?: any;
    message: string;
    headers?: any;
  };

  export type ResponseState<P> = SuccessState<P> | FailState;

  export type PayloadOfAuth = {
    user: User;
    accessToken: string | null;
  };

  export type PayloadOfCharge = {
    user: User;
  };

  export type BodyOfLogin = {
    authorizationCode: string;
  };

  export type BodyOfRegisterUser = {
    nickname: string;
    image: File | null;
    email: string;
  };

  export type BodyOfCharge = {
    chargeId: string | null;
    price: number;
    chargeSecret: string | undefined;
  };
}

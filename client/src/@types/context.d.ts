declare module "context" {
  type ContextType = {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    accessToken: string;
    setAccessToken: React.Dispatch<React.SetStateAction<string>>;
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
  };

  type User = {
    _id: string;
    email: string;
    nickname: string;
    image: string;
    salesList: Array<string>;
    shoppingList: Array<string>;
    point: number;
    pointHistory: Array<PointHistory>;
  };

  type PointHistory = {
    title: string;
    price: number;
    balance: number;
    createdAt: number;
    productId?: string;
    chargeId?: string;
  };
}

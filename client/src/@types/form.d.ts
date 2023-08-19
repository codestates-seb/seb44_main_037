declare module "form" {
  type Form = {
    [key: string]: string;
    [key: string]: number;
  };

  type FailureReason = {
    [key: string]: string;
    [key: string]: number;
  };
}

export interface ITransferReq {
  transferAccount: string;
  quantity: number;
  token: string;
}

export interface IDepositReq {
  quantity: number;
  token: string;
}

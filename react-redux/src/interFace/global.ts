/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IForm {
  id?: number;
  name: string;
  email: string;
}
export interface IUser {
  id: number;
  name: string;
  email: string;
}
export interface IUserAction {
  id?: number;
  name?: string;
  email?: string;
  type?: string;
}
export interface IUserPayload{
  id?:any,
  name:string|undefined,
  email:string|undefined
}

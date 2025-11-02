
export interface IUser {
    id: string,
    email: string,
    role: "ADMIN" | "DOCTOR" | "PATIENT",
    exp: number,
    iat: number
}



export interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}
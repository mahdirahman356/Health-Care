/* eslint-disable @typescript-eslint/no-explicit-any */

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

export interface IDoctor {
  id: string
  name: string
  email: string
  profilePhoto: string
  contactNumber: string
  address: string
  registrationNumber: string
  experience: number
  gender: string
  appointmentFee: number
  qualification: string
  currentWorkingPlace: string
  designation: string
  averageRating: number
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  doctorSpecialties: DoctorSpecialty[]
  reviews: any[]
}

export interface DoctorSpecialty {
  specialitiesId: string
  doctorId: string
  specialities: Specialities
}

export interface Specialities {
  id: string
  title: string
  icon: string
}
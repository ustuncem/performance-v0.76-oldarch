export interface RegisterFormRequest {
  name: string;
  email: string;
  surname: string;
  gender: boolean;
  profilePicture: string;
}

export interface RegisterFirstStepFormRequest {
  phoneNumber: string;
}

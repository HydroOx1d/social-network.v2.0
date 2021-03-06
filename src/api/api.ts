import axios from 'axios';
import { UsersType } from '../features/users/usersSlice';
import { LoginValuesType, ProfileDataType, ProfileDataPhotosType } from '../types/types';

let instanceOfAxios = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0",
  headers: {
    "API-KEY": "aeb0b9b0-b1de-4682-ab47-1531bca54e84",
  },
});

type GetUsersType = {
  items: Array<UsersType>;
  totalCount: number;
  error: null | string;
};

type StandartResponse = {
  resultCode: number
  messages: string[]
  data: object
}

export enum meaningOfResultCodes {
  Success = 0,
  Error = 1,
}

export const usersRequests = {
  getUsers(pageNumber: number, pageCount: number) {
    return instanceOfAxios.get<GetUsersType>(`/users?count=${pageCount}&page=${pageNumber}`).then(res => res.data);
  },
  follow(userId: number) {
    return instanceOfAxios.post<StandartResponse>(`/follow/${userId}`).then(res => res.data); 
  },
  unFollow(userId: number) {
    return instanceOfAxios.delete<StandartResponse>(`/follow/${userId}`).then(res => res.data);
  }
}

type AuthMeType = {
  resultCode: number
  messages: Array<string>
  data: {
    id: number
    email: string
    login: string
  }
}

type LoginResponseType = {
  resultCode: number;
  messages: Array<string>;
  data: {
    userId: number
  };
};

export const authRequests = {
  authMe() {
    return instanceOfAxios.get<AuthMeType>('/auth/me').then(res => res.data);
  },
  login(loginData: LoginValuesType) {
    return instanceOfAxios.post<LoginResponseType>('/auth/login', loginData).then(res => res.data);
  },
  logout() {
    return instanceOfAxios.delete<StandartResponse>('/auth/login').then(res => res.data);
  }
}

type ImageFileResponse = {
  resultCode: number;
  messages: string[];
  data: {
    photos: ProfileDataPhotosType;
  };
};

export const profileRequests = {
  getProfileData(userId: string | undefined) {
    return instanceOfAxios
      .get<ProfileDataType>(`/profile/${userId}`)
      .then((res) => res.data);
  },
  getProfileStatus(userId: null | undefined | string) {
    return instanceOfAxios
      .get<string>(`/profile/status/${userId}`)
      .then((res) => res.data);
  },
  updateProfileStatus(status: string) {
    return instanceOfAxios.put<StandartResponse>('/profile/status', {status}).then(res => res.data);
  },
  updateProfileAvatar(imageFile: string | Blob) {
    let formData = new FormData();
    
    formData.append("upload_image", imageFile);

    return instanceOfAxios.put<ImageFileResponse>("/profile/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(res => res.data);
  }
};
import axios from 'axios';
import { UsersType } from '../features/users/usersSlice';

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

type FollowType = {
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
    return instanceOfAxios.post<FollowType>(`/follow/${userId}`).then(res => res.data); 
  },
  unFollow(userId: number) {
    return instanceOfAxios.delete<FollowType>(`/follow/${userId}`).then(res => res.data);
  }
}

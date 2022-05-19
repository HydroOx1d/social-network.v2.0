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

export const usersRequests = {
  getUsers(pageNumber: number, pageCount: number) {
    return instanceOfAxios.get<GetUsersType>(`/users?count=${pageCount}&page=${pageNumber}`).then(res => res.data);
  }
}

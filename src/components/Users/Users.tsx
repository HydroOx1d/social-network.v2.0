import React, { useState } from 'react'
import usersCss from './Users.module.css'
import { UsersType } from '../../features/users/usersSlice';
import { Avatar, Button, Pagination, Spin} from 'antd';
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

type PropsType = {
  users: Array<UsersType>
  totalCount: number
  isFetchingUsers: boolean
  isFollowingArray: Array<number>
  onFetchUsers: (pageNumber: number) => void
  onFollow: (userId: number) => void
  onUnFollow: (userId: number) => void
}

const Users: React.FC<PropsType> = ({users, totalCount, onFetchUsers, isFetchingUsers, onFollow, onUnFollow, isFollowingArray}) => {

  return (
    <div>
      <div className={usersCss.usersList}>
        {!isFetchingUsers ? (
          <>
            {users.map((user) => {
              return (
                <div className={usersCss.usersItem} key={user.id}>
                  <Avatar
                    className={usersCss.usersAvatar}
                    size={64}
                    icon={<UserOutlined />}
                    src={user.photos.large}
                  />
                  <NavLink
                    className={usersCss.usersNameLink}
                    to={"/profile/" + user.id}
                  >
                    {user.name}
                  </NavLink>
                  {user.followed ? (
                    <Button disabled={isFollowingArray.some(id => id === user.id)} onClick={() => onUnFollow(user.id)} type={"primary"} className={usersCss.usersFollow}>
                      Unfollow
                    </Button>
                  ) : (
                    <Button disabled={isFollowingArray.some(id => id === user.id)} onClick={() => onFollow(user.id)} type={"primary"} className={usersCss.usersFollow}>
                      Follow
                    </Button>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <div className={usersCss.spinner}>
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 100, marginTop: 200 }} spin />}
            />
          </div>
        )}
      </div>
      <div className={usersCss.usersPagination}>
        <Pagination
          onChange={(current) => onFetchUsers(current)}
          defaultCurrent={1}
          total={totalCount}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}

export default Users
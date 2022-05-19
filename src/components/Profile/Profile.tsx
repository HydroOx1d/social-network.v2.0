import React from 'react'
import profile from './Profile.module.css'
import { Avatar } from 'antd'
import { ProfilePropsType } from './ProfileContainer';
import ProfileAddPostContainer from './ProfileAddPost/ProfileAddPostContainer';
import ProfileStatus from './ProfileStatus/ProfileStatus';

const Profile: React.FC<ProfilePropsType> = ({ posts }) => {
  return (
    <div className={profile.profile}>
      <div className={profile.leftSide}>
        <div className={profile.profileAvatar}>
          <Avatar
            shape={"square"}
            size={300}
            src={
              "https://media.npr.org/assets/img/2020/04/07/stephen-king.by-shane-leonard_wide-f9df986f26c8d66ecb63cf8e49bded6360cbd9d3.jpg?s=1400"
            }
          />
        </div>
        <div className={profile.profileInfo}>
          <div className={profile.profileInfoHeader}>
            <h2 className={profile.profileInfoTitle}>Информация</h2>
          </div>
          <div className={profile.profileInfoBody}>
            <ul className={profile.profileInfoList}>
              <li className={profile.profileInfoItem}>
                Рабочий статус: <span>В активном поиске</span>
              </li>
              <li className={profile.profileInfoItem}>
                Обо мне: <span>Люблю программирование</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={profile.rightSide}>
        <div className={profile.profileHeader}>
          <h2 className={profile.profileName}>Нурсултан Эсенов</h2>
          <ProfileStatus/>
        </div>
        <hr />
        <ProfileAddPostContainer />
        <div>
          {posts.map((el) => {
            return (
              <div key={el.id}>
                <span>{el.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile
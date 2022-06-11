import React from 'react'
import profile from './Profile.module.css'
import { Avatar } from 'antd'
import { UserOutlined, EditOutlined } from '@ant-design/icons'
import ProfileAddPostContainer from './ProfileAddPost/ProfileAddPostContainer';
import { PostsType } from '../../features/profile/profileSlice';
import { ProfileDataType } from '../../types/types';
import ProfileStatusContainer from './ProfileStatus/ProfileStatusContainer';

type PropsType = {
  posts: Array<PostsType>;
  profileData: ProfileDataType | null;
  isOwn: boolean;

  updateProfileAvatarThunk: (imageFile: string | Blob) => void
};

const Profile: React.FC<PropsType> = ({ posts, profileData, isOwn, updateProfileAvatarThunk}) => {

  const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files?.[0]);
    if(event.target.files !== null) {
      updateProfileAvatarThunk(event.target.files[0]);
    }
  }

  return (
    <div className={profile.profile}>
      <div className={profile.leftSide}>
        <div className={profile.profileAvatar}>
          <Avatar
            shape={"square"}
            size={300}
            icon={<UserOutlined />}
            src={profileData?.photos.large}
          />
          <div className={profile.editAvatar}>
            <label htmlFor="editAvatar"><EditOutlined className={profile.editAvatarIcon}/></label>
            <input type="file" id="editAvatar" onChange={onUpload}/>
          </div>
        </div>
        <div className={profile.profileInfo}>
          <div className={profile.profileInfoHeader}>
            <h2 className={profile.profileInfoTitle}>Информация</h2>
          </div>
          <div className={profile.profileInfoBody}>
            <div className={profile.profileInfoList}>
              <div className={profile.profileInfoItem}>
                Рабочий статус:{" "}
                <span>
                  {profileData?.lookingForAJob ? "В активном поиске" : "Не ищу"}
                </span>
              </div>
              {profileData?.lookingForAJob && (
                <div className={profile.profileInfoItem}>
                  О работе:{" "}
                  <span>{profileData?.lookingForAJobDescription}</span>
                </div>
              )}
              <div className={profile.profileInfoItem}>
                Обо мне:{" "}
                <span>
                  {profileData?.aboutMe ? profileData?.aboutMe : "Не указано"}
                </span>
              </div>
              <div className={profile.profileInfoItem}>Контакты: </div>
            </div>
          </div>
        </div>
      </div>
      <div className={profile.rightSide}>
        <div className={profile.profileHeader}>
          <h2 className={profile.profileName}>{profileData?.fullName}</h2>
          <ProfileStatusContainer isOwn={isOwn} />
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
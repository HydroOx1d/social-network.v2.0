import React, { useState } from 'react'
import addPostCSS from './ProfileAddPost.module.css'
import { Button, Input } from 'antd'
import { PostsType } from '../../../features/profile/profileSlice';
const {TextArea} = Input

type PropsType = {
  onAddPost: (obj: PostsType) => void
}

const ProfileAddPost: React.FC<PropsType> = ({onAddPost}) => {
  const [value, setValue] = useState<string>('');
  return (
    <div className={addPostCSS.addPost}>
      <TextArea
        placeholder="Текст поста"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setValue(e.target.value)
        }
      />
      <Button onClick={() => {
        onAddPost({ id: new Date().getTime(), text: value });
        setValue('')
      }} type="primary" style={{ float: "right" }}>
        Пост
      </Button>
    </div>
  );
}

export default ProfileAddPost
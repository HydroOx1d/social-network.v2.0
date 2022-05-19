import React, { useState } from 'react'
import status from './ProfileStatus.module.css'
import { Input } from 'antd'

const ProfileStatus: React.FC = () => {
  const [statusEditMode, setStatusEditMode] = useState<boolean>(false)
  return (
    <div className={status.status}>
      {statusEditMode && (
        <div className={status.statusInput}>
          <Input onBlur={() => setStatusEditMode(false)} autoFocus={true} maxLength={50} showCount={true} />
        </div>
      )}
      {!statusEditMode && <span className={status.statusText} onDoubleClick={() => setStatusEditMode(true)}>Status Active</span>}
    </div>
  );
}

export default ProfileStatus
import React, { useState, useEffect } from 'react'
import statusSC from './ProfileStatus.module.css'
import { Input } from 'antd'


type PropsType = {
  isOwn: boolean;
  isUpdatingStatus: boolean
  status: string;

  onUpdateStatus: (status: string) => void
};

const ProfileStatus: React.FC<PropsType> = ({isOwn, status, onUpdateStatus, isUpdatingStatus}) => {
  const [statusEditMode, setStatusEditMode] = useState<boolean>(false);
  const [statusValue, setStatusValue] = useState<string>(status);

  useEffect(() => setStatusValue(status), [status]);

  return (
    <div className={statusSC.status}>
      {statusEditMode && isOwn && (
        <div className={statusSC.statusInput}>
          <Input
            onBlur={() => {
              onUpdateStatus(statusValue)
              setStatusEditMode(false)
            }}
            autoFocus={true}
            maxLength={300}
            showCount={true}
            value={statusValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStatusValue(e.target.value)}
          />
        </div>
      )}
      {!statusEditMode && (
        <span
        style={isUpdatingStatus ? {opacity: 0.5} : {opacity: 1}}
          className={statusSC.statusText}
          onDoubleClick={() => (isOwn ? setStatusEditMode(true) : false)}
        >
          {status || 'Статус не указан'}
        </span>
      )}
    </div>
  );
}

export default ProfileStatus
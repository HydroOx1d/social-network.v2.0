export type ProfileDataContactsType = {
  github: string | null
  vk: string | null
  facebook: string | null
  instagram: string | null
  twitter: string | null
  website: string | null
  youtube: string | null
  mainLink: string | null
}

export type ProfileDataPhotosType = {
  small: string | null
  large: string | null
}

export type ProfileDataType = {
  aboutMe: string
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ProfileDataContactsType;
  photos: ProfileDataPhotosType
};


export type LoginValuesType = {
  password: string;
  remember: boolean;
  email: string;
};
export type UserType = {
  username: string;
  email: string;
  password: string;
  posts: PostType[];
  profile: Profile;
};

export type PostType = {
  id: number;
  content: string;
  createdAt: string;
  authorId: number;
  author: UserType;
};

export type Profile = {
  id: number;
  bio: string;
  profileImageUrl: string;
  userId: number;
  user: UserType;
};

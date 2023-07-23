export type UserType = {
  username: string;
  email: string;
  password: string;
  posts: PostType[];
};

export type PostType = {
  id: number;
  content: string;
  createdAt: string;
  authorId: number;
  author: UserType;
};

import { ReactElement } from "react";

export type PostType = {
  post_id: number;
  title: string;
  content: string;
  likes: string;
  display_time: string;
  creator: string;
  user_id: string;
};

export type UserType = {
  user_id: number | null;
  username: string | null;
  status: string | null;
};

export type AUser = {
  username?: string;
  status?: string;
};

export type NewPostType = {
  title: string;
  content: string;
};

export type CommentType = {
  comment_id: number;
  content: string;
  created_at: string;
  creator_name: string;
  display_date: string;
};

export type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

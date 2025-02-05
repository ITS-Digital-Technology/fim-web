export interface IPaginatedResponse<T> {
  total: number;
  data: T[];
}

export interface IPaginatedRequest {
  offset: number;
  pageSize: number;
}

export const DefaultPostPageSize = 5;
export interface IPostsService {
  getPosts(offset: number, pageSize: number): Promise<IPaginatedResponse<Post>>;
  getDailyPosts(): Promise<Post[]>;
  addPost(post: Post): Promise<Post | ErrorResponse>;
  getWordpressPostInfo(postUrl: string): Promise<WordpressPostInfo>;
  updatePost(post: Post): Promise<Post | ErrorResponse>;
  deletePost(post: Post): Promise<boolean>;
  getBlogs(): Promise<Blog[]>;
  addBlogs(blogs: Blog[]): Promise<Blog[] | ErrorResponse>;
  deleteBlog(id: string): Promise<boolean>;
  getWordpressBlogInfo(url: string): Promise<string>;
}
export enum Target {
  currentTab = "currentTab",
  newTab = "newTab",
  newWindow = "newWindow",
  
}

export interface Post {
  id: string;
  title: string;
  thumbnailUrl?: string;
  postUrl: string;
  authorFullName?: string;
  authorId?: string;
  target?: Target;
  blogUrl?: string;
  blogTitle?: string;
}

export interface Blog {
  id: string;
  title: string;
  blogUrl: string;
  isUrlInvalid?: boolean;
}
export interface WordpressPostInfo {
  title: string;
  thumbnailUrl: string;
  isPasswordProtected: boolean;
}

export interface ErrorResponse {
  correlationId: string;
  errors: { PostUrl: string[]; Title: string[] };
  status: number;
  title: string;
}

// import { IPaginatedResponse } from '@/types/Pagination'
import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  createContext,
} from "react";
import {
  Post,
  Target,
  WordpressPostInfo,
  ErrorResponse,
  Blog,
} from "@/types/Post";
import AddPostModal from "../../components/common/links/AddPostModal";
// import DeletePostDialog from '@/common/blogs/DeletePostDialog'
// import AddBlogModal from '@/common/blogs/AddBlogsModal'
// import DeleteBlogDialog from '@/common/blogs/DeleteBlogDialog'
import { TokenTypes } from "@/app/contexts/AppContext";
import useFetch, { postHeaders } from "@/hooks/useFetch";
import {baseUrl, apiPath } from "@/src/apiConfig";
// import { htmlDecode } from '@/common/blogs/HtmlDecode'

export interface MyPostsContextProps {
  myPosts?: Post;
  myBlogs?: Blog[];
  myPostPageSize: number;
  setMyPostPageSize: (myPostPageSize: number) => void;
  loadMyPosts: (offset?: number, postPageSize?: number) => Promise<void>;
  loadMyBlogs: () => Promise<void>;
  //   getWordpressPostInfo(postUrl: string): Promise<WordpressPostInfo>;
  openModal(post?: Post): void;
  openDeleteModal(post: Post): void;
  openAddBlogModal(): void;
  //   getWordpressBlogInfo(url: string): Promise<string>;
  openDeleteBlogModal(blog: Blog): void;
  // addBlogs(blogs: Blog[]): Promise<Blog[] | ErrorResponse>
  isLoading: boolean;
  isBlogModalOpened: boolean;
  isAddPostError: boolean;
  addPostErrorMessage: string | undefined;
  isGetPostsError: boolean;
  isGetBlogsError: boolean;
}

const MyPostsContext: React.Context<MyPostsContextProps> =
  createContext<MyPostsContextProps>({} as MyPostsContextProps);

export default MyPostsContext;

interface PostsProviderProps {
  children: React.ReactNode;
}

export const defaultPost: Post = {
  id: "",
  title: "",
  thumbnailUrl: "",
  postUrl: "",
  target: Target.newTab,
};

export const MyPostsProvider = (props: PostsProviderProps) => {
  const [myPostPageSize, setMyPostPageSize] = useState(10);
  const [myPosts, setMyPosts] = useState<Post>();
  const [postToEdit, setPostToEdit] = useState<Post>();
  const [postToDelete, setPostToDelete] = useState<Post>();
  const [myBlogs, setMyBlogs] = useState<Blog[]>([]);
  const [isAddBlogModalOpen, setIsAddBlogModalOpen] = useState<boolean>(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { fetchAPI: getPosts, isError: isGetPostsError } = useFetch({
    method: "GET",
    url: `${baseUrl}${apiPath.Links}`,
    headers: postHeaders,
    tokenType: TokenTypes.COMMUNITY,
    disableAutoFetch: true,
  });

  const { fetchAPI: getBlogs, isError: isGetBlogsError } = useFetch({
    method: "GET",
    url: `${baseUrl}${apiPath.Article}`,
    headers: postHeaders,
    tokenType: TokenTypes.COMMUNITY,
    disableAutoFetch: true,
  });

  const {
    fetchAPI: addPost,
    isError: isAddPostError,
    errorMessage: addPostErrorMessage,
    isLoading: isAddingPost,
  } = useFetch({
    method: "POST",
    url: `${baseUrl}${apiPath.Links}`,
    headers: postHeaders,
    tokenType: TokenTypes.COMMUNITY,
    disableAutoFetch: true,
  });

  const { fetchAPI: updatePost } = useFetch({
    method: "PUT",
    url: `${baseUrl}${apiPath.Links}`,
    headers: postHeaders,
    tokenType: TokenTypes.COMMUNITY,
    disableAutoFetch: true,
  });

  // const { fetchAPI: deletePost } = useFetch({
  //     method: 'DELETE',
  //     url: `${apiPath}${apiPath.Post.BlogPosts}`,
  //     headers: postHeaders,
  //     tokenType: TokenTypes.COMMUNITY,
  //     disableAutoFetch: true,
  //     dataType: 'none'
  // })

  // const { fetchAPI: addBlogs } = useFetch({
  //     method: 'POST',
  //     url: `${apiPath}${apiPath.Post.Blogs}`,
  //     headers: postHeaders,
  //     tokenType: TokenTypes.COMMUNITY,
  //     disableAutoFetch: true,
  // })

  // const { fetchAPI: deleteBlog } = useFetch({
  //     method: 'DELETE',
  //     url: `${apiPath}${apiPath.Post.Blogs}`,
  //     headers: postHeaders,
  //     tokenType: TokenTypes.COMMUNITY,
  //     disableAutoFetch: true,
  // })

  const { fetchAPI: getAllPost } = useFetch({
    method: "GET",
    url: "",
    disableAutoFetch: true,
    ignore401: true,
  });

  const { fetchAPI: getImgInfo } = useFetch({
    method: "GET",
    url: "",
    disableAutoFetch: true,
    ignore401: true,
  });

  const _loadMyPosts = useCallback(
    async (offset?: number, postPageSize?: number) => {
      let offsetVal = offset ?? 0;
      let postPageSizeVal = postPageSize ?? 10;
      try {
        // const response: Post = await getPosts(
        //     undefined,
        //     `/my?offset=${offsetVal}&pageSize=${postPageSizeVal}`
        // )

        // const newPosts: Post =
        //     myPosts && offsetVal
        //         ? {
        //               data: [...myPosts.data, ...response.data],
        //               total: response.total,
        //           }
        //         : response
        const newPosts = {};
        // setMyPosts(newPosts);
      } catch (e) {
        console.error("Error in _loadMyPosts:", e);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getPosts, setMyPosts]
  );

  const _loadMyBlogs = useCallback(async () => {
    try {
      const response: Blog[] = await getBlogs();
      setMyBlogs(response);
    } catch (e) {
      console.error("Error in _loadMyBlogs:", e);
    }
  }, [getBlogs, setMyBlogs]);

  // useEffect(() => {
  //     if (!isAddPostError && !isAddingPost) {
  //         _loadMyPosts().then(() => setPostToEdit(undefined))
  //     }
  // }, [isAddPostError, isAddingPost])

  const _addPost = useCallback(
    async (post: Post) => {
      //   await addPost(JSON.stringify(post));
      await _loadMyPosts();
      if (!isAddingPost) {
        // try {
        //   const addPostRes = await addPost(JSON.stringify(post));
        //   if (!isAddPostError && addPostRes) {
        //     await _loadMyPosts();
        //     setPostToEdit(undefined);
        //     return addPostRes;
        //   } else if (addPostErrorMessage || !addPostRes) {
        //     const errMsg = addPostErrorMessage
        //       ? JSON.parse(addPostErrorMessage)
        //       : {
        //           PostUrl: ["url-duplicate"],
        //           Title: ["title-duplicate"],
        //         };
        //     return {
        //       correlationId: "",
        //       errors: errMsg,
        //       status: 400,
        //       title: "duplication",
        //     };
        //   }
        // } catch (e) {
        //   console.error("Error in _addPost:", e);
        //   return undefined;
        // }
      }
    },
    [isAddingPost, isAddPostError, addPostErrorMessage, _loadMyPosts, addPost]
  );

  const _updatePost = async (post: Post): Promise<Post | ErrorResponse> => {
    const result = {};
    if (!("errors" in result)) {
      _loadMyPosts();
      setPostToEdit(undefined);
    }
    return result;
  };

  // const _deletePost = async (post: Post): Promise<boolean> => {
  //     try {
  //         await deletePost(undefined, `/${post.id}`)
  //         await _loadMyPosts()
  //         setPostToDelete(undefined)
  //         return true
  //     } catch (e) {
  //         console.error('Error in _deletePost:', e)
  //         return false
  //     }
  // }

  // const _addBlogs = useCallback(
  //     async (blogs: Blog[]): Promise<Blog[] | ErrorResponse> => {
  //         try {
  //             setIsLoading(true)
  //             const addBlogsRes = await addBlogs(JSON.stringify(blogs))
  //             if (addBlogsRes && !('errors' in addBlogsRes)) {
  //                 await _loadMyBlogs()
  //                 await _loadMyPosts()
  //                 setIsAddBlogModalOpen(false)
  //             }
  //             setIsLoading(false)
  //             return addBlogsRes
  //         } catch (e) {
  //             console.error('Error in _addBlogs:', e)
  //             throw e
  //         }
  //     },
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     []
  // )

  // const _deleteBlog = async (blog: Blog): Promise<boolean> => {
  //     try {
  //         const result = await deleteBlog(undefined, `?blogId=${blog.id}`)
  //         if (result) {
  //             _loadMyBlogs()
  //             _loadMyPosts()
  //             setBlogToDelete(undefined)
  //             return true
  //         }
  //         return false
  //     } catch (e) {
  //         console.error('Error in _deleteBlog:', e)
  //         return false
  //     }
  // }

  const _onPostSave = (post: Post): Promise<Post | ErrorResponse> => {
    // return post.id ? _updatePost(post) : _addPost(post);
    return _addPost(post);
  };

  const memoizedGetWordpressPostInfo = useCallback(
    async (postUrl: string): Promise<any> => {
      const getCampusPressPostInfoBySlug = async (
        path: string,
        slug: string
      ) => {
        // try {
        //   const allPostsResponse = await getAllPost(
        //     undefined,
        //     `${path}/posts?slug=${slug}`
        //   );
        //   const allPosts = await allPostsResponse;
        //   return allPosts[0];
        // } catch (e) {
        //   return null;
        // }
      };

      const getCampusPressImageInfo = async (path: string, id: string) => {
        // try {
        //   const imageInfoResponse = await getImgInfo(
        //     undefined,
        //     `${path}/media/${id}`
        //   );
        //   return await imageInfoResponse;
        // } catch (e) {
        //   console.error("Error in getCampusPressImageInfo:", e);
        //   return null;
        // }
      };

      //       const getWordpressPostInfo = async (postUrl: string) => {
      //         try {
      //           const { origin, pathname } = new URL(postUrl);
      //           const path = `${origin}/wp-json/wp/v2`;
      //           const slug = pathname.split("/").filter(Boolean).slice(-1)[0];
      //           const postInfo = await getCampusPressPostInfoBySlug(path, slug);
      //           const imageInfo = await getCampusPressImageInfo(
      //             path,
      //             postInfo.featured_media
      //           );
      //           const thumbnailUrl = imageInfo?.source_url;

      //           const isPasswordProtected = postInfo.content.protected;
      //           const title = postInfo.title.rendered;

      //           return { title, thumbnailUrl, isPasswordProtected };
      //         } catch (e) {
      //           console.error(e);
      //           throw e;
      //         }
      //       };

      //       try {
      //         return await getWordpressPostInfo(postUrl);
      //       } catch (e) {
      //         console.log("Error for fetching post info url " + e);
      //         throw e;
      //       }
      //     },
      //     // eslint-disable-next-line react-hooks/exhaustive-deps
      //     []
      //   );

      //   const memoizedGetWordpressBlogInfo = useCallback(
      //     async (url: string): Promise<string> => {
      //       const getWordpressBlogInfo = async (url: string) => {
      //         try {
      //           const path = `${new URL(url).origin}/wp-json`;
      //           const response = await getImgInfo(undefined, `${path}`);
      //           return response.name;
      //         } catch (e) {
      //           console.error(e);
      //           throw e;
      //         }
      //       };

      try {
        // return await getWordpressBlogInfo(url);
      } catch (e) {
        console.log("Error for fetching blog info" + e);
        throw e;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const _openModal = useCallback(
    (post?: Post) => {
      console.log("Opening modal with post:", post ?? defaultPost);
      setPostToEdit(post ?? defaultPost);
    },
    [setPostToEdit]
  );
  const _closeModal = async () => {
    await _loadMyPosts();
    setPostToEdit(undefined);
  };

  const _openDeleteModal = useCallback(
    (post: Post) => setPostToDelete(post),
    [setPostToDelete]
  );
  const _closeDeleteModal = () => setPostToDelete(undefined);

  const _openDeleteBlogModal = useCallback(
    (blog: Blog) => setBlogToDelete(blog),
    [setBlogToDelete]
  );
  const _closeDeleteBlogModal = () => setBlogToDelete(undefined);

  const _openAddBlogModal = useCallback(() => {
    setIsAddBlogModalOpen(true);
  }, [setIsAddBlogModalOpen]);
  const _closeAddBlogModal = () => {
    setIsAddBlogModalOpen(false);
  };

  useEffect(() => {
    if (!myPosts) _loadMyPosts();
    // if (!myBlogs) _loadMyBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const myPostsContextProps = useMemo(
    () => ({
      myPostPageSize: myPostPageSize,
      setMyPostPageSize: setMyPostPageSize,
      loadMyPosts: _loadMyPosts,
      myPosts,
      //   getWordpressPostInfo: memoizedGetWordpressPostInfo,
      openModal: _openModal,
      openDeleteModal: _openDeleteModal,
      loadMyBlogs: _loadMyBlogs,
      // myBlogs,
      openAddBlogModal: _openAddBlogModal,
      //   getWordpressBlogInfo: memoizedGetWordpressBlogInfo,
      openDeleteBlogModal: _openDeleteBlogModal,
      // addBlogs: _addBlogs,
      isLoading,
      isBlogModalOpened: isAddBlogModalOpen,
      isGetPostsError,
      isGetBlogsError,
      isAddPostError,
      addPostErrorMessage,
    }),
    [
      myPostPageSize,
      setMyPostPageSize,
      _loadMyPosts,
      myPosts,
      _openModal,
      _openDeleteModal,
      _loadMyBlogs,
      myBlogs,
      _openAddBlogModal,
      _openDeleteBlogModal,
      // _addBlogs,
      isLoading,
      isAddBlogModalOpen,
      memoizedGetWordpressPostInfo,
      //   memoizedGetWordpressBlogInfo,
      isGetPostsError,
      isGetBlogsError,
      isAddPostError,
      addPostErrorMessage,
    ]
  );
  return (
    <MyPostsContext.Provider value={myPostsContextProps}>
      {props.children}
      <AddPostModal
        post={postToEdit}
        onClose={_closeModal}
        onSave={_onPostSave}
      />
      {/* <AddBlogModal
                blogs={myBlogs}
                onClose={_closeAddBlogModal}
                onSave={_addBlogs}
                isOpen={isAddBlogModalOpen}
            />
            <DeletePostDialog
                post={postToDelete}
                onClose={_closeDeleteModal}
                onDelete={_deletePost}
            />
            <DeleteBlogDialog
                blog={blogToDelete}
                onClose={_closeDeleteBlogModal}
                onDelete={_deleteBlog}
            /> */}
    </MyPostsContext.Provider>
  );
};

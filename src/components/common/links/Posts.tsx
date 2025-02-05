import { Post } from "@/types/Post";
import React, { useContext } from "react";
import MyPostsContext from "@/app/contexts/MyPostsContext";
import ContentStack from "@/common/contentStack/contentStack";
import { Separator } from "@fluentui/react";
import { PostsRow } from "./PostRow";
// import ErrorBox, { MyPostsType } from './ErrorBox'

const Posts: React.FunctionComponent = (): JSX.Element => {
  const {
    myPostPageSize,
    setMyPostPageSize,
    isGetPostsError,
    openModal,
    openDeleteModal,
    loadMyPosts,
  } = useContext(MyPostsContext);
  const myPosts = [
    {
      id: "3bee1758-9793-457a-b5ba-62aa653c6b6d",
      title: "Test Post 11",
      postUrl:
        "https://christestsite.sites.northeastern.edu/2024/07/16/test-post-11",
      thumbnailUrl: null,
      blogUrl: null,
      blogTitle: null,
      target: "newTab",
    },
    {
      id: "e23e4816-aa98-498d-bb22-b12d080f587b",
      title: "Test Post 10",
      postUrl:
        "https://christestsite.sites.northeastern.edu/2024/07/16/test-post-10",
      thumbnailUrl: null,
      blogUrl: null,
      blogTitle: null,
      target: "newTab",
    },
  ];

  const updateAndLoadPosts = () => {
    setMyPostPageSize(myPostPageSize + 10);
    loadMorePosts();
  };

  const loadMorePosts = () => loadMyPosts(0, myPostPageSize + 10);
  const onEditPost = (post: Post) => openModal(post);
  const onDeletePost = (post: Post) => openDeleteModal(post);

  return (
    <>
      {/* {isGetPostsError && <ErrorBox type={MyPostsType.Posts} />} */}
      {!isGetPostsError && myPosts && myPosts?.length > 0 && (
        <ContentStack role="list">
          {myPosts.map((item: Post, idx) => (
            <>
              <PostsRow
                key={item.id}
                post={item}
                onEdit={onEditPost}
                onDelete={onDeletePost}
              />
              {idx !== myPosts.length - 1 && <Separator />}
            </>
          ))}
        </ContentStack>
      )}
    </>
  );
};
export default Posts;

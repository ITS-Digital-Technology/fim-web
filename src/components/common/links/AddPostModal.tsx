import React from "react";
import { Modal, IIconProps, IconButton } from "@fluentui/react";
import { ErrorResponse, Post } from "@/types/Post";
import { PostForm } from "./PostForm";
import { defaultPost } from "@/app/contexts/MyPostsContext";
import styles from "./addPostModal.module.scss";

export interface IPostsModalProps {
  post: Post | undefined;
  onClose(): void;
  onSave(post: Post): Promise<Post | ErrorResponse>;
}

function getPostText(post: IPostsModalProps["post"]) {
  if (post?.blogUrl) {
    return "Settings";
  }

  if (post?.id) {
    return "Edit Links";
  }

  return "Add a Link";
}

function AddPostModal(props: Readonly<IPostsModalProps>) {
  const modalProps = {
    isOpen: !!props.post,
    onDismiss: props.onClose,
    isBlocking: false,
    scrollableContentClassName: styles.addPostModalScrollableContent,
  };

  const cancelIcon: IIconProps = {
    iconName: "Cancel",
    styles: { root: styles.closeIcon },
  };

  return (
    <Modal {...modalProps}>
      <div className={styles.addPostModal}>
        <h2 className={styles.addPostModalHeader}>{getPostText(props.post)}</h2>
        <IconButton
          iconProps={cancelIcon}
          ariaLabel="Close popup modal"
          onClick={props.onClose}
        />
      </div>
      <PostForm
        onCreate={props.onSave}
        onCancel={props.onClose}
        post={props.post ?? defaultPost}
      />
    </Modal>
  );
}

export default AddPostModal;

import React, { useContext } from "react";
import { Post } from "@/types/Post";
import { CommandBar, ICommandBarItemProps, Icon, Stack } from "@fluentui/react";
import styles from "./post.module.scss";
import Image from "next/image";
import { UserContext } from "@/app/contexts/UserContext";

interface IPostRowProps {
  post: Post;
  onEdit?: (post: Post) => void;
  onDelete?: (post: Post) => void;
}

export const PostsRow: React.FC<IPostRowProps> = (
  props: IPostRowProps
): JSX.Element => {
  const _overflowItems: ICommandBarItemProps[] = [
    ...(props.onEdit
      ? [
          {
            key: "edit",
            text: props.post.blogUrl ? "Settings" : "Edit",
            onClick: () => props.onEdit?.(props.post),
          },
        ]
      : []),
    ...(props.onDelete
      ? [
          {
            key: "delete",
            text: props.post.blogUrl ? "Remove" : "Delete",
            onClick: () => props.onDelete?.(props.post),
          },
        ]
      : []),
  ];
  const { user } = useContext(UserContext);

  return (
    <Stack horizontal grow tokens={{ childrenGap: 10 }} role="listitem">
      <Stack.Item className={styles.imageWrapperStack} disableShrink>
        <a
          href={props.post.postUrl}
          target="_blank"
          style={{ textDecoration: "none" }}
          tabIndex={-1}
        >
          <div>
            <Stack
              grow
              verticalFill
              verticalAlign="center"
              horizontalAlign="center"
            >
              {props.post.thumbnailUrl ? (
                <Stack className={styles.imageStack}>
                  <Image
                    src={props.post?.thumbnailUrl}
                    alt=""
                    width={76}
                    height={76}
                  />
                </Stack>
              ) : (
                <Icon iconName="Blog" className={styles.blogIcon}></Icon>
              )}
            </Stack>
          </div>
        </a>
      </Stack.Item>
      <Stack.Item grow>
        {props.post.blogUrl && props.post.blogTitle && (
          <a
            href={props.post.blogUrl}
            target="_blank"
            style={{ textDecoration: "none" }}
            tabIndex={-1}
          >
            <Stack horizontal tokens={{ childrenGap: 5 }}>
              <Icon iconName="Blog" className={styles.blogIconGray}></Icon>
              <Stack className={styles.blogTitle}>{props.post.blogTitle}</Stack>
            </Stack>
          </a>
        )}
        <Stack grow horizontal horizontalAlign="space-between">
          <a
            href={props.post.postUrl}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <p className={styles.postTitle}>{props.post.title}</p>
          </a>
          <CommandBar
            items={[]}
            overflowItems={_overflowItems}
            className={styles.commandBarStyles}
            overflowButtonProps={{
              menuIconProps: { iconName: "Edit" },
              ariaLabel: `Edit ${props.post.title}`,
            }}
          />
        </Stack>
        {user && (
          <p className={styles.postAuthor}>
            By {`${user.firstName} ${user.lastName}`}
          </p>
        )}
      </Stack.Item>
    </Stack>
  );
};

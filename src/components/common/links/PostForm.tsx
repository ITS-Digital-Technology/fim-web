import { useState, useContext, useCallback, useEffect } from "react";
import { ErrorResponse, Post, Target } from "@/types/Post";
import {
  ActionButton,
  Icon,
  TextField,
  ChoiceGroup,
  IChoiceGroupOption,
  TooltipHost,
  TooltipDelay,
  DirectionalHint,
} from "@fluentui/react";
import MyPostsContext, { defaultPost } from "@/app/contexts/MyPostsContext";
import Image from "next/image";
import { debounce } from "lodash";
import styles from "./post.module.scss";

export interface IPostFormProps {
  post: Post;
  onCreate(post: Post): Promise<Post | ErrorResponse>;
  onCancel(): void;
}

const defaultErrorMessages = {
  emptyTitle: false,
  invalidUrl: false,
  errorAddPost: false,
  errorDuplicateUrl: false,
  errorDuplicateTitle: false,
};

export const PostForm = (props: IPostFormProps) => {
  const [formPost, setFormPost] = useState<Post>(props.post);
  const [isCurrentPostPasswordProtected, setIsCurrentPostPasswordProtected] =
    useState(false);
  const [isValidPostInfo, setIsValidPostInfo] = useState(true);
  const { getWordpressPostInfo, isAddPostError, addPostErrorMessage } =
    useContext(MyPostsContext);
  const [errorMessages, setErrorMessages] = useState(defaultErrorMessages);

  const privacyOptions: IChoiceGroupOption[] = [
    {
      key: Target.currentTab,
      text: "Open in current tab",
      disabled: isCurrentPostPasswordProtected,
      ariaLabel: "Open in current tab",
    },
    {
      key: Target.newTab,
      text: "Open in new tab",
      disabled: isCurrentPostPasswordProtected,
      ariaLabel: "Open in current tab",
    },
    {
      key: Target.newWindow,
      text: "Open in a new window",
      disabled: isCurrentPostPasswordProtected,
      ariaLabel: "MOpen in a new window",
    },
  ];

  const isPostUrlValid = (postUrl: string): boolean => {
    const regex =
      /^(https:\/\/)?([w|W]{3}\.)?([A-Za-z0-9])+\.sites.northeastern.edu(\/.*)?$/;
    return regex.test(postUrl);
  };

  const isPostFormValid = (setError: boolean): boolean => {
    const isTitleEmpty = !formPost.title;
    const isUrlInvalid = !formPost.postUrl || !isPostUrlValid(formPost.postUrl);

    if (setError) {
      setErrorMessages({
        ...errorMessages,
        emptyTitle: isTitleEmpty,
        invalidUrl: isUrlInvalid,
      });
    }

    return !isTitleEmpty && !isUrlInvalid;
  };

  useEffect(() => {
    if (
      isAddPostError &&
      addPostErrorMessage !== undefined &&
      isPostFormValid(false)
    ) {
      const err = JSON.parse(addPostErrorMessage);
      const duplicatedPostUrl =
        err.PostUrl && err.PostUrl[0] === "url-duplicate";
      const duplicatedTitle = err.Title && err.Title[0] === "title-duplicate";

      setErrorMessages((em) => ({
        ...em,
        errorDuplicateUrl: duplicatedPostUrl,
        errorDuplicateTitle: duplicatedTitle,
        errorAddPost: !duplicatedPostUrl && !duplicatedTitle,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddPostError, addPostErrorMessage]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (isPostFormValid(true)) {
      await props.onCreate(formPost);
    }
  };

  const onCancel = () => {
    setFormPost(defaultPost);
    setErrorMessages({
      ...errorMessages,
      errorAddPost: false,
      errorDuplicateUrl: false,
      errorDuplicateTitle: false,
    });
    props.onCancel();
  };

  const getPostInfo = async (url: string) => {
    if (isPostUrlValid(url)) {
      setErrorMessages({
        ...errorMessages,
        errorDuplicateUrl: false,
        errorDuplicateTitle: false,
      });
      try {
        let info = await getWordpressPostInfo(url);
        setFormPost((newFormPost) => ({
          ...newFormPost,
          title: info.title,
          thumbnailUrl: info.thumbnailUrl,
        }));
        setIsCurrentPostPasswordProtected(info.isPasswordProtected);
        setErrorMessages((em) => ({ ...em, invalidUrl: false }));
        setIsValidPostInfo(true);
      } catch (error) {
        setErrorMessages((em) => ({ ...em, invalidUrl: true }));
        setIsValidPostInfo(false);
      }
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetThumbnail = useCallback(
    debounce((url: string) => getPostInfo(url), 300),
    []
  );

  const onPostUrlChange = async (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    setFormPost((newFormPost) => ({
      ...newFormPost,
      postUrl: newValue ?? "",
    }));
    debouncedGetThumbnail(newValue ?? "");
  };

  const onTitleChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string | undefined
  ) => {
    setFormPost((newFormPost) => ({
      ...newFormPost,
      title: newValue ?? "",
    }));
  };

  const onPrivacyChange = (
    event?: React.FormEvent<HTMLInputElement | HTMLElement>,
    option?: IChoiceGroupOption
  ) => {
    if (option) {
      setFormPost((newFormPost) => ({
        ...newFormPost,
        target: option.key as Target,
      }));
    }
  };

  const errorMessagePostUrl = () => {
    return (
      <>
        {errorMessages.invalidUrl && (
          <div className={styles.errorMessage}>
            Please enter a URL from{" "}
            <a
              target="_blank"
              href="https://sites.northeastern.edu/"
              className={styles.blueLink}
            >
              sites.northeastern.edu
            </a>
            . Make sure the privacy setting for this post is not set to
            &quot;Private&quot; at{" "}
            <a
              target="_blank"
              href="https://sites.northeastern.edu/"
              className={styles.blueLink}
            >
              sites.northeastern.edu{" "}
            </a>
          </div>
        )}
        {errorMessages.errorDuplicateUrl && (
          <div className={styles.errorMessage}>
            You already used this URL for a post. Please type a new URL.
          </div>
        )}
      </>
    );
  };

  const errorMessageTitle = () => {
    return (
      <>
        {errorMessages.emptyTitle && (
          <div className={styles.errorMessage}>Please add a Title</div>
        )}
        {errorMessages.errorDuplicateTitle && (
          <div className={styles.errorMessage}>
            You already used this title for a post. Please type a new title.
          </div>
        )}
      </>
    );
  };

  const isSubmitDisabled = !isValidPostInfo || isCurrentPostPasswordProtected;

  return (
    <div className={styles.postAddSection}>
      <form>
        <div className={styles.inputRow}>
          <div id="postUrlLabel" className={styles.text}>
            Enter the URL of your site, including https://, below to add it to
            your profile
            <div className={styles.messageText}>Link Title</div>
          </div>
          <TextField
            errorMessage={
              errorMessages.invalidUrl || errorMessages.errorDuplicateUrl
                ? errorMessagePostUrl()
                : ""
            }
            value={formPost.postUrl}
            onChange={onPostUrlChange}
            disabled={!!props.post.blogUrl}
            aria-labelledby="postUrlLabel"
          />
        </div>
        <div className={styles.inputRow}>
          <div className={styles.text} id="postTitleLabel">
            Link Text
          </div>
          <TextField
            errorMessage={
              errorMessages.emptyTitle || errorMessages.errorDuplicateTitle
                ? errorMessageTitle()
                : ""
            }
            value={formPost.title}
            onChange={onTitleChange}
            maxLength={150}
            disabled={!!props.post.blogUrl}
            aria-labelledby="postTitleLabel"
          />
        </div>
        <div className={styles.inputRow}>
          <div className={styles.text} id="postTitleLabel">
            URL
          </div>
          <TextField
            errorMessage={
              errorMessages.emptyTitle || errorMessages.errorDuplicateTitle
                ? errorMessageTitle()
                : ""
            }
            value={formPost.title}
            onChange={onTitleChange}
            maxLength={150}
            disabled={!!props.post.blogUrl}
            aria-labelledby="postTitleLabel"
          />
        </div>

        {isPostUrlValid(formPost.postUrl) && (
          <div className={styles.thumbnailContainer}>
            {formPost.thumbnailUrl ? (
              <Image
                src={formPost.thumbnailUrl}
                className={styles.thumbnail}
                alt=""
                width={60}
                height={60}
              />
            ) : (
              <div className={styles.defaultThumbnail}>
                <Icon
                  iconName="Blog"
                  className={styles.defaultThumbnailIcon}
                ></Icon>
              </div>
            )}
          </div>
        )}
        <div className={styles.inputRow}>
          <fieldset className={styles.fieldsetNoBorder}>
            <legend>
              <div className={styles.text} aria-label="Set your link target. ">
                Target{" "}
              </div>
            </legend>
            <ChoiceGroup
              options={privacyOptions}
              selectedKey={formPost.target}
              onChange={onPrivacyChange}
              className={styles.choiceGroup}
              required={true}
            />
          </fieldset>
        </div>
        <div className={styles.inputRow}>
          <div className={styles.text} id="icon">
            Icon
          </div>
        </div>
        <div className={styles.inputRow}>
          <div className={styles.text} id="icon">
            Add Another Link
          </div>
        </div>
        <div className={styles.buttonSection}>
          <ActionButton
            onClick={onCancel}
            className={styles.cancelButtonStyles}
          >
            Cancel
          </ActionButton>
          <ActionButton
            disabled={isSubmitDisabled}
            className={styles.okButtonStyles}
            onClick={onSubmit}
          >
            Add
          </ActionButton>
        </div>
        {errorMessages.errorAddPost && (
          <div className={styles.errorMessage}>
            Your post cannot be saved at the moment. Please try again later.
          </div>
        )}
      </form>
    </div>
  );
};

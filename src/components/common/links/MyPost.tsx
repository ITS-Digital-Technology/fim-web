import { UserContext } from "@/app/contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import MyPostsContext from "@/app/contexts/MyPostsContext";
// import MePageTitleBar from "@/components/mePage/myPageTitleBar/MePageTitleBar";
import { Stack } from "@fluentui/react";
import styles from "./post.module.scss";
import Image from "next/image";
// import MyBlogs from "./MyBlogs";
import Posts from "./Posts";
import ContentStack from "@/common/contentStack/contentStack";
import useFetch from "@/hooks/useFetch";
import { apiPath, baseUrl } from "@/src/apiConfig";
import {
  Options,
  documentToHtmlString,
} from "@contentful/rich-text-html-renderer";
import { Block, INLINES, Inline, Text } from "@contentful/rich-text-types";
import DOMPurify from "dompurify";
import { Add20Regular } from "@fluentui/react-icons";
import BasicEntry from "../myBasics/BasicEntry";

export interface ContentStackProps {
  children?: React.ReactNode;
  padding?: string;
  dataAutomationId?: string;
  boxShadow?: string;
  margin?: string;
}

const options: Partial<Options> = {
  renderNode: {
    [INLINES.HYPERLINK]: (node: Inline | Block) => {
      let hyperlinkText: Text = node.content[0] as Text;
      return `<a href="${node.data.uri}" target='_blank'>${hyperlinkText.value}</a>`;
    },
  },
};

export default function MyPosts() {
  const { user } = useContext(UserContext);
  const { isGetBlogsError, openModal, openAddBlogModal } =
    useContext(MyPostsContext);

  const [myPostsMessage, setMyPostsMessage] = useState<string>();

  const onCreatePost = () => openModal();

  //   useEffect(() => {
  //     !mePageData && fetchMePageData();
  //   }, [mePageData, fetchMePageData]);

  const { data: myPostsMessageData } = useFetch({
    url: `${baseUrl}${apiPath.GetWorkProfile}`,
  });

  useEffect(() => {
    if (myPostsMessageData) {
      setMyPostsMessage(
        DOMPurify.sanitize(
          documentToHtmlString(myPostsMessageData?.value?.message, options),
          { ADD_ATTR: ["target"] }
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myPostsMessageData]);

  return (
    user && (
      <div className={styles.mainWrapper}>
        {/* <MePageTitleBar title="My Posts" /> */}
        <ContentStack padding="0" margin="0" dataAutomationId="posts-container">
          <BasicEntry title="Links" content={[""]} />
          <Stack
            horizontal
            verticalAlign="center"
            horizontalAlign="space-between"
            className={styles.subContainer}
          >
            <button
              onClick={onCreatePost}
              className={styles.actionBtn}
              aria-label="Add a link button"
              data-gtm-sh-my-posts-add-post={true}
            >
              <Add20Regular /> Add
            </button>
          </Stack>
        </ContentStack>
        <Posts />
      </div>
    )
  );
}

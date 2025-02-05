import React from "react";
import {
  Dialog,
  IDialogProps,
  DialogType,
  IDialogContentProps,
  IDialogStyles,
  IModalProps,
} from "@fluentui/react";
import styles from "./biographyDialog.module.scss"; // 引入 SCSS 文件

export interface IBiographyDialogProps extends IDialogProps {
  onDismiss: () => void;
  dialogContentProps?: IDialogContentProps;
  modalProps?: IModalProps;
}

const BiographyDialog = (props: IBiographyDialogProps) => {
  return (
    <Dialog
      hidden={props.hidden}
      onDismiss={props.onDismiss}
      dialogContentProps={{
        ...props.dialogContentProps,
        type: DialogType.normal,
      }}
      modalProps={{
        ...props.modalProps,
        className: styles.dialogContainer, // 作用样式
      }}
    />
  );
};

export default BiographyDialog;

import React, { PropsWithChildren, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navigationLink.module.scss";

interface IProps {
  href: string;
  onClick?: () => void;
  testId: string;
  className?: string;
  tag: string;
}

const removeTrailingSlash = (string: string) => {
  return string.at(-1) === "/" ? string.slice(0, -1) : string;
};

export default function NavigationLink({
  children,
  href,
  onClick,
  testId,
  className,
  tag,
}: PropsWithChildren<IProps>) {
  const router = usePathname();

  const currentPath = useMemo(() => removeTrailingSlash(router), [router]);
  const destinationPath = useMemo(() => removeTrailingSlash(href), [href]);

  return (
    <Link
      href={href}
      aria-current={currentPath === destinationPath}
      className={`${styles.navLink} ${className}`}
      onClick={onClick}
      data-testid={testId}
      data-gtm-eh-sitewide-nav={tag}
      prefetch={false}
    >
      {children}
    </Link>
  );
}

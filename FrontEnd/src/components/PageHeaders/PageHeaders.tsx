import type { ReactNode } from "react";

import {
  PageHeaderContainer,
  TitleContainer,
  Actions,
} from "./PageHeadersStyles.ts";

interface PageHeaderProps {
  title: string;
  description: string;
  children?: ReactNode;
}

const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  return (
    <PageHeaderContainer>
      <TitleContainer>
        <h2>{title}</h2>
        <p>{description}</p>
      </TitleContainer>

      {children && <Actions>{children}</Actions>}
    </PageHeaderContainer>
  );
};

export default PageHeader;

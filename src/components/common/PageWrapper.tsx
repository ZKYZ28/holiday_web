import { FC, ReactElement } from 'react';
import Header from '../Header/Header.tsx';
import FallBackError from "../FallBackError/FallBackError.tsx";
import {ErrorBoundary} from "react-error-boundary";

type PageWrapperProps = {
  children?: ReactElement;
};

const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <ErrorBoundary
        FallbackComponent={FallBackError}>
        {children}
      </ErrorBoundary>

      {/* Footer */}
    </div>
  );
};

export default PageWrapper;

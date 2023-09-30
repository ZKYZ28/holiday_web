import { FC, ReactElement } from 'react';
import Header from '../Header/Header.tsx';

type PageWrapperProps = {
  children?: ReactElement;
};

const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      {/* Footer */}
    </div>
  );
};

export default PageWrapper;

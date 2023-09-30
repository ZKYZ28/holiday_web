import { FC, ReactElement } from 'react';

type PageContentProps = {
  children: ReactElement;
  pageTitle: string;
};

const PageContent: FC<PageContentProps> = ({ children, pageTitle }) => {
  return (
    <section className="bg-gray-100">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-3xl capitalize lg:text-4xl text-blue-800 font-bold mb-4">{pageTitle}</h1>
        {children}
      </div>
    </section>
  );
};

export default PageContent;

type PageHeaderProps = {
    pageName: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({pageName}) => {
  return (
    <header className="headerContainer">
      <p className="headerTextContainer">{pageName}</p>
      <hr className="dividerStyle" />
    </header>
  );
};

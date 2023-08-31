interface Props {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <i>under public layout</i>
      {children}
    </div>
  );
};

export default PublicLayout;

interface Props {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: Props) => {
  return (
    <div className="h-full flex items-center justify-center">
      <i>under protected layout</i>
      {children}
    </div>
  );
};

export default ProtectedLayout;

interface Props {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <i>under protected layout</i>
      {children}
    </div>
  );
};

export default ProtectedLayout;

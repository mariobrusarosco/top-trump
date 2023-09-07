// import { useParams } from "next/navigation";

interface Props {
  params: { tableId: string };
}

const TableScreen = ({ params }: Props) => {
  return (
    <main>
      <h2>
        Table:
        {params.tableId}
      </h2>
    </main>
  );
};

export default TableScreen;

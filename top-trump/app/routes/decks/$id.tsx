import Card from "~/components/Card";
import Layout from "~/components/Layout/Layout";

export default function Deck(props) {
  console.log(props);

  return (
    <Layout>
      <h1 className="bg-red text-3xl font-bold  variant-test:text-teal-300">
        Deck
      </h1>
    </Layout>
  );
}

import Header from "@/components/header";
import Layout from "@/components/layout";
import Searchbar from "@/components/searchbar";

export default function Example() {
  return (
    <Layout>
      <Header />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Your content */}
          <Searchbar />
        </div>
      </main>
    </Layout>
  );
}

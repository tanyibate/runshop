import "../styles/globals.css";
import Navbar from "../components/navbar";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };
  const getLayout = Component.getLayout || ((page) => page);
  const navigation = [{ name: "Fixtures", href: "/", current: true }];

  const userNavigation = [{ name: "Sign out", href: "#" }];

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Navbar
        navigation={navigation}
        userNavigation={userNavigation}
        user={user}
      />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

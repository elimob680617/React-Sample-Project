import Layout from "./layout/Layout";

import { Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { ProductsPage } from "./pages/ProductsPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/details/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>

      {/* <Layout>
        <List />
        <Stack spacing={3} p={3}>
          <Products />
        </Stack>
      </Layout> */}
    </>
  );
}

export default App;

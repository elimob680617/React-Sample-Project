import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    items: [],
    item: {},
    error: "",
  },
  reducers: {
    fetchProductsRequest(state, action) {
      state.loading = true;
    },
    fetchProductsSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
    },
    fetchProductsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProductDetailsSuccess(state, action) {
      state.loading = false;
      state.item = action.payload;
    },
  },
});
export const fetchProductDetails = (id) => {
  return async (dispatch) => {
    const fetchDetails = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);

      if (!response.ok) {
        throw new Error("Fetch Product Details Failed!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const productDetails = await fetchDetails();
      dispatch(fetchProductDetailsSuccess(productDetails));
    } catch (error) {
      const errorMsg = error.message;
      dispatch(fetchProductsFail(errorMsg));
    }
  };
};
export const fetchProductData = () => {
  return async (dispatch) => {
    dispatch(fetchProductsRequest());
    const fetchProduct = async () => {
      const response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) {
        throw new Error("Could not Fetch Products Data");
      }

      const data = await response.json();
      return data;
    };
    try {
      const productData = await fetchProduct();
      dispatch(fetchProductsSuccess(productData));
    } catch (error) {
      const errorMsg = error.message;
      dispatch(fetchProductsFail(errorMsg));
    }
  };
};

export const {
  fetchProductsRequest,
  fetchProductsFail,
  fetchProductsSuccess,
  fetchProductDetailsSuccess,
} = productsSlice.actions;

export default productsSlice;

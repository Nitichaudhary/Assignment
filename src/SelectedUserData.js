import { createSlice } from "@reduxjs/toolkit";
export const getSingleUserDetailsHandler = (UserName) => (dispatch) => {
  dispatch(setFetching(true));
  fetch("https://api.dicebear.com/7.x/initials/svg?seed",{
    params: { UserName }
  })
    .then((res) => res.json())
    .then((data) => dispatch(setApiStatus(data)))
    .catch((err) => dispatch(setErrors(err)))
    .finally(() => dispatch(setFetching(false)));
};
const initialState = {
  apiStatus: 0,
  fetching: false,
  data: [],
  errors: "",
};
const SelectedUserData = createSlice({
  name: "SelectedUserData",
  initialState,
  reducers: {
    setApiStatus: (state, action) => {
      state.apiStatus = state.apiStatus + 1;
      state.data = action.payload;
      state.errors = action.payload;
    },
    setFetching: (state, action) => {
      state.fetching = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
});
export const { setApiStatus, setFetching, setErrors } = SelectedUserData.actions;
export default SelectedUserData.reducer;

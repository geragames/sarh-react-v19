import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearTokens, setToken } from "../../api/api.axios";
import { changePasswordThunk } from "./authThunk";


interface AuthState {
  user: string | null;
  roles: string[];
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  message: string;
  passwordChanged: boolean;
}

const initialState: AuthState = {
  user: localStorage.getItem("user") || null,
  roles: JSON.parse(localStorage.getItem("roles") || "[]"),
  accessToken: localStorage.getItem("token") || null,
  refreshToken: localStorage.getItem("refresh_token")?? null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  message: "",
  passwordChanged: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        user: string;
        roles: string[];
      }>
    ) {
      const { accessToken, refreshToken, user, roles } = action.payload;
      
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.user = user;
      state.roles = roles ?? [];

      setToken(accessToken, refreshToken, user, roles);
    },

    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.roles = [];

      clearTokens();
    },

    updateAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      state.isAuthenticated = true;

      setToken(action.payload, state.refreshToken || undefined);
    },
    updateUserData(
      state,
      action: PayloadAction<{ user: string; roles: string[] }>
    ) {
      state.user = action.payload.user;
      state.roles = action.payload.roles;

      localStorage.setItem("roles", JSON.stringify(action.payload.roles));
      localStorage.setItem("user", action.payload.user);

    },
  },

  extraReducers: (builder) => {
    builder.addCase(changePasswordThunk.pending, (state)=> {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(changePasswordThunk.fulfilled, (state, action)=> {
      state.loading = false;
      state.message = action.payload.message;
      state.passwordChanged = true;
    });
    builder.addCase(changePasswordThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error as string;
    })

  }
});

export const { loginSuccess, logout, updateAccessToken, updateUserData } = authSlice.actions;
export default authSlice.reducer;

/*   loginSuccess(state, action) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.roles = action.payload.roles ?? [];

            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            localStorage.setItem("user", action.payload.user);
            localStorage.setItem("roles", JSON.stringify(action.payload.roles ?? []));                                              
        },
        logout(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            localStorage.removeItem("roles");
        },
        updateAccessToken(state, action) {
            state.accessToken = action.payload;

            localStorage.setItem("accessToken", action.payload);
        } */

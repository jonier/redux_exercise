import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'auth/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {

      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;

      const response = await fetch('http://localhost:3000/api/v1/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },

      });

      if (!response.ok) throw new Error('Error fetching the list of users.');
      const res = await response.json();
      return res.data;;

    } catch (error) {
      return rejectWithValue('Failed to fetch the list of users.');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const res = await response.json()

      if (!response.ok) {
        console.log('Vea pues', res.error.errors[0]);
        throw new Error(res.error.errors[0].msg);
      };

      return res.data;

    } catch (error) {
      console.log(error);
      return rejectWithValue('Registration could not be completed');
    }
  }
);


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const data = {
        identity: loginData.email,
        password: loginData.password,
      }

      const response = await fetch('http://localhost:3000/api/v1/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Login error.');

      const res = await response.json();
      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;

    } catch (error) {
      return rejectWithValue('Invalid credentials or login error.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    users: [],
    isAuthenticated: !!localStorage.getItem('user'),
    loading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem('user');

      window.location.href = 'http://localhost:3001/login';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;

        window.location.href = 'http://localhost:3001/'
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError, logout } = authSlice.actions;
export default authSlice.reducer;

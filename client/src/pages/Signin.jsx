import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSigninRequest, userSigninSuccess, userSigninFailure } from '../redux/userSlice';
import OAuth from '../components/oAuth';


export default function Signin() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
  
    try {
      dispatch(userSigninRequest());
     
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        dispatch(userSigninSuccess(data));
        // Navigate to the home page after successful signin
        navigate('/home');
      } else {
        dispatch(userSigninFailure(data.message));
        
      }
    } catch (error) {
      // console.error('Error during signin:', error);
      dispatch(userSigninFailure('Something went wrong', error.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-[-50px]">
    <h1 className="text-2xl font-bold mb-6 text-center">Signin</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
          onChange={handleChange}
        />
      </div>

      {/*  Display error message */}
      {/* {error && <p className="text-red-500 text-xs italic mt-4 text-center">{error}</p>} */}

      <div className="flex items-center justify-between">
        <button
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="submit"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        {/* <OAuth /> */}
        
      </div>
      
      <OAuth />

      <div className="mt-4 text-center">
        <span className="text-gray-700">Dont have an account? </span>
        <a href="/signup" className="text-blue-500 hover:text-blue-700">
          Sign Up
        </a>
      </div>
    </form>
  </div>
</div>
  );
} 

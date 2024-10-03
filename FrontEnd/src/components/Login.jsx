import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // For navigating after signup

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Create the user object
    const user = { email, password };

    try {
      const response = await axios.post('http://localhost:4001/user/login', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle successful signup
      if (response.data) {
        toast.success("Loggedin Successfully")
        localStorage.setItem("Users", JSON.stringify(response.data.user));
        console.log(response.data); // Optionally log the response
      }
      navigate('/'); // Redirect to home or login page after signup
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    } catch (error) {
      // Handle errors
      if (error.response) {
        // If the server responded with a status code outside the 2xx range
        toast.error('Error: ' + error.response.data.message)
        console.error('Error: ', error.response.data.message);
        // alert(error.response.data.message); // Show error message to the user
      } else {
        // If an error occurred while setting up the request
        console.error('Error: ' + error.message);
        toast.error("Something went wrong, please try again.")
        // alert('Something went wrong, please try again.');
      }
    }
  };

  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button> */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box dark:bg-slate-900 dark:text-white dark:border">
          <form onSubmit={handleSubmit} >
            <div className='flex justify-between'>
              <h3 className="font-bold text-xl">Login!</h3>
            {/* if there is a button in form, it will close the modal */}
            <Link className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}>✕</Link>            </div>

            {/* Email */}
            <div className='mt-4 space-y-2'>
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder='Enter your email'
                className='w-80 px-3 py-1 border rounded-md outline-none dark:text-black'
                value={email} // Set the email state
                onChange={(e) => setEmail(e.target.value)} // Update the state on input change
              // required // Make the field required
              />
            </div>

            {/* Password */}
            <div className='mt-4 space-y-2'>
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder='Enter your password'
                className='w-80 px-3 py-1 border rounded-md outline-none dark:text-black'
                value={password} // Set the password state
                onChange={(e) => setPassword(e.target.value)} // Update the state on input change
              // required // Make the field required
              />
            </div>

            {/* button */}
            <div className='flex justify-around mt-4'>
              <button type='submit' className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200'
                onClick={() => document.getElementById("my_modal_3").close()}>Login</button>
              <p>Not registered? <Link to="/signup" className='underline text-blue-500 cursor-pointer'>SignUp</Link>{" "}</p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default Login
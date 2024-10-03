import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import toast from 'react-hot-toast';

const Signup = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // For navigating after signup

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Create the user object
        const user = { fullname,email, password };

        try {
            const response = await axios.post('http://localhost:4001/user/signup', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Handle successful signup
            if(response.data){
                toast.success("Signup Successfully")
                // alert("SignUp Successful");
                localStorage.setItem("Users",JSON.stringify(response.data.user));
                console.log(response.data); // Optionally log the response
            }
            setTimeout(()=>{
                navigate('/'); // Redirect to home or login page after signup
            },2000)
        } catch (error) {
            // Handle errors
            if (error.response) {
                // If the server responded with a status code outside the 2xx range
                toast.error('Error: '+ error.response.data.message)
                console.error('Error:', error.response.data.message);
                navigate('/'); // Redirect to home or login page after signup
                
                // alert(error.response.data.message); // Show error message to the user
            } else {
                // If an error occurred while setting up the request
                console.error('Error:', error.message);
                toast.error('Error: Something went wrong, please try again.')
                // alert('Something went wrong, please try again.');
                navigate('/'); // Redirect to home or login page after signup
            }
        }
    };

    return (
        <>
            <div className='flex h-screen items-center justify-center'>
                <div id="my_modal_3" className="dark:bg-slate-900 dark:text-white dark:border">
                    <div className="py-8 px-12 border rounded-lg">
                        <form onSubmit={handleSubmit} className='flex-col justify-between'>
                            <div className='flex justify-between'>
                                <h3 className="font-bold text-lg">Sign Up!</h3>
                                <Link to="/" className="btn btn-sm btn-circle btn-ghost">✕</Link>
                            </div>

                            {/* name */}
                            <div className='mt-4 space-y-2'>
                                <span>Name</span>
                                <br />
                                <input
                                    type="name"
                                    placeholder='Enter your name'
                                    className='w-80 px-3 py-1 border rounded-md outline-none dark:text-black'
                                    value={fullname} // Set the email state
                                    onChange={(e) => setFullname(e.target.value)} // Update the state on input change
                                    required // Make the field required
                                />
                            </div>

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
                                    required // Make the field required
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
                                    required // Make the field required
                                />
                            </div>

                            {/* Button */}
                            <div className='flex justify-around mt-4'>
                                <button
                                    type='submit' // Set type to submit to trigger form submission
                                    className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200'
                                >
                                    Sign Up
                                </button>
                                <p>
                                    Have an account?
                                    <Link to="/" className='underline text-blue-500 cursor-pointer'> Login</Link>{" "}
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
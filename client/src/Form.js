import React, { useState } from "react";
import axios from 'axios';

const SubmissionsForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date_of_birth: '',
        department: 'IT',
        comments: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting data:", formData);

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/users/submissions/`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Submission successful");
        } catch (error) {
            console.error("Error submitting data:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl m-auto mt-10 space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input name="name" type="text" placeholder="Name" onChange={handleChange}
                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input name="email" type="email" placeholder="Email" onChange={handleChange}
                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div>
                <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input type="date" name="date_of_birth" onChange={handleChange}
                       className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                <select name="department" onChange={handleChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Marketing">Marketing</option>
                </select>
            </div>
            <div>
                <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comments</label>
                <textarea name="comments" placeholder="Comments" onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>
            <button type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
            </button>
        </form>
    );
};

export default SubmissionsForm;

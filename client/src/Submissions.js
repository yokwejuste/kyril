import React, {useEffect, useRef, useState} from "react";
import axios from 'axios';

const Submissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const socketRef = useRef(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/submissions/`);
                setSubmissions(response.data);
            } catch (error) {
                console.error('Failed to fetch initial data:', error);
            }
        };

        fetchInitialData().then(r => {
        });

        socketRef.current = new WebSocket(`${process.env.REACT_APP_API_URL.replace('http', 'ws')}/ws/submissions/`);

        socketRef.current.onopen = () => {
            console.log("WebSocket connection established");
        };

        socketRef.current.onmessage = (event) => {
            const newSubmission = JSON.parse(event.data);
            console.log("Message from server:", newSubmission);

            setSubmissions(prev => [...prev, newSubmission]);
        };

        socketRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socketRef.current.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl font-semibold text-gray-800 my-6">Live Submissions</h1>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date of Birth
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Department
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Comments
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {submissions.map((sub, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sub.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.date_of_birth}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.department}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.comments}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Submissions;

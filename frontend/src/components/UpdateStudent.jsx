import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

export const UpdateStudent = () => {
    const location = useLocation();
    const [name, setName] = useState(location.state?.studentData?.name || "");
    const [email, setEmail] = useState(location.state?.studentData?.email || "");
    const {id} = useParams();
    const navigate = useNavigate();

    console.log("Location State:", location.state);

    // useEffect(() => {
    //     axios.get(`http://localhost:8081/student/${id}`)
    //         .then(res => {
    //             console.log("Fetched data for update:", res.data);
    //             setName(res.data.name);
    //             setEmail(res.data.email);
    //         })
    //         .catch(err => console.log(err));
    // }, [id]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("Name:", name);
    //     console.log("Email:", email);
    //
    //     const updatedStudent = {name, email};
    //
    //     axios.put(`http://localhost:8081/update/${id}`, updatedStudent)
    //         .then(res => {
    //             console.log(res);
    //             navigate('/');
    //         })
    //         .catch(err => console.log(err));
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Name:", name);
        console.log("Email:", email);
        try {
            const res = await axios.put(`http://localhost:8081/update/${id}`, {name, email});
            console.log(res);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (<>
        <div className="flex min-h-screen bg-blue-600 justify-center items-center">
            <div className="w-full max-w-md bg-white rounded-lg p-6 shadow">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Update Student</h2>
                    <div className="mb-4">
                        <label htmlFor="nom" className="block text-gray-700 mb-2">
                            Name
                        </label>
                        <input
                            id="nom"
                            type="text"
                            placeholder="Enter the student's name"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter the student's email"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>

    </>)
}
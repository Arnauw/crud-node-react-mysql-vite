import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export const Student = () => {

    const [students, setStudent] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => {
                setStudent(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    console.log(students);

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this student?");
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:8081/delete/${id}`);
                console.log("Deleting student");
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    }

    // const handleDelete = (id) => {
    //     axios.delete(`http://localhost:8081/delete/${id}`)
    //         .then(() => {
    //             console.log("Deleting student");
    //             window.location.reload();
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    return (
        <>
            <div className="min-h-screen min-w-screen bg-gray-100 flex flex-col items-center p-4">

                <h1 className="text-4xl font-bold text-gray-800 mb-8">
                    Students
                </h1>
                <div className="w-full max-w-4xl bg-white rounded-lg p-6 shadow-lg">
                    <div className={"flex justify-center"}>
                        <Link
                            className="my-5 bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
                            to={"/create"}>
                            Add
                        </Link>
                    </div>
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                        <table className="w-full text-left">
                            <thead>
                            <tr className="border-b bg-gray-200 font-semibold text-gray-700 text-center">
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                students.map((student) => (
                                    <tr key={student.id}
                                        className="border-b odd:bg-gray-800 even:bg-gray-700 text-center">
                                        <td className="p-3">{student.name}</td>
                                        <td className="p-3">{student.email}</td>
                                        <td className="p-3">
                                            <Link
                                                to={`/update/${student.id}`}
                                                state={{studentData: student}}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2 transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition-colors"
                                                onClick={() => handleDelete(student.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}

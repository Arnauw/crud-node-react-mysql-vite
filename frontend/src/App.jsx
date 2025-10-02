import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Student} from "./components/Student.jsx";
import {CreateStudent} from "./components/CreateStudent.jsx";
import {UpdateStudent} from "./components/UpdateStudent.jsx";

export const App = () => {
    
    return (
        <>
            <div className={"App"}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Student />} />
                        <Route path="/create" element={<CreateStudent />} />
                        <Route path="/update/:id" element={<UpdateStudent />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}
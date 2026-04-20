import '../css/CreateOfficer.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOfficerAPI } from '../services/apiCalls';
import { useSelector } from 'react-redux';
const CreateOfficer = () => {
    const [loading, setloading] = useState(false);
    const navigate = useNavigate()
    const [formData, setformData] = useState({ email: "", department: "" });
    const user = useSelector((state) => state.profile.user);
    function changeHandler(event) {
        setformData((preData) => (
            {
                ...preData,
                [event.target.name]: event.target.value,
            }
        ))
    }
    async function submitHandler(event) {
        event.preventDefault();
        setloading(true);
        try {
            const response = await createOfficerAPI(formData);
            if (response.data.success) {
                toast.success("Officer Created SuccessFully");
                if (user?.accountType === "SuperAdmin") {
                    navigate("/super-admin");
                }
                else{
                    navigate("/admin");
                }
            }
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Officer Not Created");
        }
        setloading(false);
    }
    return (
        <div className="create-officer-container">
            {loading ? (
                <div className="center-spinner">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="create-officer-content">
                    <form onSubmit={submitHandler}>
                        <div className="input-row-create-officer">
                            <input type="email" placeholder="Enter Email Addres" required name="email" onChange={changeHandler} value={formData.email} />
                        </div>
                        <div className="input-row-create-officer">
                            <select required name="department" onChange={changeHandler} value={formData.department}>
                                <option value="" disabled>Select Department</option>
                                <option value="Police Department">Police Department</option>
                                <option value="Municipal Department">Municipal Department</option>
                                <option value="Fire Department">Fire Department</option>
                                <option value="Health Department">Health Department</option>
                                <option value="Tourism Department">Tourism Department</option>
                                <option value="Infrastructure Department">Infrastructure Department</option>
                            </select>
                        </div>
                        <button type="submit" className="create-officer-btn" disabled={loading}>{loading ? "Creating..." : "Create Officer"}</button>
                    </form>
                </div>
            )}
        </div>
    )
}
export default CreateOfficer;
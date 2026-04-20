import '../css/CreateAdmin.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createAdminAPI } from '../services/apiCalls';
const CreateAdmin = () => {
    const[loading,setloading] = useState(false);
    const navigate = useNavigate()
    const[formData, setformData] = useState({email:"",department:""});
    function changeHandler(event) {
        setformData((preData)=>(
            {
                ...preData,
                [event.target.name]:event.target.value,
            }
        ))
    }
    async function submitHandler(event) {
        event.preventDefault();
        setloading(true);
        try {
            const response = await createAdminAPI(formData);
            if(response.data.success) {
                toast.success("Admin Created SuccessFully");
                navigate("/super-admin");
            }
        }
        catch(error) {
            toast.error(error.response?.data?.message || "Admin Not Created");
        }
        setloading(false);
    }
    return(
        <div className="create-admin-container">
            {loading ? (
                <div className="center-spinner">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="create-admin-content">
                    <form onSubmit={submitHandler}>
                        <div className="input-row-create-admin">
                            <input type="email" placeholder="Enter Email Addres" required name="email" onChange={changeHandler} value={formData.email}/>
                        </div>
                        <div className="input-row-create-admin">
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
                        <button type="submit" className="create-admin-btn" disabled={loading}>{loading ? "Creating..." : "Create Admin"}</button>
                    </form>
                </div>
            )}
        </div>
    )
}
export default CreateAdmin;
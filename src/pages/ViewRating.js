import React, { useEffect } from "react";
import '../css/ViewRating.css'
import { useState } from "react";
import { getAllRatingAPI } from "../services/apiCalls";

const ViewRating = () => {
    const [search, setSearch] = useState("");
    const [loading, setloading] = useState(false);
    const [ratings, setRatings] = useState([]);
    useEffect(() => {
        async function fetchRatings() {
            setloading(true);
            try {
                const response = await getAllRatingAPI();
                setRatings(response?.data?.data || []);
            }
            catch (err) {
                console.log(err);
            }
            setloading(false);
        }
        fetchRatings();
    }, []);
    const filteredRatings = (ratings || []).filter((item) =>
        item.zone.toLowerCase().includes(search.toLowerCase()) ||
        item.rating.toString().includes(search)
    );

    return (
        <div className="viewrating-container">
            {loading ? (

                <div className="center-spinner">
                    <div className="spinner"></div>
                </div>

            ) : (
                <>
                    <input type="text" className="search-input" placeholder="Search Your Area" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                    <div className="rating-box">
                        <h3>Zone Ratings</h3>
                        <div>
                            {
                                !ratings || ratings.length === 0 ? (<p>No Rating Added Yet.</p>) : (<table>
                                    <thead>
                                        <tr>
                                            <th>Zone Name</th>
                                            <th>Rating</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredRatings.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.zone}</td>
                                                    <td>{item.rating}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>)
                            }
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
export default ViewRating
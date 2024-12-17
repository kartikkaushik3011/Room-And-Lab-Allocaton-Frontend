import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import RoomLabSection from "./RoomLabSection";

function SeminarAudi() {
    const { block_code } = useParams();
    const [bookingData, setBookingData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterAvailable, setFilterAvailable] = useState(false);
    const [selectedSeminar, setSelectedSeminar] = useState("All Venues");
    const [selectedDay, setSelectedDay] = useState("All Dates");

    const blocks = {
        ab: "Aryabhatta",
        kc: "KC",
        bb: "Bhabha",
        rm: "Raman",
        rj: "Ramanujan"
    };

    const currBlock = blocks[block_code];

    const removeFilter = () => {
        setFilterAvailable(false);
        setSelectedSeminar("All Venues");
        setSelectedDay("All Dates");
    };

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios
            .get("/seminarAudiData")
            .then((response) => {
                setBookingData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load booking data.");
                setLoading(false);
                console.error(err);
            });
    }, []);

    if (loading) return <p>Loading seminar booking data...</p>;
    if (error) return <p>{error}</p>;
    if (!currBlock || !bookingData[currBlock]) return <p>No booking data available for the selected block.</p>;

    const data = bookingData[currBlock];

    const seminars = ["All Venues", ...Object.keys(data).filter(key => key !== "month" && key !== "year")];

    const filteredData = Object.keys(data || {}).reduce((acc, seminar) => {
        if (seminar === "month" || seminar === "year") return acc;

        const seminarArray = data[seminar] || [];
        seminarArray.forEach((item) => {
            const seminarBookings = item.bookings || [];
            const roomData = seminarBookings
                .filter((booking) =>
                    (selectedSeminar === "All Venues" || seminar === selectedSeminar) &&
                    (selectedDay === "All Dates" || booking.date === selectedDay)
                )
                .map((booking) => {
                    const timeSlots = Object.entries(booking)
                        .filter(([key]) => key.includes(" - "))
                        .reduce((slots, [time, slotDetails]) => {
                            if (filterAvailable && slotDetails.booked_by !== null) return slots;
                            slots[time] = slotDetails;
                            return slots;
                        }, {});

                    return {
                        ...booking,
                        time_slots: timeSlots
                    };
                });

            if (roomData.length) {
                if (!acc[seminar]) acc[seminar] = [];
                acc[seminar].push(...roomData);
            }
        });

        return acc;
    }, {});

    const uniqueDays = [
        "All Dates",
        ...new Set(
            Object.values(data || {}).flatMap((seminarArray) =>
                (Array.isArray(seminarArray) ? seminarArray : []).flatMap((item) =>
                    (item.bookings || []).map((booking) => booking.date)
                )
            )
        )
    ];

    return (
        <div>
            <RoomLabSection block_code={block_code}/>
            <div className="filterBar d-flex border-top border-black align-items-center justify-content-between" style={{ padding: "10px", backgroundColor: "rgb(73 75 77 / 68%)" }}>
                <div className="d-flex gap-1">
                    <h3 style={{ color: "white" }}>Filters <i className="fa-solid fa-filter"></i> :</h3>
                    <button
                        className="btn btn-outline-light btn-sm m-1"
                        onClick={() => setFilterAvailable((prev) => !prev)}
                    >
                        {filterAvailable ? "Show All Slots" : "Show Only Available Slots"}
                    </button>
                    {(filterAvailable || selectedSeminar !== "All Venues" || selectedDay !== "All Dates") && (
                        <button className="btn btn-outline-light btn-sm m-1" onClick={removeFilter}>
                            Clear Filters
                        </button>
                    )}
                </div>
                <div className="d-flex gap-2">
                    <select
                        className="form-select"
                        value={selectedSeminar}
                        onChange={(e) => setSelectedSeminar(e.target.value)}
                    >
                        {seminars.map((seminar) => (
                            <option key={seminar} value={seminar}>{seminar === "All Venues" ? "All Venues" : seminar.toUpperCase()}</option>
                        ))}
                    </select>
                    <select
                        className="form-select"
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                    >
                        {uniqueDays.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="accordion" id="accordionExample">
                {Object.keys(filteredData).map((seminar, index) => (
                    <div className="accordion-item" key={index}>
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${index}`}
                                aria-expanded={index === 0}
                                aria-controls={`collapse${index}`}
                            >
                                {seminar.toUpperCase()}
                            </button>
                        </h2>
                        <div
                            id={`collapse${index}`}
                            className={`accordion-collapse collapse`}
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body">
                                {filteredData[seminar].map((booking, bookingIndex) => (
                                    <div key={bookingIndex} style={{ marginBottom: "1rem" }}>
                                        <h5 style={{color:"black"}}>{booking.date}</h5>
                                        <ul>
                                            {Object.entries(booking.time_slots).map(([time, slot]) => (
                                                <li key={time}>
                                                    {time}: {slot.booked_by
                                                        ? `Occupied - by ${slot.booked_by} for ${slot.purpose}`
                                                        : <Link
                                                        to={`/bookSeminar/${block_code}/${seminar}/${booking.date}/${time}`}
                                                        className="btn btn-outline-dark btn-sm m-1"
                                                    >
                                                        Book
                                                    </Link>}
                                                </li>
                                            ))}
                                        </ul>
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SeminarAudi;

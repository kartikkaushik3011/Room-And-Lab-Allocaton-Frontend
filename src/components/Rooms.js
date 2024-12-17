import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import RoomLabSection from "./RoomLabSection";

function Rooms() {
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const { place, block_code } = useParams();
    const blocks = {
        ab: "Aryabhatta",
        kc: "KC",
        bb: "Bhabha",
        rm: "Raman",
        rj: "Ramanujan"
    };
    const currBlock = blocks[block_code];
    const [roomData, setRoomData] = useState({});
    const [loading, setLoading] = useState(true);
    const [filterAvailable, setFilterAvailable] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState("All Rooms");
    const [selectedDay, setSelectedDay] = useState("All Days");
    const removeFilter = () => {
        setFilterAvailable(false);
        setSelectedRoom("All Rooms");
        setSelectedDay("All Days");
    }

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${apiUrl}/${block_code}`)
            .then((response) => {
                setRoomData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [block_code,apiUrl]);

    if (loading) return <p>Loading rooms...</p>;

    if (!roomData[currBlock] || !roomData[currBlock][place]) {
        return <p>No data available for {currBlock} {place}.</p>;
    }

    const data = roomData[currBlock][place];

    const filteredData = data
        .filter((room) => selectedRoom === "All Rooms" || room.room_no === selectedRoom)
        .map((room) => ({
            ...room,
            days: room.days
                .filter((day) => selectedDay === "All Days" || day.day === selectedDay)
                .map((day) => ({
                    ...day,
                    slots: Object.fromEntries(
                        Object.entries(day.slots).filter(([, slot]) =>
                            filterAvailable ? slot.status !== "Occupied" : true
                        )
                    )
                }))
        }));


    const uniqueRooms = ["All Rooms", ...new Set(data.map((room) => room.room_no))];
    const uniqueDays = ["All Days", ...new Set(data.flatMap((room) => room.days.map((day) => day.day)))];

    return (
        <>
            <RoomLabSection block_code={block_code} />

            <div className="filterBar d-flex border-top border-black align-items-center justify-content-between" style={{ width: "100%", padding: "10px", backgroundColor: "rgb(73 75 77 / 68%)" }}>
                <div className="d-flex gap-1">
                    <h3 style={{ color: "white" }}>Filters <i className="fa-solid fa-filter"></i> :  </h3>
                    <button
                        className="btn btn-outline-light btn-sm m-1"
                        onClick={() => setFilterAvailable((prev) => !prev)}
                    >
                        {filterAvailable ? "Show All Slots" : "Show Only Available Slots"}
                    </button>
                    {filterAvailable || selectedRoom !== "All Rooms" || selectedDay !== "All Days" ? (<button className="btn btn-outline-light btn-sm m-1" onClick={(removeFilter)}>Clear Filters</button>) : ""}
                </div>
                <div className="d-flex gap-2">
                    <select
                        className="form-select "
                        value={selectedRoom}
                        onChange={(e) => setSelectedRoom(e.target.value)}
                    >
                        {uniqueRooms.map((room) => (
                            <option key={room} value={room}>{room}</option>
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
                {filteredData.map((room, index) => (
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
                                Room Number: {room.room_no}
                            </button>
                        </h2>
                        <div
                            id={`collapse${index}`}
                            className={`accordion-collapse collapse `}
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body">
                                {room.days.map((day, dayIndex) => (
                                    <div key={dayIndex} style={{ marginBottom: "1rem" }}>
                                        <h5 style={{ color: "black" }}>{day.day}</h5>
                                        <ul>
                                            {Object.entries(day.slots).map(([time, slot]) => (
                                                <li className="d-flex align-items-center justify-content-left" key={time}>
                                                    {time}: <strong>{slot.status}</strong> -{" "}
                                                    {slot.status === "Occupied" ? (
                                                        `${slot.subject} by ${slot.teacher}`
                                                    ) : (
                                                        <Link
                                                            to={`/book/${place}/${block_code}/${room.room_no}/${encodeURIComponent(day.day)}/${time}`}
                                                            className="btn btn-outline-dark btn-sm m-1"
                                                        >
                                                            Book
                                                        </Link>
                                                    )}
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
        </>
    );
}

export default Rooms;

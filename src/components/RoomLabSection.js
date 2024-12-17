import React from 'react'
import "./RoomsLabSection.css"
import { Link } from 'react-router-dom'

function RoomLabSection(props) {
    return (
        <>
            <div className='p-3' style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "rgb(73 75 77 / 68%)" }}>
                <div className='icon-container' style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "5rem" }}>
                    <Link to={`/rooms/${props.block_code}`}>
                        <div className='icon' style={{ borderRadius: "50%", height: "12vh", width: "6vw", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                            <i className="fa-solid fa-book" style={{ fontSize: "3vw" }}></i>
                        </div>
                    </Link>
                    <h5>Rooms</h5>
                </div>

                <div className='icon-container' style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "5rem" }}>
                    <Link to={`/labs/${props.block_code}`}>
                        <div className='icon' style={{ borderRadius: "50%", height: "12vh", width: "6vw", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                            <i className="fa-solid fa-flask" style={{ fontSize: "3vw" }}></i>
                        </div>
                    </Link>
                    <h5>Labs</h5>
                </div>

                <div className='icon-container' style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Link to={`/seminarAudi/${props.block_code}`}>
                        <div className='icon' style={{ borderRadius: "50%", height: "12vh", width: "6vw", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                            <i className="fa-regular fa-image" style={{ fontSize: "3vw" }}></i>
                        </div>
                    </Link>
                    <h5>{props.block_code === "rm" ? ("Seminar/Auditorium") : ("Seminars")}</h5>
                </div>
            </div>
        </>
    )
}

export default RoomLabSection

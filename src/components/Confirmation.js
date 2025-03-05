import React from 'react'
import { useParams, Link } from 'react-router-dom'

function Confirmation() {
    const {place, block_code, room_no, day, slot}=useParams();
    const blocks = {
        "ab": "Aryabhatta",
        "kc": "Kalpana Chawla",
        "bb": "Bhabha",
        "rm": "Raman",
        "rj": "Ramanujan"
    }

    const currBlock = blocks[block_code];
    return (
        <div
            style={{
                backgroundColor: 'white',
                width: "30vw",
                margin: "0px auto",
                marginTop: "18vh",
                textAlign: "center",
                padding: "3vh",
                borderRadius: "10px",
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8)',
                alignItems:"center"
            }}
        >
            <h3 className='mb-4'><i class="fa-regular fa-circle-check"></i> Request Sent!</h3>
            <hr  />
            <div className='d-flex gap-2 mt-4'>
                <div className='d-flex flex-column gap-1' style={{width:"25%"}}>
                    Block
                    <hr />
                    {`${currBlock}`}
                </div>
                <div className='d-flex flex-column gap-1' style={{width:"25%"}}>
                    {place==='rooms'?('Room No.'):('Lab No.')}
                    <hr />
                    {`${room_no}`}
                </div>
                <div className='d-flex flex-column gap-1' style={{width:"25%"}}>
                    Day
                    <hr />
                    {`${day}`}
                </div>
                <div className='d-flex flex-column gap-1' style={{width:"25%"}}>
                    Slot
                    <hr />
                    {`${slot}`}
                </div>
                
            </div>
            {/* <h2 style={{color:"black", fontSize:"4.5vh"}}>Your Booking for {room_no} on {day} in {currBlock} Block for the slot {slot} has been done Successfully!</h2> */}
            <Link to={`/${place}/${block_code}`} className="btn btn-outline-dark mt-4 mb-3" type="submit" style={{ marginTop: "10px" }}>Go Back</Link>
        </div>
    )
}

export default Confirmation

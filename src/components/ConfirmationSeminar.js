import React from 'react'
import { useParams, Link } from 'react-router-dom'

function ConfirmationSeminar() {
    const { block_code, seminar, date, slot}=useParams();
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
                    Venue
                    <hr />
                    {`${seminar.toUpperCase()}`}
                </div>
                <div className='d-flex flex-column gap-1' style={{width:"25%"}}>
                    Date
                    <hr />
                    {`${date}`}
                </div>
                <div className='d-flex flex-column gap-1' style={{width:"25%"}}>
                    Slot
                    <hr />
                    {`${slot}`}
                </div>
                
            </div>
            <Link to={`/seminarAudi/${block_code}`} className="btn btn-outline-dark mt-4 mb-3" type="submit" style={{ marginTop: "10px" }}>Go Back</Link>
        </div>
    )
}

export default ConfirmationSeminar

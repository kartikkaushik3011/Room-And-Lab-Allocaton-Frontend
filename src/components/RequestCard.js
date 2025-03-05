import React from 'react';

const RequestCard = ({ request, index, onApprove, onReject }) => {
    const jumbotronStyle = {
        maxWidth: '95%',
        margin: '5px auto',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8)',
        backgroundColor: "rgb(73 75 77 / 90%)",
        color: "white",
        position: 'relative',
        overflow: 'hidden',
        border: "0px"
    };
    return (
        <div className="list-group-item list-group-item-action mb-2" style={jumbotronStyle}>
            <h5 className="mb-2 text-white">{request.type === 'room' ? 'Room Booking Request' : 'Seminar Booking Request'}</h5>
            <hr />
            <div style={{ 'display': 'flex', 'justifyContent': 'space-between', alignItems: 'center' }}>
                <div>
                    <ul className="list-unstyled mb-3" style={{ 'display': 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        <li><strong>Block:</strong> {request.block_code.toUpperCase()}</li>
                        
                        <li><strong>Faculty:</strong> {request.faculty_name}</li>
                        {request.type === 'room' ? (
                            <>
                                <li><strong>Subject Code:</strong> {request.subject_code}</li>
                                <li><strong>Room No:</strong> {request.room_no}</li>
                                <li><strong>Day:</strong> {request.day}</li>
                                <li><strong>Slot:</strong> {request.slot}</li>
                            </>
                        ) : (
                            <>  
                                <li><strong>Purpose:</strong> {request.purpose}</li>
                                <li><strong>Venue:</strong> {request.seminar}</li>
                                <li><strong>Date:</strong> {request.date}</li>
                                <li><strong>Slot:</strong> {request.slot}</li>
                            </>
                        )}
                    </ul>
                </div>
                <div className="d-flex">
                    <button className="btn btn-success me-2" onClick={() => onApprove(index)}>Approve</button>
                    <button className="btn btn-danger" onClick={() => onReject(index)}>Reject</button>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;
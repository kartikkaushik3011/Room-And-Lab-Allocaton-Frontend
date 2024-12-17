import React from 'react';
import { Link } from 'react-router-dom';
import "./Blocks.css";

function Blocks({ image, block, info, block_code }) {
    const cardStyle = {
        width: "32vw",
        backgroundColor: "rgba(73, 75, 77, 0.8)",
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8)',
        transition: "transform 0.3s ease",
        color: "white",
        padding: "0px",
    };

    return (
        <div className='block lh-1' style={{ fontFamily: "Didot" }}>
            <div
                className="card border-2 rounded card-hover"
                style={cardStyle}
            >
                <img src={image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <p className="card-title block-name">{block}</p>
                    <p className="block-text">Block</p>
                    <div className="button-container d-flex justify-content-between align-items-center">
                        <p className="card-text info-text">{info}</p>
                        <Link to={`/rooms/${block_code}`} className="btn btn-dark btn-status">
                            Status
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blocks;

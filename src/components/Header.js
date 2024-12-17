import React from 'react';
import buildingImage from './assets/abesec-building.jpeg';

function Header() {
    const jumbotronStyle = {
        maxWidth: '90%',
        margin: '30px auto',
        borderRadius: '15px',
        padding: '40px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8)',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${buildingImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        position: 'relative',
        overflow: 'hidden'
    };

    const slideInAnimation = {
        animation: 'slideIn 1.5s ease-out forwards',
    };

    return (
        <>
            <div className="jumbotron p-2  rounded" style={jumbotronStyle}>
                <h1 className="display-5" style={slideInAnimation}>Room & Lab Allocation</h1>
                <p className="lead" style={slideInAnimation}>Select the Block in which you want to check the available rooms and labs</p>
                <hr className="my-4" />
                <p style={slideInAnimation}>To know more about the website, click on the button below.</p>
                <p className="lead" style={slideInAnimation}>
                    <button className="btn btn-outline-light" type="submit" style={{ marginLeft: "10px" }}>Learn More</button>
                </p>
            </div>
        </>
    );
}

export default Header;

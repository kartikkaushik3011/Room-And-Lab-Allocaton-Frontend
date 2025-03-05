import React, { useEffect, useState } from "react";
import RequestCard from "./RequestCard";

const Admin = () => {
    const BASE_URL = "http://localhost:3000";

    const [requests, setRequests] = useState([]);

    const fetchPendingRequests = async () => {
        const res = await fetch(`${BASE_URL}/pendingRequests`, {
            credentials: "include"  // Include authToken cookie
        });
        return res.json();
    };
    
    const approveRequest = async (index) => {
        await fetch(`${BASE_URL}/approveRequest`, {
            method: "POST",
            credentials: "include",  // Include authToken cookie
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ index })
        });
    };
    
    const rejectRequest = async (index) => {
        await fetch(`${BASE_URL}/rejectRequest`, {
            method: "POST",
            credentials: "include",  // Include authToken cookie
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ index })
        });
    };

    const loadRequests = async () => {
        const data = await fetchPendingRequests();
        setRequests(Array.isArray(data) ? data : []);  // Safeguard
    };

    const handleApprove = async (index) => {
        await approveRequest(index);
        loadRequests();
    };

    const handleReject = async (index) => {
        await rejectRequest(index);
        loadRequests();
    };

    useEffect(() => {
        loadRequests();
    }, []); 

    return (
        <div className="container mt-4">
            <h1 className="text-center text-white mb-4">Admin Panel - Pending Requests</h1>
            {requests.length === 0 ? (
                <p className="text-muted text-center">No pending requests.</p>
            ) : (
                <div className="list-group">
                    {requests.map((req, idx) => (
                        <RequestCard
                            key={idx}
                            request={req}
                            index={idx}
                            onApprove={handleApprove}
                            onReject={handleReject}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Admin;

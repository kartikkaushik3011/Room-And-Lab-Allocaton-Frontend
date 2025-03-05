import React, { useEffect, useState, useCallback } from "react";
import RequestCard from "./RequestCard";
import { fetchPendingRequests, approveRequest, rejectRequest } from "../api";

const Admin = () => {
    const [requests, setRequests] = useState([]);

    const loadRequests = useCallback(async () => {
        const data = await fetchPendingRequests();
        setRequests(Array.isArray(data) ? data : []); 
    }, []); 

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
    }, [loadRequests]);  
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

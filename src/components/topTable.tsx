import React from 'react';
import { useLocation } from 'react-router-dom'

function TopTable() {

    const location = useLocation();
    

    return(<h1>{location.pathname}</h1>);
}

export default TopTable;
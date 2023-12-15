import { Header } from '@/components'
import React from 'react'

const Objects = () => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    let lastUpdatedDate = mm + '/' + dd + '/' + yyyy;

    return (
        <div>
            <div className="site-section">
                <h3 className="main_header">Objects</h3>
                <p><i>Most recently updated on {lastUpdatedDate}</i></p>
            </div>
        </div> 
        )
    }

    export default Objects;
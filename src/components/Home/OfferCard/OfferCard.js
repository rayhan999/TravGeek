import React from 'react';
import { Link } from 'react-router-dom';

const OfferCard = () => {
    return (
        <div className="col-md-4 p-5 m-5  bg-white" style={{ borderRadius: '10px' }}>

            <h3>Group Travel to New Zealand</h3>
            <div class="price d-flex pt-2 pb-2" style={{ color: "#FF7C5B !important" }}>
                <h4>$150</h4> &nbsp; &nbsp;<del>$300</del>
            </div>
            <p className="section-description">Lorem ipsum dolor amet consectetur adipiscing sed do eiusmod tempor ux incidunt labore dolore magna aliqua Quis ipsum suspen. bgbd						</p>
            <Link to=" " class="btn theme-btn">See Details</Link>
        </div>

    );
};

export default OfferCard;
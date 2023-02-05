import React from 'react';
import { Col } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import './ServiceDetail.css';

const ServiceDetail = ({ service }) => {
    return (
        <Col md={4} className="mb-5 text-center service-detail">
            <Fade bottom duration={2500} distance="40px">
                <div class="card" style={{ width: '18rem' }}>
                    <img src="..." class="card-img-top" alt="..." />
                    <div class="card-body">
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </Fade>
        </Col>
    );
};

export default ServiceDetail;
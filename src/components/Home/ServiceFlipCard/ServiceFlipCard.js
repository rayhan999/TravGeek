import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import './ServiceFlipCard.css';

const ServiceFlipCard = ({ service }) => {
    const { title, image, description, cost, days, location } = service;
    const { setSelectedService, isAdmin } = useContext(UserContext);
    return (
        <div className="col-md-4 mb-5" style={{ background: 'none' }}>

            <div className="flip-card-container "
            // style="--hue: 220"
            >
                <div className="flip-card">

                    <div className="service-card-front shadow">
                        <figure>
                            <div className="service-img-bg"></div>
                            <img className="service-img" src={image} alt="Brohm Lake" />
                            <figcaption>{title}</figcaption>
                        </figure>

                        <ul className="service-ul">
                            <li>{location}</li>

                        </ul>
                    </div>

                    <div className="service-card-back shadow border">


                        {/* <button>Book</button> */}
                        <div className="card bg-transparent" style={{ width: '18rem', border: 'none' }}>
                            <h5>{title}</h5>
                            <div className="card-body">
                                <p className="card-text">{description.slice(0, 100)}...</p>

                            </div>
                            <div
                                class="card-footer bg-transparent border-top-0 d-flex justify-content-between">
                                <h5 id="price"><span className="fw-bolder">৳</span>{cost} <small>/day</small></h5>
                                <Link to={isAdmin ? "/dashboard/orderList" : "/dashboard/book"}>
                                    <button type="button"
                                        className="btn-main"


                                        onClick={() => setSelectedService(service)}
                                    ><i class="fa fa-shopping-cart"></i>&nbsp;Book
                                        Now</button></Link>
                            </div>
                        </div>


                    </div>
                </div>
            </div>


        </div>
    );
};

export default ServiceFlipCard;
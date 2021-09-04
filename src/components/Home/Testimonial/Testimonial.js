import React from 'react';
import { Card } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";

const Testimonial = ({ testimonial: { name, org, photo, description, rating } }) => {
    return (
        <Card className="my-4" style={{ height: "350px" }}>
            <div className="d-flex">
                <Card.Img variant="top" src={photo} width="60" />
                <div style={{
                    flexDirection: "column"
                }} className="d-flex justify-content-center ">

                    <h5>
                        <br />{name} <br />
                        <span>{org}</span>
                    </h5>
                    <ReactStars
                        count={5}
                        edit={false}
                        value={rating}
                        size={20}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
                </div>

            </div>
            {/* <Card.Img variant="top" src={photo} width="60" /> */}
            <Card.Body className="text-center">
                {/* <h5>{name} <br />
                    <span>{org}</span>
                </h5> */}
                <p><small className="text-justify">{description}</small></p>
            </Card.Body>
        </Card>
    );
};

export default Testimonial;
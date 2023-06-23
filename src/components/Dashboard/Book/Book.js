import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { UserContext } from '../../../App';
import { API_ROOT } from '../../../consts/consts';
import PaymentForm from '../Payment/PaymentForm';
import makeAPICalls from '../../../utilities/makeApiCalls';

const Book = () => {
    const { selectedService: { title, cost } } = useContext(UserContext);

    const stripePromise = loadStripe('pk_test_51IhHpnJP2LH8iQtQsqLx4i9CYn3xOUnFyM9y2mRX3sxyTcPfQbeAyRg8rnqwbgn3J2wGVi3JB6EaZMAqqqaCm6b400b5UVe5NH');
    const [services, setServices] = useState([]);

    const options = services.map(service => ({ value: service.title, label: service.title, price: service.cost }));
    const defaultOption = title ? { value: title, label: title, price: cost } : options[0] || { value: "", label: "", price: 0 };

    const [selectedOption, setSelectedOption] = useState(defaultOption);
    const serviceInfo = services.find(service => service.title === selectedOption.value);

    useEffect(() => {
        // axios.get(`${API_ROOT}services`)
        //     .then(res => setServices(res.data))
        //     .catch(error => toast.error(error.message))
        
    makeAPICalls(`services`, setServices);
    }, [])

    const colourStyles = {
        control: styles => (
            {
                ...styles,
                backgroundColor: 'white',
                boxShadow: 'none',
                border: "2px solid #c715fd",
                '&:hover': { border: '2px solid #c715fd' },
                height: "calc(2em + 0.75rem + 2px)"
            }
        ),
        option: (styles, { isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isDisabled ? null : isSelected ? "#c715fd" : isFocused ? "#d9b6e4" : null,
                color: isDisabled ? null : isSelected ? "white" : isFocused ? "black" : "black",
                cursor: isDisabled ? 'not-allowed' : 'default',
                ':active': { ...styles[':active'], backgroundColor: !isDisabled && (isSelected ? "#c715fd" : "#d9b6e4") },
            };
        },
    };

    return (
        <>


            <section>
                <Container className="p-5 mx-auto mt-5 bg-white" style={{ borderRadius: "15px" }}>
                    <div className="px-4">
                        <Row>
                            <Col md={6} xs={12} className="pr-md-4">
                                <label style={{ fontWeight: "bold" }}>Service</label>
                                <Select
                                    onChange={option => setSelectedOption(option)}
                                    defaultValue={defaultOption}
                                    options={options}
                                    styles={colourStyles}
                                />
                            </Col>
                            <Col md={6} xs={12} className="pl-md-4 form-main">
                                <label style={{ fontWeight: "bold" }}>Price</label>
                                <div className="form-control w-50 pl-3" style={{ lineHeight: "2", fontWeight: "500" }}>
                                    ${cost || selectedOption.price}
                                </div>
                            </Col>
                        </Row>

                        <div className="mt-5">
                            <Elements stripe={stripePromise}>
                                <PaymentForm serviceInfo={serviceInfo} />
                            </Elements>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default Book;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Row, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import ServiceFlipCard from "../ServiceFlipCard/ServiceFlipCard";
import "./Services.css";

const Services = () => {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const callAPI = async () => {
    const response = await axios.get("https://trav-geek-mern-server.vercel.app/services");
    const data = response.data;
    setServices(data);
    setLoading(false);
    // toast.success('reviews');
    console.log(data); // Do something with the data
  };
  function fetchData() {
    try {
      callAPI();
    } catch (error) {
      toast.error(error.message + "reviews");
      callAPI();
    }
  }
  useEffect(() => {
    // axios.get('https://trav-geek-mern-server.vercel.app/services')
    //     .then(res => {
    //         setServices(res.data);
    //         setLoading(false);
    //     })
    //     .catch(error => toast.error(error.message))
    fetchData();
  }, []);
  const handleServices = () => {
    setShowMore(!showMore);
  };
  return (
    <section id="services" className="text-center py-5">
      <h5>What We Do</h5>
      <h1>Services We Provide</h1>
      <Row className="justify-content-center mx-auto mt-md-5 pt-5">
        {loading ? (
          <Spinner animation="border" variant="danger" />
        ) : showMore ? (
          services.map((service) => <ServiceFlipCard key={service._id} service={service} />)
        ) : (
          services.slice(0, 6).map((service) => <ServiceFlipCard key={service._id} service={service} />)
        )}
      </Row>
      <Button onClick={handleServices} className="px-4 logout-btn btn-main">
        {showMore ? "Show Less" : "Show More"}
      </Button>
    </section>
  );
};

export default Services;

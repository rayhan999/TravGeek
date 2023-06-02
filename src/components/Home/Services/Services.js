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
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("https://trav-geek-mern-server.vercel.app/services")
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch((error) => toast.error(error.message));
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
        ) : error ? (
          <p>Can't load data due to CORS Issue</p>
        ) : services && showMore ? (
          services?.map((service) => <ServiceFlipCard key={service._id} service={service} />)
        ) : services && !showMore ? (
          services.slice(0, 6).map((service) => <ServiceFlipCard key={service._id} service={service} />)
        ) : null}
      </Row>
      {services ? (
        <Button onClick={handleServices} className="px-4 logout-btn btn-main">
          {showMore ? "Show Less" : "Show More"}
        </Button>
      ) : null}
    </section>
  );
};

export default Services;

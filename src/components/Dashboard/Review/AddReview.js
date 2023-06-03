import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import ReactStars from "react-rating-stars-component";
import { UserContext } from '../../../App';
import { API_ROOT } from '../../../consts/consts';

const AddReview = ({ review, setReview, edit, setEdit }) => {
    const { loggedInUser: { photo, name, email } } = useContext(UserContext);
    const { register, handleSubmit, reset } = useForm();

    const [rating, setRating] = useState(0);
    const ratingChanged = (newRating) => {
        // console.log(newRating);
        setRating(newRating);
    };

    const onSubmit = data => {
        const loading = toast.loading('Uploading...Please wait!');
        data.photo = photo || "https://i.ibb.co/5GzXkwq/user.png";
        data.email = email;
        data.rating = rating;

        if (edit) {
            axios.patch(`${API_ROOT}updateReview/${review._id}`, data)
                .then(res => {
                    toast.dismiss(loading);
                    if (
                        data.name === review.name &&
                        data.address === review.address &&
                        data.description === review.description &&
                        data.rating === review.rating
                    ) {
                        setEdit(false);
                        return toast.error("You haven't changed anything!");
                    }
                    if (res.data) {
                        setEdit(false);
                        return swal("Successfully updated", "Your review has been successfully updated!", "success");
                    }
                    swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
                })
                .catch(error => {
                    toast.dismiss(loading);
                    swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
                });
            return;
        }

        axios.post(`${API_ROOT}addReview`, data)
            .then(res => {
                toast.dismiss(loading);
                if (res.data) {
                    reset();
                    setReview(data);
                    return swal("Successfully Submitted", "Your review has been successfully submitted.", "success");
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
            .catch(error => {
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            });
    }

    return (
        <section>
            <Form onSubmit={handleSubmit(onSubmit)} className="w-100 form-main">
                <div className="p-5 mx-auto mt-5 bg-white" style={{ borderRadius: "15px", maxWidth: '50rem' }}>
                    <Form.Row className="justify-content-center px-4">
                        <Form.Group as={Col} md={12}>
                            <Form.Label style={{ fontWeight: "bold" }}>Your Name</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={review?.name || name}
                                {...register("name", { required: true })}
                                placeholder="Your Name" />
                        </Form.Group>
                        <Form.Group as={Col} md={12}>
                            <Form.Label style={{ fontWeight: "bold" }}>Address</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={review?.address || ""}
                                {...register("org", { required: true })}
                                placeholder="Organization" />
                        </Form.Group>
                        <Form.Group as={Col} md={12}>
                            <Form.Label style={{ fontWeight: "bold" }}>Description</Form.Label>
                            <Form.Control
                                style={{ height: "10rem" }}
                                type="text"
                                defaultValue={review?.description || ""}
                                as="textarea"
                                {...register("description", { required: true })}
                                placeholder="Description" />
                        </Form.Group>
                        <Form.Group as={Col} md={12} className="d-flex align-items-center" >
                            <Form.Label style={{ fontWeight: "bold", marginTop: "5px" }}>Rating : &nbsp;</Form.Label>
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                value={review?.rating || 0}
                                size={40}
                                isHalf={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
                                activeColor="#ffd700"
                            />
                        </Form.Group>
                    </Form.Row>
                    <div className="text-center mt-4">
                        <Button type="submit" className="btn-main" style={{ padding: ".6rem 2rem" }}>
                            {review ? "Update" : "Submit"}
                        </Button>
                    </div>
                </div>
            </Form>
        </section>
    );
};

export default AddReview;
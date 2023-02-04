import { faCloudUploadAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import './AddService.css';

const AddService = ({ editService, restrictPermission, setEditService }) => {
    // console.log(editService);
    const { register, handleSubmit } = useForm();
    const [img, setImg] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [editServiceImg, setEditServiceImg] = useState(null);
    const [err, setErr] = useState(false);
    useState(() => {
        if (editService) {
            setEditServiceImg(editService.image);
        }
    }, [editService])


    const onSubmit = async data => {
        console.log(img);
        if (!editService && !img) {
            return toast.error('Please upload an image!');
        }
        const loading = toast.loading('Uploading...Please wait!');
        let imageURL = editService ? editService.image : "";

        if (!editService || (editService && img)) {
            const imageData = new FormData();
            imageData.set('key', '8890e04aeed687254767ab4f9796be5a');
            imageData.append('image', img);
            try {
                const res = await axios.post('https://api.imgbb.com/1/upload', imageData);
                imageURL = res.data.data.display_url;
            } catch (error) {
                toast.dismiss(loading);
                return toast.error('Failed to upload the image!');
            }
        }

        const serviceInfo = {
            title: data.name,
            description: data.description,
            cost: data.cost,
            days: data.days,
            location: data.location,
            image: imageURL
        }

        if (editService) {

            if (
                data.title === editService.name &&
                data.cost === editService.cost &&
                imageURL === editService.image &&
                data.days === editService.days &&
                data.location === editService.location &&
                data.description === editService.description
            ) {
                toast.dismiss(loading);
                setEditService({});
                return toast.error("You haven't changed anything!");
            }
            axios.patch(`https://trav-geek-mern-server.vercel.app/update/${editService._id}`, serviceInfo)
                .then(res => {
                    toast.dismiss(loading);
                    if (res.data) {
                        setEditService(serviceInfo);
                        return swal("Successfully updated", "Your service has been successfully updated!", "success");
                    }
                    setEditService({});
                    swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
                })
                .catch(error => {
                    toast.dismiss(loading);
                    setEditService({});
                    swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
                });
            return;
        }

        axios.post('https://trav-geek-mern-server.vercel.app/addService', serviceInfo)
            .then(res => {
                toast.dismiss(loading);
                if (res.data) {
                    return swal("Successfully Uploaded", "Your new service has been successfully added.", "success");
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
            .catch(error => {
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            });
    }
    const handleImageUpload = (e) => {
        setErr(false);
        const selected = e.target.files[0];
        setImg(selected);
        console.log(selected);
        const mimetype = ['image/png', 'image/jpeg', 'image/jpg'];
        if (selected && mimetype.includes(selected.type)) {
            console.log("selected");
            let reader = new FileReader();
            console.log("reader", reader);
            reader.onloadend = () => {
                setImgPreview(reader.result);
            };
            reader.readAsDataURL(selected);
        } else {
            console.log("Unsupported");
            setErr(true);
        }
    }
    return (
        <section className="add-service">
            <Form onSubmit={handleSubmit(onSubmit)} className="w-100">
                <div className="py-5 mx-auto mt-5 bg-white form-main" style={{ borderRadius: "15px", maxWidth: '85rem' }}>
                    <Form.Row className="justify-content-center">
                        <Form.Group as={Col} md={5} sm={12} className="mr-md-5">
                            <Form.Label style={{ fontWeight: "bold" }}>Service Title</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={editService ? editService.title : ""}
                                {...register("name", { required: true })}
                                placeholder="Enter Tour Name" />
                        </Form.Group>
                        <Form.Group as={Col} md={5} sm={12}>
                            <Form.Label style={{ fontWeight: "bold" }}>Price</Form.Label>
                            <Form.Control
                                style={{ maxWidth: "260px" }}
                                type="text"
                                defaultValue={editService ? editService.cost : ""}
                                {...register("cost", { required: true })}
                                placeholder="Enter Cost Per Day" />
                        </Form.Group>
                        <Form.Group as={Col} md={5} sm={12} className="mr-md-5">
                            <Form.Label style={{ fontWeight: "bold" }}>Number Of Days</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={editService ? editService.days : ""}
                                {...register("days", { required: true })}
                                placeholder="Enter Total Duration" />
                        </Form.Group>
                        <Form.Group as={Col} md={5} sm={12}>
                            <Form.Label style={{ fontWeight: "bold" }}>Location</Form.Label>
                            <Form.Control
                                style={{ maxWidth: "260px" }}
                                type="text"
                                defaultValue={editService ? editService.location : ""}
                                {...register("location", { required: true })}
                                placeholder="Enter Destination" />
                        </Form.Group>
                        <Form.Group as={Col} md={5} sm={12} className="mr-md-5 mt-md-3">
                            <Form.Label style={{ fontWeight: "bold" }}>Description</Form.Label>
                            <Form.Control
                                style={{ height: "6rem" }}
                                type="text"
                                defaultValue={editService ? editService.description : ""}
                                as="textarea"
                                {...register("description", { required: true })}
                                placeholder="Enter Description" />
                        </Form.Group>
                        <Form.Group as={Col} md={5} sm={12} className="mt-md-3">
                            <Form.Label style={{ fontWeight: "bold" }}>{editService ? "Add New Image" : "Add Image"}</Form.Label>

                            {
                                !imgPreview &&
                                    !editServiceImg ?

                                    <>
                                        <Button
                                            as={"label"}
                                            htmlFor="upload"
                                            variant="outline-primary"
                                            className="d-block p-2 upload-btn">
                                            <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" />Upload Image
                                        </Button>
                                        <Form.Control
                                            hidden="hidden"
                                            id="upload"
                                            type="file"
                                            {...register("image")}
                                            onChange={handleImageUpload}
                                            placeholder="Upload photo" />
                                    </>
                                    :
                                    !imgPreview && editServiceImg ?
                                        <div
                                            style={{
                                                background: `url("${editServiceImg}") no-repeat center/cover`
                                                ,
                                                height: "100px", width: "100px", borderRadius: "10%"
                                            }}
                                        ></div >
                                        :
                                        <div
                                            style={{
                                                background: imgPreview
                                                    ? `url("${imgPreview}") no-repeat center/cover`
                                                    : "#131313",
                                                height: "100px", width: "100px", borderRadius: "10%"
                                            }}
                                        > </div >

                            }
                            {imgPreview ?
                                <button type="button" className="btn deleteImageBtn" onClick={() => setImgPreview(null)}>
                                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                                </button>

                                : editServiceImg ?
                                    <button type="button" className="btn deleteImageBtn" onClick={() => setEditServiceImg(null)}>
                                        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                                    </button>
                                    :
                                    ""

                            }
                        </Form.Group>

                        {err && <p>Unsupported File</p>}
                    </Form.Row>
                    <div className="text-center mt-4">
                        <Button type="submit" className="submit-btn btn-main">
                            {editService ? "Update" : "Submit"}
                        </Button>
                    </div>
                </div>
            </Form>
        </section>
    );
};

export default AddService;
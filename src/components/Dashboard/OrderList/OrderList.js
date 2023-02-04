import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { UserContext } from '../../../App';
import TableLoader from '../TableLoader/TableLoader';

const OrderList = () => {
    const { loggedInUser: { email } } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://trav-geek-mern-server.vercel.app/orders?email=${email}`)
            .then(res => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch(error => toast.error(error.message))
    }, [email])

    const handleStatusChange = (id, status) => {
        let modifiedOrders = [];
        orders.forEach(order => {
            if (order._id === id) {
                order.status = status;
            }
            modifiedOrders.push(order)
        })
        setOrders(modifiedOrders);

        const modifiedStatus = { id, status }
        console.log(modifiedOrders, modifiedStatus);
        axios.patch('https://trav-geek-mern-server.vercel.app/updateOrderStatus', modifiedStatus)
            .then(res => res.data && toast.success(`Set to ${status}`))
            .catch(error => toast.error(error.message));
    }

    return (
        <div className="px-5 pt-4 mx-md-4 mt-5 bg-white" style={{ borderRadius: "15px" }}>
            {loading ? <TableLoader />
                : <Table hover borderless responsive>
                    <thead className="bg-light">
                        <tr>
                            <th>Name</th>
                            <th>Email ID</th>
                            <th>Cost</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {
                        orders.map(order => {
                            return (
                                <tbody key={order._id} style={{ fontWeight: "500" }}>
                                    <tr>
                                        <td>{order.userName}</td>
                                        <td>{order.userEmail}</td>
                                        <td>{order.totalCost}</td>
                                        <td>{order.startingDate}-{order.endDate}</td>
                                        <td>
                                            <select
                                                className={order.status === "pending" ? "btn btn-danger" : order.status === "done" ? "btn btn-success" : "btn btn-info"}
                                                value={order.status}
                                                onChange={e => handleStatusChange(order._id, e.target.value)}>
                                                <option className="bg-white text-muted">pending</option>
                                                <option className="bg-white text-muted">ongoing</option>
                                                <option className="bg-white text-muted">done</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </Table>}
        </div>
    );
};

export default OrderList;
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../utilities/URLs";


const PaymentHistory = () => {
    const { user } = useAuth();
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        if (user) {
            fetch(`${baseUrl}/payments/${user.email}`)
                .then(res => res.json())
                .then(data => setPayments(data))
                .catch(error => console.log(error))
        }
    }, [user])

    return (
        <div className="my-container mt-sec">
            <h2 className="title-sec">Your Payment History</h2>
            <div className="overflow-x-auto">
                <table className="table max-w-3xl mx-auto">
                    <thead>
                        <tr className="text-base">
                            <th>#</th>
                            <th>Transaction ID</th>
                            <th>Date/Time</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => <TableRow key={payment._id} payment={payment} index={index} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const TableRow = ({ payment, index }) => {
    const { transactionId, created, amount, payment_status } = payment;
    const date = new Date(created * 1000);

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{transactionId}</td>
            <td>
                {date.getMonth()+1}/{date.getDate()}/{date.getFullYear()} &nbsp;
                {date.getHours()}:{date.getMinutes()}
            </td>
            <td>${amount}</td>
            <td><span className="badge badge-sm badge-success font-semibold pb-1">{payment_status}</span></td>
        </tr>
    )
}

export default PaymentHistory;
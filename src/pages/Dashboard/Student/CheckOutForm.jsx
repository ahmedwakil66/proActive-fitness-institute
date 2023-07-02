import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";


const CheckOutForm = ({ items }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const { axiosSecure } = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [totalPrice, setTotalPrice] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [sucMsg, setSucMsg] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState(null);

    useEffect(() => {
        if (items.length !== 0) {
            axiosSecure.post('/create-payment-intent', { items })
                .then(data => {
                    setClientSecret(data.data.clientSecret);
                    setTotalPrice(data.data.totalPrice);
                })
                .catch(error => console.log('create-payment0-intent-error', error))
        }
    }, [axiosSecure, items])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const card = elements.getElement(CardElement)

        if (!stripe || !elements || card === null) { return }

        setProcessing(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card });

        if (error) {
            console.log(error);
            setErrMsg(error.message);
        } else {
            setErrMsg(null);
            console.log(paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user.email || 'not provided'
                    },
                }
            }
        )

        if (confirmError) {
            console.log(confirmError)
        }

        setProcessing(false);
        console.log('paymentIntent', paymentIntent);

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            setSucMsg(`Transaction of $${paymentIntent.amount / 100} is completed with transaction ID: ${paymentIntent.id}`);
            axiosSecure.post('/payments', {
                email: user.email,
                transactionId: paymentIntent.id,
                amount: paymentIntent.amount / 100,
                date: new Date(),
                created: paymentIntent.created,
                payment_status: 'payed',
                enrolled_classes: items.map(item => item._id)
            })
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertResult.insertedId) {
                        Swal.fire(
                            'Payment Success',
                            'Please save your transaction id for future reference.',
                            'success'
                        )
                    }
                })
        }


    }

    return (
        <div>
            {!transactionId && <form onClick={handleSubmit}>
                {totalPrice && <h3 className="text-center text-blue-600 my-6">You are paying ${totalPrice}</h3>}
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret || processing} className="btn btn-sm btn-outline btn-success block mx-auto mt-4 px-6">
                    Pay
                </button>
            </form>}
            {errMsg && <p className="text-center text-red-600 mt-6">{errMsg}</p>}
            {processing && <p className="text-center text-blue-600 mt-6">Payment processing...</p>}
            {transactionId && <p className="text-center text-green-600 mt-6">{sucMsg}</p>}
        </div>
    );
};

export default CheckOutForm;
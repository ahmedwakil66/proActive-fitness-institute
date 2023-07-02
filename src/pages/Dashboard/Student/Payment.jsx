import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import useBookedClasses from "../../../hooks/useBookedClasses";

const stripePromise = loadStripe(`${import.meta.env.VITE_stripe_PK}`)

const Payment = () => {
    const {bookedClasses} = useBookedClasses();
    const items = bookedClasses.map(item => {
        return {
            _id: item._id, 
            price: item.price
        }
    })
    console.log(items)

    return (
        <div className="max-w-lg mx-auto mt-sec">
            <h1 className="title-sec">Payment</h1>
            <Elements stripe={stripePromise}>
                <CheckOutForm items={items}/>
            </Elements>
        </div>
    );
};

export default Payment;
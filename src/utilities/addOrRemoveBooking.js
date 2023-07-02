import Swal from "sweetalert2";
import baseUrl from "./URLs";

const addOrRemoveBooking = async (classId, email, text) => {
    const res = await fetch(`${baseUrl}/bookings?email=${email}&classId=${classId}`, {
        method: 'PATCH',
        headers: {
            authorization: `Bearer ${localStorage.getItem('proActive-token')}`
        }
    })
    const data = await res.json();
    if(data.modifiedCount > 0){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: text,
            showConfirmButton: false,
            timer: 1500
        })
    }
}

export default addOrRemoveBooking;
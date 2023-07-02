import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import baseUrl from "./URLs";

const saveNewUserToDatabase = async (newUser, toastId) => {
    console.log('inside saveNewUser')
    fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(res => res.json())
        .then(data => {
            toast.remove(toastId);
            if (data.insertedId) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
        .catch(error => {
            toast.error(error.message, { id: toastId });
        })
}

export default saveNewUserToDatabase;
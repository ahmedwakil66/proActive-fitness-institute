import Swal from "sweetalert2";
import baseUrl from "../utilities/URLs";
import useUser from "../hooks/useUser";

const SendPrivateMessage = ({ classNames, marginTop, sender, receiver }) => {
    const {person} = useUser();

    const handleSendPrivateMessage = () => {
        Swal.fire({
            title: 'Enter your message',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Send',
            showLoaderOnConfirm: true,
            preConfirm: (message) => {
                return fetch(`${baseUrl}/messages`, {
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('proActive-token')}`,
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({message, sender, receiver})
                })
                    .then(response => response.json())
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            console.log(result)
            if (result.value.insertedId) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your message has been sent',
                    showConfirmButton: false,
                    timer: 1000
                  })
            }
        })
    }

    
    return (
        <div className={marginTop || 'mt-5'}>
            <button
                onClick={handleSendPrivateMessage}
                disabled={person.email === receiver}
                className={classNames || ('btn btn-outline btn-sm')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>
                <span>Send Message</span>
            </button>
        </div>
    );
};

export default SendPrivateMessage;
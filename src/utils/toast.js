const { toast } = require("react-toastify")

const errorToast = (msg) => {
    toast.error(msg, {
        theme: 'colored',
        autoClose: 1000
    })
}
const successToast = (msg) => {
    toast.success(msg, {
        theme: 'colored',
        autoClose: 1000
    })
}

export { errorToast }
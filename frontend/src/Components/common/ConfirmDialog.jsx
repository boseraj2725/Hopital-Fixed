import Swal from "sweetalert2";

const ConfirmDialog = async (
    title,
    text,
    confirmText = "Yes"
) => {

    const result = await Swal.fire({

        title,

        text,

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#d33",

        cancelButtonColor: "#3085d6",

        confirmButtonText: confirmText,

        cancelButtonText: "Cancel",

    });

    return result.isConfirmed;

};

export default ConfirmDialog;
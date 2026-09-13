import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../styles/UploadProfileImage.css";

function UploadProfileImage() {

    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!image) {
            return toast.error("Please select an image");
        }

        const formData = new FormData();
        formData.append("image", image);

        setLoading(true);

        try {

            const res = await api.post(
                "/users/upload-image",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success(res.data.message);

            navigate("/profile");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Upload Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="upload-container">

            <form
                className="upload-form"
                onSubmit={handleSubmit}
            >

                <h2>📷 Upload Profile Image</h2>

                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="preview-image"
                    />
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Upload Image"}
                </button>

            </form>

        </div>

    );

}

export default UploadProfileImage;
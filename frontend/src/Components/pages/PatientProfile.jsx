import { useState } from "react";
import "../styles/PatientProfile.css";

function PatientProfile() {

    const [profileImage, setProfileImage] = useState(null);

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Image must be less than 5MB");
            return;
        }

        const imageUrl = URL.createObjectURL(file);

        setProfileImage(imageUrl);
    };

    const removeImage = () => {
        setProfileImage(null);
    };

    return (

        <div className="patient-profile">

            {/* =========================
                PROFILE CARD
            ========================= */}

            <div className="profile-card">

                <div className="profile-image-section">

                    <div className="profile-image">

                        {profileImage ? (

                            <img
                                src={profileImage}
                                alt="Patient"
                            />

                        ) : (

                            <div className="default-avatar">
                                👤
                            </div>

                        )}

                    </div>


                    {/* =========================
                        ADD PHOTO
                    ========================= */}

                    <label
                        htmlFor="patient-image"
                        className="add-photo-btn"
                    >
                        📷 Add Profile Photo
                    </label>

                    <input
                        id="patient-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        hidden
                    />


                    {/* =========================
                        CHANGE / REMOVE
                    ========================= */}

                    {profileImage && (

                        <div className="photo-actions">

                            <label
                                htmlFor="patient-image"
                                className="change-photo"
                            >
                                Change Photo
                            </label>

                            <button
                                type="button"
                                onClick={removeImage}
                                className="remove-photo"
                            >
                                Remove
                            </button>

                        </div>

                    )}

                </div>


                <h2>
                    Bose Raj
                </h2>

                <p>
                    Patient ID : P1001
                </p>

            </div>


            {/* =========================
                PATIENT INFORMATION
            ========================= */}

            <div className="profile-details">

                <h1>
                    Patient Information
                </h1>

                <div className="info">

                    <p>
                        <strong>Age :</strong> 21
                    </p>

                    <p>
                        <strong>Gender :</strong> Male
                    </p>

                    <p>
                        <strong>Blood Group :</strong> O-
                    </p>

                    <p>
                        <strong>Email :</strong>
                        boseraj653@gmail.com
                    </p>

                    <p>
                        <strong>Phone :</strong>
                        9047608170
                    </p>

                    <p>
                        <strong>Address :</strong>
                        Theni, Andippatti,
                        T.Subblapuram - 625536
                    </p>

                </div>

                <button className="edit-profile-btn">
                    Edit Profile
                </button>

            </div>

        </div>
    );
}

export default PatientProfile;
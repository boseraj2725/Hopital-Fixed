import { useParams, useNavigate } from "react-router-dom";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useState } from "react";
import { toast } from "react-toastify";
import "./../styles/VideoCall.css";

function VideoCall() {
    const { roomId } = useParams();
    const navigate = useNavigate();

    const [copied, setCopied] = useState(false);

    // ===============================
    // Validate Meeting Room
    // ===============================

    if (!roomId) {
        return (
            <div className="video-error">

                <div className="error-card">

                    <div className="error-icon">
                        ❌
                    </div>

                    <h2>
                        Invalid Meeting Room
                    </h2>

                    <p>
                        The video consultation room could not be found.
                    </p>

                    <button
                        className="leave-btn"
                        onClick={() => navigate("/appointments")}
                    >
                        ⬅ Back to Appointments
                    </button>

                </div>

            </div>
        );
    }

    // ===============================
    // Meeting Link
    // ===============================

    const meetingLink =
        `${window.location.origin}/video-call/${roomId}`;

    // ===============================
    // Copy Meeting Link
    // ===============================

    const copyMeetingLink = async () => {
        try {

            await navigator.clipboard.writeText(meetingLink);

            setCopied(true);

            toast.success(
                "Meeting link copied successfully!"
            );

            setTimeout(() => {
                setCopied(false);
            }, 2500);

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to copy meeting link"
            );

        }
    };

    // ===============================
    // WhatsApp Share
    // ===============================

    const shareWhatsApp = () => {

        const message =
            `🏥 SmartCare AI Hospital\n\n` +
            `🎥 Video Consultation\n\n` +
            `Please join your consultation using this link:\n\n` +
            `${meetingLink}\n\n` +
            `Thank you.`;

        const whatsappUrl =
            `https://wa.me/?text=${encodeURIComponent(message)}`;

        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );
    };

    // ===============================
    // Email Share
    // ===============================

    const shareEmail = () => {

        const subject =
            "SmartCare AI - Video Consultation";

        const body =
            `Hello,\n\n` +
            `Your SmartCare AI video consultation is ready.\n\n` +
            `Please join using the following link:\n\n` +
            `${meetingLink}\n\n` +
            `Thank you.`;

        window.location.href =
            `mailto:?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;
    };

    // ===============================
    // Video Call Page
    // ===============================

    return (
        <div className="video-call-page">

            {/* Header */}

            <header className="video-header">

                <div className="video-title">

                    <div className="video-logo">
                        🏥
                    </div>

                    <div>

                        <h1>
                            SmartCare AI
                        </h1>

                        <p>
                            Video Consultation
                        </p>

                    </div>

                </div>

                <button
                    className="leave-btn"
                    onClick={() => navigate("/appointments")}
                >
                    ⬅ Back
                </button>

            </header>


            {/* Share Consultation */}

            <div className="share-panel">

                <div className="share-info">

                    <div className="share-icon">
                        🔗
                    </div>

                    <div>

                        <h3>
                            Share Consultation
                        </h3>

                        <p>
                            Send this meeting link to the patient
                            so they can join the consultation.
                        </p>

                    </div>

                </div>


                {/* Meeting Link */}

                <div className="meeting-link-box">

                    <input
                        type="text"
                        value={meetingLink}
                        readOnly
                    />

                    <button
                        className="copy-btn"
                        onClick={copyMeetingLink}
                    >
                        {copied ? "✓ Copied" : "📋 Copy"}
                    </button>

                </div>


                {/* Share Buttons */}

                <div className="share-buttons">

                    <button
                        className="whatsapp-btn"
                        onClick={shareWhatsApp}
                    >
                        📱 Share on WhatsApp
                    </button>

                    <button
                        className="email-btn"
                        onClick={shareEmail}
                    >
                        ✉️ Share via Email
                    </button>

                </div>

            </div>


            {/* Jitsi Video Meeting */}

            <main className="jitsi-wrapper">

                <JitsiMeeting
                    domain="meet.jit.si"
                    roomName={roomId}

                    configOverwrite={{
                        startWithAudioMuted: false,
                        startWithVideoMuted: false,
                        prejoinPageEnabled: true,
                        disableDeepLinking: true,
                    }}

                    interfaceConfigOverwrite={{
                        SHOW_JITSI_WATERMARK: false,
                        SHOW_BRAND_WATERMARK: false,
                        DEFAULT_BACKGROUND: "#020617",
                    }}

                    getIFrameRef={(iframe) => {

                        iframe.style.width = "100%";
                        iframe.style.height = "100%";
                        iframe.style.border = "0";
                        iframe.style.borderRadius = "18px";

                    }}

                    onReadyToClose={() => {
                        navigate("/appointments");
                    }}

                />

            </main>

        </div>
    );
}

export default VideoCall;
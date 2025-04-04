import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SetAvatar.css";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute, getAvatarsRoute } from "../utils/ApiRoutes";
import { Buffer } from "buffer";

export default function SetAvatar() {
    const navigate = useNavigate();

    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        const fetchAvatars = async () => {
            const data = [];

            for (let i = 0; i < 4; i++) {
                try {
                    const response = await axios.get(`${getAvatarsRoute}/${Math.ceil(Math.random() * 10000)}`);
                    const buffer = Buffer.from(response.data);
                    data.push(buffer.toString("base64"));
                } catch (error) {
                    console.error("Error fetching avatar:", error);
                }
            }

            setAvatars(data);
            setIsLoading(false);
        };

        fetchAvatars();
    }, []);


    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        } else {
            const user = await JSON.parse(
                localStorage.getItem('chat-app-user')
            );

            const response = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });

            if (response.data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = response.data.image;
                localStorage.setItem(
                    'chat-app-user',
                    JSON.stringify(user)
                );
                navigate("/");
            } else {
                toast.error("Error setting avatar. Please try again.", toastOptions);
            }
        }
    };

    return (
        <>
            {isLoading ? (
                <div className="AvatarContainer" >
                    <img src={loader} alt="loader" className="loader" height={100} />
                </div >
            ) : (
                <div className="AvatarContainer" >
                    <div className="title-container">
                        <h1>Pick an Avatar as your profile picture</h1>
                    </div>
                    <div className="avatars">
                        {avatars.map((avatar, index) => {
                            return (
                                <div key={index}
                                    className={`avatar ${selectedAvatar === index ? "selected" : ""
                                        }`}
                                >
                                    <img
                                        src={`data:image/svg+xml;base64,${avatar}`}
                                        alt="avatar"
                                        key={avatar}
                                        onClick={() => setSelectedAvatar(index)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <button className="submit-btn" onClick={setProfilePicture}>
                        Set as Profile Picture
                    </button>
                    <ToastContainer />
                </div >
            )}
        </>
    );
}

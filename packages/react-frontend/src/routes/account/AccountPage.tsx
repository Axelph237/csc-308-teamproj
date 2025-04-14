import {useRef, useState} from "react";
import {Link} from "react-router-dom";
import {UserCircleIcon} from "../../assets/icons";

export default function AccountsPage() {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [password, setPassword] = useState("");

    const [isPicModalOpen, setIsPicModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [preview, setPreview] = useState<string | null>(null);
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };
    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        if (newPassword) {
            setPassword(newPassword);
        }
    };
    const handleNewPassword = () => {
        if (password) {
            alert("Password changed successfully"); // replace later
            setIsPasswordModalOpen(false);
            setPassword(""); // clear
        }

    }
    const handleCancelPassword = () => {
        setIsPasswordModalOpen(false);
        setPassword("");
    };
    const handleUpload = () => {
        if (selectedFile) {
            console.log("uploading: ", selectedFile);
            alert("Profile picture updated!"); // replace later with actual logic

            setProfilePicture(preview);
            setIsPicModalOpen(false);
            setSelectedFile(null);
            setPreview(null);
        }
    };
    const handleCancelUpload = () => {
        setIsPicModalOpen(false);
        setSelectedFile(null);
        setPreview(null);
    };
    // Trigger file input when clicking preview area
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };
    // const el = document.getElementById();
    return (
        <div className="flex flex-col items-center gap-6 p-12 min-h-screen">
            <h1 className="text-2xl font-bold ">Account Settings</h1>

            {/* Profile Section*/}
            <div className="flex flex-col items-center p-6 rounded-lg">
                {profilePicture && (
                    <div className="rounded-full w-40 h-40 overflow-hidden border border-gray-300">
                        <img
                            alt="Profile Preview"
                            width="250px"
                            src={profilePicture}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                {/*<UserCircleIcon className="icon-lg"/>*/}
                <button onClick={() => setIsPicModalOpen(true)}
                        className="mt-2 p-2 rounded-lg text-accent-200 hover:underline"
                >
                    Change Profile Picture
                </button>
                <button onClick={() => setIsPasswordModalOpen(true)}
                        className="mt-2 p-2 rounded-lg text-accent-200 hover:underline">
                    Reset Password
                </button>
            </div>

            <Link
                to="/login"
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
            >
                Log Out
            </Link>

            {isPicModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="flex flex-col bg-white items-center justify-center p-6 gap-5 rounded-lg w-96">
                        {/* File input*/}
                        <input type="file"
                               accept="image/*"
                               ref={fileInputRef}
                               onChange={handleFileChange}
                               className="w-full h-full object-cover"
                               aria-label="Upload profile picture"
                        />
                        {/* Clickable Image Preview */}
                        <div
                            className={"rounded-full w-50 h-50 flex overflow-hidden items-center justify-center cursor-pointer  bg-gray-200 hover:bg-gray-300"}
                            onClick={triggerFileInput}
                        >
                            {preview ? (
                                <img src={preview} alt="Profile Picture"
                                     className="w-full h-full object-cover "/>
                            ) : (
                                <span className="text-gray-500">No image selected</span>
                            )}
                        </div>


                        {/* Buttons */}
                        <div className="flex justify-end gap-2">
                            <button onClick={handleCancelUpload}
                                    className="px-4 py-2 bg-accent-50 text-black rounded-lg shadow hover:bg-accent-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpload}
                                disabled={!selectedFile}
                                className={`px-4 py-2 text-white rounded ${
                                    selectedFile ? "bg-accent-900 hover:bg-accent-800" : "bg-gray-400 cursor-not-allowed"}`}
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isPasswordModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="flex flex-col bg-white items-center justify-center p-6 gap-5 rounded-lg w-96">
                        {/* File input*/}
                        <input type="text"
                               placeholder="Enter new password"
                               value={password}
                               onChange={handlePasswordChange}
                               className="w-80 h-10 object-cover text-gray-800 rounded-2xl shadow focus:ring-2 focus:ring-accent-500 outline-none transition"
                        />


                        {/* Buttons */}
                        <div className="flex justify-end gap-2">
                            <button onClick={handleCancelPassword}
                                    className="px-4 py-2 bg-accent-50 text-black rounded-lg shadow hover:bg-accent-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleNewPassword}
                                disabled={!password}
                                className={`px-4 py-2 text-white ${
                                    password ? "bg-accent-500 hover:bg-accent-400" : "bg-gray-400 cursor-not-allowed"
                                }`}
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>


    );
}
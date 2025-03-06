import {useRef, useState} from "react";
import {Link} from "react-router-dom";
import {UserCircleIcon} from "../../assets/icons";

export default function AccountsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };
    const handleUpload = () => {
        if (selectedFile) {
            console.log("uploading: ", selectedFile);
            alert("Profile picture updated!"); // replace later with actual logic
            setIsModalOpen(false);
            setSelectedFile(null);
            setPreview(null);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedFile(null);
        setPreview(null);
    };
    // Trigger file input when clicking preview area
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col items-center gap-6 p-12 min-h-screen">
            <h1 className="text-2xl font-bold ">Account Settings</h1>

            {/* Profile Section*/}
            <div className="flex flex-col items-center p-6 rounded-lg">
                <UserCircleIcon className="icon-lg"/>
                <button onClick={() => setIsModalOpen(true)}
                        className="mt-2 p-2 rounded-lg text-accent-200 hover:underline"
                >
                    Change Profile Picture
                </button>
                <a href="#" className="mt-2 text-accent-200 hover:underline">
                    Reset Password
                </a>
            </div>

            <Link
                to="/login"
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
            >
                Log Out
            </Link>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Change Profile Picture</h2>
                        {/* File input*/}
                        <input type="file"
                               accept="image/*"
                               ref={fileInputRef}
                               onChange={handleFileChange}
                               className="hidden"
                        />
                        {/* Clickable Image Preview */}
                        <div
                            className={"w-full h-40 flex items-center justify-center rounded-lg mb-4 border cursor-pointer  bg-gray-200 hover:bg-gray-300"}
                            onClick={triggerFileInput}
                        >
                            {preview ? (
                                <img src={preview} alt="Profile Picture"
                                     className="w-full h-40 object-cover rounded-lg mb-4 border"/>
                            ) : (
                                <span className="text-gray-500">No image selected</span>
                            )}
                        </div>


                        {/* Buttons */}
                        <div className="flex justify-end gap-2">
                            <button onClick={handleCancel}
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
        </div>
        // Modal


    );
}
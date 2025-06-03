import { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt, FaFileExcel, FaTimes } from "react-icons/fa";

const api_url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("AuthToken");

const UploadExcel = ({ hideExcelForm, excelFormModal }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [fileError, setFileError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            await axios.post(`${api_url}/assets/excel/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            // setNotifyAlert({
            //     show: true,
            //     type: "success",
            //     message: res.data.message,
            // });

            setTimeout(() => {
                location.href = "/assets";
            }, 1500);
        } catch (error) {
            // if (error.response && !error.response.headers["content-type"].includes("text/html")) {
            //     setNotifyAlert({
            //         show: true,
            //         type: "error",
            //         message: error.response.data.message,
            //     });
            // } else {
            //     setNotifyAlert({
            //         show: true,
            //         type: "error",
            //         message: "Unable to upload file",
            //     });
            // }
            console.log(error);
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (file) => {
        const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
        if (file) {
            if (!["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"].includes(file.type)) {
                alert("Only .xlsx files are allowed.");
                return;
            }
            if (file.size > MAX_FILE_SIZE) {
                alert("File size must not exceed 2MB.");
                return;
            }
            setFileError("");
            setSelectedFile(file);
        }
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        handleFileChange(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        handleFileChange(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    return (
        <div tabIndex="-1" aria-hidden={hideExcelForm} className={`${hideExcelForm ? "hidden" : "flex"} fixed inset-0 bg-black/50 z-50 justify-center items-center overflow-y-auto overflow-x-hidden`}>

            <div className="relative p-4 w-full max-w-xl">
                <div className="bg-white rounded-xl shadow-md">
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <h3 className="text-xl font-semibold text-[#00763A]">Import Assets from Excel</h3>
                        <button onClick={excelFormModal} type="button" className="text-gray-400 hover:text-gray-600 rounded-lg p-1.5 ml-auto inline-flex items-center transition-colors">
                            <FaTimes />
                        </button>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="w-full">
                            <div className={`flex items-center justify-center w-full h-64 border-2 rounded-lg cursor-pointer transition-all duration-200 ${isDragging ? "border-[#00763A] bg-blue-50" : fileError ? "border-red-300" : "border-gray-300 border-dashed"} ${selectedFile ? "" : "hover:bg-gray-50"}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                                <label htmlFor="excel-file" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                    {selectedFile ? (
                                        <div className="flex flex-col items-center justify-center p-4">
                                            <div className="mb-4 bg-green-50 p-3 rounded-full">
                                                <FaFileExcel className="text-[#00763A] text-3xl" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-medium text-gray-700 mb-1">{selectedFile.name}</p>
                                                <p className="text-xs text-gray-500 mb-3">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                                            </div>
                                            <p className="text-sm text-gray-500">Click or drag to change file</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-6">
                                            <FaCloudUploadAlt className="text-gray-400 text-4xl mb-3" />
                                            <p className="text-sm font-medium text-gray-700 mb-1">Drag & drop or click to upload</p>
                                            <p className="text-xs text-gray-500">Excel (.xlsx) files only (max 2MB)</p>
                                        </div>
                                    )}
                                    <input id="excel-file" type="file" className="hidden" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={handleFileInputChange} />
                                </label>
                            </div>
                            {fileError && <p className="mt-2 text-sm text-red-600">{fileError}</p>}

                            <div className="mt-6">
                                <button type="submit" disabled={!selectedFile || isSubmitting} className={`w-full flex justify-center items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#00763A] hover:bg-[#00763A]/90 transition-colors ${!selectedFile || isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}>
                                    <FaFileExcel className="mr-2" />
                                    {isSubmitting ? "Uploading..." : "Upload Excel File"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadExcel;
import React from "react";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ViewAsset = () => {
    const navigate = useNavigate();
    return (
        <div className="p-5">
            <button onClick={() => navigate("/assets/new")} className="btn btn-success float-end d-flex align-items-center gap-2">
                <FaPlus />
                Add
            </button>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Asset Tag</th>
                        <th scope="col">Model</th>
                        <th scope="col">Supplier</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Laptop</th>
                        <td>DC0001</td>
                        <td>HP</td>
                        <td>Huawei</td>
                        <td>Electronic</td>
                        <td
                            style={{
                                fontSize: "30px",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                            }}>
                            <div className="flex gap-4 text-[24px]">
                                <FaEye className="text-black-500 cursor-pointer" />
                                <FaEdit className="text-green-500 cursor-pointer" />
                                <FaTrash className="text-red-500 cursor-pointer" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>Desktop</th>
                        <td>ICM001</td>
                        <td>Lenovo</td>
                        <td>Microsoft</td>
                        <td>Electronic</td>
                        <td
                            style={{
                                fontSize: "30px",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                            }}>
                            <div className="flex gap-4 text-[24px]">
                                <FaEye className="text-black-500 cursor-pointer" />
                                <FaEdit className="text-green-500 cursor-pointer" />
                                <FaTrash className="text-red-500 cursor-pointer" />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <th>Laptop</th>
                        <td>Complex007</td>
                        <td>Macbook</td>
                        <td>Apple</td>
                        <td>Electronic</td>
                        <td
                            style={{
                                fontSize: "30px",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                            }}>
                            <div className="flex gap-4 text-[24px]">
                                <FaEye className="text-black-500 cursor-pointer" />
                                <FaEdit className="text-green-500 cursor-pointer" />
                                <FaTrash className="text-red-500 cursor-pointer" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ViewAsset;

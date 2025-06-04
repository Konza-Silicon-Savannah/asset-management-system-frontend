import { useState, useEffect, useRef } from "react";
import Choices from "choices.js";
import { Link } from "lucide-react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {FaUpload} from "react-icons/fa";
import UploadExcel from "./UploadExcel.jsx";

const api_url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("AuthToken");

const AssetForm = () => {
  const [assetData, setAssetData] = useState({
    name: "",
    serial_no: "",
    asset_tag: "",
    model: "",
    purchase_date: "",
    purchase_cost: "",
    description: "",
    type: "",
    location: "",
    department: "",
    status: "",
  });

  const { id } = useParams();
  const [hideExcelForm, setHideExcelForm] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const selectType = useRef(null);
  const selectLocation = useRef(null);
  const selectDepartment = useRef(null);
  const selectStatus = useRef(null);

  // Store Choices.js instances
  const choicesInstances = useRef({});

  // Default dropdown data
  const defaultAssetTypes = [
    { id: 1, name: "Desktop Computer", label: "Desktop Computer" },
    { id: 2, name: "Laptop", label: "Laptop" },
    { id: 3, name: "Monitor", label: "Monitor" },
    { id: 4, name: "Printer", label: "Printer" },
    { id: 5, name: "Server", label: "Server" },
    { id: 6, name: "Network Equipment", label: "Network Equipment" },
    { id: 7, name: "Mobile Device", label: "Mobile Device" },
    { id: 8, name: "Software License", label: "Software License" },
    { id: 9, name: "Furniture", label: "Furniture" },
    { id: 10, name: "Vehicle", label: "Vehicle" },
  ];

  const defaultLocations = [
    { id: 1, name: "Main Office - Floor 1", label: "Main Office - Floor 1" },
    { id: 2, name: "Main Office - Floor 2", label: "Main Office - Floor 2" },
    { id: 3, name: "Main Office - Floor 3", label: "Main Office - Floor 3" },
    { id: 4, name: "Warehouse", label: "Warehouse" },
    { id: 5, name: "Remote Office - North", label: "Remote Office - North" },
    { id: 6, name: "Remote Office - South", label: "Remote Office - South" },
    { id: 7, name: "Data Center", label: "Data Center" },
    { id: 8, name: "Storage Room", label: "Storage Room" },
    { id: 9, name: "Conference Room A", label: "Conference Room A" },
    { id: 10, name: "Conference Room B", label: "Conference Room B" },
  ];

  const defaultDepartments = [
    { id: 1, name: "Information Technology", label: "Information Technology" },
    { id: 2, name: "Human Resources", label: "Human Resources" },
    { id: 3, name: "Finance", label: "Finance" },
    { id: 4, name: "Marketing", label: "Marketing" },
    { id: 5, name: "Sales", label: "Sales" },
    { id: 6, name: "Operations", label: "Operations" },
    { id: 7, name: "Administration", label: "Administration" },
    { id: 8, name: "Research & Development", label: "Research & Development" },
    { id: 9, name: "Customer Service", label: "Customer Service" },
    { id: 10, name: "Legal", label: "Legal" },
  ];

  const defaultStatuses = [
    { id: 1, name: "New", label: "New" },
    { id: 2, name: "Disposal", label: "Disposal" },
    { id: 3, name: "Good", label: "Good" },
    { id: 4, name: "Damaged", label: "Damaged" },
  ];

  const [assetType, setAssetType] = useState([]);
  const [location, setLocation] = useState([]);
  const [department, setDepartment] = useState([]);
  const [status, setStatus] = useState([]);

  const handleChange = ({ currentTarget: input }) => {
    setAssetData({ ...assetData, [input.name]: input.value });
  };

  // Helper function to update assetData from Choices.js selections
  const updateAssetData = (field, value) => {
    setAssetData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Fetch dropdown options from backend
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const typesResponse = await fetch(`${api_url}/asset-types/`);
        if (typesResponse.ok) {
          const typesData = await typesResponse.json();
          setAssetType(typesData);
        }

        const locationsResponse = await fetch(`${api_url}/locations/`);
        if (locationsResponse.ok) {
          const locationsData = await locationsResponse.json();
          setLocation(locationsData);
        }

        const departmentsResponse = await fetch(`${api_url}/departments/`);
        if (departmentsResponse.ok) {
          const departmentsData = await departmentsResponse.json();
          setDepartment(departmentsData);
        }

        const statusResponse = await fetch(`${api_url}/status-list/`);
        if (statusResponse.ok) {
          const statusData = await statusResponse.json();
          setStatus(statusData);
        }
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
        setError("Failed to load form options");
      }
    };

    fetchDropdownData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try{
      id ? await axios.put(`${api_url}/assets/${id}/`, assetData,{headers:{Authorization: `Bearer ${token}`}}) :
          await axios.post(`${api_url}/assets/`, assetData, {
            headers:{
              Authorization: `Bearer ${token}`
            }
          });
      setAssetData({
        name: "",
        serial_no: "",
        asset_tag: "",
        model: "",
        purchase_date: "",
        purchase_cost: "",
        description: "",
        type: "",
        location: "",
        department: "",
        status: "",
      });

      // Reset Choices.js selections
      Object.values(choicesInstances.current).forEach((instance) => {
        if (instance && instance.removeActiveItems) {
          instance.removeActiveItems();
        }
      });

      // Optionally redirect after successful creation
      setTimeout(() => {
        window.location.href = "/assets";
      }, 2000);
    }catch (error) {
      console.error("Error creating asset:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const fetchAsset = async (assetId) =>{
    try {
      const response = await axios.get(`${api_url}/assets/${assetId}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      setAssetData(response.data);
    }catch (error) {
      console.log(error);
    }
  }

  const initChoicesDropdown = (ref, fieldName, items, value) => {
    if (!ref.current) return;

    const instance = new Choices(ref.current, {
      removeItemButton: true,
      searchEnabled: true,
      placeholder: true,
      placeholderValue: `Choose ${fieldName}`,
      searchPlaceholderValue: `Search ${fieldName}...`,
      noResultsText: "No results found",
      noChoicesText: `No ${fieldName} available`,
      position: "auto",
    });

    choicesInstances.current[fieldName] = instance;

    ref.current.addEventListener("change", (event) => {
      updateAssetData(fieldName, event.detail.value);
    });

    instance.setChoices(
        items.map((item) => ({
          value: item.name,
          label: item.name || item.label,
        })),
        "value",
        "label",
        true
    );

    // Preselect value if editing
    if (id && value) {
      setTimeout(() => {
        instance.setChoiceByValue(value);
      }, 100); // Ensures the choices are loaded before selection
    }

    return () => {
      instance.destroy();
      delete choicesInstances.current[fieldName];
    };
  };

  useEffect(() => {
    return initChoicesDropdown(selectType, "type", assetType, assetData.type);
  }, [assetType, assetData.type, id]);

  useEffect(() => {
    return initChoicesDropdown(selectLocation, "location", location, assetData.location);
  }, [location, assetData.location, id]);

  useEffect(() => {
    return initChoicesDropdown(selectDepartment, "department", department, assetData.department);
  }, [department, assetData.department, id]);

  useEffect(() => {
    return initChoicesDropdown(selectStatus, "status", status, assetData.status);
  }, [status, assetData.status, id]);

  const excelFormModal = () => {
    setHideExcelForm(!hideExcelForm);
  };

  useEffect(() => {
    if(id){
      fetchAsset(id);
    }
  }, []);

  return (
      <div className="p-5 relative">
        {!id && (
            <button onClick={excelFormModal} className="inline-flex items-center px-4 py-2 border border-[#00763A] shadow-sm text-sm font-medium rounded-md text-[#00763A] hover:bg-[#00763A] hover:text-white transition-colors absolute right-10 top-10">
              <FaUpload className="mr-2" />
              Import Excel
            </button>
        )}

        <UploadExcel hideExcelForm={hideExcelForm} excelFormModal={excelFormModal} />

        <h1 className="text-xl uppercase font-black"> {id? "Edit Asset" : "Add Asset" }</h1>

        {/* Success Message */}
        {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
        )}

        {/* Error Message */}
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
        )}

        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-7">
            <div className="grid gap-3">
              <label htmlFor="name">Asset Name *</label>
              <input
                  type="text"
                  name="name"
                  value={assetData.name}
                  placeholder="eg. HP ProBook 4320s"
                  className="px-3 py-2 outline-none border-2 rounded-md"
                  onChange={handleChange}
                  required
              />
            </div>

            <div className="grid gap-3">
              <label htmlFor="serial_no">Serial Number *</label>
              <input
                  type="text"
                  name="serial_no"
                  value={assetData.serial_no}
                  placeholder="Asset Serial Number"
                  className="px-3 py-2 outline-none border-2 rounded-md"
                  onChange={handleChange}
                  required
              />
            </div>

            <div className="grid gap-3">
              <label htmlFor="asset_tag">Asset Tag</label>
              <input
                  type="text"
                  name="asset_tag"
                  id="asset_tag"
                  value={assetData.asset_tag}
                  placeholder="eg. HP0012"
                  className="px-3 py-2 outline-none border-2 rounded-md"
                  onChange={handleChange}
              />
            </div>

            <div className="grid gap-3">
              <label htmlFor="model">Model</label>
              <input
                  type="text"
                  name="model"
                  id="model"
                  value={assetData.model}
                  placeholder="eg. HP ProBook"
                  className="px-3 py-2 outline-none border-2 rounded-md"
                  onChange={handleChange}
              />
            </div>

            <div className="grid gap-3">
              <label htmlFor="purchase_date">Purchase Date</label>
              <input
                  type="date"
                  id="purchase_date"
                  name="purchase_date"
                  value={assetData.purchase_date}
                  className="px-3 py-2 outline-none border-2 rounded-md"
                  onChange={handleChange}
              />
            </div>

            <div className="grid gap-3">
              <label htmlFor="purchase_cost">Purchase Cost</label>
              <input
                  type="number"
                  name="purchase_cost"
                  id="purchase_cost"
                  value={assetData.purchase_cost}
                  placeholder="20000"
                  className="px-3 py-2 outline-none border-2 rounded-md"
                  onChange={handleChange}
                  step="0.01"
              />
            </div>

            <div className="grid gap-3">
              <label htmlFor="file">Upload File</label>
              <input
                  type="file"
                  name="file"
                  placeholder="Asset file"
                  className="px-3 py-2 outline-none border-0 rounded-md"
              />
            </div>

            <div className="grid gap-3 col-span-2">
              <label htmlFor="description">Description</label>
              <textarea
                  name="description"
                  id="description"
                  value={assetData.description}
                  placeholder="Write the description for the asset"
                  rows={5}
                  className="px-3 py-2 outline-none border-2 rounded-md"
                  onChange={handleChange}
              ></textarea>
            </div>

            <div className="grid gap-3">
              <label htmlFor="asset_type">Type *</label>
              <select
                  id="asset_type"
                  name="asset_type"
                  required
                  ref={selectType}
                  className="block w-full"
              ></select>
            </div>

            <div className="grid gap-3">
              <label htmlFor="location">Location *</label>
              <select
                  id="location"
                  name="location"
                  required
                  ref={selectLocation}
                  className="block w-full"
              ></select>
            </div>

            <div className="grid gap-3">
              <label htmlFor="department">Department *</label>
              <select
                  id="department"
                  name="department"
                  required
                  ref={selectDepartment}
                  className="block w-full"
              ></select>
            </div>

            <div className="grid gap-3">
              <label htmlFor="status">Status *</label>
              <select
                  id="status"
                  name="status"
                  required
                  ref={selectStatus}
                  className="block w-full"
              ></select>
            </div>
          </div>

          <div className="flex justify-end items-center gap-4 mt-5">
            <a href="/assets" className="btn btn-danger">
              Close
            </a>
            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? id ? "Editing..." : "Saving..." : id ? "Edit Asset" : "Save Asset"}
            </button>
          </div>
        </form>
      </div>
  );
};

export default AssetForm;

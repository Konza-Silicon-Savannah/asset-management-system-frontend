import { useState, useEffect, useRef } from "react";
import Choices from "choices.js";
import { Link } from "lucide-react";
// import

const AssetForm = () => {
  const [assetData, setAssetData] = useState({
    name: "",
    serial_number: "",
    asset_tag: "",
    model: "",
    purchase_date: "",
    supplier: "",
    purchase_cost: "",
    description: "",
    asset_type: "",
    location: "",
    department: "",
    status: "",
  });
  const selectType = useRef(null);
  const selectLocation = useRef(null);
  const selectDepartment = useRef(null);
  const selectStatus = useRef(null);
  const [assetType, setAssetType] = useState([]);
  const [location, setLocation] = useState([]);
  const [department, setDepartment] = useState([]);
  const [status, setStatus] = useState([]);

  const handleChange = ({ currentTarget: input }) => {
    setAssetData({ ...assetData, [input.name]: input.value });
  };

  useEffect(() => {
    const choice_types = new Choices(selectType.current, {
      removeItemButton: true,
      searchEnabled: true,
      placeholder: true,
      placeholderValue: "Choose type",
      searchPlaceholderValue: "Search type...",
      noResultsText: "No results found",
      noChoicesText: "No type available",
      position: "auto",
    });
    if (assetType.length) {
      choice_types.setChoices(
        assetType.map((type) => ({
          value: type.id,
          label: type.label,
        }))
      ),
        "value",
        "label",
        true;
    }

    return () => choice_types.destroy();
  }, [assetType]);

  useEffect(() => {
    const choice_location = new Choices(selectLocation.current, {
      removeItemButton: true,
      searchEnabled: true,
      placeholder: true,
      placeholderValue: "Choose location",
      searchPlaceholderValue: "Search location...",
      noResultsText: "No results found",
      noChoicesText: "No location available",
      position: "auto",
    });
    if (location.length) {
      choice_location.setChoices(
        location.map((loc) => ({
          value: loc.id,
          label: loc.label,
        }))
      ),
        "value",
        "label",
        true;
    }

    return () => choice_location.destroy();
  }, [location]);

  useEffect(() => {
    const choice_dpt = new Choices(selectDepartment.current, {
      removeItemButton: true,
      searchEnabled: true,
      placeholder: true,
      placeholderValue: "Choose department",
      searchPlaceholderValue: "Search department...",
      noResultsText: "No results found",
      noChoicesText: "No department available",
      position: "auto",
    });
    if (department.length) {
      choice_dpt.setChoices(
        department.map((dpt) => ({
          value: dpt.id,
          label: dpt.label,
        }))
      ),
        "value",
        "label",
        true;
    }

    return () => choice_dpt.destroy();
  }, [department]);

  useEffect(() => {
    const choice_status = new Choices(selectStatus.current, {
      removeItemButton: true,
      searchEnabled: true,
      placeholder: true,
      placeholderValue: "Choose status",
      searchPlaceholderValue: "Search status...",
      noResultsText: "No results found",
      noChoicesText: "No status available",
      position: "auto",
    });
    if (status.length) {
      choice_status.setChoices(
        status.map((st) => ({
          value: st.id,
          label: st.label,
        }))
      ),
        "value",
        "label",
        true;
    }

    return () => choice_status.destroy();
  }, [status]);

  console.log(assetData);

  return (
    <div className="p-5">
      <h1 className="text-xl uppercase font-black">Add Asset</h1>
      <form className="mt-5">
        <div className="grid grid-cols-2 gap-7">
          <div className="grid gap-3">
            <label htmlFor="name">Asset Name</label>
            <input
              type="text"
              name="name"
              placeholder="eg. HP ProBook 4320s"
              className="px-3 py-2 outline-none border-2 rounded-md"
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-3">
            <label htmlFor="serial_number">Serial Number</label>
            <input
              type="text"
              name="serial_number"
              placeholder="Asset Id"
              className="px-3 py-2 outline-none border-2 rounded-md"
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-3">
            <label htmlFor="asset_tag">Asset Tag</label>
            <input
              type="text"
              name="asset_tag"
              id="asset_tag"
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
              placeholder="eg. HP"
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
              className="px-3 py-2 outline-none border-2 rounded-md"
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-3">
            <label htmlFor="supplier">Supplier</label>
            <input
              type="text"
              name="supplier"
              id="supplier"
              placeholder="eg. DimTech computers"
              className="px-3 py-2 outline-none border-2 rounded-md"
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-3">
            <label htmlFor="purchase_cost">Purchase Cost</label>
            <input
              type="text"
              name="purchase_cost"
              id="purchase_cost"
              placeholder="20,000"
              className="px-3 py-2 outline-none border-2 rounded-md"
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-3">
            <label htmlFor="file">Upload File</label>
            <input
              type="file"
              name="file"
              placeholder="Asset name"
              className="px-3 py-2 outline-none border-0 rounded-md"
            />
          </div>

          <div className="grid gap-3 col-span-2">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Write the description for the asset"
              rows={5}
              className="px-3 py-2 outline-none border-2 rounded-md"
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="grid gap-3">
            <label htmlFor="asset_type">Type</label>
            <select
              id="asset_type"
              name="asset_type"
              required
              ref={selectType}
              className="block w-full"
              onChange={handleChange}
            ></select>
          </div>

          <div className="grid gap-3">
            <label htmlFor="location">Location</label>
            <select
              id="location"
              name="location"
              required
              ref={selectLocation}
              className="block w-full"
              onChange={handleChange}
            ></select>
          </div>

          <div className="grid gap-3">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              required
              ref={selectDepartment}
              className="block w-full"
              onChange={handleChange}
            ></select>
          </div>

          <div className="grid gap-3">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              required
              ref={selectStatus}
              className="block w-full"
              onChange={handleChange}
            ></select>
          </div>
        </div>
        <div className="flex justify-end items-center gap-4 mt-5">
          <a href="/assets" className="btn btn-danger">
            Close
          </a>
          <button type="submit" className="btn btn-success">
            Save Asset
          </button>
        </div>
        {/* <div className="bg-red-300 flex justify-end items-center gap-4">
                    <button className="bg-primary text-white py-1 px-10 rounded-sm mt-6 cursor-pointer">cancel</button>
                    <input type="submit" value="Submit" className="bg-primary text-white py-1 px-10 rounded-sm mt-6 cursor-pointer" />
                </div> */}
      </form>
    </div>
  );
};

export default AssetForm;

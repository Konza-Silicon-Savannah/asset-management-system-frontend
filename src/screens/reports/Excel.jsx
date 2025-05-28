import formatCurrency from "../helpers/Currency.jsx";
import formatDate from "../helpers/DateFormat.jsx";
import * as XLSX from "xlsx";

const ExportExcel = (report) =>{
    const worksheetData = [
        ['Name', 'Type', 'Model', 'Tag', 'Serial No.', 'Location', 'Purchase Cost', 'Supplied Date', 'Asset Condition', 'Issued To', 'Email', 'Department/Workstream', 'Phone', 'Company', 'Employee No.', 'Requested Date', 'Checkout', 'Checkin'],
        ...report.map(asset => [
            asset.name || '',
            asset.type || '',
            asset.model || '',
            asset.asset_tag || '',
            asset.serial_no || '',
            asset.location || '',
            formatCurrency(asset.purchase_cost) || '',
            asset.supplied_date ? formatDate(asset.supplied_date) : '',
            asset.status || '',
            asset.latest_request?.requested_user?.name || '',
            asset.latest_request?.requested_user?.email || '',
            asset.latest_request?.requested_user?.department || '',
            asset.latest_request?.requested_user?.phone || '',
            asset.latest_request?.requested_user?.company || '',
            asset.latest_request?.requested_user?.employeeNo || '',
            asset.latest_request?.requested_date ? formatDate(asset.latest_request.requested_date) : '',
            asset.latest_request?.ckeck_out ? formatDate(asset.latest_request.ckeck_out) : '',
            asset.latest_request?.ckeck_in ? formatDate(asset.latest_request.ckeck_in) : ''
        ])
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    const columnWidths = [
        { wch: 20 }, // Name
        { wch: 15 }, // Type
        { wch: 15 }, // Model
        { wch: 12 }, // Tag
        { wch: 15 }, // Serial No.
        { wch: 15 }, // Location
        { wch: 12 }, // Purchase Cost
        { wch: 12 }, // Supplied Date
        { wch: 15 }, // Asset Condition
        { wch: 20 }, // Issued To
        { wch: 25 }, // Email
        { wch: 20 }, // Department
        { wch: 15 }, // Phone
        { wch: 15 }, // Company
        { wch: 12 }, // Employee No.
        { wch: 12 }, // Requested Date
        { wch: 12 }, // Checkout
        { wch: 12 }  // Checkin
    ];
    worksheet['!cols'] = columnWidths;

    const headerStyle = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "2980B9" } },
        alignment: { horizontal: "center", vertical: "center" }
    };

    for (let col = 0; col < worksheetData[0].length; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
        if (!worksheet[cellAddress]) worksheet[cellAddress] = {};
        worksheet[cellAddress].s = headerStyle;
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Assets Report");

    workbook.Props = {
        Title: "Assets Report",
        Subject: "Asset Management Report",
        Author: "Asset Management System",
        CreatedDate: new Date()
    };

    XLSX.writeFile(workbook, 'assets-report.xlsx');
}

export default ExportExcel;
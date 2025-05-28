import formatCurrency from "../helpers/Currency.jsx";
import formatDate from "../helpers/DateFormat.jsx";
import jsPDF from "jspdf";

const ExportPDF = async (report) => {
    const { default: autoTable } = await import('jspdf-autotable');

    const doc = new jsPDF('l', 'mm', 'a4');

    doc.setFontSize(16);
    doc.text('Assets Report', 14, 15);

    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    })}`, 14, 25);

    const headers = [
        'Name', 'Type', 'Model', 'Tag',
        'Purchase Cost', 'Asset Condition', 'Issued To',
        'Email', 'Department', 'Employee No.',
        'Requested Date', 'Checkout', 'Checkin'
    ];

    const tableData = report.map(asset => [
        asset.name || '',
        asset.type || '',
        asset.model || '',
        asset.asset_tag || '',
        formatCurrency(asset.purchase_cost) || '',
        asset.status || '',
        asset.latest_request?.requested_user?.name || '',
        asset.latest_request?.requested_user?.email || '',
        asset.latest_request?.requested_user?.department || '',
        asset.latest_request?.requested_user?.employeeNo || '',
        asset.latest_request?.requested_date ? formatDate(asset.latest_request.requested_date) : '',
        asset.latest_request?.ckeck_out ? formatDate(asset.latest_request.ckeck_out) : '',
        asset.latest_request?.ckeck_in ? formatDate(asset.latest_request.ckeck_in) : ''
    ]);

    autoTable(doc, {
        head: [headers],
        body: tableData,
        startY: 35,
        styles: {
            fontSize: 8,
            cellPadding: 2,
        },
        headStyles: {
            fillColor: [46, 125, 50], // Green theme (RGB: #2E7D32)
            textColor: 255,
            fontStyle: 'bold'
        },
        alternateRowStyles: {
            fillColor: [232, 245, 233] // Light green for alternate rows (RGB: #E8F5E9)
        },
        columnStyles: {
            4: { halign: 'right' },
        },
        margin: { top: 35, right: 5, bottom: 20, left: 5 },
        theme: 'striped',
        tableWidth: 'auto',
        showHead: 'everyPage'
    });

    doc.save('assets-report.pdf');
}

export default ExportPDF;
import formatCurrency from "../helpers/Currency.jsx";
import formatDate from "../helpers/DateFormat.jsx";

const ExportCSV = (report) =>{
    const escapeCSV = (value) => {
        if (value === null || value === undefined) return '';
        const str = String(value);
        if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
            return '"' + str.replace(/"/g, '""') + '"';
        }
        return str;
    };

    const csvContent = [
        ['Name', 'Type', 'Model', 'Tag', 'Serial No.', 'Location', 'Purchase Cost', 'Supplied Date', 'Asset Condition', 'Issued To', 'Email', 'Department/Workstream', 'Phone', 'Company', 'Employee No.', 'Requested Date', 'Checkout', 'Checkin'],
        ...report.map(asset => [
            escapeCSV(asset.name || ''),
            escapeCSV(asset.type || ''),
            escapeCSV(asset.model || ''),
            escapeCSV(asset.asset_tag || ''),
            escapeCSV(asset.serial_no || ''),
            escapeCSV(asset.location || ''),
            escapeCSV(formatCurrency(asset.purchase_cost) || ''),
            escapeCSV(asset.supplied_date ? formatDate(asset.supplied_date) : ''),
            escapeCSV(asset.status || ''),
            escapeCSV(asset.latest_request?.requested_user?.name || ''),
            escapeCSV(asset.latest_request?.requested_user?.email || ''),
            escapeCSV(asset.latest_request?.requested_user?.department || ''),
            escapeCSV(asset.latest_request?.requested_user?.phone || ''),
            escapeCSV(asset.latest_request?.requested_user?.company || ''),
            escapeCSV(asset.latest_request?.requested_user?.employeeNo || ''),
            escapeCSV(asset.latest_request?.requested_date ? formatDate(asset.latest_request.requested_date) : ''),
            escapeCSV(asset.latest_request?.ckeck_out ? formatDate(asset.latest_request.ckeck_out) : ''),
            escapeCSV(asset.latest_request?.ckeck_in ? formatDate(asset.latest_request.ckeck_in) : '')
        ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'assets-report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

export default ExportCSV;
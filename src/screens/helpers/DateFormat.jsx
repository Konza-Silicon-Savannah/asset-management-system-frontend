const formatDate= (date) =>{
    if(!date) return ""
    return new Date(date).toLocaleString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
    })
}

export default formatDate;
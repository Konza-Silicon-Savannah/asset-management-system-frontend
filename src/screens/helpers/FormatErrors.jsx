
const FormatErrors = (errors) => {
    if (!errors || typeof errors !== 'object') return '';

    return Object.entries(errors)
        .map(([key, messages]) => {
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            return `${label}: ${Array.isArray(messages) ? messages.join(' ') : messages}`;
        })
        .join('\n');
}

export default FormatErrors;
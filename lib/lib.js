function incrementCounter(value) {
    const parts = value.split('-');
    let tag, progressive, year;

    if (parts.length === 3) {
        if (parts[0].match(/^\d+$/)) {
            // Formato: 000131-DTA-2025
            progressive = parseInt(parts[0]);
            tag = parts[1];
            year = parseInt(parts[2]);
        } else {
            // Formato: DC-90319-2025
            tag = parts[0];
            progressive = parseInt(parts[1]);
            year = parseInt(parts[2]);
        }
    }

    const currentYear = new Date().getFullYear();
    if (year !== currentYear) {
        year = currentYear;
    }
    progressive += 1;

    if (value.startsWith('000')) {
        return `${String(progressive).padStart(6, '0')}-${tag}-${year}`;
    } else {
        return `${tag}-${progressive}-${year}`;
    }
}

module.exports = { incrementCounter };
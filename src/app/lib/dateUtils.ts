// start date gets first hours of day and end date gets last hours of day
export const normalizeRange = (range: {
    startDate: Date;
    endDate: Date;
    key: string;
}) => {
    const start = new Date(range.startDate);
    start.setHours(0, 0, 0, 0); // start of the day

    const end = new Date(range.endDate);
    end.setHours(23, 59, 59, 999); // end of the day

    return { startDate: start, endDate: end, key: range.key };
};
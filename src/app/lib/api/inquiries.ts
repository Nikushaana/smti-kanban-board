export async function fetchInquiries(params: {
    clientName: string;
    minValue: number;
    startDate: string;
    endDate: string;
}) {
    const query = new URLSearchParams({
        clientName: params.clientName,
        minValue: params.minValue.toString(),
        startDate: params.startDate,
        endDate: params.endDate,
    });

    const res = await fetch(`/api/inquiries?${query.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch inquiries");
    return res.json();
}
export async function fetchData(endpoint) {
    const response = await fetch(endpoint);
    if (!response.ok) {
        console.log("Error");
        return [];
    }
    const data = await response.json();
    //console.log(data.data)
    return data;
}
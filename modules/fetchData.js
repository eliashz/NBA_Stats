export async function fetchData(url) {    
    const response = await fetch(url);
    if (!response.ok) {
        console.log("Error");
        return [];
    }
    const data = await response.json();
    return data;
}
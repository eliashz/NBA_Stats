export async function fetchDataPages(url) {
    let page = 1;
    let results = [];
    do {
        let url2 = url + `?page=${page}?per_page=100`;
        const response = await fetch(url2);
        if (!response.ok) {
            console.log("Error");
            return [];
        }
        const data = await response.json();
        page++
        results.push(...data.data);
    } while (page < 10)
    return results;
}
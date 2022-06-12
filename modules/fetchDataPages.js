export async function fetchDataPages(url) {
    let page = 1;
    let results = [];
    do {
        let url2 = url + `?per_page=100&page=${page}`;
        const response = await fetch(url2);
        if (!response.ok) {
            console.log("Error");
            return [];
        }
        const data = await response.json();
        page++
        results.push(...data.data);
        console.log(data.meta.total_pages, page)
    } while (page < 10)
    return results;

}
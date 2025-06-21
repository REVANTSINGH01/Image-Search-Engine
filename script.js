const apiKey = "jEj3XSr4z261Pu0mlULeFPacHdJY0vLDB0O9ZWPV6byNxLg88zkk0aYy";
    const Searchbox = document.getElementById("searchinput");
    const Searchform = document.getElementById("searchForm");
    const Searchresult = document.getElementById("searchResult");

    let keyword = "";
    let page = 1;

    async function searchKeyword() {
        keyword = Searchbox.value.trim();
        if (!keyword) return;

        const apiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=15&page=${page}`;
        
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    Authorization: apiKey
                }
            });

            const data = await response.json();
            const results = data.photos;

            // Clear previous results if it's a fresh search
            if (page === 1) {
                Searchresult.innerHTML = "";
            }

            results.forEach((photo) => {
                const image = document.createElement("img");
                image.src = photo.src.medium;
                image.alt = photo.alt;

                const imageLink = document.createElement("a");
                imageLink.href = photo.url;
                imageLink.target = "_blank";
                imageLink.appendChild(image);

                Searchresult.appendChild(imageLink);
            });
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    }

    Searchform.addEventListener("submit", (e) => {
        e.preventDefault();
        page = 1;
        searchKeyword();
    });
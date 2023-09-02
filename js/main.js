// Load videos if any category button is clicked
const loadVideos = async (categoryId) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json();
    const videos = data.data;
    displayVideo(videos);
}

// Display videos of the specific category
const displayVideo = (videos) => {
    const videoContainer = document.getElementById('video-container');
    videoContainer.textContent = ''
    
    handleSearchEmpty(videos);

    videos.forEach(video => {
        console.log(video)
        const videoCard = document.createElement('div');
        videoCard.classList.add('space-y-5');
        videoCard.innerHTML = `
        <figure class="">
            <img src="${video?.thumbnail}" alt="image" class="rounded-lg h-48 w-full">
        </figure>
        <div class="flex gap-3">
            <figure class="">
                <img src="${video?.authors[0]?.profile_picture}" alt="user-photo" class="w-8 h-8 rounded-full">
            </figure>
            <div class="space-y-2">
                <h3 class="font-bold text-zinc-950">${video?.title}</h3>
                <div class="flex gap-2">
                    <p class="text-sm text-zinc-700">${video?.authors[0]?.profile_name}</p>
                    <img src="${video?.authors[0]?.verified ? 'images/tickmark.png' : ''}" alt="">
                </div>
                <p class="text-sm text-zinc-700">${video?.others?.views} views</p>
            </div>
        </div>
        `
        videoContainer.appendChild(videoCard);
    });
}


// Load categories buttons
const loadCategories = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const categories = data.data;
    handleCategories(categories)
}
loadCategories();

// Activate categories buttons
const handleCategories = (categories) =>{
    categories.forEach(category =>{
        const categoryId = category.category_id;
        document.getElementById(categoryId).addEventListener('click', () => {
            loadVideos(categoryId)
        })
    })
}



loadVideos(1000)
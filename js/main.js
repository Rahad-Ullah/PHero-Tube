// Load videos if any category button is clicked
const loadVideos = async (categoryId) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json();
    const videos = data.data;

    displayVideo(videos);
    handleSortByView(videos);
}

// Display videos of the specific category
const displayVideo = (videos) => {
    const videoContainer = document.getElementById('video-container');
    videoContainer.textContent = ''
    
    handleSearchEmpty(videos);

    videos.forEach(video => {
        const postSeconds = parseFloat(video?.others?.posted_date) || 0;
        const postTime = convertTime(postSeconds);

        const videoCard = document.createElement('div');
        videoCard.classList.add('space-y-5');
        videoCard.innerHTML = `
        <figure class="relative">
            <img src="${video?.thumbnail}" alt="image" class="rounded-lg h-48 w-full z-0">
            <div id="post-time" class="bg-zinc-900 absolute bottom-2 right-2 z-10 p-1 rounded">
                <p class="text-xs text-white">${postTime}</p>
            </div>
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
        
        handlePostTime(postSeconds);
    });
}


// Load categories buttons
const loadCategories = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const categories = data.data;
    displayCategories(categories)
    handleCategories(categories)
}
loadCategories();

// Display categories buttons
const displayCategories = (categories) =>{
    categories.forEach(category => {
        const categoryContainer = document.getElementById('categories');
        const categoryBtn = document.createElement('div');
        categoryBtn.innerHTML = `
        <input id="${category?.category_id}" type="radio" name="options" class="btn btn-sm text-zinc-700 normal-case px-5 rounded" aria-label="${category?.category}">
        `
        categoryContainer.appendChild(categoryBtn);
    })
}

// Activate categories buttons
const handleCategories = (categories) =>{
    categories.forEach(category =>{
        const categoryId = category.category_id;
        document.getElementById(categoryId).addEventListener('click', () => {
        loadVideos(categoryId);
        })
    })
}


// Handle Post Time
const handlePostTime = (postSeconds) =>{
    const div = document.getElementById('post-time');
        if(postSeconds < 1){
            div.classList.add('hidden')
        }
        else{
            div.classList.remove('hidden')
        }
}


// show not found content if the search result is empty
const handleSearchEmpty = (videos) => {
    if(videos.length < 1){
        document.getElementById('search-empty').classList.remove('hidden');
        return;
    }
    else{
        document.getElementById('search-empty').classList.add('hidden');    
    }
}


// Handle Sort by View
const handleSortByView = (videos) =>{
    document.getElementById('sort-by-view').addEventListener('click', function () {
        const sortedVidoes = videos.sort((card1, card2) =>{
            const video1 = parseFloat(card1?.others?.views);
            const video2 = parseFloat(card2?.others?.views);
            return video1 < video2 ? 1 : video1 > video2 ? -1 : 0;
        })
        displayVideo(sortedVidoes);
    })
}


// handle post Time
const convertTime = (time) => {
    const seconds = parseFloat(time);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${hours} hrs ${minutes} min ago`;
}





loadVideos(1000)
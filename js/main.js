const loadVideos = async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`)
    const data = await res.json();
    const videos = data.data;
    displayVideo(videos);
}

const displayVideo = (videos) => {
    const videoContainer = document.getElementById('video-container');

    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.classList.add('space-y-5');
        videoCard.innerHTML = `
        <figure>
            <img src="images/d72ed80d0c125cb4d7fdda46f2bb42c0.jpeg" alt="image" class="rounded-lg">
        </figure>
        <div class="flex gap-3">
            <figure class="">
                <img src="images/user1.jpeg" alt="user-photo" class="w-16 rounded-full">
            </figure>
            <div class="space-y-2">
                <h3 class="font-bold text-zinc-950">Building a Winning UX Strategy Using the Kano Model</h3>
                <div class="flex gap-2">
                    <p class="text-sm text-zinc-700">Awlad Hossain</p>
                    <img src="images/tickmark.png" alt="">
                </div>
                <p class="text-sm text-zinc-700">91K views</p>
            </div>
        </div>
        `
        videoContainer.appendChild(videoCard);
    });
}

loadVideos()



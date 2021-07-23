function forbiddenErrorVideo() {
    let clip = clips[INDEX_VIEW_CLIP]
    return `<p class="forbidden-error">Unfortunately, Twitch did not allow us to show the clip from the user ${clip.broadcaster.display_name},
    but we left it for you <a target="_blank" href="${clip.embed_url}">link</a></p>`
}

function clearVideo() {
    document.getElementById(`swiper-slide${INDEX_VIEW_CLIP}`).innerHTML = ''
}

async function getClip(slug) {
    //example "MushyEmpathicSmoothieWholeWheat-ZkQVDU2A2uMn5eQ_"
    let ID = 'ghotej777m8rk7kmsp5yp4oo9t3fjg'
    let TWITCH_URL = `https://api.twitch.tv/kraken/clips/${slug}`

    return fetch(TWITCH_URL, {
        headers: {
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Client-ID': ID
        }
    })
        .then(data => data.json())
}

function renderVideo(clip) {

    let videoStatus = 0
    //0 - на паузе
    //1 - старт

    document.getElementById(`swiper-slide${INDEX_VIEW_CLIP}`).innerHTML += `
    <video loop playsinline style="width: 100%;" src="https://clips-media-assets2.twitch.tv/AT-cm%7C${clip.tracking_id}.mp4"></video>
    <div class="video-bottom">
        <div class="broadcaster">
            <a href="${clip.broadcaster.channel_url}" target="_blank">
                <img src="${clip.broadcaster.logo}"><p>${clip.broadcaster.display_name} <br><span class="title">${clip.title}</span></p>
            </a>
        </div>
        <div class="share">
            <button id="share-button">SHARE</button>
        </div>
        <div class="views">
            <p>👀 ${clip.views}</p>
        </div>
    </div>
    `


    let btnShare = document.querySelector('#share-button')
    let video = document.querySelector(`#swiper-slide${INDEX_VIEW_CLIP} video`)

    if (video.currentTime == 0) {
        videoStatus = 0
    } else {
        videoStatus = 1
    }

    video.addEventListener('click', function () {
        if (videoStatus == 0) {
            video.play()
            videoStatus = 1
        } else {
            video.pause()
            videoStatus = 0
        }
    })

    btnShare.addEventListener('click', async function () {

        let shareData = {
            title: clip.title,
            text: 'I share this with https://gaserd.github.io/swipetwitch/',
            url: `${location.origin}/clip.html?slug=${clip.slug}`,
        }

        try {
            await navigator.share(shareData)
        } catch (err) {
            console.log(err)
        }
    })
}
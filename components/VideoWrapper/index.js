function forbiddenErrorVideo() {
    let clip = clips[INDEX_VIEW_CLIP]
    return `<p class="forbidden-error">Unfortunately, Twitch did not allow us to show the clip from the user ${clip.broadcaster.display_name},
    but we left it for you <a target="_blank" href="${clip.embed_url}">link</a></p>`
}

function mobileCheck() {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

function clearVideo() {
    document.getElementById(`swiper-slide${INDEX_VIEW_CLIP}`) ? document.getElementById(`swiper-slide${INDEX_VIEW_CLIP}`).innerHTML = '' : ''
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
    let loaded = false

    document.getElementById(`swiper-slide${INDEX_VIEW_CLIP}`).innerHTML += `
    <p class="loader-video" style="display:none;">Pls wait, we load this epic clip 🔥</p>
    <video loop playsinline style="width: 100%;"></video>
    <div class="video-bottom">
        <div class="broadcaster">
            <a href="./streamer.html?name=${clip.broadcaster.name}" target="_blank">
                <img src="${clip.broadcaster.logo}"><p>${clip.broadcaster.display_name} <br><span class="title">${clip.title}</span></p>
            </a>
        </div>
        <div class="share">${mobileCheck() ? `<button id="share-button">SHARE</button>` : `<a href="${clip.url}" target="_blank" id="share-button">SHARE</a>`}
        </div>
        <div class="views">
            <p>👀 ${clip.views}</p>
        </div>
    </div>
    `



    let btnShare = document.querySelector('#share-button')
    let video = document.querySelector(`#swiper-slide${INDEX_VIEW_CLIP} video`)
    video.src = `https://clips-media-assets2.twitch.tv/AT-cm%7C${clip.tracking_id}.mp4`
    video.load()

    let interaction = 0
    let interval = setInterval(function() {
        if (interaction > 10) {
            document.querySelector('.loader-video').style.display = 'none'
            clearInterval(interval)
        }

        if (loaded) {
            document.querySelector('.loader-video').style.display = 'none'
            clearInterval(interval)
        } else {
            if (interaction > 0) {
                document.querySelector('.loader-video').style.display = 'block'
            }
        }
        interaction++
    }, 500)

    video.addEventListener('loadeddata', function () {
        loaded = true
    }, false);

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
            text: 'I share this with https://swipetwitch.com',
            url: `${location.origin}/clip.html?slug=${clip.slug}`,
        }

        try {
            await navigator.share(shareData)
        } catch (err) {
            console.log(err)
        }
    })
}
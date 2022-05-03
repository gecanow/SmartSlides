let THUMBNAIL_IDS = [];

async function grabThumbnails() {
    console.log("grabbing thumbnails");
    THUMBNAIL_IMG_PATHS = [];
    return fetch("/assets/header.json").then(function(response) {
        response.json().then(obj => {
            obj.slideList.forEach(slideID => {
                THUMBNAIL_IDS.push(slideID);
            });
        })
    });
}
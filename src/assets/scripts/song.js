class Song {
  constructor({
    singer,
    songId,
    songMid,
    songName,
    albumId,
    albumMid,
    albumName,
    albumPhoto,
    duration,
    url
  }) {
    this.singer = singer

    this.songId = songId
    this.songMid = songMid
    this.songName = songName

    this.albumId = albumId
    this.albumMid = albumMid
    this.albumName = albumName
    this.albumPhoto = albumPhoto

    this.duration = duration
    this.url = url
  }
}

function filterSinger(singers) {
  if (!singers) {
    return false
  }

  let result = []

  singers.forEach(singer => {
    result.push(singer.name)
  })

  // Returns a new string
  return result.join('/')
}

// 工厂方法
function createSong(musicData) {
  return new Song({
    singer: filterSinger(musicData.singer),

    songId: musicData.songid,
    songMid: musicData.songmid,
    songName: musicData.songname,

    albumId: musicData.albumid,
    albumMid: musicData.albummid,
    albumName: musicData.albumname,
    albumPhoto: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}_3.jpg?max_age=2592000`,

    duration: musicData.interval
    // url: musicData.url
  })
}

export { createSong }

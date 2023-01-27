const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);



const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const sourceAudio = $('#sourceAudio')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const PLAYER_STORAGE_KEY = 'PLAYER'


const app = {
    currentIndex: 0,
    isPlaying:false,
    isRandom:false,
    isRepeat:false,
    config:JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function(key, value) {
      this.config[key] = value
      localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config) )
    },

  
  songs: [
    {
      name: "Dấu mưa",
      singer: "Trung Quân Idol",
      path: "./assets/music/Dau-Mua-Trung-Quan-Idol.mp3",
      image: "./assets/img/daumua.jpg"
    },
    {
      name: "Mùa đi qua phố",
      singer: "Phạm Anh Duy",
      path: "./assets/music/Mua-Di-Qua-Pho-Pham-Anh-Duy.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/playlist/2016/05/20/8/8/4/9/1463735531015_500.jpg"
    },
    {
      name: "Phố không mùa",
      singer: "Dương Trường Giang - Bùi Anh Tuấn",
      path:
        "./assets/music/Pho-Khong-Mua-Duong-Truong-Giang-Bui-Anh-Tuan.mp3",
      image: "https://i.ytimg.com/vi/5X3ZNd4efxo/maxresdefault.jpg"
    },
    {
      name: "Sợ rằng em biết anh còn yêu em",
      singer: "Juun Đăng Dũng",
      path: "./assets/music/So-Rang-Em-Biet-Anh-Con-Yeu-Em-Lofi-Version-JUUN-D.mp3",
      image:
        "https://i.ytimg.com/vi/w53zIzNdl70/maxresdefault.jpg"
    },
    {
      name: "They said",
      singer: "Binz",
      path: "./assets/music/They-Said-Touliver-Binz.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2017/12/08/8/0/2/3/1512706766880_640.jpg"
    },
    {
      name: "Waiting for you",
      singer: "Mono",
      path:
        "./assets/music/waiting-for-you.mp3",
      image:
        "https://i.ytimg.com/vi/CHw1b_1LVBA/maxresdefault.jpg"
    },
    {
      name: "24h",
      singer: "Lyly ft.Magazine",
      path: "./assets/music/y2mate.com - 24H  OFFICIAL MUSIC VIDEO   LYLY ft MAGAZINE.mp3",
      image:
        "https://i.ytimg.com/vi/IpniN1Wq68Y/maxresdefault.jpg"
    },
    {
      name: "Bao tiền một mớ bình yên ",
      singer: "14 Casper",
      path:
        "./assets/music/y2mate.com - bao tiền một mớ bình yên  14 Casper  Bon Official.mp3",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/1/c/3/b/1c3b6283e28b9030d8f6410b210bd765.jpg"
    },
    {
      name: "BERLIN",
      singer: "Khoi Vu",
      path:
        "./assets/music/y2mate.com - BERLIN  Khoi Vu  Official Lyrics Video.mp3",
      image:
        "https://i.ytimg.com/vi/6KCff8T5tR0/sddefault.jpg"
    },
    {
      name: "Đen Đá Không Đường",
      singer: "AMEE - HIEUTHUHAI",
      path:
        "./assets/music/y2mate.com - Đen Đá Không Đường  AMEE  HIEUTHUHAI  VERSERAP   Lyrics .mp3 ",
      image:
        "https://i.ytimg.com/vi/3ZuQGy07fbo/mqdefault.jpg"
    }
  ],



  render: function() {
    const htmls = this.songs.map((song, index) => {
        return `
        <div class="song ${index === this.currentIndex ? 'active': ''}" data-index ="${index}">
            <div class="thumb"
                    style="background-image: url('${song.image}')">

            </div>

            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>

            </div>
        </div>
        `
    })

    playlist.innerHTML = htmls.join('')

  },

  defineProperties: function () {
    Object.defineProperty(this, 'currentSong', {
        get: function() {
            return this.songs[this.currentIndex]
        }
    })
  },
  
  handleEvents: function() {
    const _this = this
    const cdWidth = cd.offsetWidth

    // Handle
    
    const cdThumbAnimate = cdThumb.animate([
      {
        transform:'rotate(360deg)'
      }
    ],  {
      duration: 10000, // 10 seconds
      iterations: Infinity
    })
    cdThumbAnimate.pause()

    //Handle zoome in and zoom out
    document.onscroll = function() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const newCdWidth = cdWidth - scrollTop
        cd.style.width = newCdWidth > 0 ? newCdWidth + 'px': 0
        cd.style.opacity = newCdWidth / cdWidth

    }

    //Handle click play
    playBtn.onclick = function () {
      if(_this.isPlaying) {
        audio.pause()
      } else {
        audio.play()
        
      }
    }

    //When the song is played
    audio.onplay = function() {
      _this.isPlaying = true
      player.classList.add('playing')
      cdThumbAnimate.play()
    }

    //When the song is paused
    audio.onpause = function() {
      _this.isPlaying = false
      player.classList.remove('playing')
      cdThumbAnimate.pause()
    }

    //When song tempo has changed
    audio.ontimeupdate = function() {
      if (audio.duration) {
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
        progress.value = progressPercent
      }
    }

    // Handle when song tempo has changed
    progress.onchange = function(e) {
      const seekTime = audio.duration/100 * e.target.value
      audio.currentTime = seekTime
    }

     // Khi next song 
    nextBtn.onclick = function() {
      if(_this.isRandom) {
        _this.playRandomSong()
      } else {
        _this.nextSong()
        
      }
      audio.play()
      _this.render()
      _this.scrollToActiveSong()
    }

    prevBtn.onclick = function() {
        _this.prevSong()
        audio.play()
        _this.render()
    }

    //Xu ly bat / tat ramdom song
    randomBtn.onclick = function(e) {
      _this.isRandom = !_this.isRandom
      _this.setConfig('isRandom', _this.isRandom)
      randomBtn.classList.toggle('active',_this.isRandom)

      
    }
    // xu ly lap lai song
    repeatBtn.onclick = function() {
       _this.isRepeat = !_this.isRepeat
      _this.setConfig('isRepeat', _this.isRepeat)
      
    }

    //Xu ly next song khi audio ended
    audio.onended = function() {
      if(_this.isRepeat) {
        audio.play()
        
      }else{
        nextBtn.click()
      }
      
    }
    // Lang nghe hanh vi click vao playlist
    playlist.onclick = function(e) {

      const songNode = e.target.closest('.song:not(.active)')
      //Xu ly khi click vao song
      if( songNode|| e.target.closest('.option')) {

        //Xu ly khi click vao song
          if(songNode) {
              _this.currentIndex = Number(songNode.dataset.index)
              _this.loadCurrentSong()
              audio.play()
              _this.render()
          }
          // Xu li khi click vao option
          if(e.target.closest('.option')) {

          }
      } else {
        
      }
    }
  },



  scrollToActiveSong:function() {
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        behavior:'smooth',
        block:'nearest'
      })
    }, 200)
  },


  loadCurrentSong: function() {

    heading.textContent = this.currentSong.name
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
    audio.src = this.currentSong.path

  },

  loadConfig: function() {
    this.isRandom = this.config.isRandom
    this.isRepeat = this.config.isRepeat
    //Hien thi trang thai ban dau cua button repeat and radom
    randomBtn.classList.toggle('active',this.isRandom)
    repeatBtn.classList.toggle('active',this.isRepeat)
  },

  nextSong: function() {
    this.currentIndex++
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0
    }
    this.loadCurrentSong()
  },

  prevSong: function() {
    this.currentIndex--
    if (this.currentIndex <0) {
      this.currentIndex = 0
    }
    this.loadCurrentSong()
  },

  playRandomSong:function() {
    let newIndex 
    do{
        newIndex = Math.floor(Math.random() * this.songs.length )
    } while (newIndex === this.currentIndex)

    this.currentIndex = newIndex
    this.loadCurrentSong()
  },

  

 

  start: function() {
    // Gan cau hinh tu config vao ung dung
    this.loadConfig()
    //Định nghĩa các thuộc tính cho Object
    this.defineProperties()

    //Lắng nghe và xử lý các sự kiện (DOM event)
    this.handleEvents()

    //Load the first Song info into the UI when running the app
    this.loadCurrentSong()
 

    //Render playlist
    this.render()
  },
  
  
};

app.start()




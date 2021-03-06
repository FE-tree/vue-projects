new Vue({
    el: "#app",
    data() {
        return {
            audio: null,
            circleLeft: null,
            barWidth: null,
            duration: null,
            currentTime: null,
            isTimerPlaying: false,
            tracks: [
                { name: "How Do You Do", singer: "Befour", cover: "./img/1.jpg", source: "./mp3/1.mp3", favorited: false },
                { name: "Dance now", singer: "Brothers", cover: "./img/2.jpg", source: "./mp3/2.mp3",
                    favorited: true },
                { name: "火花", singer: "高耀太", cover: "./img/3.jpg", source: "./mp3/3.mp3", favorited: false },
                { name: "순정 (纯情)", singer: "코요태 (高耀太)", cover: "./img/4.jpg", source: "./mp3/4.mp3", favorited: false },
                { name: "Smile.DK", singer: "Kissy, Kissy", cover: "./img/5.jpg", source: "./mp3/5.mp3",
                    favorited: true},
                { name: "Mr.Dj (Radio Edit)", singer: "DJ Hyo", cover: "./img/6.jpg", source: "./mp3/6.mp3", favorited: false },
                { name: "My First Kiss", singer: "3OH!3", cover: "./img/7.jpg", source: "./mp3/7.mp3",
                    favorited: true},
                { name: "By My Side(Roxado Fmx)", singer: "REDDJ", cover: "./img/8.jpg", source: "./mp3/8.mp3", favorited: false },
                { name: "Firestarter", singer: "Samantha Jade", cover: "./img/9.jpg", source: "./mp3/9.mp3", favorited: false },
                { name: "Walking In The Sun (加快版DJ)", singer: "群星", cover: "./img/10.jpg", source: "./mp3/10.mp3",
                    favorited: true},
                { name: "Laserlight (DRM Vs Dayz Remix Edit)", singer: "Electro Driverz", cover: "./img/11.jpg", source: "./mp3/11.mp3", favorited: false },
                { name: "I AM THE BEST", singer: "2NE1 (투애니 원)", cover: "./img/12.jpg", source: "./mp3/12.mp3", favorited: false }
            ],
            currentTrack: null,
            currentTrackIndex: 0,
            transitionName: null,
            showList: false
        };
    },
    methods: {
        play() {
            if (this.audio.paused) {
                this.audio.play();
                this.isTimerPlaying = true;
            } else {
                this.audio.pause();
                this.isTimerPlaying = false;
            }
        },
        generateTime() {
            let width = (100 / this.audio.duration) * this.audio.currentTime;
            this.barWidth = width + "%";
            this.circleLeft = width + "%";
            let durmin = Math.floor(this.audio.duration / 60);
            let dursec = Math.floor(this.audio.duration - durmin * 60);
            let curmin = Math.floor(this.audio.currentTime / 60);
            let cursec = Math.floor(this.audio.currentTime - curmin * 60);
            if (durmin < 10) {
                durmin = "0" + durmin;
            }
            if (dursec < 10) {
                dursec = "0" + dursec;
            }
            if (curmin < 10) {
                curmin = "0" + curmin;
            }
            if (cursec < 10) {
                cursec = "0" + cursec;
            }
            this.duration = durmin + ":" + dursec;
            this.currentTime = curmin + ":" + cursec;
        },
        updateBar(x) {
            let progress = this.$refs.progress;
            let maxduration = this.audio.duration;
            let position = x - progress.offsetLeft;
            let percentage = (100 * position) / progress.offsetWidth;
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            this.barWidth = percentage + "%";
            this.circleLeft = percentage + "%";
            this.audio.currentTime = (maxduration * percentage) / 100;
            this.audio.play();
        },
        clickProgress(e) {
            this.isTimerPlaying = true;
            this.audio.pause();
            this.updateBar(e.pageX);
        },
        prevTrack() {
            this.transitionName = "scale-in";
            this.isShowCover = false;
            if (this.currentTrackIndex > 0) {
                this.currentTrackIndex--;
            } else {
                this.currentTrackIndex = this.tracks.length - 1;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        nextTrack() {
            this.transitionName = "scale-out";
            this.isShowCover = false;
            if (this.currentTrackIndex < this.tracks.length - 1) {
                this.currentTrackIndex++;
            } else {
                this.currentTrackIndex = 0;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        resetPlayer() {
            this.barWidth = 0;
            this.circleLeft = 0;
            this.audio.currentTime = 0;
            this.audio.src = this.currentTrack.source;
            setTimeout(() => {
                if (this.isTimerPlaying) {
                    this.audio.play();
                } else {
                    this.audio.pause();
                }
            }, 300);
        },
        favorite() {
            this.tracks[this.currentTrackIndex].favorited = !this.tracks[
                this.currentTrackIndex
            ].favorited;
        },
        handlerShowList() {
            this.showList = true;
        },
        playSong(data, i) {
            this.currentTrackIndex = i
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
            this.showList = false;

            this.audio.play();
            this.isTimerPlaying = true;
        }
    },
    created() {
        let vm = this;
        this.currentTrack = this.tracks[0];
        this.audio = new Audio();
        this.audio.src = this.currentTrack.source;
        this.audio.ontimeupdate = function() {
            vm.generateTime();
        };
        this.audio.onloadedmetadata = function() {
            vm.generateTime();
        };
        this.audio.onended = function() {
            vm.nextTrack();
            this.isTimerPlaying = true;
        };

        // this is optional (for preload covers)
        for (let index = 0; index < this.tracks.length; index++) {
            const element = this.tracks[index];
            let link = document.createElement('link');
            link.rel = "prefetch";
            link.href = element.cover;
            link.as = "image"
            document.head.appendChild(link)
        }
    }
});
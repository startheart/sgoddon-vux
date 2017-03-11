<template>
    <div class="feed-list__item">
        <div class="feed">
            <slot class="feed-hd" name="header"></slot>
            <div class="feed-bd">
                <!--文字-->
                <div class="feed-bd__txt" v-if="item.content_text">{{ item.content_text }}</div>
                <!--视频-->
                <div class="feed-bd__video" v-if="videoLength">
                    <video controls="controls"
                           preload="auto"
                           :src="item.content_video"
                           :poster="item.content_video+'?vframe/jpg/offset/2'"
                           x5-video-player-type="h5" x5-video-player-fullscreen="true" preload="none"
                           webkit-playsinline x-webkit-airplay="true"
                           style="object-fit: fill;">
                    </video>
                </div>
                <!--图片-->
                <div class="feed-bd__photo" v-if="photosLength">
                    <ul class="feed-media-mn clearfix">
                        <li :class="[feedMedia,
                            $index > 1 && photosLength === 5 ? 'feed-media-m3' : '',
                            $index > 2 && photosLength === 6 ? 'feed-media-m3' : '',
                            $index < 3 && photosLength === 7 ? 'feed-media-m6' : ''
                            ]" v-for="photo in item.content_pic"
                            track-by="$index"
                            @click="previewPhoto(photo, item.content_pic, $event)"
                            :style="{ backgroundImage: 'url('+photo + photoSize+')'}">
                        </li>
                    </ul>
                </div>
            </div>
            <slot class="feed-ft" name="footer"></slot>
        </div>
    </div>
</template>
<style lang="less">
    @import '~vux/src/styles/1px.less';
    .feed-list__item { text-align: left; cursor: pointer; }
    .feed { padding: 0; }
    .feed-hd { position: relative; }
    .feed-bd { padding: 0; display: block; text-decoration: none; color: #222; }
    .feed-bd__txt {
        color: #444; display: block; padding-top: 10px; overflow: hidden;
        word-wrap: break-word; white-space: normal; margin-bottom: 0; text-align: justify;
    }
    /*上传视频盒子*/
    .feed-bd__video {
        margin-top: 10px;
        position: relative;
        font-size: 0;
        video {
            position: relative;
            z-index: 0;
            background: #222;
        }
    }
    .feed-action {
        margin-top: 10px;
    }
    .feed-hd {
        .time-ago {
            color: #a4a4a4;
            font-size: 12px;
            margin-top: -3px;
        }
        .feed-avatar {
            display: block;
            min-width: 38px;
            min-height: 38px;
            width: 35px;
            height: 35px;
            margin-right: 10px;
            border-radius: 50%;
            background-color: #ddd;
            overflow: hidden;
            position: absolute;
            left: 0;
            img {
                max-width: 100%;
                border-radius: 50%;
            }
        }
    }

    /*魔方图片布局*/
    @color-feed-media-bg: #edeeee;
    @color-feed-media-line: #FBF9FE;
    .feed-bd__photo { margin-top: 10px; }
    .feed-media-mn { font-size:0 }
    .feed-media-mn li {
        position: relative;
        float: left;
        overflow: hidden;
        cursor: pointer;
        background-color: @color-feed-media-bg;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;
        img {
            display: inline-block;
            vertical-align: top;
            position: absolute;
            width: 100%;
        }
    }
    li.feed-media-m1 {
        width: 100%;
        padding-bottom: 70%;
        overflow: hidden;
        display: block;
        img {
            width: 100%;
        }
    }
    li.feed-media-m2 {
        width: 50%;
        padding-bottom: 50%;
        margin-left: 2px;
        &:first-child {
             margin-left: -2px;
         }
    }
    li.feed-media-m3 {
        position: relative;
        width: 33.33%;
        padding-bottom: 33.33%;
        &:before {
             content: '';
             display: block;
             width: 2px;
             height: 100%;
             background-color: @color-feed-media-line;
             position: absolute;
             left: 0;
             z-index: 1;
         }
    }
    li.feed-media-m4 {
        position: relative;
        width: 25%;
        padding-bottom: 25%;
        margin: 0;
        &:first-child {
             width: 75%;
             padding-bottom: 75%;
            &:after {
                 content: '';
                 display: block;
                 width: 2px;
                 height: 100%;
                 background-color: @color-feed-media-line;
                 position: absolute;
                 top: 0;
                 right: 0;
                 z-index: 1;
            }
        }
        &:before {
             content: '';
             display: block;
             height: 2px;
             width: 100%;
             background-color: @color-feed-media-line;
             position: absolute;
             top: 0;
             z-index: 1;
         }
    }
    li.feed-media-m5:first-child {
        width: 50%;
        padding-bottom: 50%;
        margin-left: -2px;
        margin-bottom: 2px;
    }
    li.feed-media-m5:nth-child(2) {
        width: 50%;
        padding-bottom: 50%;
        margin-left: 2px;
        margin-bottom: 2px;
    }
    li.feed-media-m5:nth-child(3) {
        margin-left: -2px;
        &:before {
             width: 0;
         }
    }
    li.feed-media-m5:last-child {
        margin-left: 2px;
        &:before {
             width: 0;
         }
    }
    li.feed-media-m6 {
        position: relative;
        &:first-child {
             width: 66.66%;
             padding-bottom: 66.66%;
            &:before {
                 content: '';
                 display: block;
                 height: 1px;
                 width: 100%;
                 background-color: @color-feed-media-line;
                 position: absolute;
                 bottom: 0;
                 right: 0;
                 z-index: 1;
             }
            &:after {
                 content: '';
                 display: block;
                 width: 2px;
                 height: 100%;
                 background-color: @color-feed-media-line;
                 position: absolute;
                 top: 0;
                 right: 0;
                 z-index: 1;
             }
        }
        &:nth-child(2),
        &:nth-child(3) {
             position: relative;
             width: 33.33%;
             padding-bottom: 33.33%;
             margin: 0;
         }
        &:nth-child(3) {
            margin-top: 2px;
            &:before {
                 content: '';
                 display: block;
                 height: 1px;
                 width: 100%;
                 background-color: @color-feed-media-line;
                 position: absolute;
                 top: 0;
                 right: 0;
                 z-index: 1;
             }
            &:after {
                 content: '';
                 display: block;
                 height: 2px;
                 width: 100%;
                 background-color: @color-feed-media-line;
                 position: absolute;
                 bottom: 0;
                 right: 0;
                 z-index: 1;
             }
        }
        &:nth-child(4):before {
             left: auto;
             right: 0;
         }
        &:nth-child(4):after {
             bottom: top;
         }
        &:nth-child(4):after,
        &:nth-child(5):before {
            content: '';
            display: block;
            height: 1px;
            width: 100%;
            background-color: @color-feed-media-line;
            position: absolute;
            right: 0;
            z-index: 1;
        }
        &:nth-child(5):before {
             top: 0;
         }
        &:nth-child(5):after {
             content: '';
             display: block;
             width: 2px;
             height: 100%;
             background-color: @color-feed-media-line;
             position: absolute;
             bottom: 0;
             right: 0;
             z-index: 1;
         }
        &:last-child:before {
             width: 0;
         }
    }
    li.feed-media-m7 {
        position: relative;
        width: 25%;
        padding-bottom: 25%;
        &:before {
             content: '';
             display: block;
             width: 2px;
             height: 100%;
             background-color: @color-feed-media-line;
             position: absolute;
             bottom: 0;
             right: 0;
             z-index: 1;
         }
        &:first-child:before {
             content: '';
             display: block;
             height: 1px;
             width: 100%;
             background-color: @color-feed-media-line;
             position: absolute;
             bottom: 0;
             right: 0;
             z-index: 1;
         }
        &:nth-child(4):after,
        &:nth-child(5):after,
        &:nth-child(6):after {
             content: '';
             display: block;
             height: 1px;
             width: 100%;
             background-color: @color-feed-media-line;
             position: absolute;
             top: 0;
             right: 0;
             z-index: 1;
         }
    }
    li.feed-media-m8 {
        position: relative;
        width: 25%;
        padding-bottom: 25%;
        &:before {
             content: '';
             display: block;
             width: 2px;
             height: 100%;
             background-color: @color-feed-media-line;
             position: absolute;
             bottom: 0;
             right: 0;
             z-index: 1;
         }
        &:first-child {
             width: 75%;
             padding-bottom: 75%;
            &:after {
                 content: '';
                 display: block;
                 height: 2px;
                 width: 100%;
                 background-color: @color-feed-media-line;
                 position: absolute;
                 bottom: 0;
                 right: 0;
                 z-index: 1;
             }
        }
        &:nth-child(2), &:nth-child(3) {
             margin-bottom: 1.2px;
         }
        &:nth-child(2):after,
        &:nth-child(3):after,
        &:nth-child(4):after {
             content: '';
             display: block;
             height: 2px;
             width: 100%;
             background-color: @color-feed-media-line;
             position: absolute;
             bottom: 0;
             left: 0;
             z-index: 1;
         }
    }
    li.feed-media-m9 {
        position: relative;
        width: 33.33%;
        padding-bottom: 33.33%;
        &:before {
             height: 2px;
             width: 100%;
             bottom: 0;
         }
        &:after,
        &:before {
              content: '';
              display: block;
              background-color: @color-feed-media-line;
              position: absolute;
              right: 0;
              z-index: 1;
          }
        &:after {
             width: 2px;
             height: 100%;
             top: 0;
         }
    }
</style>
<script>
    export default{
        props: {
            item: {
                type: Object
            }
        },
        computed: {
            photosLength () {
                return this.item.content_pic.length
            },
            videoLength () {
                return this.item.content_video.length
            },
            feedMedia () {
                return "feed-media-m" + this.photosLength
            },
            photoSize () {
                switch (this.photosLength) {
                    case 1:
                        // return "?imageView2/1/w/600/h/450";
                        return "?imageView2/2/w/600";
                    default:
                        return "?imageView2/1/w/500/h/500"
                }
            }
        },
        methods: {
            previewPhoto (photo, photos, event) {
                event.preventDefault();
                var imgs = photos.map(function(photo) {
                    return photo;
                })
                console.log(imgs, photo);
                wx.ready(function () {
                    wx.previewImage({ current: photo, urls: imgs })
                })
            }
        }
    }
</script>

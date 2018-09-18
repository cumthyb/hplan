<template>
    <div class="my-course-panel">
        <div class="split-container">
            <Split v-model="split1">
                <div slot="left"
                    class="split-pane">
                    <div>
                        <div v-for='(item,index) in courses'
                            :key='index'
                            class="course"
                            :class="{ active: index==currentCourseIndex }"
                            @click="onSelectCourse(index)">{{'课程'+(index+1)+':'+item.name}}</div>
                    </div>
                </div>
                <div slot="right"
                    class="split-pane course-detail">
                    <div class="name">
                        <h1> {{currentCourse.name}}</h1>

                    </div>
                    <div class="desc">{{currentCourse.desc}}</div>
                    <div class="video">
                        <VedioPlayer :src='currentCourse.url' />
                    </div>
                </div>
            </Split>
        </div>
    </div>
</template>

<script>
import Mock from 'mockjs'
import VedioPlayer from '@components/VideoPlayer.vue'
export default {
    components: {
        VedioPlayer
    },
    data() {
        return {
            split1: 0.3,
            courses: [],
            currentCourse: {},
            currentCourseIndex: -1,
        }
    },
    mounted() {
        let arr = Mock.mock({
            "courses|5-15": [
                {
                    'name': () => Mock.Random.csentence(10, 20),
                    'desc': () => Mock.Random.cparagraph(10, 20),
                    'url': 'http://pe3q7604z.bkt.clouddn.com/Vue.js.mp4'
                }
            ]
        })
        this.courses = arr.courses
        this.currentCourse = this.courses[0]
    },
    methods: {
        onSelectCourse(index) {
            this.currentCourseIndex = index;
            this.currentCourse = this.courses[index]
        }
    },
}
</script>

<style lang="less">
.my-course-panel {
    height: 100%;
    .split-container {
        height: 100%;
        border: 1px solid #dcdee2;
        .split-pane {
            padding: 10px;
            .course {
                padding: 0 4px;
                height: 40px;
                line-height: 40px;
                &:hover {
                    background-color: lightgrey;
                    cursor: pointer;
                }
            }
            .active {
                background-color: lightgrey;
            }
        }
        .course-detail {
            height: 100%;
            display: flex;
            flex-direction: column;
            .name {
                height: 30px;
                text-align: center;
                margin: 20px;
            }
            .desc {
                height: 60px;
                margin: 20px;
                text-indent: 2em;
                font-size: 14px;
            }
            .video {
                flex: 1;
            }
        }
    }
}
</style>

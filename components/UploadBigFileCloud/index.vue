<template>
    <div class='finish_room'>
        <div class='finish_room2'>
            <Button type="primary"
                :id='"load_"+_uid'>加载</Button>
            <Progress :stroke-width="30"
                :percent="percent"
                status="active" />
            <Button type="primary"
                :id='"upload_"+_uid'
                @click="onUpload">上传</button>
            <Button :id='"upload_cancle"+_uid'
                @click="onCancelUpload">取消上传</Button>

        </div>
    </div>
</template>

<script >

import qiniuconfig from '@config/index.js'
// import qiniu from 'qiniu-js/dist/qiniu.min.js'

export default {
    props: {
        multiple: {
            type: Boolean,
            default: false
        },
        value: {
            type: Array,
            default: () => []
        }
    },
    data: function () {
        return {
            token: '',
            uploader: null,
            percent: 0,
            chunk_size: 4 * 1024 * 1024,
            blockSize: 0,
            key: '',
            spinShow: false,
            file: null,
            uptoken: '',
            fileType: {
                image: ['png', 'jpeg', 'jpg', 'bmp', 'gif', 'ico'],
                video: ['mp4', 'webm', 'ogg', 'mpeg4'],
            },
            currentFileClassification: '',
            uploadFiles: [],
            columns: [
                {
                    name: '文件名',
                    key: 'fileName',
                },
                {
                    name: '大小',
                    key: 'fileSize',
                },
                {
                    name: '进度',
                    key: 'percent',
                },
                {
                    name: '操作',
                    key: 'operate',
                },

            ]
        }
    },
    watch: {
        value(val) {
            this.uploadFiles = [].concat(val)
        }
    },
    mounted() {
        console.log(qiniu)
        this.getUptoken().then(({ token, putExtra, config, domain }) => {
            this.initQiniu(token, putExtra, config, domain, qiniuconfig.qiniuZone)
        })
    },
    methods: {
        getUptoken() {
            return new Promise((reslove, reject) => {
                this.$http.get('upload-token', '').then(r => {
                    var token = r.uptoken;
                    var domain = r.domain;
                    var config = {
                        useCdnDomain: true,
                        disableStatisticsReport: false,
                        retryCount: 6,
                        region: qiniuconfig.region.z1
                    };
                    var putExtra = {
                        fname: "",
                        params: {},
                        mimeType: null
                    };
                    reslove({ token, putExtra, config, domain })
                }).catch(error => {
                    reject(error)
                })
            })
        },

        initQiniu(token, putExtra, config, domain, uploadUrl) {
            let _this = this;
            this.putExtra = putExtra
            this.token = token
            var uploadUrl = uploadUrl
            var board = {};
            var indexCount = 0;
            var resume = false;
            var chunk_size;
            var uploader = new plupload.Uploader({
                runtimes: "html5,flash,silverlight,html4",
                url: uploadUrl,
                browse_button: "load_" + this._uid, // 触发文件选择对话框的按钮，为那个元素id
                flash_swf_url: "../../static/Moxie.swf", // swf文件，当需要使用swf方式进行上传时需要配置该参数
                silverlight_xap_url: "../../static/Moxie.xap",
                chunk_size: 4 * 1024 * 1024,
                max_retries: 3,
                multipart_params: {
                    // token从服务端获取，没有token无法上传
                    token: token
                },
                init: {
                    PostInit: function () {
                        console.log("upload init");
                    },
                    FilesAdded: function (up, files) {
                        resume = false;
                        console.log('FilesAdded', up, files)
                    },
                    FileUploaded: function (up, file, info) {
                        console.log('FileUploaded', up, file, info);
                    },
                    UploadComplete: function (up, files) {
                        // Called when all files are either uploaded or failed
                        console.log("UploadComplete", up, files);
                    },
                    Error: function (up, err) {
                        console.log('Error', up, err);
                    }
                }
            });
            uploader.init();
            uploader.bind('Error', function () {
                console.log(1234)
            })
            uploader.bind("BeforeUpload", function (uploader, file) {
                _this.key = file.name;
                putExtra.params["x:name"] = _this.key.split(".")[0];
                var id = file.id;
                chunk_size = uploader.getOption("chunk_size");
                _this.chunk_size = uploader.getOption("chunk_size");
                var directUpload = function () {
                    var multipart_params_obj = {};
                    multipart_params_obj.token = token;
                    // filterParams 返回符合自定义变量格式的数组，每个值为也为一个数组，包含变量名及变量值
                    var customVarList = qiniu.filterParams(putExtra.params);
                    for (var i = 0; i < customVarList.length; i++) {
                        var k = customVarList[i];
                        multipart_params_obj[k[0]] = k[1];
                    }
                    multipart_params_obj.key = _this.key;
                    uploader.setOption({
                        url: uploadUrl,
                        multipart: true,
                        multipart_params: multipart_params_obj
                    });
                };

                var resumeUpload = function () {
                    _this.blockSize = chunk_size
                    _this.initFileInfo(file);
                    if (_this.blockSize === 0) {
                        _this.mkFileRequest(file)
                        uploader.stop()
                        return
                    }
                    resume = true;
                    var multipart_params_obj = {};
                    // 计算已上传的chunk数量
                    var index = Math.floor(file.loaded / chunk_size);

                    var headers = qiniu.getHeadersForChunkUpload(token)
                    uploader.setOption({
                        url: uploadUrl + "/mkblk/" + _this.blockSize,
                        multipart: false,
                        required_features: "chunks",
                        headers: {
                            Authorization: "UpToken " + token
                        },
                        multipart_params: multipart_params_obj
                    });
                };
                // 判断是否采取分片上传
                if (
                    (uploader.runtime === "html5" || uploader.runtime === "flash") &&
                    chunk_size
                ) {
                    if (file.size < chunk_size) {
                        directUpload();
                    } else {
                        resumeUpload();
                    }
                } else {
                    console.log(
                        "directUpload because file.size < chunk_size || is_android_weixin_or_qq()"
                    );
                    directUpload();
                }
            });

            uploader.bind("ChunkUploaded", function (up, file, info) {
                var res = JSON.parse(info.response);
                var leftSize = info.total - info.offset;
                var chunk_size = uploader.getOption && uploader.getOption("chunk_size");
                if (leftSize < chunk_size) {
                    up.setOption({
                        url: uploadUrl + "/mkblk/" + leftSize
                    });
                }
                up.setOption({
                    headers: {
                        Authorization: "UpToken " + token
                    }
                });
                // 更新本地存储状态
                var localFileInfo = JSON.parse(localStorage.getItem(file.name)) || [];
                localFileInfo[indexCount] = {
                    ctx: res.ctx,
                    time: new Date().getTime(),
                    offset: info.offset,
                    percent: file.percent
                };
                indexCount++;
                localStorage.setItem(file.name, JSON.stringify(localFileInfo));
            });

            // 每个事件监听函数都会传入一些很有用的参数，
            // 我们可以利用这些参数提供的信息来做比如更新UI，提示上传进度等操作
            uploader.bind("UploadProgress", function (uploader, file) {
                console.log('UploadProgress', uploader, file)
                var id = file.id;
                // 更新进度条进度信息;
                this.percent = file.percent
                var fileUploaded = file.loaded || 0;
                var count = Math.ceil(file.size / uploader.getOption("chunk_size"));
                if (file.size > chunk_size) {
                    _this.updateChunkProgress(file, board[id], chunk_size, count);
                }
            });

            uploader.bind("FileUploaded", function (uploader, file, info) {
                var id = file.id;
                if (resume) {
                    _this.mkFileRequest(file)
                } else {
                    _this.uploadFinish(JSON.parse(info.response), file.name, board[id]);
                }
            });
            this.uploader = uploader;
        },
        updateChunkProgress(file, board, chunk_size, count) {

            var index = Math.ceil(file.loaded / chunk_size);
            var leftSize = file.loaded - chunk_size * (index - 1);
            if (index == count) {
                chunk_size = file.size - chunk_size * (index - 1);
            }
        },
        uploadFinish(res, name, board) {
            console.log('uploadFinish', res, name, board)
            localStorage.removeItem(name)
        },
        initFileInfo(file) {
            var localFileInfo = JSON.parse(localStorage.getItem(file.name)) || [];
            let indexCount = 0;
            var length = localFileInfo.length
            if (length) {
                var clearStatus = false
                for (var i = 0; i < localFileInfo.length; i++) {
                    indexCount++
                    if (this.isExpired(localFileInfo[i].time)) {
                        clearStatus = true
                        localStorage.removeItem(file.name);
                        break;
                    }
                }
                if (clearStatus) {
                    indexCount = 0;
                    return
                }
                file.loaded = localFileInfo[length - 1].offset;
                var leftSize = file.size - file.loaded;
                if (leftSize < this.chunk_size) {
                    this.blockSize = leftSize
                }
                file.percent = localFileInfo[length - 1].percent;
                return
            } else {
                indexCount = 0
            }
        },
        mkFileRequest(file) {
            // 调用sdk的url构建函数
            var requestUrl = qiniu.createMkFileUrl(
                qiniuconfig.qiniuZone,
                file.size,
                this.key,
                this.putExtra
            );
            let _this=this
            var ctx = []
            var id = file.id
            var local = JSON.parse(localStorage.getItem(file.name))
            for (var i = 0; i < local.length; i++) {
                ctx.push(local[i].ctx)
            }
            // 设置上传的header信息
            var headers = qiniu.getHeadersForMkFile(this.token)
            var xhr = new XMLHttpRequest();
            xhr.timeout = 600000;

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    var res = xhr.response;
                    if (xhr.status === 200) {

                        // let fileUrl = `http://${config.qiniuDomain}/${fileResponse.key}`
                        // let file = {
                        //     fname: fileResponse.fname,
                        //     mimeType: fileResponse.mimeType,
                        //     url: fileUrl
                        // }
                        // that.uploadFiles.push(file);
                        // that.$emit('input', that.uploadFiles)
                        // that.$emit('upload-success', that.currentFileClassification, fileUrl)
                        _this.uploadFinish(res, file.name);
                    } else {
                        _this.$Notice.error({
                            title: '上传失败请稍后重试'
                        });
                    }
                    _this.spinShow = false
                }
            };
            xhr.open('POST', requestUrl, true);
            xhr.setRequestHeader("Content-Type", headers['content-type'])
            xhr.setRequestHeader("Authorization", headers['Authorization']);
            xhr.responseType = 'json';
            xhr.send(ctx.join(","));
        },

        isExpired(time) {
            let expireAt = time + 3600 * 24 * 1000;
            return new Date().getTime() > expireAt;
        },

        onUpload() {
            this.uploader.start();
        },
        onCancelUpload() {
            this.uploader.stop();
        },

        delete_img(item) {
            this.uploadFiles.splice(item, 1);
        },
    },
}

</script>
<style  lang="less">
.finish_room {
    width: 430px;
    height: auto;
    .finish_room2 {
        width: 100%;
        height: auto;
        padding-top: 15px;
        padding-bottom: 15px;
        display: flex;
        align-items: center;
        // border-bottom: 2px solid #e1e1e1;
        .room_img {
            width: 150px;
            height: 100px;
            margin-right: 10px;
            border: 1px solid #e1e1e1;
            position: relative;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
            .file-name {
                position: absolute;
                display: inline-block;
                max-width: 110px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
            .delete-btn {
                position: absolute;
                width: auto;
                height: auto;
                right: 5px;
                bottom: 3px;
            }
        }
    }
    .room_add_img {
        width: 148px;
        height: 98px;
        border: 1px solid #e1e1e1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        position: relative;
        span:nth-child(1) {
            margin-top: 20px;
            width: 40px;
            height: 40px;
            overflow: hidden;
        }
        span:nth-child(2) {
            margin-bottom: 10px;
        }
        input {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            z-index: 99999;
            opacity: 0;
        }
    }
}
</style>
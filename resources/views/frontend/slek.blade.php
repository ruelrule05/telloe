<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>BoxBi</title>

    <!-- App styles -->
    <link rel="stylesheet" href="{{ mix('/css/bootstrap.css') }}">
    <link rel="stylesheet" href="{{ mix('/css/slek.css') }}">
    <meta name="google-site-verification" content="C30F1LP5GPgQEH098m_k0kJ6jxpOlIKov4XUpqmGkf8" />
</head>
<body>
    <div id="app">
        <div class="modal fade" id="videoPlayerModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-zoom" role="document">
                <div class="modal-content">
                    <div>
                        <video ref="videoOutput" class="w-100" playsinline controls :src="videoOutput"></video>
                    </div>

                    <div class="modal-footer justify-content-between p-3">
                        <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="recordVideoModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-zoom" role="document">
                <div class="modal-content">
                    <div class="position-relative">
                        <div class="position-absolute-center w-100 h-100 bg-white" style="z-index: 10" v-if="!cameraReady">
                            <div class="position-absolute-center">
                                <div class="spinner-border text-primary" role="status"></div>
                            </div>
                        </div>
                        <div class="position-relative" :hidden="videoOutput">
                            <div class="d-flex align-items-middle" id="toRecord">
                                <div class="w-50 position-relative h-100 overflow-hidden" :hidden="!hasImages" @mousemove="imagesHover">

                                    <div v-if="isRecording" class="position-absolute d-flex" style="top: 10px; left: 10px; z-index: 2">
                                        <button @click="drawTool = 'brush'" class="btn p-1 badge-pill shadow-sm" :class="[drawTool == 'brush' ? 'btn-red text-white' : 'btn-white']"><pen-tool-icon size="5x"></pen-tool-icon></button>
                                        <button @click="drawTool = 'circle'" class="ml-1 btn p-1 badge-pill shadow-sm" :class="[drawTool == 'circle' ? 'btn-red text-white' : 'btn-white']"><circle-icon size="1x"></circle-icon></button>
                                    </div>
                                    <div v-if="selectedImage.type == 'video'" class="position-absolute" style="top: 10px; right: 10px; z-index: 2">
                                        <button v-if="!selectedVideoFrame" @click.stop="snapVideo" class="btn btn-white d-flex align-items-center shadow-sm"><aperture-icon size="1x" class="mr-2"></aperture-icon>Snap this frame</button>
                                        <button v-else @click.stop="selectedVideoFrame = null; continueVideo(); pulses = []; clearSvg()" class="btn btn-white d-flex align-items-center shadow-sm"><x-icon size="1x" class="mr-2"></x-icon>Unsnap frame</button>
                                    </div>

                                    <div id="images" class="w-100 h-100" @click="sharedFilesOpen = false" style="padding-bottom: 25px;">
                                        <div class="pulsating-circle" v-for="pulse, index in pulses" @click="removePulse(index)" :style="{top: pulse.top, left: pulse.left}"></div>
                                        <div class="h-100 position-relative"    
                                                @mousedown="mouseEvent"
                                                @mousemove="mouseEvent"
                                                @mouseup="mouseEvent"
                                                @mouseleave="mousemove = false">
                                            <!-- <button style="top: 10px; left: 10px; z-index: 2" class="position-absolute btn btn-circle bg-white shadow-sm" @click="selectedImage = null; pulses = []; selectedVideo.currentTime = '0:00'; clearSvg()"><arrow-left-icon></arrow-left-icon></button> -->

                                            <div v-if="selectedImage.type == 'image'" class="position-relative h-100">
                                                <image-to-canvas class="image-selected position-absolute-center w-100" :src="selectedImage.src"></image-to-canvas>
                                            </div>

                                            <div v-else-if="selectedImage.type == 'video'" class="h-100 bg-black">
                                                <div :hidden="selectedVideoFrame" class="h-100">
                                                    <video ref="selectedVideo" playsinline controls controlsList="nofullscreen nodownload noremoteplayback" class="w-100 h-100 outline-0" :src="selectedImage.src" @loadedmetadata="loadedmetadata"></video>
                                                </div>
                                                <div :hidden="!selectedVideoFrame" class="h-100">
                                                    <div class="h-100 position-relative">
                                                        <canvas ref="selectedVideoFrame" class="w-100 position-absolute-center" style="z-index: 0"></canvas>
                                                    </div>
                                                </div>
                                            </div>
                                            <svg :hidden="selectedImage.type == 'video' && !selectedVideoFrame" xmlns="http://www.w3.org/2000/svg" ref="drawSvg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="svgElement" x="0px" y="0px" class="w-100 h-100 position-absolute" style="z-index: 1; top: 0; left: 0" enable-background="new 0 0 600 400" xml:space="preserve" />
                                        </div>
                                    </div>


                                    <div class="p-1 bg-light shared-files" :class="{'shared-files-open': sharedFilesOpen}">
                                        <div class="pl-1 cursor-pointer d-flex align-items-center"  @click="sharedFilesOpen = sharedFilesOpen ? false : true">Shared Files <i data-feather="chevron-up" class="chevron-arrow" style="height: 20px"></i></div>
                                        <div class="overflow-auto text-nowrap w-100" style="font-size: 0">
                                            <div v-for="file in files" class="p-1 d-inline-block" style="width: 90px">
                                                <div class="position-relative bg-black rounded cursor-pointer" style="padding-top: 100%" @click="selectedImage = file; pulses = []; clearSvg(); sharedFilesOpen = false;">
                                                    <image-to-canvas class="image-preview position-absolute-center w-100" :src="file.preview" @click="selectedImage = file"></image-to-canvas>
                                                    <play-icon class="position-absolute-center text-white" v-if="file.type == 'video'"></play-icon>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="bg-black text-center h-100" :class="[hasImages ? 'w-50' : 'w-100']">
                                    <button v-if="!hasImages" style="top: 10px; left: 10px; z-index: 10" class="position-absolute btn bg-white" @click="hasImages = true">Browse Shared Files</button>
                                    <video id="videoFile" class="h-100" :class="[hasImages ? 'w-100' : 'w-50']"></video>
                                </div>
                            </div>

                            <canvas id="canvas-placeholder" hidden></canvas> 
                            <canvas id="canvas-output" hidden></canvas> 

                            <div class="position-absolute text-center w-auto" id="recorder-controls">
                                <button class="btn btn-success btn-lg" @click="startRecord" :hidden="isRecording" data-toggle="tooltip" data-title="Start Record">
                                    <video-icon></video-icon>
                                </button>
                                <button class="btn btn-red btn-danger btn-lg" @click="pauseRecord" :hidden="!isRecording" data-toggle="tooltip" data-title="Pause Recording">
                                    <pause-icon></pause-icon>
                                </button>
                                <button class="btn btn-success btn-lg" @click="finishRecord" :hidden="!hasRecorded || isRecording" data-toggle="tooltip" data-title="Finish Recording">
                                    <check-icon></check-icon>
                                </button>
                            </div>
                        </div>

                        <div :hidden="!videoOutput">
                            <video ref="videoOutput" class="w-100" style="outline: 0" playsinline controls></video>
                        </div>
                    </div>


                    <div class="modal-footer justify-content-between px-2 pt-0 pb-1">
                        <button type="button" class="btn" data-dismiss="modal" aria-label="Close">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" :disabled="!videoOutput" @click="newMessage.type = 'video'; send();">Send</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="layout">
            <nav class="navigation">
                <div class="nav-group">
                    <ul>
                        <li class="logo">
                            <a href="#">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                     xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     width="612px" height="612px" viewBox="0 0 612 612"
                                     style="enable-background:new 0 0 612 612;" xml:space="preserve">
                                    <g>
                                        <g id="_x32__26_">
                                            <g>
                                            <path d="M401.625,325.125h-191.25c-10.557,0-19.125,8.568-19.125,19.125s8.568,19.125,19.125,19.125h191.25
                                            c10.557,0,19.125-8.568,19.125-19.125S412.182,325.125,401.625,325.125z M439.875,210.375h-267.75
                                            c-10.557,0-19.125,8.568-19.125,19.125s8.568,19.125,19.125,19.125h267.75c10.557,0,19.125-8.568,19.125-19.125
                                            S450.432,210.375,439.875,210.375z M306,0C137.012,0,0,119.875,0,267.75c0,84.514,44.848,159.751,114.75,208.826V612
                                            l134.047-81.339c18.552,3.061,37.638,4.839,57.203,4.839c169.008,0,306-119.875,306-267.75C612,119.875,475.008,0,306,0z
                                            M306,497.25c-22.338,0-43.911-2.601-64.643-7.019l-90.041,54.123l1.205-88.701C83.5,414.133,38.25,345.513,38.25,267.75
                                            c0-126.741,119.875-229.5,267.75-229.5c147.875,0,267.75,102.759,267.75,229.5S453.875,497.25,306,497.25z"/>
                                            </g>
                                        </g>
                                    </g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a class="active" data-navigation-target="chats" href="#" data-toggle="tooltip" title="Inquiries"
                               data-placement="right">
                                <i data-feather="message-circle"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <!-- ./ navigation -->


            <!-- content -->
            <div class="content">
                <!-- sidebar group -->
                <div class="sidebar-group">

                    <!-- Chats sidebar -->
                    <div id="chats" class="sidebar active">
                        <header><span>Inquiries</span></header>
                        <div class="px-4 mx-2">
                            <ul class="nav nav-pills nav-fill">
                          <li class="nav-item">
                            <a class="nav-link active" href="#">Active</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" href="#">Completed</a>
                          </li>
                        </ul>
                        </div>

                        <form>
                            <input type="text" class="form-control" placeholder="Search inquiries">
                        </form>


                        <div class="sidebar-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item open-chat">
                                    <div>
                                        <figure class="avatar avatar-state-success">
                                            <img src="https://via.placeholder.com/128X128" class="rounded-circle" alt="image">
                                        </figure>
                                    </div>
                                    <div class="users-list-body">
                                        <div>
                                            <h5>Margaretta Worvell</h5>
                                            <p class="font-weight-normal text-muted">You: No problems Margaretta I am here to help. Let me know if I can help more.</p>
                                            <p class="font-weight-normal text-muted">08:45AM on Sunday</p>
                                        </div>
                                        <div class="users-list-action">
                                            <div class="action-toggle">
                                                <div class="dropdown">
                                                    <a data-toggle="dropdown" href="#">
                                                        <i data-feather="more-vertical"></i>
                                                    </a>
                                                    <div class="dropdown-menu dropdown-menu-right">
                                                        <a href="#" class="dropdown-item"><i data-feather="check-circle" style="height: 16px" class="align-middle"></i>&nbsp;&nbsp;<span class="align-middle">Mark as completed</span></a>
                                                        <a href="#" class="dropdown-item"><i data-feather="phone" style="height: 16px" class="align-middle"></i>&nbsp;&nbsp;<span class="align-middle">Contact details</span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- ./ Chats sidebar -->

                </div>
                <!-- ./ sidebar group -->



                <!-- chat -->
                <div class="chat">
                    <div class="chat-header">
                        <div class="chat-header-user">
                            <form>
                                <input type="text" class="form-control" placeholder="Search" style="width: 300px">
                            </form>
                        </div>
                        <div class="chat-header-action">
                            <div class="dropdown">
                                <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i data-feather="user" style="height: 14px" class="align-middle"></i>&nbsp;<span class="align-middle">Anti Wrinkle Brisbane</span>
                                </button>
                                <form method="POST" action="/logout" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    @csrf
                                    <a class="dropdown-item" href="#">Account</a>
                                    <button class="dropdown-item outline-0" href="#" type="submit">Logout</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="chat-body" ref="message-group">
                        <div class="messages">
                            <div v-for="grouped_message in grouped_messages" class="w-100 message-group">
                                <div class="message-item" v-for="message in grouped_message.messages" v-cloak :class="{'outgoing-message': message.sender == 'You'}">
                                    <div class="message-avatar text-left">
                                        <figure class="avatar avatar-state-success">
                                            <img src="https://via.placeholder.com/128X128" class="rounded-circle" alt="image">
                                        </figure>
                                        <div>
                                            <h5>@{{ message.sender }}</h5>
                                            <div class="time">@{{ message.created_at }}</div>
                                        </div>
                                    </div>
                                    <div class="message-content">
                                        <div class="mt-2 position-relative cursor-pointer" @click="playVideo(message.message)" v-if="message.type == 'video'">
                                            <div class="position-absolute-center text-center">
                                                <play-icon></play-icon>
                                            </div>
                                            <img :src="message.preview" class="w-100 rounded" alt="">
                                        </div>
                                        <span v-else>@{{ message.message }}</span>
                                    </div>
                                </div>
                            </div>


                            <!-- <div class="message-item outgoing-message" >
                                <div class="message-avatar">
                                    <figure class="avatar avatar-state-success">
                                        <img src="https://via.placeholder.com/128X128" class="rounded-circle" alt="image">
                                    </figure>
                                    <div>
                                        <h5>You</h5>
                                        <div class="time">08:15AM on Sunday</div>
                                    </div>
                                </div>
                                <div class="message-content">
                                    Hi Margaretta, please view my feedback video
                                    <div class="mt-2 position-relative cursor-pointer" @click="playVideo">
                                        <div class="position-absolute-center text-center">
                                            <play-icon></play-icon>
                                        </div>
                                        <img :src="videoPreview" class="w-100 rounded" alt="">
                                    </div>
                                </div>
                            </div> -->

                        </div>
                    </div>

                    <div class="chat-footer p-3">
                        <form @submit.prevent="send">
                            <input type="text" class="form-control" placeholder="Write a message.." v-model="newMessage.message" required>
                            <div class="form-buttons ml-1">
                                <button class="btn btn-light m-0" data-toggle="tooltip" title="Emoji" type="button">
                                    <i data-feather="smile"></i>
                                </button>
                                <button class="btn btn-primary ml-1" type="submit" data-toggle="tooltip" title="Send">
                                    <i data-feather="send"></i>
                                </button>
                            </div>
                        </form>
                        <div class="mt-2">
                            <button class="btn btn-light" id="btn-recorxd-webm" data-target="#recordVideoModal" data-toggle="modal" title="Record video" type="button">
                                <i data-feather="video" data-toggle="tooltip" data-title="Record Video"></i>
                            </button>
                            <button class="btn btn-light" data-toggle="tooltip" title="Record audio" type="button">
                                <i data-feather="mic"></i>
                            </button>
                            <button class="btn btn-light" data-toggle="tooltip" title="Take photo" type="button">
                                <i data-feather="camera"></i>
                            </button>
                            <button class="btn btn-light" data-toggle="tooltip" title="Add file" type="button">
                                <i data-feather="file-text"></i>
                            </button>
                            <button class="btn btn-light" data-toggle="tooltip" title="Add offers" type="button">
                                <i data-feather="tag"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- ./ chat -->
            </div>
            <!-- ./ content -->
        </div>
        
    </div>

    <script>
        window.mixins = [];
        window.routes = [];
    </script>
    <script src="{{ mix('/js/slek.js') }}"></script>
</body>
</html>
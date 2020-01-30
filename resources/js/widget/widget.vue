<template>
    <div v-if="$root.widget && !$root.hidden" :class="{'snapturebox-fullpage': $root.fullPage}">
        <div v-if="!$root.fullPage" id="snapturebox-button" class="snapturebox-bg-primary snapturebox-shadow" @click="toggleWidget">
            <message-circle-icon></message-circle-icon>
        </div>

        <div id="snapturebox-window" class="snapturebox-rounded-lg snapturebox-shadow" :class="{'snapturebox-open': $root.open}">
            <div class="snapturebox-d-flex snapturebox-overflow-hidden snapturebox-mh-100 justify-content-center">
                <!-- Left -->
                <div class="snapturebox-overflow-auto snapturebox-bg-white" :class="{'snapturebox-section-left-open': $root.leftOpen}" id="snapturebox-section-left">
                    <div class="snapturebox-px-1 snapturebox-py-3 snapturebox-section-left-open-toggle">
                        <button class="snapturebox-btn snapturebox-px-2 snapturebox-py-0" @click="$root.leftOpen = $root.leftOpen ? false : true">
                            <x-icon v-if="$root.fullPage"></x-icon>
                            <menu-icon v-else></menu-icon>
                        </button>
                    </div>
                    <transition name="snapturebox-fade">
                        <div v-if="$root.leftOpen || $root.fullPage" class="snapturebox-d-flex snapturebox-flex-column snapturebox-mh-100">
                            <div class="snapturebox-p-4">
                                <div v-if="$root.auth" class="snapturebox-d-flex snapturebox-align-items-center">
                                    <div class="dropdown">
                                        <img src="https://via.placeholder.com/40" class="snapturebox-rounded-circle snapturebox-cursor-pointer snapturebox-dropdown-toggle" />
                                        <div class="snapturebox-dropdown-menu">
                                            <a class="snapturebox-dropdown-item" href="#" @click.prevent="$root.logout">Logout</a>
                                        </div>
                                    </div>

                                    <ul class="snapturebox-nav snapturebox-nav-pills">
                                        <li class="snapturebox-nav-item snapturebox-mx-4">
                                            <a class="snapturebox-nav-link snapturebox-p-2 snapturebox-border-primary snapturebox-rounded-0 snapturebox-text-dark snapturebox-font-weight-bold" href="#" @click.prevent="activeTab = 'inquiries'" :class="{'snapturebox-border-bottom': activeTab == 'inquiries'}">My Inquiries</a>
                                        </li>
                                        <li class="snapturebox-nav-item">
                                            <a class="snapturebox-nav-link snapturebox-p-2 snapturebox-border-primary  snapturebox-rounded-0 snapturebox-text-dark snapturebox-font-weight-bold" href="#" @click.prevent="activeTab = 'offers'" :class="{'snapturebox-border-bottom': activeTab == 'offers'}">My Offers</a>
                                        </li>
                                    </ul>
                                </div>
                                <div v-else>
                                    <button class="snapturebox-btn snapturebox-btn-primary snapturebox-badge-pill snapturebox-px-3" @click="$root.toggleModal('#loginModal', 'show')">Log In</button>
                                    <button class="snapturebox-btn snapturebox-btn-light snapturebox-badge-pill snapturebox-px-3" @click="$root.toggleModal('#signupModal', 'show')">Sign Up</button>
                                </div>
                            </div>

                            <!-- Inquiries -->
                            <div class="snapturebox-overflow-auto" v-if="activeTab == 'inquiries'">
                                <div class="snapturebox-px-4 snapturebox-py-3">
                                    <h5>Take Photos</h5>
                                    <span class="snapturebox-text-secondary">Here are examples of position to take.</span>
                                    <div class="snapturebox-mt-3">
                                        <img src="https://via.placeholder.com/180X80" alt="" class="" />
                                        <img src="https://via.placeholder.com/180X80" alt="" class="" />
                                        <img src="https://via.placeholder.com/180X80" alt="" class="" />
                                    </div>
                                </div>
                                <div class="snapturebox-d-flex snapturebox-flex-grow-1 snapturebox-flex-column snapturebox-position-relative">
                                    <div v-tooltip.top="{content: 'Please add at least 1 photo or video', trigger: 'manual', show: enquiryMediaTooltip}"></div>
                                    <masonry :cols="2" :gutter="20" id="snapturebox-media-items" class="snapturebox-px-4">
                                        <div class="snapturebox-media-item snapturebox-mb-3" v-if="enquiry.items.length > 0" v-for="(item, index) in enquiry.items">
                                            <div class="snapturebox-media-item-content snapturebox-overflow-hidden snapturebox-shadow-sm snapturebox-position-relative">
                                                <div class="snapturebox-p-2 snapturebox-position-absolute" v-if="!sent" style="z-index: 1; right: 0">
                                                    <button type="button" class="snapturebox-btn snapturebox-text-white snapturebox-p-0 snapturebox-shadow-none snapturebox-line-height-0" @click="removeItem(index)">
                                                        <x-icon size="1.2x"></x-icon>
                                                    </button>
                                                </div>
                                                <img :src="item.item.preview" alt="" class="w-100 position-relative" />

                                                <div class="snapturebox-p-2">
                                                    <div v-if="!sent">
                                                        <div class="position-relative" v-if="item.comment">
                                                            <textarea-autosize :disabled="!item.edit || sent" :class="{'border-0': !item.edit || sent}" :value="item.comment" class="form-control bg-white font-weight-normal form-control-sm shadow-none" placeholder="Add comment.." rows="1" style="padding-right: 46px" />
                                                            <div class="position-absolute" style="top: 0; right: 0; padding: 2px; height: 30px" v-if="!sent">
                                                                <button class="btn btn-primary btn-sm shadow-none h-100 py-0 line-height-0" :class="{'bg-white border-0 text-dark': !item.edit || sent}" @click="saveComment(index, $event)">
                                                                    <span v-if="item.edit">Save</span>
                                                                    <edit-icon size="1x" v-else></edit-icon>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div class="position-relative" v-else>
                                                            <textarea-autosize :disabled="sent" :value="item.comment" class="form-control font-weight-normal form-control-sm shadow-none" placeholder="Add comment.." rows="1" style="padding-right: 46px" />

                                                            <div class="position-absolute" style="top: 0; right: 0; padding: 2px; height: 30px">
                                                                <button class="btn btn-primary btn-sm shadow-none h-100 py-0 line-height-0" @click="addComment(index, $event)">Add</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <p style="line-height: 1.5; margin-bottom: 0" v-else-if="item.comment">{{ item.comment }}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- New items -->
                                        <div class="snapturebox-media-item snapturebox-mb-3" v-for="new_item in new_items" v-if="!sent">
                                            <div class="snapturebox-media-item-content snapturebox-overflow-hidden snapturebox-shadow-sm">
                                                <div class="snapturebox-border snapturebox-rounded snapturebox-position-relative" style="height: 220px">
                                                    <div class="snapturebox-position-absolute-center snapturebox-text-center">
                                                        <button
                                                            class="snapturebox-btn snapturebox-border snapturebox-btn-light snapturebox-btn-circle snapturebox-shadow-none snapturebox-line-height-0"
                                                            @click="
                                                                preview = '';
                                                                $root.toggleModal('#addMediaModal', 'show');
                                                            "
                                                        >
                                                            <plus-icon size="1.2x"></plus-icon>
                                                        </button>
                                                        <div class="snapturebox-text-secondary snapturebox-mt-3">
                                                            Add New Photos
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </masonry>
                                </div>
                            </div>

                            <!-- Offers -->
                            <div class="snapturebox-overflow-auto" v-if="activeTab == 'offers' && $root.auth">
                                <div class="snapturebox-row snapturebox-mx-0">
                                    <div v-for="offer in $root.auth.offers" class="snapturebox-col-md-6">
                                        <div class="snapturebox-px-3 snapturebox-py-2 snapturebox-border snapturebox-rounded snapturebox-shadow-sm">
                                            <div class="snapturebox-media snapturebox-mb-3">
                                                <div class="snapturebox-profile-image" :style="{backgroundImage: 'url(' + offer.member.user.profile_image + ')'}"></div>
                                                <div class="snapturebox-media-body snapturebox-ml-2">
                                                    <div class="snapturebox-font-weight-bold snapturebox-mb-n1">{{ offer.member.user.first_name }} {{ offer.member.user.last_name }}</div>
                                                    <small>{{ offer.created_at }}</small>
                                                </div>
                                            </div>
                                            <div v-for="service in offer.services" class="snapturebox-mb-1">
                                                <div class="snapturebox-d-flex">
                                                    <div>{{ service.service }}</div>
                                                    <div class="snapturebox-ml-auto">{{ format(service.price) }}</div>
                                                </div>
                                            </div>
                                            <div class="snapturebox-border-top snapturebox-border-bottom snapturebox-py-1 snapturebox-my-1" v-if="offer.discount">
                                                <small class="snapturebox-text-muted">DISCOUNT</small>
                                                <div class="snapturebox-d-flex">
                                                    <div>{{ offer.discount_text }}</div>
                                                    <div class="snapturebox-ml-auto">-{{ format(offer.discount) }}</div>
                                                </div>
                                            </div>
                                            <div class="snapturebox-d-flex snapturebox-justify-content-end">
                                                <span>Subtotal:</span><span class="snapturebox-w-25 snapturebox-text-right">{{ format(subTotal) }}</span>
                                            </div>
                                            <div class="snapturebox-d-flex snapturebox-justify-content-end">
                                                <span>Discount:</span><span class="snapturebox-w-25 snapturebox-text-right">{{ format(offer.discount) }}</span>
                                            </div>
                                            <div class="snapturebox-mt-2 snapturebox-d-flex snapturebox-font-weight-bold snapturebox-justify-content-end">
                                                <span>Total:</span><span class="snapturebox-w-25 snapturebox-text-right">{{ format(subTotal - offer.discount) }}</span>
                                            </div>
                                            <button
                                                :disabled="offer.booked"
                                                class="snapturebox-btn snapturebox-btn-primary snapturebox-btn-block snapturebox-mt-3"
                                                @click="
                                                    $root.customerForm.offer_id = offer.id;
                                                    $root.toggleModal('#customerInfoModal', 'show');
                                                "
                                            >
                                                {{ offer.booked ? 'Booked' : 'Book this offer' }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>

                <!-- Right -->
                <div class="snapturebox-d-flex snapturebox-overflow-auto snapturebox-bg-primary" id="snapturebox-section-right">
                    <div class="snapturebox-px-1 snapturebox-py-3 snapturebox-section-left-open-toggle snapturebox-d-flex snapturebox-align-items-center">
                        <div class="snapturebox-btn snapturebox-px-2 snapturebox-py-0 snapturebox-text-white snapturebox-text-white">
                            <info-icon size="1.2x"></info-icon>
                        </div>
                        <button v-if="$root.fullPage" class="snapturebox-btn snapturebox-px-2 snapturebox-py-0 snapturebox-text-white" @click="$root.leftOpen = $root.leftOpen ? false : true"><menu-icon></menu-icon></button>
                    </div>
                    <div class="snapturebox-text-white snapturebox-h-100 snapturebox-w-100">
                        <div class="snapturebox-p-4">
                            <div v-if="!$root.fullPage" class="snapturebox-position-absolute" style="top: 8px; right: 15px">
                                <info-icon size="1.2x" class="snapturebox-cursor-pointer"></info-icon>
                                <x-icon size="1.4x" class="snapturebox-cursor-pointer" @click="toggleWidget"></x-icon>
                            </div>
                            <p class="snapturebox-h4 snapturebox-font-weight-normal snapturebox-mb-4">
                                Good morning! <br />
                                <strong>How can we help you today?</strong>
                            </p>

                            <div class="snapturebox-my-4">
                                <strong>Clinic Location: <span class="snapturebox-text-info">(change location)</span></strong>
                                <h5 class="snapturebox-mt-1 snapturebox-font-weight-bold">Anti Wrinkle & Skin Gold Coast</h5>
                            </div>

                            <strong v-tooltip.right="{content: 'Please choose an enquiry type', trigger: 'manual', show: enquiryTypeTooltip}">Your enquiry type:</strong>
                            <div class="snapturebox-mt-2 snapturebox-mb-3">
                                <div class="snapturebox-d-flex">
                                    <div class="snapturebox-flex-grow-1" v-for="inquiry_type in $root.inquiry_types">
                                        <button
                                            class="snapturebox-btn snapturebox-btn-outline-info snapturebox-badge-pill snapturebox-shadow-none snapturebox-border-white snapturebox-text-white snapturebox-btn-block"
                                            :class="{'snapturebox-active': enquiry.inquiry_type_id == inquiry_type.id}"
                                            @click="
                                                enquiry.inquiry_type_id = inquiry_type.id;
                                                enquiryTypeTooltip = false;
                                            "
                                        >
                                            {{ inquiry_type.type }}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <strong v-tooltip.right="{content: 'Please choose an area interest', trigger: 'manual', show: enquiryInterestTooltip}">Areas of Interests:</strong>
                            <div class="snapturebox-mt-2 snapturebox-mb-3">
                                <vue-select v-model="enquiry.interest" :options="[{text: 'test', value: 'test'}]" :value="{}" button_class="snapturebox-badge-pill" placeholder="Choose areas of interests"></vue-select>
                            </div>

                            <strong v-tooltip.right="{content: 'Please write your inquiry', trigger: 'manual', show: enquiryMessageTooltip}">Your Inquiry:</strong> <info-icon size="1x" class="snapturebox-cursor-pointer"></info-icon>
                            <div class="snapturebox-mt-2 snapturebox-mb-3">
                                <textarea v-model="enquiry.message" rows="8" class="snapturebox-form-control snapturebox-rounded-lg" placeholder="Please type your inquiry here" style="resize: none"></textarea>
                            </div>

                            <div class="snapturebox-text-right">
                                <button class="snapturebox-btn snapturebox-px-5 snapturebox-btn-dark snapturebox-shadow-none snapturebox-rounded-lg snapturebox-d-inline-flex snapturebox-align-items-center" @click="send">Send <arrow-right-icon size="1x" class="snapturebox-ml-2"></arrow-right-icon></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Customer Info Modal -->
        <div class="snapturebox-modal" tabindex="-1" id="customerInfoModal">
            <div class="snapturebox-modal-dialog snapturebox-modal-dialog-centered">
                <div class="snapturebox-modal-content">
                    <div class="snapturebox-modal-body">
                        <button
                            :disabled="$root.customerForm.loading"
                            type="button"
                            class="snapturebox-btn snapturebox-position-absolute snapturebox-btn-close"
                            @click="
                                $root.toggleModal('#customerInfoModal', 'hide');
                                $root.loginForm.loading = false;
                            "
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <vue-form-validate @submit="$root.book">
                            <h4 class="snapturebox-mb-4">Customer Information Form</h4>
                            <div class="snapturebox-form-group">
                                <input type="text" v-model="$root.customerForm.first_name" class="snapturebox-form-control" data-required placeholder="First Name" />
                            </div>
                            <div class="snapturebox-form-group">
                                <input type="text" v-model="$root.customerForm.last_name" class="snapturebox-form-control" data-required placeholder="Last Name" />
                            </div>
                            <div class="snapturebox-form-group">
                                <input type="email" v-model="$root.customerForm.email" class="snapturebox-form-control" data-required placeholder="Email" />
                            </div>
                            <div class="snapturebox-form-group">
                                <input type="text" v-model="$root.customerForm.phone" class="snapturebox-form-control" data-required placeholder="Phone" />
                            </div>

                            <div class="snapturebox-text-right">
                                <button v-if="$root.customerForm.skipButton" type="button" class="snapturebox-btn snapturebox-btn-light" @click="$root.book">Skip this step</button>
                                <vue-button type="submit" :loading="$root.customerForm.loading" button_class="snapturebox-btn snapturebox-btn-primary">Submit and Book</vue-button>
                            </div>
                        </vue-form-validate>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!$root.auth">
            <!-- Signup Modal -->
            <div class="snapturebox-modal" tabindex="-1" id="signupModal">
                <div class="snapturebox-modal-dialog snapturebox-modal-dialog-centered">
                    <div class="snapturebox-modal-content">
                        <div class="snapturebox-modal-body">
                            <button
                                type="button"
                                class="snapturebox-btn snapturebox-position-absolute snapturebox-btn-close"
                                @click="
                                    $root.toggleModal('#signupModal', 'hide');
                                    $root.signupForm.loading = false;
                                "
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <vue-form-validate @submit="$root.signup">
                                <h4 class="snapturebox-mb-4">Create your account</h4>
                                <div class="snapturebox-form-group">
                                    <input type="text" v-model="$root.signupForm.first_name" class="snapturebox-form-control" data-required placeholder="First Name" />
                                </div>
                                <div class="snapturebox-form-group">
                                    <input type="text" v-model="$root.signupForm.last_name" class="snapturebox-form-control" data-required placeholder="Last Name" />
                                </div>
                                <div class="snapturebox-form-group">
                                    <input type="email" v-model="$root.signupForm.email" class="snapturebox-form-control" data-required placeholder="Email" />
                                </div>
                                <div class="snapturebox-form-group">
                                    <input type="tel" v-model="$root.signupForm.phone" class="snapturebox-form-control" data-required placeholder="Phone" />
                                </div>
                                <div class="snapturebox-form-group">
                                    <input type="password" v-model="$root.signupForm.password" class="snapturebox-form-control" data-required placeholder="Password" />
                                </div>

                                <button
                                    type="button"
                                    class="snapturebox-btn snapturebox-btn-light"
                                    @click="
                                        $root.toggleModal('#signupModal', 'hide');
                                        $root.toggleModal('#loginModal', 'show');
                                    "
                                >
                                    Log In
                                </button>
                                <vue-button type="submit" :loading="$root.signupForm.loading" button_class="snapturebox-btn snapturebox-float-right snapturebox-btn-primary">Sign Up</vue-button>
                            </vue-form-validate>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Login Modal -->
            <div class="snapturebox-modal" tabindex="-1" id="loginModal">
                <div class="snapturebox-modal-dialog snapturebox-modal-dialog-centered">
                    <div class="snapturebox-modal-content">
                        <div class="snapturebox-modal-body">
                            <button
                                type="button"
                                class="snapturebox-btn snapturebox-position-absolute snapturebox-btn-close"
                                @click="
                                    $root.toggleModal('#loginModal', 'hide');
                                    $root.loginForm.loading = false;
                                "
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <vue-form-validate @submit="$root.login">
                                <h4 class="snapturebox-mb-4">Login to your account</h4>
                                <div class="snapturebox-form-group">
                                    <input type="email" v-model="$root.loginForm.email" class="snapturebox-form-control" data-required placeholder="Email" />
                                </div>
                                <div class="snapturebox-form-group">
                                    <input type="password" v-model="$root.loginForm.password" class="snapturebox-form-control" data-required placeholder="Password" />
                                </div>
                                <button
                                    type="button"
                                    class="snapturebox-btn snapturebox-btn-light"
                                    @click="
                                        $root.toggleModal('#loginModal', 'hide');
                                        $root.toggleModal('#signupModal', 'show');
                                    "
                                >
                                    Sign Up
                                </button>
                                <vue-button type="submit" :loading="$root.loginForm.loading" button_class="snapturebox-btn snapturebox-float-right snapturebox-btn-primary">Login</vue-button>
                            </vue-form-validate>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="snapturebox-modal" tabindex="-1" id="addMediaModal">
            <div class="snapturebox-modal-dialog snapturebox-modal-lg snapturebox-modal-dialog-centered" role="document">
                <div class="snapturebox-modal-content snapturebox-overflow-hidden">
                    <div class="snapturebox-modal-body snapturebox-bg-dark snapturebox-p-0" style="height: 400px">
                        <!-- Top buttons -->
                        <div class="snapturebox-d-flex snapturebox-position-absolute snapturebox-w-100 snapturebox-pt-1" style="z-index: 10">
                            <button v-if="mediaSource" type="button" class="snapturebox-btn snapturebox-text-white snapturebox-shadow-none" @click="closeCamera(); mediaSource = fileOutput = null">
                                <arrow-left-icon></arrow-left-icon>
                            </button>
                            <button type="button" class="snapturebox-btn snapturebox-text-white snapturebox-ml-auto snapturebox-shadow-none" @click="$root.toggleModal('#addMediaModal', 'hide'); closeCamera(); mediaSource = fileOutput = null;">
                                <x-icon></x-icon>
                            </button>
                        </div>


                        <!-- Clear fileOutput -->
                        <div class="snapturebox-position-absolute-center snapturebox-py-5 snapturebox-hover-opacity-1 snapturebox-w-100 snapturebox-text-center" v-if="fileOutput">
                            <button class="snapturebox-btn snapturebox-btn-light snapturebox-shadow-none snapturebox-btn-circle snapturebox-line-height-0 snapturebox-opacity-0" v-tooltip.top="'Cancel'" @click="fileOutput = null">
                                <x-icon size="1.2x" class="line-height-0"></x-icon>
                            </button>
                        </div>

                        
                        <!-- Select source -->
                        <div class="snapturebox-position-absolute-center snapturebox-text-white" style="z-index: 10" v-if="!mediaSource && !fileOutput">
                            <camera-icon size="1.8x" class="snapturebox-cursor-pointer snapturebox-outline-0" v-tooltip.top="'From camera'" @click="initCamera(); mediaSource = 'camera'"></camera-icon>
                            <plus-circle-icon size="1.8x" class="snapturebox-cursor-pointer snapturebox-outline-0 snapturebox-mx-3" v-tooltip.top="'Browse media'" @click="browseMedia"></plus-circle-icon>
                            <instagram-icon size="1.8x" class="snapturebox-cursor-pointer snapturebox-outline-0" v-tooltip.top="'Search in Instagram'" @click="mediaSource = 'instagram'"></instagram-icon>
                        </div>

                        <div v-if="mediaSource == 'instagram'" class="snapturebox-px-3 snapturebox-pt-5 snapturebox-d-flex snapturebox-flex-column snapturebox-h-100">
                            <div class="snapturebox-d-flex">
                                <input type="text" v-model="igTag" class="snapturebox-form-control" placeholder="Search by tag.." @keydown="disableSpace" @change="removeSpaces">
                                <button :disabled="igSearchLoading" class="snapturebox-btn snapturebox-btn-primary snapturebox-ml-1" @click="getIGImages"><search-icon></search-icon></button>
                            </div>
                            <div class="snapturebox-position-relative h-100 snapturebox-overflow-y-only snapturebox-flex-grow-1 snapturebox-pt-3">
                                <div v-if="igSearchLoading" class="snapturebox-position-absolute-center">
                                    <div class="snapturebox-spinner-border snapturebox-spinner-border-sm snapturebox-text-light"></div>
                                </div>
                                <div v-lazy-container="{ selector: 'img' }" class="snapturebox-row snapturebox-px-2">
                                    <div v-for="igImage in igImages" class="snapturebox-col-4 snapturebox-px-2 snapturebox-mb-3">
                                        <div class="snapturebox-ig-image">
                                            <button class="snapturebox-btn snapturebox-btn-sm snapturebox-btn-light snapturebox-shadow-none snapturebox-position-absolute-center" @click="selectIGImage(igImage); mediaSource = null;">Choose</button>
                                            <img :data-src="igImage" class="snapturebox-rounded snapturebox-w-100" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="snapturebox-position-absolute-center snapturebox-text-center" v-if="!cameraReady && mediaSource == 'camera'">
                            <div class="snapturebox-spinner-border snapturebox-text-primary" role="status"></div>
                            <div class="snapturebox-text-white">Loading camera..</div>
                        </div>
                        
                        <video :hidden="fileOutput" ref="videoFile" class="snapturebox-w-100 snapturebox-h-100"></video>
                        <div v-if="fileOutput" class="snapturebox-h-100">
                            <video v-if="fileOutput.type == 'video'" ref="fileOutput" class="snapturebox-w-100 snapturebox-h-100" :src="fileOutput.blob" style="outline: 0" playsinline controls @loadeddata="loadeddata"></video>
                            <div v-else-if="fileOutput.type == 'image'" class="snapturebox-w-100 snapturebox-h-100" :style="{backgroundImage: 'url(' + fileOutput.src + ')'}" style="background-size: contain; background-position: center; background-repeat: no-repeat;"></div>
                        </div>

                        <div class="snapturebox-position-absolute w-100 snapturebox-text-center" style="bottom: 15px" :hidden="fileOutput || !cameraReady">
                            <div v-if="!isRecording">
                                <button class="snapturebox-btn snapturebox-btn-light snapturebox-btn-circle snapturebox-shadow-none snapturebox-line-height-0" v-tooltip.top="'Record Video'" @click="startRecord">
                                    <video-icon size="1.2x"></video-icon>
                                </button>
                                <button class="snapturebox-btn snapturebox-btn-light snapturebox-btn-circle snapturebox-shadow-none snapturebox-line-height-0" v-tooltip.top="'Take Photo'" @click="takePhoto">
                                    <camera-icon size="1.2x"></camera-icon>
                                </button>
                            </div>
                            <div v-else>
                                <button class="snapturebox-btn snapturebox-btn-danger snapturebox-btn-circle snapturebox-shadow-none snapturebox-line-height-0" v-tooltip.top="'Stop Recording'" @click="stopRecord">
                                    <pause-icon size="1.2x"></pause-icon>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="snapturebox-position-absolute snapturebox-p-3" style="right: 0; bottom: 0">
                        <input type="file" hidden ref="addMedia" @change="setPreview" accept="image/x-png,image/gif,image/jpeg,video/mp4,video/x-m4v,video/*" />
                        <button
                            v-if="fileOutput"
                            type="button"
                            class="snapturebox-btn snapturebox-btn-sm snapturebox-btn-primary snapturebox-shadow-none snapturebox-float-right"
                            :disabled="!fileOutput"
                            @click="
                                addMedia();
                                $root.toggleModal('#addMediaModal', 'hide');
                                closeCamera();
                                fileOutput = null;
                            "
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <transition name="snapturebox-fade">
            <div v-if="$root.backdrop" class="snapturebox-modal-backdrop"></div>
        </transition>
    </div>
</template>

<script>
import io from 'socket.io-client';
let formatNumber = require('format-number');
let format = formatNumber({prefix: '$', padRight: 2});
import RecordRTC from 'recordrtc';
import {MessageCircleIcon, SendIcon, VideoIcon, MicIcon, CameraIcon, PlayIcon, PauseIcon, ChevronDownIcon, SmileIcon, XIcon, UserIcon, AtSignIcon, SmartphoneIcon, LockIcon, MoreVerticalIcon, InfoIcon, FileTextIcon, PhoneIcon, PlusIcon, EditIcon, CheckCircleIcon, ArrowRightIcon, MenuIcon, PlusCircleIcon, InstagramIcon, ArrowLeftIcon, SearchIcon} from 'vue-feather-icons';

import VueLazyload from 'vue-lazyload';
SBVue.use(VueLazyload);
export default {
    components: {MessageCircleIcon, SendIcon, VideoIcon, MicIcon, CameraIcon, PlayIcon, PauseIcon, ChevronDownIcon, SmileIcon, XIcon, UserIcon, AtSignIcon, SmartphoneIcon, LockIcon, MoreVerticalIcon, InfoIcon, FileTextIcon, PhoneIcon, PlusIcon, EditIcon, CheckCircleIcon, ArrowRightIcon, MenuIcon, PlusCircleIcon, InstagramIcon, ArrowLeftIcon, SearchIcon},

    data: () => ({
        format: format,
        enquiry: {
            message: 'tests',
            inquiry_type_id: 2,
            interest: {text: 'test', value: 'test'},
            items: [],
            widget_id: ''
        },
        enquiryTypeTooltip: false,
        enquiryInterestTooltip: false,
        enquiryMessageTooltip: false,
        enquiryMediaTooltip: false,

        message: '',
        playing: false,
        member: 'Clinic Team',
        messages: [],
        signupFormDisabled: false,
        messageInputDisabled: false,
        sent: false,

        preview: '',
        cameraReady: false,
        video: null,
        videoRecorder: null,
        streams: [],
        streams: null,
        isRecording: false,
        fileOutput: null,
        socket: null,
        notification_sound: null,
        videoOutput: null,
        activeTab: 'inquiries',
        mediaSource: '',
        igImages: [],
        igTag: 'dog',
        igSearchLoading: false,
        watermark: null,
    }),

    computed: {
        subTotal() {
            let subTotal = 0;
            this.$root.auth.offers.forEach((o) => {
                o.services.forEach((s) => {
                    subTotal += parseInt(s.price);
                });
            });

            return subTotal;
        },

        new_items() {
            let new_items = 4 - this.enquiry.items.length;
            if (new_items < 1) new_items = 1;
            return new_items;
        },
        repliesCount() {
            return this.messages.filter((m) => {
                return m.sender == 'You';
            }).length;
        },

        grouped_messages() {
            const grouped_messages = [];
            if (this.messages) {
                // sort messages by timestamp
                const messages = (this.messages || []).sort((a, b) => {
                    return parseInt(a.timestamp) > parseInt(b.timestamp) ? 1 : -1;
                });

                for (var i = 0; i <= messages.length - 1; i++) {
                    var message_group = {sender: messages[i].sender, messages: [messages[i]]};
                    groupMessage();

                    function groupMessage() {
                        const next_message = messages[i + 1];
                        if (next_message && next_message.sender == messages[i].sender) {
                            message_group.messages.push(messages[i + 1]);
                            i++;
                            groupMessage();
                        }
                    }
                    grouped_messages.push(message_group);
                }
            }

            return grouped_messages;
        },
    },

    created() {
        this.watermark = new Image();
        this.watermark.src = '/images/watermark.png';
        this.notification_sound = new Audio('/notifications/new_message.mp3');
        /*this.socket = io('https://snapturebox.app:8443');
        this.socket.on('new_message', (data) => {
            this.messages.push(data);
            this.notification_sound.play();
            this.scrollDown();
        });*/
    },

    mounted() {
        setTimeout(() => {
            this.video = this.$refs['videoFile'];
        });
    },

    methods: {
        disableSpace(e) {
            if (e.which === 32) {
                e.preventDefault();
                return false;
            }
        },

        removeSpaces(e) {
            this.igTag = this.igTag.replace(/\s/g, "");
        },

        selectIGImage(url) {
            let image = new Image();
            image.setAttribute('crossorigin', 'anonymous');
            image.src = url;
            image.onload = () => {
                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                context.drawImage(this.watermark, canvas.width - 50, 0, 50, 50);
                let srcUrl = canvas.toDataURL('image/jpeg');

                this.fileOutput = {
                    type: 'image',
                    src: srcUrl,
                    preview: srcUrl,
                };
            };

        },

        getIGImages() {
            let igTag = this.igTag.trim();
            if (igTag) {
                this.igImages = [];
                this.igSearchLoading = true;
                SBAxios.get(`/get_ig_images?tag=${igTag}`).then((response) => {
                    this.igImages = response.data;
                    this.igSearchLoading = false;
                }).catch(() => this.igSearchLoading = false);
            }
        },

        closeCamera() {
            if (this.streams) {
                this.streams.getTracks().forEach(function(track) {
                    track.stop();
                });
            }
            this.cameraReady = false;
            this.video.srcObject = null;
        },

        initCamera() {
            this.cameraReady = false;
            navigator.mediaDevices
                .getUserMedia({audio: true, video: true})
                .then((streams) => {
                    this.streams = streams;
                    this.videoRecorder = RecordRTC(streams, {
                        type: 'video',
                    });
                    this.video.muted = true;
                    this.video.volume = 0;
                    this.video.srcObject = new MediaStream(streams.getVideoTracks());
                    this.video.play();
                    this.video.onplaying = () => {
                        this.cameraReady = true;
                    };
                })
                .catch(function(error) {
                    alert('Unable to capture your camera.');
                    console.error(error);
                });
        },

        send() {
            if (!this.enquiry.inquiry_type_id) {
                this.enquiryTypeTooltip = true;
                return;
            } else this.enquiryTypeTooltip = false;

            if (!this.enquiry.interest) {
                this.enquiryInterestTooltip = true;
                return;
            } else this.enquiryInterestTooltip = false;

            if (!this.enquiry.message) {
                this.enquiryMessageTooltip = true;
                return;
            } else this.enquiryMessageTooltip = false;

            if (this.enquiry.items.length == 0) {
                this.enquiryMediaTooltip = true;
                return;
            } else this.enquiryMediaTooltip = false;

            if (this.$root.auth) {
                this.enquiry.widget_id = this.$root.widget.id;
                SBAxios.post('/inquiries', this.enquiry).then((response) => {
                    console.log(response.data);
                    //this.socket.emit('message_sent', response.data);
                });
            } else {
                this.$root.toggleModal('#loginModal', 'show');
            }
        },

        scrollDown() {
            setTimeout(() => {
                const message_group = this.$refs['message-group'];
                if (message_group) {
                    message_group.scrollTop = message_group.scrollHeight;
                }
            });
        },

        getMessages() {
            SBAxios.get(`${this.domain}/messages`).then((response) => {
                this.messages = response.data;
            });
        },

        takePhoto() {
            // Source
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            canvas.width = this.video.videoWidth;
            canvas.height = this.video.videoHeight;
            context.drawImage(this.video, 0, 0, canvas.width, canvas.height);
            let srcUrl = canvas.toDataURL('image/jpeg');
            // Preview
            let canvasPreview = document.createElement('canvas');
            let contextPreview = canvasPreview.getContext('2d');
            canvasPreview.width = this.video.videoWidth / 2;
            canvasPreview.height = this.video.videoHeight / 2;
            contextPreview.drawImage(this.video, 0, 0, canvasPreview.width, canvasPreview.height);
            let previewUrl = canvasPreview.toDataURL('image/jpeg');

            this.fileOutput = {
                type: 'image',
                src: srcUrl,
                preview: previewUrl,
            };
        },

        loadeddata(e) {
            setTimeout(() => {
                let canvas = document.createElement('canvas');
                canvas.width = this.video.videoWidth / 2;
                canvas.height = this.video.videoHeight / 2;
                canvas.getContext('2d').drawImage(this.video, 0, 0, canvas.width, canvas.height);
                this.fileOutput.preview = canvas.toDataURL('image/jpeg', 0.8);
            }, 200);
        },

        stopRecord() {
            this.videoRecorder.stopRecording(() => {
                let videoBlob = this.videoRecorder.getBlob();
                let reader = new window.FileReader();
                reader.readAsDataURL(videoBlob);
                reader.onloadend = () => {
                    this.fileOutput = {
                        type: 'video',
                        src: reader.result,
                        blob: URL.createObjectURL(videoBlob),
                    };
                };
            });
            this.isRecording = false;
        },

        startRecord() {
            this.videoRecorder.startRecording();
            this.isRecording = true;
        },

        addComment(index, e) {
            this.enquiry.items[index].edit = false;
            this.items[index].comment = $(e.currentTarget)
                .parent()
                .siblings('textarea')
                .val();
        },

        saveComment(index, e) {
            this.$set(this.enquiry.items[index], 'edit', this.enquiry.items[index].edit ? false : true);
            if (!this.enquiry.items[index].edit) {
                this.enquiry.items[index].comment = $(e.currentTarget)
                    .parent()
                    .siblings('textarea')
                    .val();
            }
        },

        authSubmit() {
            this.sent = true;
            $('#authModal').modal('hide');
            $('.modal-backdrop').remove();
        },

        removeItem(index) {
            this.enquiry.items.splice(index, 1);
        },

        setPreview(e) {
            var input = $(e.currentTarget);
            var file = input[0].files[0];
            if (file) {
                if (file.type.match('image/jpeg') || file.type.match('image/png')) {
                    var photosize = file.size / 1000000;
                    if (photosize > 5) {
                        alert('Error: Image file too big. Please select image file less than 5MB.');
                    } else {
                        var img = document.createElement('img');
                        var reader = new FileReader();
                        reader.readAsDataURL(file);

                        reader.onload = (oFREvent) => {
                            var canvas = document.createElement('canvas');
                            img.src = oFREvent.target.result;
                            img.addEventListener('load', () => {
                                var ctx = canvas.getContext('2d');
                                ctx.drawImage(img, 0, 0);

                                var MAX_WIDTH = 600;
                                var MAX_HEIGHT = 600;
                                var width = img.width;
                                var height = img.height;

                                if (width > height) {
                                    if (width > MAX_WIDTH) {
                                        height *= MAX_WIDTH / width;
                                        width = MAX_WIDTH;
                                    }
                                } else {
                                    if (height > MAX_HEIGHT) {
                                        width *= MAX_HEIGHT / height;
                                        height = MAX_HEIGHT;
                                    }
                                }
                                canvas.width = width;
                                canvas.height = height;
                                var ctx = canvas.getContext('2d');
                                ctx.drawImage(img, 0, 0, width, height);

                                var dataurl = canvas.toDataURL('image/jpg');
                                this.fileOutput = {
                                    type: 'image',
                                    preview: dataurl,
                                    src: img.src,
                                };
                            });
                        };
                    }
                } else {
                    alert('Error: Invalid image file!');
                    input.val('');
                }
            } else {
            }
        },

        browseMedia() {
            this.$refs['addMedia'].click();
        },

        addMedia() {
            this.enquiry.items.push({
                item: this.fileOutput,
                comment: '',
            });
            this.mediaSource = this.fileOutput = null;
        },

        setMember(member) {
            this.member = member;
        },

        passwordFormat(password) {
            password = password[0] + password.substr(1, password.length - 2).replace(/./g, '*') + password[password.length - 1];
            return password;
        },

        /*   scrollDown() {
            setTimeout(() => {
                const message_group = this.$refs['snapturebox-scroll'];
                if (message_group) {
                    message_group.scrollTop = message_group.scrollHeight;
                }
            });
        },*/

        togglePlay() {
            this.playing = this.playing ? false : true;
            if (this.playing) {
                this.$refs['snapturebox-intro'].play();
            } else {
                this.$refs['snapturebox-intro'].pause();
            }
        },

        inputKeyup(e) {
            if (e.keyCode == 13) {
                this.send();
            }
        },

        signupContinue() {
            this.messages.push({
                sender: 'You',
                message: 'Your details: ',
                time: 'Just now',
                signupDetails: true,
            });
            this.signupFormDisabled = true;
            this.messageInputDisabled = false;
            this.scrollDown();
            var new_messages = [
                {
                    sender: 'You',
                    message: 'Hi there please look at my photos of my problem areas I would like to look better.',
                    hasPhotos: true,
                    time: 'Just now',
                },
                {
                    sender: this.member,
                    message: `Hi ${this.signupForm.name}, please view my feedback video`,
                    video: 'https://www.youtube.com/embed/oBDyhh5CEkI',
                    time: 'Just now',
                },
                {
                    sender: this.member,
                    time: 'Just now',
                    hasOffers: true,
                },
                {
                    sender: 'You',
                    message: 'Thank you for sending your suggestions. I will get back to you soon I just need to talk to my sister.',
                    time: 'Just now',
                },
                {
                    sender: this.member,
                    message: `No problems ${this.signupForm.name} I am here to help. Let me know if I can help more.`,
                    time: 'Just now',
                },
            ];
            var i = 0;
            var timeInterval = setInterval(() => {
                this.messages.push(new_messages[i]);
                this.scrollDown();
                if (i == new_messages.length - 1) clearInterval(timeInterval);
                i++;
            }, 1000);
        },

        /*send() {
            if (this.message.trim().length == 0) {
                this.message = '';
                this.$refs['message'].focus();
            } else {
                this.messages.push({
                    sender: 'You',
                    message: this.message.trim(),
                    time: 'Just now'
                });
                this.message = '';
                this.scrollDown();
                this.$refs['message'].focus();
                if (this.first_message) {
                    this.messageInputDisabled = true;
                    this.first_message = false;
                    setTimeout(() => {
                        this.messages.push({
                            sender: 'Stacey',
                            message: 'Before we continue we just need a few details:',
                            time: 'Just now',
                            auth: true,
                        });
                        this.scrollDown();
                    }, 500);
                }
            }
        },*/

        askNow() {
            this.$refs['snapturebox-intro'].pause();
            this.content = 'convo';
        },

        signup() {},

        toggleWidget() {
            this.$root.open = this.$root.open ? false : true;
            if (!this.$root.open && this.$refs['snapturebox-intro']) {
                this.playing = false;
                this.$refs['snapturebox-intro'].pause();
            }
        },
    },
};
</script>
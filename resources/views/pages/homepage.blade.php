@extends('layouts.page')

@section('title', ucwords("Schedule a meeting |  Create and share personalized videos  |  Keep connected | Meet Telloe"))

@section('content')

<div class="bg-secondary py-24">
	<div class="container">
		<div class="grid grid-cols-12 items-center">
			<div class="lg:col-span-8 col-span-12 lg:pr-24 order-2 lg:order-1">
				<h1 class="font-serif text-primary font-semibold sm:text-home-heading text-4xl">IT'S PERSONAL.</h1>
				<h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5">
                Create or upload a video, <br/> Send it by email or message.
                </h2>
              <br/><br/><br/>
              <b class="text-xl lg:my-16 mt-4 mb-8 text-gray-600 lg:pr-36">
                Sending videos has never been so easy! 
                <br/><br/><br/><br/>
              </b>
				<button v-if="!$root.authUser" type="button" class="w-full lg:w-auto px-9 lg:mb-0 mb-3 py-4 border-2 border-primary font-semibold rounded transition-all focus:outline-none font-serif bg-primary hover:bg-primary-dark text-white text-base" @click="auth = true; action = 'signup'" @mouseover="changeCursorStatus('onFreeTrial')" @mouseleave="changeCursorStatus('browsing')">
					<span class="relative -bottom-px">START FREE TRIAL</span>
				</button>
				<button type="button" class="w-full lg:w-auto px-9 py-4 rounded font-semibold focus:outline-none font-serif hover:bg-primary transition-all hover:text-white text-primary border-2 border-primary lg:ml-4 text-base" @click="openVideoDemo(); changeCursorStatus('onWatchVideo')" @mouseover="changeCursorStatus('onWatchVideo')" @mouseleave="changeCursorStatus('browsing')">
					<span class="relative -bottom-px">WATCH VIDEO</span>
				</button>
			</div>
			<div class="lg:col-span-4 col-span-12 order-1 lg:order-2 lg:px-0 px-8 lg:mb-0 mb-6" >
				<img class="w-full h-full object-cover cursor-pointer" src="images/gifs/header_placeholder.gif" @click="openVideoDemo(); changeCursorStatus('onWatchVideo')" @mouseover="changeCursorStatus('onWatchVideo')" @mouseleave="changeCursorStatus('browsing')">
			</div>
		</div>
	</div>
</div>

	<div id="features" class="container lg:py-24 py-8">
		<div class="grid lg:grid-cols-2">
			<div class="lg:pr-24">
			<span class="font-serif text-xs font-semibold">A VIDEO IS WORTH A MILLION WORDS</span>
			<h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5"> Emails that contain video get 4x the Click Through Rate of emails without. </h2>
			</div>
			<div class="lg:pl-10 lg:pr-10 lg:mt-0 mt-4">
			<span class="font-bold lg:text-xl">Communicate, Personalise, Win! </span>
				<p class="lg:text-xl text-muted lg:mt-5">
				Video has a powerful way of saying things words simply can't. From the way you connect with the camera to the tone in your voice to the smile on your face, video creates the more authentic and intimate brand experience that your customers crave.
				<br/><br/>
				Our platform gives you the tools to quickly and easily create customized video messages, even if you're not tech-savvy. With personalized videos in your marketing strategy, you'll get better results from your campaigns and watch your customer service ratings soar.
				<br/><br/>
				Send directly via popular messaging platforms or copy and paste a video into your email program and make brand magic happen.
				</p>
			</div>
		</div>
	</div>
	<div id="features" class="container lg:py-24 py-8">
		<div class="grid lg:grid-cols-2">
			<div class="lg:pr-24">
			<span class="font-serif text-xs font-semibold"
				>VIDEO PERSONALIZATION</span
			>
			<h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5">
				Create or upload a single hero video and seamlessly add a personal intro video for each recipient..
			</h2>
			<p class="lg:text-xl text-muted lg:mt-5">
				Delight your clients and prospects with personalized video messages sent with INTENT!
			</p>
			</div>
			<div class="lg:pl-10 order-1 lg:order-2 lg:mb-0 mb-4">
			<img src="images/gifs/hero_video.gif" alt="" />
			</div>
		</div>
	</div>
	<div class="container lg:py-24 py-8">
        <div class="grid lg:grid-cols-2 items-center">
          <div class="lg:pr-24 order-2 lg:order-1">
            <!--<span class="font-serif text-xs font-semibold">#1 BUILD TRUST</span>-->
            <h2
              class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-10 mb-5"
            >
              What can you do with Telloe?
            </h2>
            <span class="font-bold lg:text-xl"
              >Record Videos
            </span>
            <br/>
            <ul style="list-style-type: circle; margin-left: 15px">
              <li>Webcam</li>
              <li>Screen and Webcam</li>
              <li>Screen Only</li>
              <li>Or Upload Videos</li>
            </ul>
            <br/>
            <span class="font-bold lg:text-xl"
              >Send Videos
            </span>
            <br/>
            <ul style="list-style-type: circle; margin-left: 15px">
              <li>Via your E-Mail platform*</li>
              <li>LinkedIn Messenger</li>
              <li>Facebook Messenger</li>
              <li>iMessage</li>
            </ul>
            <br/>
            <p style="font-size: 15px;"><b>* Note:</b> Telloe does not facilitate sending video emails but enables you to do so using your own email software.</p>
            <br/>
            <span class="font-bold lg:text-xl"
              >One-Click Pre-Populated Emails
            </span>
            <br/>
            <p>Pre-populate email content into your mail program, saving you from writing the same content for each recipient.</p>
            <br/>
            <span class="font-bold lg:text-xl"
              >Stitch Videos
            </span>
            <br/>
            <p>Join multiple videos together to send as one long video.</p>
            <br/>
            <span class="font-bold lg:text-xl"
              >Create Campaigns
            </span>
            <br/>
            <p>Upload lists of contacts to send the same video.</p>
            <br/>
            <span class="font-bold lg:text-xl"
              >Receive Replies
            </span>
            <br/>
            <ul style="list-style-type: circle; margin-left: 15px">
              <li>Recipients can reply via video</li>
              <li>Message you and</li>
              <li>Make a booking with you via your online booking link or the inbuilt scheduling software.</li>
            </ul>
          </div>
          <div class="lg:pl-10 order-1 lg:order-2 lg:mb-0 mb-4">
            <img src="images/gifs/linkedin_message.gif" alt="" />
          </div>
        </div>
      </div>
	  <div id="pricing" class="container lg:py-24 py-8">
        <h2
          class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-14"
        >
          Simple plans, no surprises
        </h2>
        <h6 class="font-bold lg:text-2xl">Full Premium, 14 Day Free Trial</h6>
        <p class="text-muted lg:mt-4">
          We don't like long contracts full of surprises that lock you in for
          the long term. Our simplified subscriptions mean you always know what
          you're getting and how much you're paying so you can more easily plan
          ahead as you create a winning marketing strategy. <br />
          <br />
          No credit card is needed. Try for a full 14 days without obligation.
          After 14 days, continue using the free limited version of Telloe if
          you don't want to upgrade your account.
        </p>
        <div class="lg:flex mt-6 justify-between">
          <table class="lg:w-5/12 CUSTOM-table">
            <tbody>
              <tr class="mt-10">
                <th
                  class="text-muted font-serif text-xs font-semibold uppercase mb-2"
                  style="float: left; margin: 0px"
                >
                  VIDEO CREATION
                </th>
                <th
                  class="text-muted font-serif text-xs font-semibold uppercase mb-2"
                >
                  Free
                </th>
                <th
                  class="text-muted font-serif text-xs font-semibold uppercase mb-2"
                  style="float: right; margin: 0px"
                >
                  Premium
                </th>
              </tr>
              <tr class="border-bottom">
                <td>Video stitching</td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="display: block; margin: auto"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="float: right; margin-right: 27px"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
              </tr>
              <tr class="border-bottom">
                <td>Send video via email</td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="display: block; margin: auto"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="float: right; margin-right: 27px"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
              </tr>
              <tr class="border-bottom">
                <td>Send video via link</td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="display: block; margin: auto"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="float: right; margin-right: 27px"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
              </tr>
              <tr class="border-bottom">
                <td>Video limit</td>
                <td
                  style="
                    padding-top: 15px;
                    padding-bottom: 15px;
                    text-align: center;
                  "
                >
                  10 Per Month
                </td>
                <td
                  style="
                    padding-top: 15px;
                    padding-bottom: 15px;
                    text-align: center;
                    float: right;
                    margin-right: 13px;
                  "
                >
                  No limit
                </td>
              </tr>
              <tr class="border-bottom">
                <td>Intent messaging</td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="display: block; margin: auto"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="float: right; margin-right: 27px"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
              </tr>
              <tr class="mt-10">
                <th
                  class="text-muted font-serif text-xs font-semibold uppercase mb-2"
                  style="float: left; margin: 0px; padding-top: 40px"
                >
                  Touch Point
                </th>
                <th
                  class="text-muted font-serif text-xs font-semibold uppercase mb-2"
                  style="padding-top: 40px"
                >
                  Free
                </th>
                <th
                  class="text-muted font-serif text-xs font-semibold uppercase mb-2"
                  style="float: right; margin: 0px; padding-top: 40px"
                >
                  Premium
                </th>
              </tr>
              <tr class="border-bottom">
                <td>People tracked</td>
                <td
                  style="
                    padding-top: 15px;
                    padding-bottom: 15px;
                    text-align: center;
                  "
                >
                  10 at a Time
                </td>
                <td
                  style="
                    padding-top: 15px;
                    padding-bottom: 15px;
                    text-align: center;
                    float: right;
                    margin-right: 13px;
                  "
                >
                  No limit
                </td>
              </tr>
              <tr class="border-bottom">
                <td>Results console</td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="display: block; margin: auto"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="float: right; margin-right: 27px"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
              </tr>
              <tr class="border-bottom">
                <td>Tracking filter</td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="display: block; margin: auto"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="float: right; margin-right: 27px"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
              </tr>
              <tr class="border-bottom">
                <td>Quick add and remove</td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="display: block; margin: auto"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="float: right; margin-right: 27px"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
              </tr>
              <tr class="border-bottom">
                <td>Labels</td>
                <td
                  style="
                    padding-top: 15px;
                    padding-bottom: 15px;
                    text-align: center;
                  "
                >
                  3
                </td>
                <td
                  style="
                    padding-top: 15px;
                    padding-bottom: 15px;
                    text-align: center;
                    float: right;
                    margin-right: 13px;
                  "
                >
                  No limit
                </td>
              </tr>
              <tr class="mt-10">
                <th
                  class="text-muted font-serif text-xs font-semibold uppercase mb-2"
                  style="float: left; margin: 0px; padding-top: 40px"
                >
                  BOOKINGS - Intent
                </th>
                <th
                  class="text-muted font-serif text-xs font-semibold uppercase mb-2"
                  style="padding-top: 40px"
                >
                  Free
                </th>
                <th
                  class="text-muted font-serif text-xs font-semibold uppercase mb-2"
                  style="float: right; margin: 0px; padding-top: 40px"
                >
                  Premium
                </th>
              </tr>
              <tr class="border-bottom">
                <td>Booking Notes</td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="display: block; margin: auto"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="float: right; margin-right: 27px"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
              </tr>
              <tr class="border-bottom">
                <td>Recurring Bookings</td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="display: block; margin: auto"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="float: right; margin-right: 27px"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
              </tr>
              <tr class="border-bottom">
                <td>Client self-booking</td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="display: block; margin: auto"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="float: right; margin-right: 27px"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
              </tr>
              <tr class="border-bottom">
                <td>Event Types</td>
                <td
                  style="
                    padding-top: 15px;
                    padding-bottom: 15px;
                    text-align: center;
                  "
                >
                  1
                </td>
                <td
                  style="
                    padding-top: 15px;
                    padding-bottom: 15px;
                    text-align: center;
                    float: right;
                    margin-right: 13px;
                  "
                >
                  No limit
                </td>
              </tr>
              <tr class="border-bottom">
                <td>Booking URL</td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="display: block; margin: auto"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="float: right; margin-right: 27px"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
              </tr>
              <tr class="mt-10">
                <th
                  class="text-muted font-serif text-xs font-semibold uppercase mb-2"
                  style="float: left; margin: 0px; padding-top: 40px"
                >
                  Integrations
                </th>
                <th
                  class="text-muted font-serif text-xs font-semibold uppercase mb-2"
                  style="padding-top: 40px"
                >
                  Free
                </th>
                <th
                  class="text-muted font-serif text-xs font-semibold uppercase mb-2"
                  style="float: right; margin: 0px; padding-top: 40px"
                >
                  Premium
                </th>
              </tr>
              <tr class="border-bottom">
                <td>Zoom</td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="display: block; margin: auto"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="float: right; margin-right: 27px"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
              </tr>
              <tr class="border-bottom">
                <td>Google Meets</td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="display: block; margin: auto"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="float: right; margin-right: 27px"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
              </tr>
              <tr class="border-bottom">
                <td>Outlook Calendar</td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="display: block; margin: auto"
                  >
                    <circle cx="14" cy="14" r="14" fill="#E33171"></circle>
                    <line
                      x1="8"
                      y1="8"
                      x2="20"
                      y2="20"
                      stroke="white"
                      stroke-width="2"
                    ></line>
                    <line
                      x1="20"
                      y1="8"
                      x2="8"
                      y2="20"
                      stroke="white"
                      stroke-width="2"
                    ></line>
                  </svg>
                </td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="float: right; margin-right: 27px"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
              </tr>
              <tr class="border-bottom">
                <td>Google Calendar</td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="display: block; margin: auto"
                  >
                    <circle cx="14" cy="14" r="14" fill="#E33171"></circle>
                    <line
                      x1="8"
                      y1="8"
                      x2="20"
                      y2="20"
                      stroke="white"
                      stroke-width="2"
                    ></line>
                    <line
                      x1="20"
                      y1="8"
                      x2="8"
                      y2="20"
                      stroke="white"
                      stroke-width="2"
                    ></line>
                  </svg>
                </td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="float: right; margin-right: 27px"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
              </tr>
              <tr class="border-bottom">
                <td>LinkedIn</td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="display: block; margin: auto"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
                <td style="padding-top: 15px; padding-bottom: 15px">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style="float: right; margin-right: 27px"
                  >
                    <circle cx="14" cy="14" r="14" fill="#27D898"></circle>
                    <path
                      d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113"
                      stroke="white"
                      stroke-width="2"
                    ></path>
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="lg:w-5/12 lg:mt-0 mt-10">
            <div
              class="text-muted font-serif text-xs font-semibold uppercase mb-2"
            >
              SELECT YOUR DISCOUNT
            </div>
            <div
              class="lg:flex items-center justify-between border-bottom lg:py-8 py-4"
            >
              <div>
                <div class="font-bold lg:text-2xl mb-1">Monthly</div>
                <div class="text-muted mb-4 text-sm"></div>
                <button
                  type="button"
                  class="px-8 py-4 lg:w-auto w-full rounded font-semibold focus:outline-none font-serif hover:bg-primary transition-all hover:text-white text-primary border-2 border-primary text-xs"
                >
                  <span class="relative -bottom-px">START FREE TRIAL</span>
                </button>
              </div>
              <div class="text-center lg:text-right lg:mt-0 mt-4">
                <div class="text-xl font-bold">
                  <span class="lg:text-6xl text-3xl">$</span>
                  <p class="price inline-block">
                    3 <span class="CUSTOM-price-second">4.</span>95
                  </p>
                  /month
                </div>
                <div class="text-muted text-sm">per user</div>
              </div>
            </div>
            <div
              class="lg:flex items-center justify-between border-bottom lg:py-8 py-4"
            >
              <div>
                <div class="font-bold lg:text-2xl mb-1">
                  Quarterly - Save 20%
                </div>
                <div class="text-muted mb-4 text-sm">
                  Billed as one payment of $83.85
                </div>
                <button
                  type="button"
                  class="px-8 py-4 lg:w-auto w-full rounded font-semibold focus:outline-none font-serif hover:bg-primary transition-all hover:text-white text-primary border-2 border-primary text-xs"
                >
                  <span class="relative -bottom-px">START FREE TRIAL</span>
                </button>
              </div>
              <div class="text-center lg:text-right lg:mt-0 mt-4">
                <div class="text-xl font-bold">
                  <span class="lg:text-6xl text-3xl">$</span>
                  <p class="price inline-block">
                    2 <span class="CUSTOM-price-second">7.</span>95
                  </p>
                  /month
                </div>
                <div class="text-muted text-sm">per user</div>
              </div>
            </div>
            <div
              class="lg:flex items-center justify-between border-bottom lg:py-8 py-4"
            >
              <div>
                <div class="font-bold lg:text-2xl mb-1">
                  Annually - Save 33%
                </div>
                <div class="text-muted mb-4 text-sm">
                  Billed as one payment of $275.40
                </div>
                <button
                  type="button"
                  class="px-8 py-4 lg:w-auto w-full rounded font-semibold focus:outline-none font-serif hover:bg-primary transition-all hover:text-white text-primary border-2 border-primary text-xs"
                >
                  <span class="relative -bottom-px">START FREE TRIAL</span>
                </button>
              </div>
              <div class="text-center lg:text-right lg:mt-0 mt-4">
                <div class="text-xl font-bold">
                  <span class="lg:text-6xl text-3xl">$</span>
                  <p class="price inline-block">
                    2 <span class="CUSTOM-price-second">2.</span>95
                  </p>
                  /month
                </div>
                <div class="text-muted text-sm">per user</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      

<div class="bg-gray-100 lg:py-24 py-8">
	<div class="container">
		<div class="lg:flex items-center justify-center">
		<div class="lg:w-4/12">
			<span class="font-serif text-xs font-semibold">YOU'RE IN GOOD HANDS</span>
			<h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5"> Our customer support team is exceptional! </h2>
		</div>
		<div class="w-1/12"></div>
		<div class="lg:w-5/12 lg:mt-0 mt-4">
			<p class="text-muted mb-8"> You'll get all the help you need to get the most out of the Telloe booking and communications platform. <br />
			<br /> Ready to switch to one of the most powerful and efficient client communication platforms available?
			</p>
			<button v-if="!$root.authUser" type="button" class="lg:w-auto w-full px-8 py-4 rounded font-semibold focus:outline-none font-serif hover:bg-primary transition-all hover:text-white text-primary border-2 border-primary text-xs" @click="auth = true; action = 'signup'" @mouseover="changeCursorStatus('onFreeTrial')" @mouseleave="changeCursorStatus('browsing')">
			<span class="relative -bottom-px">START FREE TRIAL</span>
			</button>
		</div>
		</div>
	</div>
</div>

<div class="bg-primary lg:py-24 py-8">
	<div class="container">
		<div class="lg:flex justify-center">
			<div class="lg:w-8/12">
				<h3 class="font-serif text-white font-semibold heading lg:mb-10 mb-5"> IT'S PERSONAL </h3>
				<h4 class="text-white lg:text-3xl text-2xl font-semibold mb-4"> Telloe Makes Turning Connections Into Relationships Simple </h4>
				<p class="text-white lg:text-xl mb-10"> Sign up today and discover how the art of personal connections can transform your business from a small-time player to an industry leader. </p>
				<button v-if="!$root.authUser" type="button" class="lg:w-auto w-full px-8 py-4 rounded font-semibold focus:outline-none font-serif bg-white transition-all hover:bg-gray-200 text-primary text-xs" @click="auth = true; action = 'signup'" @mouseover="changeCursorStatus('onFreeTrial')" @mouseleave="changeCursorStatus('browsing')">
				<span class="relative -bottom-px">START FREE TRIAL</span>
				</button>
			</div>
		</div>
	</div>
</div>
@stop


@section('scripts')
@include('partials.google_tags')
	
@stop
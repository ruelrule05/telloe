@extends('layouts.page')

@section('title', ucwords("The intelligent way to manage your clients' conversations, in one place"))

@section('content')

<div class="bg-secondary py-24">
	<div class="container">
		<div class="grid grid-cols-12 items-start">
			<div class="lg:col-span-8 col-span-12 lg:pr-24 order-2 lg:order-1">
				<h1 class="font-serif text-primary font-semibold sm:text-home-heading text-4xl">IT'S PERSONAL.</h1>
				<br/><br/><br/>
				<b class="text-xl lg:my-16 mt-4 mb-8 text-gray-600 lg:pr-36">
					People do business with people they know, like, trust, and value. That's why we help make business personal.
					<br/><br/>
					Let's get to know each other and make business magic happen.
					<br/><br/><br/><br/>
				</b>
				<button type="button" class="w-full lg:w-auto px-9 lg:mb-0 mb-3 py-4 border-2 border-primary font-semibold rounded transition-all focus:outline-none font-serif bg-primary hover:bg-primary-dark text-white text-base" @click="auth = true; action = 'signup'"><span  class="relative -bottom-px">START FREE TRIAL</span></button>
				<button type="button" class="w-full lg:w-auto px-9 py-4 rounded font-semibold focus:outline-none font-serif hover:bg-primary transition-all hover:text-white text-primary border-2 border-primary lg:ml-4 text-base" @click="openVideoDemo()"><span class="relative -bottom-px">WATCH VIDEO</span></button>
			</div>
			<div class="lg:col-span-4 col-span-12 order-1 lg:order-2 lg:px-0 px-8 lg:mb-0 mb-6">
				<img src="{{ asset('images/home/streamline-icon-startup-2@400x400.svg') }}">
			</div>
		</div>
	</div>
</div>

 
<div id="features" class="container lg:py-24 py-8">
	<div class="grid lg:grid-cols-2">
		<div class="lg:pr-24">
		<span class="font-serif text-xs font-semibold">STAND OUT, WIN MORE BUSINESS</span>
		<h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5"> Getting Personal Has Never Been Easier! </h2>
		</div>
		<div class="lg:pl-10 lg:pr-10 lg:mt-0 mt-4">
		<span class="font-bold lg:text-xl">Communicate, Personalise, Win! </span>
		<p class="lg:text-xl text-muted lg:mt-5"> Have you ever gotten a LinkedIn message from someone you didn't know that just felt, well, spammy and impersonal? <br />
			<br /> Us too. <br />
			<br /> But savvy marketers know that sales are built on genuine connections and trust. And the old ways of messaging just don't cut it. <br />
			<br /> That's why we've built a stealth LinkedIn relationship-building tool that turns your connections into brand loyalists and repeat sales. <br />
			<br /> Delight your clients and prospects with personalized video messages sent with INTENT! And easily arrange meetings on your video platform of choice or face-to-face to save you and your clients valuable time. <br />
			<br /> People don't do business with companies. They do business with people. And they're looking for people like you, so show 'em what you've got!
		</p>
		</div>
	</div>
</div>

<div class="container lg:py-24 py-8">
	<div class="grid lg:grid-cols-1 items-center">
		<div class="lg:pr-24 order-2 lg:order-1">
		<h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-10 mb-5"> 3 TOOLS, 1 RESULT </h2>
		<p class="text-muted lg:mt-4"> Telloe takes the mystery out of attracting new clients to your brand by giving you the tools and strategies that are proven to convert connections into sales--all while saving you time. </p>
		</div>
	</div>
</div>
<div class="container lg:py-24 py-8">
	<div class="grid lg:grid-cols-2 items-center">
		<div class="lg:pr-24 order-2 lg:order-1">
		<span class="font-serif text-xs font-semibold">#1 BUILD TRUST</span>
		<h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-10 mb-5"> Attract new LinkedIn connections </h2>
		<span class="font-bold lg:text-xl">Like, Comment, Track and Connect </span>
		<p class="text-muted lg:mt-4"> Hearing crickets when it comes to getting new connection requests on LinkedIn? <br />
			<br /> What if you could put the crickets to rest and instead enjoy high-value connections flocking to your profile every single day? <br />
			<br /> Our proven tools and strategies help bring business to you with some simple relationship-building moves. With a few likes, comments, and interactions, you can say hello to a fresh new community of connections eager to learn more about you and what you offer. <br />
			<br /> By building likability and trust, you turn connections into a captive audience. <br />
			<br /> And for those who haven't connected with you yet, send them a personalized video introduction that's sure to wow them.
		</p>
		<a href="#" style="float: right; margin-top: 50px; color:#3167e3">
			<b>Learn More</b>
		</a>
		</div>
		<div class="lg:pl-10 order-1 lg:order-2 lg:mb-0 mb-4">
		<img src="{{ asset('images/home/1.png') }}" alt="" />
		</div>
	</div>
</div>

<div class="container lg:py-24 py-8">
	<div class="grid lg:grid-cols-2 items-center">
		<div class="lg:pr-24 order-2 lg:order-1">
		<span class="font-serif text-xs font-semibold">#2 A VIDEO IS WORTH A MILLION WORDS</span>
		<h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-10 mb-5"> Quickly and easily create personalized video messages </h2>
		<span class="font-bold lg:text-xl">Create, Send, and Get Personal</span>
		<p class="text-muted lg:mt-4"> Why write it when you can say it? <br />
			<br /> Video has a powerful way of saying things words simply can’t. From the way you connect with the camera to the tone in your voice to the smile on your face, video creates the more authentic and intimate brand experience that your customers crave. <br />
			<br /> Our platform gives you the tools to quickly and easily create customized video messages, even if you're not tech-savvy. With personalized videos in your marketing strategy, you'll get better results from your campaigns and watch your customer service ratings soar. <br />
			<br /> Send directly via LinkedIn Messages or copy and paste a video into your email program and make brand magic happen.
		</p>
		<a href="#" style="float: right; margin-top: 50px; color:#3167e3">
			<b>Learn More</b>
		</a>
		</div>
		<div class="lg:pl-10 order-1 lg:order-2 lg:mb-0 mb-4">
		<img src="{{ asset('images/home/2.png') }}" alt="" />
		</div>
	</div>
</div>

<div class="container lg:py-24 py-8">
	<div class="grid lg:grid-cols-2 items-center">
		<div class="lg:pr-24 order-2 lg:order-1">
		<span class="font-serif text-xs font-semibold">#3 SET YOUR INTENT</span>
		<h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-10 mb-5"> Ask and you shall receive </h2>
		<span class="font-bold lg:text-xl">Transparent communication wins every time</span>
		<p class="text-muted lg:mt-4"> If you don't ask for a meeting, you won't get it. <br />
			<br /> So get asking. <br />
			<br /> We make asking for a meeting easy with your flexible booking availability calendar so your contacts can self-schedule appointments that work for everyone. <br />
			<br /> We also help you boost sales by directing video recipients to a page on your website or social media for further information or offers. <br />
			<br /> And after you make the sale, enhance your online reputation by asking clients for a video testimonial or directing them to a Google review.
		</p>
		<a href="#" style="float: right; margin-top: 50px; color:#3167e3">
			<b>Learn More</b>
		</a>
		</div>
		<div class="lg:pl-10 order-1 lg:order-2 lg:mb-0 mb-4">
		<img src="{{ asset('images/home/3.png') }}" alt="" />
		</div>
	</div>
</div>

<div class="container lg:py-24 py-8">
	<span class="font-bold lg:text-xl">Wow your customers and prospects and stand out from the crowd with personalized communications that convert. </span>
	<button type="button" class="w-full lg:w-auto px-9 lg:mb-0 mb-3 py-4 border-2 border-primary font-semibold rounded transition-all focus:outline-none font-serif bg-primary hover:bg-primary-dark text-white text-base" style="margin-top: 40px;">
		<span class="relative -bottom-px">GIVE ME THE <b>WOW</b> FACTOR </span>
	</button>
</div>

<div id="pricing" class="container lg:py-24 py-8">
	<h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-14"> Simple plans, no surprises </h2>
	<h6 class="font-bold lg:text-2xl"> Full Premium, 14 Day Free Trial </h6>
	<p class="text-muted lg:mt-4"> We don't like long contracts full of surprises that lock you in for the long term. Our simplified subscriptions mean you always know what you're getting and how much you're paying so you can more easily plan ahead as you create a winning marketing strategy. <br />
		<br /> No credit card is needed. Try for a full 14 days without obligation. After 14 days, continue using the free limited version of Telloe if you don't want to upgrade your account.
	</p>
	<div class="lg:flex mt-6 justify-between">
		<table class="lg:w-5/12 CUSTOM-table">
		<tr class="mt-10">
			<th class="text-muted font-serif text-xs font-semibold uppercase mb-2" style="float: left; margin: 0;">VIDEO CREATION</th>
			<th class="text-muted font-serif text-xs font-semibold uppercase mb-2" style="">Free</th>
			<th class="text-muted font-serif text-xs font-semibold uppercase mb-2" style="float: right; margin: 0;">Premium</th>
		</tr>
		<tr class="border-bottom">
			<td>Video stitching</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="display: block; margin: auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="float: right; margin-right: 27px;" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
		</tr>
		<tr class="border-bottom">
			<td>Send video via email </td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="display: block; margin: auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="float: right; margin-right: 27px;" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
		</tr>
		<tr class="border-bottom">
			<td>Send video via link</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="display: block; margin: auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="float: right; margin-right: 27px;" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
		</tr>
		<tr class="border-bottom">
			<td>Video limit</td>
			<td style="padding-top: 15px; padding-bottom: 15px; text-align: center"> 10 Per Month </td>
			<td style="padding-top: 15px; padding-bottom: 15px; text-align: center; float: right; margin-right: 13px;"> No limit </td>
		</tr>
		<tr class="border-bottom">
			<td>Intent messaging</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="display: block; margin: auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="float: right; margin-right: 27px;" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
		</tr>
		<tr class="mt-10">
			<th class="text-muted font-serif text-xs font-semibold uppercase mb-2" style="float: left; margin: 0; padding-top: 40px;">Touch Point</th>
			<th class="text-muted font-serif text-xs font-semibold uppercase mb-2" style="padding-top: 40px;">Free</th>
			<th class="text-muted font-serif text-xs font-semibold uppercase mb-2" style="float: right; margin: 0; padding-top: 40px;">Premium</th>
		</tr>
		<tr class="border-bottom">
			<td>People tracked</td>
			<td style="padding-top: 15px; padding-bottom: 15px; text-align: center"> 10 at a Time </td>
			<td style="padding-top: 15px; padding-bottom: 15px; text-align: center; float: right; margin-right: 13px;"> No limit </td>
		</tr>
		<tr class="border-bottom">
			<td>Results console</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="display: block; margin: auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="float: right; margin-right: 27px;" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
		</tr>
		<tr class="border-bottom">
			<td>Tracking filter</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="display: block; margin: auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="float: right; margin-right: 27px;" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
		</tr>
		<tr class="border-bottom">
			<td>Quick add and remove</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="display: block; margin: auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="float: right; margin-right: 27px;" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
		</tr>
		<tr class="border-bottom">
			<td>Labels</td>
			<td style="padding-top: 15px; padding-bottom: 15px; text-align: center"> 3 </td>
			<td style="padding-top: 15px; padding-bottom: 15px; text-align: center; float: right; margin-right: 13px;"> No limit </td>
		</tr>
		<tr class="mt-10">
			<th class="text-muted font-serif text-xs font-semibold uppercase mb-2" style="float: left; margin: 0; padding-top: 40px;">BOOKINGS - Intent</th>
			<th class="text-muted font-serif text-xs font-semibold uppercase mb-2" style="padding-top: 40px;">Free</th>
			<th class="text-muted font-serif text-xs font-semibold uppercase mb-2" style="float: right; margin: 0; padding-top: 40px;">Premium</th>
		</tr>
		<tr class="border-bottom">
			<td>Booking Notes </td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="display: block; margin: auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="float: right; margin-right: 27px;" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
		</tr>
		<tr class="border-bottom">
			<td>Recurring Bookings </td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="display: block; margin: auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="float: right; margin-right: 27px;" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
		</tr>
		<tr class="border-bottom">
			<td>Client self-booking </td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="display: block; margin: auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="float: right; margin-right: 27px;" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
		</tr>
		<tr class="border-bottom">
			<td>Event Types</td>
			<td style="padding-top: 15px; padding-bottom: 15px; text-align: center"> 1 </td>
			<td style="padding-top: 15px; padding-bottom: 15px; text-align: center; float: right; margin-right: 13px;"> No limit </td>
		</tr>
		<tr class="border-bottom">
			<td>Booking URL</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="display: block; margin: auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="float: right; margin-right: 27px;" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
		</tr>
		<tr class="mt-10">
			<th class="text-muted font-serif text-xs font-semibold uppercase mb-2" style="float: left; margin: 0; padding-top: 40px;">Integrations</th>
			<th class="text-muted font-serif text-xs font-semibold uppercase mb-2" style="padding-top: 40px;">Free</th>
			<th class="text-muted font-serif text-xs font-semibold uppercase mb-2" style="float: right; margin: 0; padding-top: 40px;">Premium</th>
		</tr>
		<tr class="border-bottom">
			<td>Zoom</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="display: block; margin: auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="float: right; margin-right: 27px;" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
		</tr>
		<tr class="border-bottom">
			<td>Google Meets</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="display: block; margin: auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="float: right; margin-right: 27px;" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
		</tr>
		<tr class="border-bottom">
			<td>Outlook Calendar</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="display: block; margin: auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#E33171"></circle>
				<line x1="8" y1="8" x2="20" y2="20" stroke="white" stroke-width="2" />
				<line x1="20" y1="8" x2="8" y2="20" stroke="white" stroke-width="2" />
			</svg>
			</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="float: right; margin-right: 27px;" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
		</tr>
		<tr class="border-bottom">
			<td>Google Calendar</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="display: block; margin: auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#E33171"></circle>
				<line x1="8" y1="8" x2="20" y2="20" stroke="white" stroke-width="2" />
				<line x1="20" y1="8" x2="8" y2="20" stroke="white" stroke-width="2" />
			</svg>
			</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="float: right; margin-right: 27px;" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
		</tr>
		<tr class="border-bottom">
			<td>LinkedIn</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="display: block; margin: auto" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
			<td style="padding-top: 15px; padding-bottom: 15px">
			<svg style="float: right; margin-right: 27px;" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="14" fill="#27D898"></circle>
				<path d="M7.77783 14.3459L11.8223 18.278L20.2223 10.1113" stroke="white" stroke-width="2"></path>
			</svg>
			</td>
		</tr>
		</table>
		<div class="lg:w-5/12 lg:mt-0 mt-10">
		<div class="text-muted font-serif text-xs font-semibold uppercase mb-2"> SELECT YOUR DISCOUNT </div>
		<div class="lg:flex items-center justify-between border-bottom lg:py-8 py-4">
			<div>
			<div class="font-bold lg:text-2xl mb-1">Monthly</div>
			<div class="text-muted mb-4 text-sm"></div>
			<button type="button" class="px-8 py-4 lg:w-auto w-full rounded font-semibold focus:outline-none font-serif hover:bg-primary transition-all hover:text-white text-primary border-2 border-primary text-xs">
				<span class="relative -bottom-px">START FREE TRIAL</span>
			</button>
			</div>
			<div class="text-center lg:text-right lg:mt-0 mt-4">
			<div class="text-xl font-bold">
				<span class="lg:text-6xl text-3xl">$</span>
				<p class="price inline-block">3 <span class="CUSTOM-price-second">4.</span>95 </p> /month
			</div>
			<div class="text-muted text-sm">per user</div>
			</div>
		</div>
		<div class="lg:flex items-center justify-between border-bottom lg:py-8 py-4">
			<div>
			<div class="font-bold lg:text-2xl mb-1">Quarterly - Save 20%</div>
			<div class="text-muted mb-4 text-sm"> Billed as one payment of $83.85 </div>
			<button type="button" class="px-8 py-4 lg:w-auto w-full rounded font-semibold focus:outline-none font-serif hover:bg-primary transition-all hover:text-white text-primary border-2 border-primary text-xs">
				<span class="relative -bottom-px">START FREE TRIAL</span>
			</button>
			</div>
			<div class="text-center lg:text-right lg:mt-0 mt-4">
			<div class="text-xl font-bold">
				<span class="lg:text-6xl text-3xl">$</span>
				<p class="price inline-block">2 <span class="CUSTOM-price-second">7.</span>95 </p> /month
			</div>
			<div class="text-muted text-sm">per user</div>
			</div>
		</div>
		<div class="lg:flex items-center justify-between border-bottom lg:py-8 py-4">
			<div>
			<div class="font-bold lg:text-2xl mb-1">Annually - Save 33%</div>
			<div class="text-muted mb-4 text-sm"> Billed as one payment of $275.40 </div>
			<button type="button" class="px-8 py-4 lg:w-auto w-full rounded font-semibold focus:outline-none font-serif hover:bg-primary transition-all hover:text-white text-primary border-2 border-primary text-xs">
				<span class="relative -bottom-px">START FREE TRIAL</span>
			</button>
			</div>
			<div class="text-center lg:text-right lg:mt-0 mt-4">
			<div class="text-xl font-bold">
				<span class="lg:text-6xl text-3xl">$</span>
				<p class="price inline-block">2 <span class="CUSTOM-price-second">2.</span>95 </p> /month
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
			<button type="button" class="lg:w-auto w-full px-8 py-4 rounded font-semibold focus:outline-none font-serif hover:bg-primary transition-all hover:text-white text-primary border-2 border-primary text-xs">
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
				<button type="button" class="lg:w-auto w-full px-8 py-4 rounded font-semibold focus:outline-none font-serif bg-white transition-all hover:bg-gray-200 text-primary text-xs">
				<span class="relative -bottom-px">START FREE TRIAL</span>
				</button>
			</div>
		</div>
	</div>
</div>
@stop

@section('scripts')
	<script src="{{ asset('js/E-v1.js') }}" async=""></script>
	
	<!-- Global site tag (gtag.js) - Google Analytics -->
    <script async="" src="{{ asset('js/js.js') }}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];

      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "UA-176150819-1");
    </script>

	<!-- Facebook Pixel Code -->
    <script>
      !(function(f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      fbq("init", "621261285253190");
      fbq("track", "PageView");
    </script>
    <noscript>
    	<img height="1" width="1" src="https://www.facebook.com/tr?id=621261285253190&ev=PageView&noscript=1" />
    </noscript>
	<!-- End Facebook Pixel Code -->
    <script type="text/javascript">
      window.smartlook || (function(d) {
        var o = (smartlook = function() {
            o.api.push(arguments);
          }),
          h = d.getElementsByTagName("head")[0];
        var c = d.createElement("script");
        o.api = new Array();
        c.async = true;
        c.type = "text/javascript";
        c.charset = "utf-8";
        c.src = "https://rec.smartlook.com/recorder.js";
        h.appendChild(c);
      })(document);
      smartlook("init", "f7570f1288a7920a46a670158181b091fb6fc9b8");
    </script>
    <!-- Google Tag Manager (noscript) -->  
	<noscript>
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WD8BDT3" height="0" width="0" style="display: none; visibility: hidden"></iframe>
    </noscript>
    <!-- End Google Tag Manager (noscript) -->
	<script type="text/javascript">
      (function(w, d) {
        w.HelpCrunch = function() {
          w.HelpCrunch.q.push(arguments);
        };
        w.HelpCrunch.q = [];

        function r() {
          var s = document.createElement("script");
          s.async = 1;
          s.type = "text/javascript";
          s.src = "https://widget.helpcrunch.com/";
          (d.body || d.head).appendChild(s);
        }
        if (w.attachEvent) {
          w.attachEvent("onload", r);
        } else {
          w.addEventListener("load", r, false);
        }
      })(window, document);
    </script>
    <script type="text/javascript">
      HelpCrunch("init", "telloe", {
        applicationId: 1,
        applicationSecret: "HYahOyK1vO4D3ea4HpLWVHpaYj5YZjXSyFEeZrjzprYGPRrEcuQ5ungv7ZyJ0rXrFj855O/bQBygjA92KkFXMg==",
      });
      HelpCrunch("showChatWidget");
    </script>
	<script>
      window.CONTACT = null;
      window.MEMBER = null;
    </script>
    <script>
      (function() {
        function getParameterByName(name) {
          name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
          var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
          return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
        var click_id = getParameterByName("sub1");
        if (click_id) {
          document.cookie = "click_id=" + click_id + ";path=/;";
        }
      })();
    </script>
	<script type="text/javascript" src="{{ config('app.url') }}/js/widget.js?p={{ env('HOME_WIDGET_USERNAME') }}"></script>

	<style id="wistia_22_style" type="text/css" class="wistia_injected_style">
      @font-face {
        font-family: "WistiaPlayerInterNumbersSemiBold";
        font-feature-settings: "tnum"1;
        src: url(data:application/x-font-woff;charset=utf-8;base64,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);
      }
    </style>

	<script async="" type="text/javascript" src="{{ asset('js/a.js') }}"></script>
	<div id="telloe-widget">
      <div data-v-cb0d81fe="" id="widget">
        <button data-v-cb0d81fe="" type="button" class="telloe-widget-btn">
          <img data-v-cb0d81fe="" src="{{ asset('images/logo.svg') }}" height="20" />Book </button>
        <!---->
      </div>
    </div>
@stop
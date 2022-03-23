@extends('layouts.page')

@section('title', ucwords("Schedule a meeting |  Create and share personalized videos  |  Keep connected | Meet Telloe"))

@section('content')

<div class="bg-secondary py-24">
    <div class="container">
        <div class="grid grid-cols-12 items-start">
        <div class="lg:col-span-8 col-span-12 lg:pr-24 order-2 lg:order-1">
            <h1 class="font-serif text-primary font-semibold sm:text-home-heading text-4xl"> IT'S VIDEO. </h1>
            <br />
            <br />
            <br />
            <b class="text-xl lg:my-16 mt-4 mb-8 text-gray-600 lg:pr-36"> Give your customers a starring role. </b>
            <br />
            <br />
            <b class="text-xl lg:my-16 mt-4 mb-8 text-gray-600 lg:pr-36"> It's a digital world, and attention spans are short. Capture your audience's attention with personalized videos designed to convert. <br />
            <br />
            </b>
            <button type="button" class="w-full lg:w-auto px-9 lg:mb-0 mb-3 py-4 border-2 border-primary font-semibold rounded transition-all focus:outline-none font-serif bg-primary hover:bg-primary-dark text-white text-base" @click="auth = true; action = 'signup'" @mouseover="changeCursorStatus('onFreeTrial')" @mouseleave="changeCursorStatus('browsing')">
            <span class="relative -bottom-px">CAPTURE THEIR ATTENTION</span>
            </button>
        </div>
        <div class="lg:col-span-4 col-span-12 order-1 lg:order-2 lg:px-0 px-8 lg:mb-0 mb-6">
            <img src="{{ asset('images/intent/streamline-icon-startup-2@400x400.svg') }}" />
        </div>
        </div>
    </div>
</div>

<div id="features" class="container lg:py-24 py-8">
    <div class="grid lg:grid-cols-2">
        <div class="lg:pr-24">
        <span class="font-serif text-xs font-semibold">SHOUT OUT, STAND OUT</span>
        <h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5"> Enjoy a captive audience </h2>
        </div>
        <div class="lg:pl-10 lg:pr-10 lg:mt-0 mt-4">
        <span class="font-bold lg:text-xl">Results that speak, enough said. </span>
        <p class="lg:text-xl text-muted lg:mt-5"> Video has a way of captivating your customers that words don’t. The truth is, we want to see and hear who we’re doing business with. <br />
            <br /> Telloe’s video messaging and integrated self-booking platform puts your face in front of customers, building the trust that drives them to take action. <br />
            <br /> And video also has a way of helping customers retain important information, more than the written word. In fact, viewers retain 95% of a message when they watch it in a video versus 10% via reading text. <br />
            <br /> So why are you still potentially losing 85% of your customers when there’s a simple solution?
        </p>
        </div>
    </div>
</div>

<div class="container lg:py-24 py-8">
    <div class="grid grid-cols-12 items-center">
        <div class="lg:col-span-9 col-span-12">
        <span class="font-serif text-xs font-semibold">WE’VE GOT YOUR BACK</span>
        <h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-10 mb-5"> We bring value to your clients and prospects while saving you time with easy-to-create videos that leave a lasting impression. </h2>
        </div>
    </div>
    <div class="lg:flex lg:mt-20 justify-between">
        <div class="lg:w-3/12 w-full">
        <div class="lg:mb-12 mb-4 h-56 text-center lg:text-left lg:px-0 px-12">
            <img src="{{ asset('images/videomessaging/share.svg') }}" alt="" class="h-full inline-block" />
        </div>
        <h6 class="font-bold lg:text-xl">Record &amp; Share</h6>
        <p class="text-muted lg:mt-4"> Not tech-savvy? No problem. Our platform is easy to use, no matter your experience with video creation. </p>
        <p class="text-muted lg:mt-4"> Quickly and easily create authentic, personalized videos that get at the heart of any communication. It’s personal and genuine. </p>
        <p class="text-muted lg:mt-4"> Send videos via email or popular messaging systems for results that leave emails or text messages in the dust! </p>
        </div>
        <div class="lg:w-3/12 w-full lg:mt-0 mt-8">
        <div class="lg:mb-12 mb-4 h-56 text-center lg:text-left lg:px-0 px-12">
            <img src="{{ asset('images/videomessaging/video-voice.svg') }}" alt="" class="h-full inline-block" />
        </div>
        <h6 class="font-bold lg:text-xl"> Video Stitching </h6>
        <p class="text-muted lg:mt-4"> Want to save time by sending the same video to many contacts and prospects while keeping it personal? </p>
        <p class="text-muted lg:mt-4"> With our revolutionary video stitching, you can record quick small, personalized introductions and join them to a pre-existing video seamlessly! </p>
        <p class="text-muted lg:mt-4"> Video stitching is great for keeping in touch with videos you want to share with clients or prospects that keep them engaged and nurture the relationship. </p>
        </div>
        <div class="lg:w-3/12 w-full lg:mt-0 mt-8">
        <div class="lg:mb-12 mb-4 h-56 text-center lg:text-left lg:px-0 px-12">
            <img src="{{ asset('images/videomessaging/screen-recording.svg') }}" alt="" class="h-full inline-block" />
        </div>
        <h6 class="font-bold lg:text-xl"> See the Results </h6>
        <p class="text-muted lg:mt-4"> Looking to take personalization to the next level? Add a custom text message to your video message to which users can reply. </p>
        <p class="text-muted lg:mt-4"> Recipients of your videos can also like, dislike and send a text-based reply message or a video reply. </p>
        <p class="text-muted lg:mt-4"> You can also see if the recipient has viewed your video and how many times it’s been watched. </p>
        </div>
    </div>
</div>

<div class="container lg:py-24 py-8">
    <div class="grid lg:grid-cols-2 items-center">
        <div class="lg:pr-24 order-2 lg:order-1">
        <span class="font-serif text-xs font-semibold">VIDEO IS NOW</span>
        <h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-10 mb-5"> Light's, Camera, action! </h2>
        <span class="font-bold lg:text-xl">Video is worth a million words</span>
        <p class="text-muted lg:mt-4"> Ready to ramp up your results with easy-to-use, personalized video? It's the quickest, simplest way to build trust and earn legions of devoted new customers. </p>
        <br />
        <br />
        <button type="button" class="w-full lg:w-auto px-9 lg:mb-0 mb-3 py-4 border-2 border-primary font-semibold rounded transition-all focus:outline-none font-serif bg-primary hover:bg-primary-dark text-white text-base" @click="auth = true; action = 'signup'" @mouseover="changeCursorStatus('onFreeTrial')" @mouseleave="changeCursorStatus('browsing')">
            <span class="relative -bottom-px">CAPTIVATE MY AUDIENCE</span>
        </button>
        </div>
        <div class="lg:pl-10 order-1 lg:order-2 lg:mb-0 mb-4">
        <img src="{{ asset('images/intent/1.png') }}" alt="" />
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
            <button type="button" class="lg:w-auto w-full px-8 py-4 rounded font-semibold focus:outline-none font-serif bg-white transition-all hover:bg-gray-200 text-primary text-xs" @click="auth = true; action = 'signup'" @mouseover="changeCursorStatus('onFreeTrial')" @mouseleave="changeCursorStatus('browsing')">
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
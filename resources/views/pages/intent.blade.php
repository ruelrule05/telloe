@extends('layouts.page')

@section('title', ucwords("Schedule a meeting |  Create and share personalized videos  |  Keep connected | Meet Telloe"))

@section('content')

<div class="bg-secondary py-24">
    <div class="container">
        <div class="grid grid-cols-12 items-start">
        <div class="lg:col-span-8 col-span-12 lg:pr-24 order-2 lg:order-1">
            <h1 class="font-serif text-primary font-semibold sm:text-home-heading text-4xl"> CLICKS MATTER. </h1>
            <br />
            <br />
            <br />
            <b class="text-xl lg:my-16 mt-4 mb-8 text-gray-600 lg:pr-36"> Make their clicks matter. </b>
            <br />
            <br />
            <b class="text-xl lg:my-16 mt-4 mb-8 text-gray-600 lg:pr-36"> Drive your customers and prospects to action by making it easy to schedule meetings, learn about events, and give your brand a boost with testimonials. <br />
            <br />
            </b>
            <button type="button" class="w-full lg:w-auto px-9 lg:mb-0 mb-3 py-4 border-2 border-primary font-semibold rounded transition-all focus:outline-none font-serif bg-primary hover:bg-primary-dark text-white text-base" @click="auth = true; action = 'signup'" @mouseover="changeCursorStatus('onFreeTrial')" @mouseleave="changeCursorStatus('browsing')">
                <span class="relative -bottom-px">CREATE MORE ACTION</span>
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
        <span class="font-serif text-xs font-semibold">BUSINESS SUCCESS STARTS WITH INTENTION</span>
        <h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5"> Success isn’t something that just happens. <br />It’s intentional. </h2>
        </div>
        <div class="lg:pl-10 lg:pr-10 lg:mt-0 mt-4">
        <span class="font-bold lg:text-xl">Are You Ready?</span>
        <p class="lg:text-xl text-muted lg:mt-5"> Once you set your business goals and what actions you want your customers and prospects to take, we help you execute it with tools the boost engagement. <br />
            <br /> Whether you want to attract new clients through meetings, keep them informed about important events, or invite them to leave a review, Telloe eliminates confusing back-and-for exchanges by streamlining your processes with personalized invitations to engage in growth-driving actions.
        </div>
    </div>
</div>

<div class="container lg:py-24 py-8">
    <div class="grid grid-cols-12 items-center">
        <div class="lg:col-span-9 col-span-12">
        <span class="font-serif text-xs font-semibold">GET THE OUTCOME YOU WANT</span>
        <h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-10 mb-5"> More than just an online scheduling tool </h2>
        </div>
    </div>
    <div class="lg:flex lg:mt-20 justify-between">
        <div class="lg:w-3/12 w-full">
        <div class="lg:mb-12 mb-4 h-56 text-center lg:text-left lg:px-0 px-12">
            <img src="{{ asset('images/intent/share.svg') }}" alt="" class="h-full inline-block" />
        </div>
        <h6 class="font-bold lg:text-xl">Take Bookings</h6>
        <p class="text-muted lg:mt-4"> Empower your clients to schedule meetings with you with our robust self-booking platform. Send messages to clients or prospects, allowing them to book a meeting without the frustration of the back and forth and friction that can occur in this process. </p>
        <p class="text-muted lg:mt-4"> You can add a booking request to any video message or utilize Telloe’s self-booking system in your other communications, including email, so people can book with you easily at a time that works for both you and them. </p>
        </div>
        <div class="lg:w-3/12 w-full lg:mt-0 mt-8">
        <div class="lg:mb-12 mb-4 h-56 text-center lg:text-left lg:px-0 px-12">
            <img src="{{ asset('images/intent/video-voice.svg') }}" alt="" class="h-full inline-block" />
        </div>
        <h6 class="font-bold lg:text-xl"> Notify of Events </h6>
        <p class="text-muted lg:mt-4"> Want to send a personalized invitation to an existing client or contact informing them of a sale item on your website? No problem! </p>
        <p class="text-muted lg:mt-4"> After creating your video, simply link to any page on your site or an external site in the message section. </p>
        <p class="text-muted lg:mt-4"> This powerful tool is also perfect for announcing online events or product launches. </p>
        </div>
        <div class="lg:w-3/12 w-full lg:mt-0 mt-8">
        <div class="lg:mb-12 mb-4 h-56 text-center lg:text-left lg:px-0 px-12">
            <img src="{{ asset('images/intent/screen-recording.svg') }}" alt="" class="h-full inline-block" />
        </div>
        <h6 class="font-bold lg:text-xl"> Receive Testimonials </h6>
        <p class="text-muted lg:mt-4"> Boost your brand’s reputation with customer testimonials. </p>
        <p class="text-muted lg:mt-4"> Testimonials are a great way for your existing customers to provide social proof for new customers, letting them know that they are making a great choice in selecting you. </p>
        <p class="text-muted lg:mt-4"> However, testimonials can get hard to get. </p>
        <p class="text-muted lg:mt-4"> With Telloe, you can send a personalized video email asking for a video reply with their testimonial or include a link to a Google review or other review site in the message, boosting the likelihood of a glowing review. </p>
        </div>
    </div>
</div>

<div class="container lg:py-24 py-8">
    <span class="font-serif text-xs font-semibold">MAKE IT BEND</span>
    <h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-20 mb-10"> Flexibility right where you need it. </h2>
    <div class="grid grid-cols-12">
        <div class="lg:col-span-7 col-span-12 lg:pr-36 order-2 lg:order-1">
        <div class="feature show">
            <div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all">
            <div >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2" class="line-1"></line>
                <line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2"></line>
                </svg>
            </div>
            <div class="pl-6">
                <span class="font-bold lg:text-xl feature-title">Schedule Recurring Bookings At Once</span>
            </div>
            </div>
            <div class="pl-12 feature-content">
            <p class="text-muted mt-2"> Do away with the trouble of having to manually book recurring appointments whenever they are due. <br />
                <br />With our recurring meeting feature, you and your contacts can create one booking and set it to recurring so you don't have to keep repeating the task. Automatic reminders ensure that everyone is in the loop and no one misses out.
            </p>
            </div>
        </div>
        <div class="feature show">
            <div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all">
            <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2" class="line-1"></line>
                <line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2"></line>
                </svg>
            </div>
            <div class="pl-6">
                <span class="font-bold lg:text-xl">Book Multiple Time Slots All At Once</span>
            </div>
            </div>
            <div class="pl-12 feature-content">
            <p class="text-muted mt-2"> Easily schedule multiple appointments in different time slots concurrently without having to wait to complete one booking before initiating another. </p>
            </div>
        </div>
        <div class="feature show">
            <div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all">
            <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2" class="line-1"></line>
                <line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2"></line>
                </svg>
            </div>
            <div class="pl-6">
                <span class="font-bold lg:text-xl">Booking Blocks</span>
            </div>
            </div>
            <div class="pl-12 feature-content">
            <p class="text-muted mt-2"> Create groups of bookings in a few simple clicks. Great for those times when you offer multiple call services as a package. </p>
            </div>
        </div>
        <div class="feature show">
            <div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all">
            <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2" class="line-1"></line>
                <line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2"></line>
                </svg>
            </div>
            <div class="pl-6">
                <span class="font-bold lg:text-xl">Add Notes to Bookings</span>
            </div>
            </div>
            <div class="pl-12 feature-content">
            <p class="text-muted mt-2"> Create notes for your contacts and their bookings to help you remember important information for future or past referencing. </p>
            </div>
        </div>
        <div class="feature show">
            <div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all">
            <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2" class="line-1"></line>
                <line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2"></line>
                </svg>
            </div>
            <div class="pl-6">
                <span class="font-bold lg:text-xl">Send Smart Reminders</span>
            </div>
            </div>
            <div class="pl-12 feature-content">
            <p class="text-muted mt-2"> Automated reminders help you notify your clients of their upcoming appointments while also letting them know that you're thinking about them. These smart reminders help you build trust between you and your clients, and ultimately produce better results and greater client satisfaction. </p>
            </div>
        </div>
        <div class="feature show">
            <div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all">
            <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2" class="line-1"></line>
                <line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2"></line>
                </svg>
            </div>
            <div class="pl-6">
                <span class="font-bold lg:text-xl">Shared Bookings</span>
            </div>
            </div>
            <div class="pl-12 feature-content">
            <p class="text-muted mt-2"> Invite one or more people to the same time slot for multi-participant meetings. </p>
            </div>
        </div>
        </div>
        <div class="lg:col-span-5 col-span-12 order-1 lg:order-2 lg:px-0 px-10">
        <img src="{{ asset('images/intent/bookings.svg') }}" alt="" />
        </div>
    </div>
</div>

<div class="container lg:py-24 py-8">
    <div class="grid lg:grid-cols-2 items-center">
        <div class="lg:pr-24">
        <img src="{{ asset('images/intent/integrations.svg') }}" alt="" />
        </div>
        <div class="lg:pl-10">
        <span class="font-serif text-xs font-semibold">ONE EASY TO USE TOOL</span>
        <h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-10 mb-5"> Different meeting types, no problem. </h2>
        <span class="font-bold text-xl">Popular Platforms Work with Telloe</span>
        <p class="text-muted lg:mt-4"> Arrange face-to-face meetings, phone calls, Skype calls, Zoom calls and Google Meets to create bookings that include your platform links; or you can also make use of our very own fully-featured Telloe video messaging system. <br />
            <br />Our advanced but simple to use features give you maximum flexibility!
        </p>
        </div>
    </div>
</div>

<div class="container lg:py-24 py-8">
    <div class="grid lg:grid-cols-2 items-center">
        <div class="lg:pr-24 order-2 lg:order-1">
        <span class="font-serif text-xs font-semibold">ACTION IT</span>
        <h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-10 mb-5"> Empower your customers to act </h2>
        <span class="font-bold lg:text-xl">Let's get engaged</span>
        <p class="text-muted lg:mt-4"> Give your customers and prospects the quick and easy tools they need to engage with your brand, boosting your conversions and their satisfaction. </p>
        <br />
        <br />
        <button type="button" class="w-full lg:w-auto px-9 lg:mb-0 mb-3 py-4 border-2 border-primary font-semibold rounded transition-all focus:outline-none font-serif bg-primary hover:bg-primary-dark text-white text-base" @click="auth = true; action = 'signup'" @mouseover="changeCursorStatus('onFreeTrial')" @mouseleave="changeCursorStatus('browsing')">
            <span class="relative -bottom-px">BOOST MY ENGAGEMENT</span>
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

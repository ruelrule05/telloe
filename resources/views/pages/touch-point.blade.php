@extends('layouts.page')

@section('title', ucwords("The intelligent way to manage your clients' conversations, in one place"))

@section('content')

<div class="bg-secondary py-24">
    <div class="container">
        <div class="grid grid-cols-12 items-start">
        <div class="lg:col-span-8 col-span-12 lg:pr-24 order-2 lg:order-1">
            <h1 class="font-serif text-primary font-semibold sm:text-home-heading text-4xl"> AUTHENTICITY MATTERS. </h1>
            <br />
            <br />
            <br />
            <b class="text-xl lg:my-16 mt-4 mb-8 text-gray-600 lg:pr-36"> Today's business success relies on authentic personal connections. We make them possible. <br />
            <br />
            </b>
            <button type="button" class="w-full lg:w-auto px-9 lg:mb-0 mb-3 py-4 border-2 border-primary font-semibold rounded transition-all focus:outline-none font-serif bg-primary hover:bg-primary-dark text-white text-base">
            <span class="relative -bottom-px">BUILD MY CONNECTIONS</span>
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
        <span class="font-serif text-xs font-semibold">LESS GHOSTING, MORE GROWING</span>
        <h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5"> Fuel your growth </h2>
        </div>
        <div class="lg:pl-10 lg:pr-10 lg:mt-0 mt-4">
        <span class="font-bold lg:text-xl">Learn from the mistakes of others! </span>
        <p class="lg:text-xl text-muted lg:mt-5"> We know you’ve been there. You open a message from someone you don’t know selling you on something you know nothing about. And if you’re like most people, you probably never reply, ghosting the sender. <br />
            <br /> So why are you using those same practices in your business? <br />
            <br /> We’re here to stop the ghosting and fuel your growth with a personalized video messaging approach that capitalizes on what people crave most: building authentic relationships that care about more than the sale. <br />
            <br /> And with 660,000,000 people on LinkedIn with over 300,000,000 active monthly users, LinkedIn is ripe for building connections—if you make the right moves.
        </p>
        </div>
    </div>
</div>

<div class="container lg:py-24 py-8">
    <div class="container lg:py-24 py-8">
        <div class="grid lg:grid-cols-2 items-center">
            <div class="lg:pr-24 order-2 lg:order-1">
                <span class="font-serif text-xs font-semibold">ESTABLISH TRUST</span>
                <h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-10 mb-5"> Mastering the art of personal connection </h2>
                <span class="font-bold lg:text-xl">Establishing trust is better than any sales technique </span>
                <p class="text-muted lg:mt-4"> You don't ask someone to marry you the first time you introduce yourself—or at least we hope not! The same goes for building genuine relationships in business. You can't ask for business the first time you introduce yourself and expect favourable results. <br />
                <br /> A lot of research says that you need 8 personal touches with a client to generate a conversion. The best do it in 5. <br />
                <br /> Building relationships, even digital ones, takes time. Once you master the art of personal connections, brand magic happens. <br />
                <br /> And it starts with interacting with people's LinkedIn profiles by liking and commenting on posts of people you want to connect with and ultimately do business with them. <br />
                <br /> After you establish trust and interest, you can then send them a personal video introduction using Telloe's video messaging or a personal message with a connection request. <br />
                <br /> Why video? Because people want to see who they’re doing business with. Our strategy saves you time and helps you build the trust needed that culminates in putting a face to your business, reducing touchpoints to conversion.
                </p>
            </div>
            <div class="lg:pl-10 order-1 lg:order-2 lg:mb-0 mb-4">
                <img src="{{ asset('images/intent/1.png') }}" alt="" />
            </div>
        </div>
    </div>

    <div class="container lg:py-24 py-8">
        <span class="font-serif text-xs font-semibold">ATTRACT RESULTS</span>
        <h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-20 mb-10"> Relationship building 101 </h2>
        <p class="text-muted lg:mt-4"> With Telloe’s intuitive platform, you can review your interactions, create labels, devise follow-up plans, and send personalized video messages, all from one streamlined program. <br />
        <br />
        </p>    
        <div class="grid grid-cols-12">
        <div class="lg:col-span-7 col-span-12 lg:pr-36 order-2 lg:order-1">
            <div class="feature show">
            <div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all">
                <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2" class="line-1"></line>
                    <line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2"></line>
                </svg>
                </div>
                <div class="pl-6">
                <span class="font-bold lg:text-xl">Relationship building 101</span>
                </div>
            </div>
            <div class="pl-12">
                <p class="text-muted mt-2"> With Telloe’s intuitive platform, you can review your interactions, create labels, devise follow-up plans, and send personalized video messages, all from one streamlined program. </p>
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
                <span class="font-bold lg:text-xl">Monitor Interaction with Prospects</span>
                </div>
            </div>
            <div class="pl-12">
                <p class="text-muted mt-2"> Quickly review your interactions with people, when and how you have interacted, and other vital indicators that help determine the best time to reach out to the prospect. </p>
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
                <span class="font-bold lg:text-xl">Create Labels</span>
                </div>
            </div>
            <div class="pl-12">
                <p class="text-muted mt-2"> Add custom labels to each person so you can group them into categories that align with your objectives. </p>
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
                <span class="font-bold lg:text-xl">Sort and Filter</span>
                </div>
            </div>
            <div class="pl-12">
                <p class="text-muted mt-2"> Quickly find the information you need to make informed decisions about your next interaction with those you want to build relationships with. </p>
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
                <span class="font-bold lg:text-xl">Add and Remove</span>
                </div>
            </div>
            <div class="pl-12">
                <p class="text-muted mt-2"> Once you have reached your goals, you can remove them from the list or keep them to build further trust or provide service as they move through your funnel and become a customer. </p>
            </div>
            </div>
        </div>
        <div class="lg:col-span-5 col-span-12 order-1 lg:order-2 lg:px-0 px-10">
            <img src="{{ asset('images/touchpoint/userfeedback.png') }}" alt="" />
            <br />
            <img src="{{ asset('images/touchpoint/videosequencer.png') }}" alt="" />
        </div>
        </div>    
    </div>

    <div class="container lg:py-24 py-8">
        <div class="grid lg:grid-cols-2 items-center">
        <div class="lg:pr-24 order-2 lg:order-1">
            <span class="font-serif text-xs font-semibold">FEEL IT</span>
            <h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-10 mb-5"> People buy stories and experiences, not products </h2>
            <span class="font-bold lg:text-xl">Connection is everything</span>
            <p class="text-muted lg:mt-4"> Stories have a magical way of creating emotion, intrigue, and connection. We help you build your brand’s story and leave a lasting impression with current and prospective clients with engagement strategies and videos that help your audience connect to you in ways they’re not connecting with your competitors. </p>
            <br />
            <br />
            <button type="button" class="w-full lg:w-auto px-9 lg:mb-0 mb-3 py-4 border-2 border-primary font-semibold rounded transition-all focus:outline-none font-serif bg-primary hover:bg-primary-dark text-white text-base">
            <span class="relative -bottom-px">CREATE MY STORY</span>
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
                <button type="button" class="lg:w-auto w-full px-8 py-4 rounded font-semibold focus:outline-none font-serif bg-white transition-all hover:bg-gray-200 text-primary text-xs">
                    <span class="relative -bottom-px">START FREE TRIAL</span>
                </button>
                </div>
            </div>
        </div>
    </div>
</div>

@stop
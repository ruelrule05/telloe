@extends('layouts.page', ['navbar' => false])

@section('title', ucwords("Telloe Affiliates | Be a part of the success story!"))

@section('content')

@include('partials.navbar-affiliates')


<div class="bg-secondary py-24">
    <div class="container">
        <div class="grid grid-cols-12 items-start">
            <div class="lg:col-span-8 col-span-12 lg:pr-24 order-2 lg:order-1">
                <h1 class="font-serif text-primary font-semibold sm:text-home-heading text-2xl">SHOW YOU THE MONEY!
                </h1>
                <p class="text-xl lg:my-16 mt-4 mb-8 text-muted lg:pr-36" style="color: #3d445e;">Earn <b style="color: #346ce2;">35% on every sale and $50 CPA</b> for customers you refer that upgrade to an annual subscription.</p>
                <button type="button" class="w-full lg:w-auto px-9 lg:mb-0 mb-3 py-4 border-2 border-primary font-semibold rounded transition-all focus:outline-none font-serif bg-primary hover:bg-primary-dark text-white text-base" onclick="window.location.href='https://go.telloe.com/register.html'"><span class="relative -bottom-px">JOIN
                        NOW</span></button>
            </div>
            <div class="lg:col-span-4 col-span-12 order-1 lg:order-2 lg:px-0 px-8 lg:mb-0 mb-6">
                <img src="/images/home/share.svg" style="width: 100%">
            </div>
        </div>
    </div>
</div>

<div class="container lg:py-24 py-8">
    <div class="grid grid-cols-12 items-center">
        <div class="lg:col-span-9 col-span-12">
            <span class="font-serif text-xs font-semibold">WE MAKE IT &mdash; YOU PROMOTE IT</span>
            <h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-10 mb-5">6 Great Reasons To Join</h2>
        </div>
    </div>

    <div class="lg:flex lg:mt-20 justify-between">
        <div class="lg:w-3/12 w-full">
            <h6 class="font-bold lg:text-xl">Promote What Works</h6>
            <p class="text-muted lg:mt-4">Advertise via PPC, Social Media, Email, or any other channel you want</p>
        </div>
        <div class="lg:w-3/12 w-full lg:mt-0 mt-8">
            <h6 class="font-bold lg:text-xl">Ongoing Rev Share</h6>
            <p class="text-muted lg:mt-4">Massive 35% on reoccurring subscriptions with outstanding Life Time Values</p>
        </div>
        <div class="lg:w-3/12 w-full lg:mt-0 mt-8">
            <h6 class="font-bold lg:text-xl">$50 Per Upgrade</h6>
            <p class="text-muted lg:mt-4">$50 CPA paid on all customers referred who upgrade to an annual plan</p>
        </div>
    </div>
    <div class="lg:flex lg:mt-20 justify-between">
        <div class="lg:w-3/12 w-full lg:mt-0 mt-8">
            <h6 class="font-bold lg:text-xl">Dedicated Team</h6>
            <p class="text-muted lg:mt-4">Expert affiliate management team to get you what you need when you need it
            </p>
        </div>
        <div class="lg:w-3/12 w-full lg:mt-0 mt-8">
            <h6 class="font-bold lg:text-xl">High Demand Product</h6>
            <p class="text-muted lg:mt-4">Evergreen product with a growing trend in demand and user uptake</p>
        </div>
        <div class="lg:w-3/12 w-full lg:mt-0 mt-8">
            <h6 class="font-bold lg:text-xl">Last Click Attribution </h6>
            <p class="text-muted lg:mt-4">Last-click attribution model with a massive and 90-day life of cookie
            </p>
        </div>
    </div>
</div>

<div class="container lg:py-24 py-8">
    <span class="font-serif text-xs font-semibold">OPEN TO ALL TYPES</span>
    <h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-20 mb-10">Who can become a Telloe Affiliate?
    </h2>
    <div class="grid grid-cols-12">
        <div class="lg:col-span-7 col-span-12 lg:pr-36 order-2 lg:order-1">
            <div>
                <div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all">
                    <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2"
                                class="line-1" />
                            <line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2" />
                        </svg>
                    </div>
                    <div class="pl-6">
                        <span class="font-bold lg:text-xl feature-title">Content Publishers</span>
                    </div>
                </div>
                <div class="pl-12 feature-content">
                    <p class="text-muted mt-2">Writing about marketing, coaching, mentoring, personal fitness, Counselling, sales, or other business content marketing? Earn money by promoting Telloe on your social media, blog or, other channels.</p>
                </div>
            </div>

            <div>
                <div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all">
                    <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2"
                                class="line-1" />
                            <line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2" />
                        </svg>
                    </div>
                    <div class="pl-6">
                        <span class="font-bold lg:text-xl">Marketing Agencies or Website Developers</span>
                    </div>
                </div>
                <div class="pl-12 feature-content">
                    <p class="text-muted mt-2">Recommend Telloe to your clients and earn commissions, all while helping them manage their meetings more seamlessly.</p>
                </div>
            </div>

            <div>
                <div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all">
                    <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2"
                                class="line-1" />
                            <line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2" />
                        </svg>
                    </div>
                    <div class="pl-6">
                        <span class="font-bold lg:text-xl">PPC Paid Search Specialists</span>
                    </div>
                </div>
                <div class="pl-12 feature-content">
                    <p class="text-muted mt-2">Run campaigns with 14-day free trial landing pages and attractive banners in both static and HTML5 formats.</p>
                </div>
            </div>

            <div>
                <div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all">
                    <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2"
                                class="line-1" />
                            <line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2" />
                        </svg>
                    </div>
                    <div class="pl-6">
                        <span class="font-bold lg:text-xl">Course Creators</span>
                    </div>
                </div>
                <div class="pl-12 feature-content">
                    <p class="text-muted mt-2">Creating courses, webinars, or teaching coaching, personal training or sales-related training? Promote Telloe with affiliate links, make sales and earn ongoing money on each subscription.</p>
                </div>
            </div>


            <div>
                <div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all">
                    <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2"
                                class="line-1" />
                            <line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2" />
                        </svg>
                    </div>
                    <div class="pl-6">
                        <span class="font-bold lg:text-xl">Skilled Marketer or Allrounder</span>
                    </div>
                </div>
                <div class="pl-12 feature-content">
                    <p class="text-muted mt-2">Decide how you want to promote Telloe to suitable audiences to earn great CPA and Revenue Share with the Telloe Affiliate Program.</p>
                </div>
            </div>
            <button type="button" class="w-full lg:w-auto px-9 lg:mb-0 mb-3 py-4 border-2 border-primary font-semibold rounded transition-all focus:outline-none font-serif bg-primary hover:bg-primary-dark text-white text-base" style="margin-top: 60px;" onclick="window.location.href='https://go.telloe.com/register.html'"><span
                    class="relative -bottom-px">JOIN NOW</span></button>
        </div>
        <div class="lg:col-span-5 col-span-12 order-1 lg:order-2 lg:px-0 px-10">
            <img src="/images/home/bookings.svg" alt="">
        </div>
    </div>
</div>

<div class="container lg:py-24 py-8">
    <span class="font-serif text-xs font-semibold">UNPARALLELED EXPERIENCE</span>
    <h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-20 mb-10">Why work with Telloe?</h2>
    <div class="lg:pl-10 lg:pr-10 lg:mt-0 mt-4" style="padding-left: 0; margin-left: 0">
        <p class="lg:text-xl text-muted lg:mt-5" style="padding-left: 0; margin-left: 0">As the founder of Telloe I have more than 20 successes in business and affiliate marketing behind me. My goal is to make the best product with the best customer support in the segment. I strive continuously to push my business to deliver the best life time value from its customers and the best revenue for you as an affiliate.
        
        <br /><br /><i style="color: #39445b">"I think to get
                richer, you want to be making money while you're asleep, and with affiliate marketing, you can
                do just that"</i></p>
        <p class="lg:text-xl text-muted lg:mt-5" style="padding-left: 0; margin-left: 0">Roo Wright
            <br /><br /><img src="/images/roosignature.png" style="height: 100px;"><br />
            <p style="color: #39445b; display: block;">Telloe Founder</p>
        </p>
    </div>
</div>

<div class="bg-primary lg:py-24 py-8">
    <div class="container">
        <div class="lg:flex justify-center">
            <div class="lg:w-8/12">
                <h4 class="text-white lg:text-3xl text-2xl font-semibold mb-4">Be apart of the success story!
                </h4>
                <p class="text-white lg:text-xl mb-10">Open the door to big earning opportunities and start now!
                </p>
                <button type="button" class="lg:w-auto w-full px-8 py-4 rounded font-semibold focus:outline-none font-serif bg-white transition-all hover:bg-gray-200 text-primary text-xs" onclick="window.location.href='https://go.telloe.com/register.html'"><span class="relative -bottom-px">JOIN
                        NOW</span></button>
            </div>
        </div>
    </div>
</div>
@stop


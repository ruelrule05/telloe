@extends('layouts.page')

@section('title', ucwords("Contact Us"))

@section('content')
	<div class="container py-36 text-center">
        <div class="px-4">
            <h1 class="text-4xl lg:text-5xl font-bold mb-4">Got a question about {{ config('app.name') }}?</h1>
            <div class="mb-12">
                <span class="text-xl">We're here to help! Our support team is available from 9am to 5pm - 7 days a week via email or messenger to answer your queries.</span>
            </div>

            <div class="lg:grid grid-cols-3 gap-4">
                <div class="py-5 px-8 bg-gray-50 rounded-2xl lg:mb-0 mb-6">
                    <h2 class="text-xl font-bold mb-2">
                        Email
                    </h2>
                    <p class="h-20 -mb-3 text-muted">Reach us by email and we will be in touch as soon as possible</p>
                    <a class="btn btn-primary inline-block" href="mailto:support@telloe.com"><span>Email Us</span></a>
                </div>
                <div class="py-5 px-8 bg-gray-50 rounded-2xl lg:mb-0 mb-6">
                    <h2 class="text-xl font-bold mb-2">
                        Facebook
                    </h2>
                    <p class="h-20 lg:-mb-3 text-muted">Message us on our official Facebook page and we will attend to your questions</p>
                    <a class="btn inline-flex items-center border bg-white" href="https://www.messenger.com/t/telloedotcom" target="_blank">
                       <messenger-icon class="fill-current h-4 w-4 mr-4 transform scale-150"></messenger-icon><span>Message Us</span>
                    </a>
                </div>
                <div class="py-5 px-8 bg-gray-50 rounded-2xl">
                    <h2 class="text-xl font-bold mb-2">
                        Docs
                    </h2>
                    <p class="h-20 lg:-mb-3 text-muted">Read our documentation for guides and answers to your common questions</p>
                    <a class="btn btn-outline-primary inline-block" href="https://docs.telloe.com"><span>Documentation</span></a>
                </div>
            </div>
        </div>
	</div>

@stop

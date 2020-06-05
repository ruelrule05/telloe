@extends('frontend.layouts.page')

@section('title', ucwords("The intelligent way to manage your clients' conversations, in one place"))

@section('content')

<div class="hero home-content">
	<div class="container">
		<div class="row align-items-center justify-content-center">
			<div class="col-md-6">
				<h1 class="font-heading display-5 font-weight-bold">Conversations. Done!</h1>
				<h2 class="text-muted h4 my-5">Introducing {{ config('app.name') }}, the intelligent way to manage your clients' conversations, in one place!</h2>

				<button class="btn btn-primary btn-lg badge-pill px-4">Start Free Trial</button>
				<button class="btn btn-outline-primary btn-lg badge-pill px-4">View Demo</button>
			</div>

			<div class="col-md-6 px-5">
				<img src="{{ asset('images/home/home_1.svg') }}" alt="" class="w-100">
			</div>
		</div>
	</div>
</div>

<div class="bg-secondary home-content home-content-2 position-relative overflow-hidden">
	<div class="container">
		<div class="row">
			<div class="col-md-8">
				<strong class="h5 text-orange font-heading">Why {{ config('app.name') }}?</strong>
				<h3 class="font-heading mt-4 mb-5 h1">Purposely designed for you to connect and communicate with your clients</h3>

				<div class="d-flex w-75 flex-wrap">
					<div class="w-50">
						<strong>Single Hub</strong>
						<p class="mt-3 mb-0 pr-4">Keep all client communication, bookings, payment history all in one place</p>
					</div>
					<div class="w-50">
						<strong>Be Available</strong>
						<p class="mt-3 mb-0 pr-4">Enable clients to message you via chat, voice memo, or video and reply when it suits you</p>
					</div>
					<div class="w-50 mt-5">
						<strong>Live Calls</strong>
						<p class="mt-3 mb-0 pr-4">Book and carry out live calls like Skype or Zoom, record and store them for clients to replay later</p>
					</div>
				</div>
			</div>

			<div class="col-md-4 position-static">
				<img src="{{ asset('images/home/home_2.svg') }}" alt="" class="w-50 position-absolute">
			</div>
		</div>
	</div>
</div>

<div class="home-content home-content-3 position-relative overflow-hidden">
	<div class="container">
		<div class="row align-items-center">
			<div class="col-md-6">
				<strong class="h5 text-primary font-heading">More value to clients.</strong>
				<h3 class="font-heading mt-3 mb-5 h1">Your clients can...</h3>
				<div class="text-right mb-4">
					<div class="d-inline-block bg-secondary p-4 rounded text-left w-75 border">
						<h5 class="font-heading mb-3">Review & Replay Messages</h5>
						<p class="mb-0">Keep your clients engaged by sending video and voice messages that can be viewed and replayed by your clients when it's convenient for them.</p>
					</div>
				</div>
				<div class="d-inline-block bg-secondary p-4 rounded text-left w-75 mb-4 border">
					<h5 class="font-heading mb-3">Receive Reminders</h5>
					<p class="mb-0">Let's face it, you are busy and so are your clients. By having reminders sent to your clients before the scheduled meetings, you will waste less of your time and theirs.</p>
				</div>
				<div class="text-right">
					<div class="d-inline-block bg-secondary p-4 rounded text-left w-75 border">
						<h5 class="font-heading mb-3">Send Video & Files</h5>
						<p class="mb-0">Create instructional videos of screen recordings demonstrating exercises along with supporting files such as word documents and spreadsheets.</p>
					</div>
				</div>
			</div>

			<div class="col-md-6 position-static">
				<img src="{{ asset('images/home/home_3.svg') }}" alt="" class="position-absolute">
			</div>
		</div>
	</div>
</div>

<div class="home-content home-content-4">
	<div class="container">
		<div class="row align-items-center">
			<div class="col-md-6">
				<img src="{{ asset('images/home/home_4.svg') }}" alt="" class="w-100 pr-5">
			</div>
			<div class="col-md-6">
				<strong class="h5 text-orange font-heading">Save time while delivering more.</strong>
				<h3 class="font-heading mt-3 mb-5 h1">You can...</h3>
				<div class="d-flex flex-wrap">
					<div class="w-50 pr-4">
						<h5 class="font-heading mb-2">Take & Set-up Payments</h5>
						<p class="mb-0 text-muted">Setup clients on auto subscription payments with ease and enjoy the convenience of not having to chase payments each month.</p>
					</div>
					<div class="w-50 mb-4 pr-4">
						<h5 class="font-heading mb-2">Setup Appointments with Clients</h5>
						<p class="mb-0 text-muted">Scheduling and rescheduling appointments are seamless, meaningful, less back and forth, working out suitable times to meet via video chat.</p>
					</div>
					<div class="w-50 pr-4">
						<h5 class="font-heading mb-2">Set-up Automated Chat Flows</h5>
						<p class="mb-0 text-muted">Chat flows enable you to collect information that you require from clients without the need to repeat the process for each client.</p>
					</div>
					<div class="w-50 pr-4">
						<h5 class="font-heading mb-2">Send Smart Reminders</h5>
						<p class="mb-0 text-muted">By sending reminders to clients of what you are currently working through with them, you create engagement, trust and ultimately better results as your clients are being held more accountable.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="home-content home-content-5 position-relative overflow-hidden">
	<div class="container">
		<div class="row">
			<div class="col-md-7">
				<strong class="h5 text-primary font-heading">Who is it for?</strong>
				<h3 class="font-heading mt-4 mb-5 h1">All the tools you need to communicate, two-way with clients in real time or when it works for you</h3>
				<strong class="h5 font-heading mb-4 d-block">Best suited for coaches of all kinds including:</strong>
				<div class="d-flex flex-wrap text-muted w-50">
					<div class="w-50">
						<div>Executive Coaching</div>
						<div>Leadership Coaching</div>
						<div>Career Coaching</div>
						<div>Team Coaching</div>
					</div><div class="w-50">
						<div>Business Coaching</div>
						<div>Systemic Coaching</div>
						<div>Life Coaching</div>
						<div>Performance Coaching</div>
					</div>
				</div>
			</div>
			
			<div class="col-md-5 position-static">
				<img src="{{ asset('images/home/home_5.svg') }}" alt="" class="w-50 position-absolute">
			</div>
		</div>
	</div>
</div>

<div class="home-content home-content-6 position-relative overflow-hidden">
	<div class="container">
		<div class="row align-items-center">
			<div class="col-md-8">
				<h3 class="font-heading mt-4 mb-5 h1"><span class="text-orange">Everything you need</span> in a client communication & management tool</h3>
				<div class="d-flex flex-wrap mb-5">
					<div class="w-50 pr-4">
						<h6 class="font-heading mb-3">Clients can be demanding, and that's ok.</h6>
						<p class="text-muted">
							They pay you for a service, and they expect service, and most of all, they want results, tangible results.
							<br />
							<br />
							To get <span class="text-orange">real results</span>, clients firstly want to feel they are getting value for money! By keeping in regular communication and by making yourself accessible (on your terms), you can quickly build repour, trust, and show the value you are providing.
						</p>
					</div><div class="w-50 pr-4">
						<h6 class="font-heading mb-3">The second part can be a little harder.</h6>
						<p class="text-muted">
							Showing real tangible results in many cases comes down to what the client is prepared to put in. By keeping in touch with clients and giving them the support they need, and by keeping them accountable, you have a far greater change of them getting the outcome they desire.
							<br />
							<br />
							Telleo helps you do all this and so much more!
						</p>
					</div>
				</div>


				<div class="d-flex flex-wrap">
					<div class="w-50 pr-4 mb-4">
						<h5 class="font-heading">Video Calls</h5>
						<p class="text-muted">Communicating two way video that can be recorded and referenced by your clients later is a great way to give extra value.</p>
					</div>
					<div class="w-50 pr-4">
						<h5 class="font-heading">Bookings</h5>
						<p class="text-muted">Managing bookings has never been easier. Enable clients to see your available time slots and book video call.</p>
					</div>
					<div class="w-50 pr-4 mb-4">
						<h5 class="font-heading">Payments</h5>
						<p class="text-muted">Never have to chase up clients for payments again. Once you set up their subscription or one-off payment, the system will collect payments for you.</p>
					</div>
					<div class="w-50 pr-4">
						<h5 class="font-heading">Onboarding</h5>
						<p class="text-muted">When you have new clients come on board, you can set them up and have them provide additional information you ned all through the interface.</p>
					</div>
					<div class="w-50 pr-4">
						<h5 class="font-heading">Replays</h5>
						<p class="text-muted">Clients can replay past videos and replay other videos you have provided at a time that works for them. There is no involvement needed from you.</p>
					</div>
					<div class="w-50 pr-4">
						<h5 class="font-heading">Communication</h5>
						<p class="text-muted">By delivering superior communication to your clients, they will be even happier with your services, increasing the length of time they are with you, maximizing revenue and increase the likelihood of referral business.</p>
					</div>
				</div>
			</div>
			<div class="col-md-4 position-static">
				<img src="{{ asset('images/home/home_6.svg') }}" alt="" class="position-absolute">
			</div>
		</div>
	</div>
</div>

<div class="home-content home-content-7">
	<div class="container text-center">
		<div class="row justify-content-center">
			<div class="col-md-6">
				<img src="{{ asset('images/brands/android.svg') }}" height="60">
				<img src="{{ asset('images/brands/apple.svg') }}" height="60">
				<h4 class="h1 font-heading my-4">Your clients can join you from anywhere seamlessly</h4>
				<p class="h5 text-muted mb-5">Options include download applications from Apple and Android or a Browser-based option</p>
				<button class="btn btn-primary btn-lg badge-pill px-4">Start Free Trial</button>
			</div>
		</div>
	</div>
</div>
<div class="home-content home-content-8">
	<div class="container">
		<div class="row align-items-center">
			<div class="col-md-5">
				<h3 class="font-heading mt-4 mb-4 h1">Get higher engagement</h3>
				<p class="mb-0">
					By having effective and frequent conversations with your clients you providing a chargeable value add.
					<br />
					<br />
					Remember you reply on your terms and when you are ready, but your customers see you as accessible.
				</p>
			</div>

			<div class="col-md-7 pl-5">
				<img src="{{ asset('images/home/home_8.svg') }}" alt="" class="w-100">
			</div>
		</div>
	</div>
</div>

<div class="home-content home-content-9">
	<div class="container">
		<div class="row align-items-center">
			<div class="col-md-7 text-center">
				<img src="{{ asset('images/home/home_9.svg') }}" alt="" class="w-75">
			</div>
			<div class="col-md-5">
				<h3 class="font-heading mt-4 mb-4 h1">Get higher lifetime value</h3>
				<p class="mb-0">
					Better communication means extending the likelihood of increasing the length of time you have your clients, giving you the best possible lifetime value of client outcome.
				</p>
			</div>
		</div>
	</div>
</div>

<div class="home-content home-content-10">
	<div class="container text-center">
		<div class="row justify-content-center">
			<div class="col-md-6">
				<h4 class="h1 font-heading mb-4">Take a free 2-minute tour <br /> <span class="text-muted font-weight-normal">of the product instantly</span></h4>
				<p class="h5 text-muted mb-5">Options include download applications from Apple and Android or a Browser-based option</p>
				<button class="btn btn-outline-orange btn-lg badge-pill px-4">View Demo</button>
			</div>
		</div>
	</div>
</div>

<div class="home-content bg-primary text-white home-content-11">
	<div class="container text-center py-5">
		<div class="row justify-content-center">
			<div class="col-md-6">
				<h4 class="h1 font-heading mb-5">Top-rated customer support to help you grow</h4>
				<p class="h5 mb-0">Get the help you need from our dedicated support team</p>
			</div>
		</div>
	</div>
</div>

<div class="home-content bg-secondary home-content-12">
	<div class="container text-center py-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h5 class="h1 font-heading mb-5">Choose plan & pricing</h5>
				<div class="bg-white rounded p-5">
					<h5 class="font-heading mb-3">How many seats do you need?</h5>
					<h5 class="h4 mb-5">I would like to up to <span class="text-primary font-heading" v-cloak>@{{ seats }}</span> seats</h5>
					<range-slider class="w-100 p-0" step="1" v-model="seats" v-cloak></range-slider>
					<div class="d-flex justify-content-between">
						<span>0</span>
						<span>50</span>
						<span>100</span>
					</div>

					<div class="d-flex mt-4 text-left">
						<div class="w-50 pr-5">
							<h5 class="font-heading text-primary h4 d-inline-block" v-cloak>$@{{ (3.33*seats).toFixed(2) }}</h5> USD per month
							<button class="btn btn-primary btn-lg btn-block badge-pill mt-4">Try it free now</button>
						</div>
						<div class="w-50">
							<h5 class="font-heading" v-cloak>For up to @{{ seats }} users</h5>
							<h6 class="font-heading">Plus you get everything below:</h6>
							<div class="d-flex text-muted">
								<div class="w-50">
									<div>Chatbot Builder</div>
									<div>Delayed Chat</div>
									<div>Live Chat</div>
									<div>Send Files</div>
									<div>Send Voice Memos</div>
									<div>Send Videos</div>
								</div>
								<div class="w-50">
									<div>Live Video</div>
									<div>Bookings</div>
									<div>Reminders</div>
									<div>Payment Management</div>
									<div>Custom URL Option</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</div>

<div class="home-content home-content-13">
	<div class="row justify-content-center align-items-center">
		<div class="col-md-6">
			<h4 class="h1 font-heading mb-4">FAQ</h4>

			<div id="faq">
			  	<div class="border-bottom pb-4 mb-4">
					<h5 class="font-heading cursor-pointer mb-0" data-toggle="collapse" data-target="#faq_1">How does the free trial work?</h5>
				    <div id="faq_1" class="collapse show" data-parent="#faq">
				      	<p class="pt-3 mb-0">
				        By signing up for a free trial you get full access to {{ config('app.name') }} for 14 days. There is no absolutely no obligations to continue at the end of your trial and its completely up to you if you wantto continue using the application.
				      	</p>
				    </div>
			  	</div>

			  	<div class="border-bottom pb-4 mb-4">
					<h5 class="font-heading cursor-pointer mb-0" data-toggle="collapse" data-target="#faq_2">What if I need help with my setup?</h5>
				    <div id="faq_2" class="collapse" data-parent="#faq">
				      	<p class="pt-3 mb-0">
				       	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquam gravida placerat. Praesent sit amet gravida nisl. Aliquam volutpat dolor enim, lacinia porttitor tellus iaculis vel.
				      	</p>
				    </div>
			  	</div>

			  	<div class="border-bottom pb-4 mb-4">
					<h5 class="font-heading cursor-pointer mb-0" data-toggle="collapse" data-target="#faq_3">What currencies are accepted?</h5>
				    <div id="faq_3" class="collapse" data-parent="#faq">
				      	<p class="pt-3 mb-0">
				       	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquam gravida placerat. Praesent sit amet gravida nisl. Aliquam volutpat dolor enim, lacinia porttitor tellus iaculis vel.
				      	</p>
				    </div>
			  	</div>

			  	<div class="border-bottom pb-4 mb-4">
					<h5 class="font-heading cursor-pointer mb-0" data-toggle="collapse" data-target="#faq_4">Can I change my plan?</h5>
				    <div id="faq_4" class="collapse" data-parent="#faq">
				      	<p class="pt-3 mb-0">
				       	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquam gravida placerat. Praesent sit amet gravida nisl. Aliquam volutpat dolor enim, lacinia porttitor tellus iaculis vel.
				      	</p>
				    </div>
			  	</div>

			  	<div class="border-bottom pb-4 mb-4">
					<h5 class="font-heading cursor-pointer mb-0" data-toggle="collapse" data-target="#faq_5">How do the pricing tiers work?</h5>
				    <div id="faq_5" class="collapse" data-parent="#faq">
				      	<p class="pt-3 mb-0">
				       	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquam gravida placerat. Praesent sit amet gravida nisl. Aliquam volutpat dolor enim, lacinia porttitor tellus iaculis vel.
				      	</p>
				    </div>
			  	</div>

			  	<div class="border-bottom pb-4 mb-4">
					<h5 class="font-heading cursor-pointer mb-0" data-toggle="collapse" data-target="#faq_6">What payment types are accepted?</h5>
				    <div id="faq_6" class="collapse" data-parent="#faq">
				      	<p class="pt-3 mb-0">
				       	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquam gravida placerat. Praesent sit amet gravida nisl. Aliquam volutpat dolor enim, lacinia porttitor tellus iaculis vel.
				      	</p>
				    </div>
			  	</div>

			  	<div class="border-bottom pb-4 mb-4">
					<h5 class="font-heading cursor-pointer mb-0" data-toggle="collapse" data-target="#faq_7">What is a contact?</h5>
				    <div id="faq_7" class="collapse" data-parent="#faq">
				      	<p class="pt-3 mb-0">
				       	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquam gravida placerat. Praesent sit amet gravida nisl. Aliquam volutpat dolor enim, lacinia porttitor tellus iaculis vel.
				      	</p>
				    </div>
			  	</div>

			  	<div class="border-bottom pb-4 mb-4">
					<h5 class="font-heading cursor-pointer mb-0" data-toggle="collapse" data-target="#faq_8">Can I upgrade from a monthly to an annual plan?</h5>
				    <div id="faq_8" class="collapse" data-parent="#faq">
				      	<p class="pt-3 mb-0">
				       	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquam gravida placerat. Praesent sit amet gravida nisl. Aliquam volutpat dolor enim, lacinia porttitor tellus iaculis vel.
				      	</p>
				    </div>
			  	</div>
			</div>
		</div>

		<div class="col-md-4 position-static">
			<img src="{{ asset('images/home/home_13.svg') }}" alt="" class="positixon-absolute w-100">
		</div>
	</div>
</div>

<div class="home-content home-content-14">
	<div class="container text-center">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h4 class="h1 font-heading mb-5">Ready to grow your business through the most powerful communication platform on the planet?</h4>
				<button class="btn btn-primary btn-lg badge-pill px-4">Start Free Trial</button>
			</div>
		</div>
	</div>
</div>
@stop

@section('scripts')
<script>
	const USER_CUSTOMER = {!! $userCustomer ? "JSON.parse('".json_encode($userCustomer)."');" : 'null' !!};
</script>
@stop
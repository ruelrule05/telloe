@extends('frontend::layouts.page')

@section('title', ucwords("The intelligent way to manage your clients' conversations, in one place"))

@section('content')

<div class="hero home-content">
	<div class="container">
		<div class="row flex-row-reverse align-items-center justify-content-center">
			<div class="col-md-6 px-4 px-md-5 mb-5 mb-md-0">
				<img src="{{ asset('images/home/home_1.svg') }}" alt="" class="w-100">
			</div>
			<div class="col-md-6 pr-md-0">
				<h1 class="font-heading font-weight-bold mb-0 display-4">It's time to Telloe...</h1>
				<h2 class="font-heading mb-4">Scheduling a meeting has never been easy!</h2>
				<p class="text-muted h5 font-weight-light mb-5">Control your available meeting times and empower your contacts to schedule meetings with you at a time that works for you both. <br /><br /> No more ping pong back and forth setting dates and times.</p>
				<button class="btn btn-primary btn-lg px-4 btn-sm-block mb-2 mb-md-0" type="button" @click.prevent="auth = true; action = 'signup'">Start Free Trial</button>
				<button class="btn btn-outline-primary btn-lg px-4 btn-sm-block">Watch video</button>
			</div>
		</div>
	</div>
</div>

<div class="bg-gray-100 home-content home-content-2 position-relative">
	<div class="container py-5">
		<div class="row flex-row-reverse">
			<div class="col-md-4">
				<img src="{{ asset('images/home/home_2.svg') }}" alt="">
			</div>
			<div class="col-md-8">
				<strong class="h5 text-orange font-heading">Simple solutions.</strong>
				<h3 class="font-heading mt-4 mb-5 h1">Manage contact with your contacts.</h3>
				<p class="mb-0 mt-1 pr-4 text-muted font-weight-light h5">Set available booking times ready for your contacts to select or book it for them all while seamlessly synced to your existing calendars such as Google, iCal, or Outlook. <br /><br />Track booked meetings over time and keep account of the number of meetings for each contact.</p>
			</div>
		</div>
	</div>
</div>

<div class="home-content home-content-3 position-relative">
	<div class="container py-5">
		<div class="row flex-row-reverse">
			<div class="col-md-5 mt-n5 mt-md-0">
				<img src="{{ asset('images/home/home_5.svg') }}" alt="" class="mt-n5 mt-md-0">
			</div>
			<div class="col-md-7 pr-5">
				<strong class="h5 text-primary font-heading">Save time, get organized, get it done!</strong>
				<h3 class="font-heading mt-4 mb-5 h1">Simplify how you manage bookings, payments, and communications all in one simple to use tool.</h3>
				<p class="mb-0 mt-1 pr-4 text-muted font-weight-light h5">
				Create and track multiple bookings that you can make available in blocks for regular meetings. <br /><br />Enable clients to choose who they want to book within your organization by setting up organizational booking calendars. <br /><br />Charge for meeting with a single set price, monthly subscriptions, or bulk pricing for contacts who want to book blocks of meetings.Take payments for meetings via our integrated Stripe and Xero solutions.<br /><br />Conduct meetings face to face, with Zoom, Skype, or Google Meets or use our own fully-featured messaging system inside Telloe.
				</p>
			</div>
		</div>
	</div>
</div>

<div class="home-content home-content-4 bg-gray-100">
	<div class="container">
		<div class="row align-items-center">
			<div class="col-md-6 mb-md-0 mb-3 mt-n3 mt-md-0">
				<img src="{{ asset('images/home/home_4.svg') }}" alt="" class="w-100 pr-5 mt-n5 mt-md-0">
			</div>
			<div class="col-md-6">
				<strong class="h5 text-orange font-heading">Save time while delivering more.</strong>
				<h3 class="font-heading mt-3 mb-5 h1">You can...</h3>
				<div class="d-md-flex">
					<div class="flex-1 pr-4 mb-4">
						<h5 class="mb-1">Take & Set-up Payments</h5>
						<p class="mb-0 text-muted font-weight-light">Setup clients on auto subscription payments with ease and enjoy the convenience of not having to chase payments each month. Send requests for one off payments with ease and competitive processing fees.</p>
					</div>
					<div class="flex-1 mb-4 pr-4">
						<h5 class="mb-1">Setup Booking Times</h5>
						<p class="mb-0 text-muted font-weight-light">Scheduling and rescheduling booking is seamless! After setting your available times for meetings, you will enjoy less back and forth, and time zone calculations are handled automatically between you and your clients.</p>
					</div>
				</div>
				<div class="d-md-flex">
					<div class="flex-1 pr-4 mb-4">
						<h5 class="mb-1">Record & Send</h5>
						<p class="mb-0 text-muted font-weight-light">Record and share video conversations you have with clients, record your screen via video and record yourself, and send the videos to clients when it works for you.</p>
					</div>
					<div class="flex-1 pr-4">
						<h5 class="mb-1">Send Smart Reminders</h5>
						<p class="mb-0 text-muted font-weight-light">By sending reminders to clients of what you are currently working through with them, you create engagement, trust and ultimately better results as your clients are being held more accountable.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="home-content home-content-5 position-relative">
	<div class="container">
		<div class="row flex-row-reverse align-items-center">
			<div class="col-md-6">
				<img src="{{ asset('images/home/home_3.svg') }}" alt="">
			</div>
			<div class="col-md-6">
				<div class="bg-white d-inline-block mb-5 mr-n4 rounded pr-2 py-2 py-md-0">
					<strong class="h5 text-primary font-heading">More value to clients.</strong>
					<h3 class="font-heading mt-3 h1 mb-0">Your clients can...</h3>
				</div>
				<div class="text-right mb-4">
					<div class="d-inline-block bg-gray-100 p-4 rounded text-left w-75 border">
						<h5 class="mb-1">Review & Replay Messages</h5>
						<p class="mb-0 text-muted font-weight-light">Keep your clients engaged by sending video and voice messages that can be viewed and replayed by your clients when it's convenient for them.</p>
					</div>
				</div>
				<div class="d-inline-block bg-gray-100 p-4 rounded text-left w-75 mb-4 border">
					<h5 class="mb-1">Receive Reminders</h5>
					<p class="mb-0 text-muted font-weight-light">Let's face it, you are busy and so are your clients. By having reminders sent to your clients before the scheduled meetings, you will waste less of your time and theirs.</p>
				</div>
				<div class="text-right">
					<div class="d-inline-block bg-gray-100 p-4 rounded text-left w-75 border">
						<h5 class="	mb-1">Send Video & Files</h5>
						<p class="mb-0 text-muted font-weight-light">Create instructional videos of screen recordings demonstrating exercises along with supporting files such as word documents and spreadsheets.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="home-content home-content-6 position-relative bg-gray-100">
	<div class="container">
		<div class="row flex-row-reverse align-items-center" id="features">
			<div class="col-md-4 mt-n4 mt-md-0">
				<img src="{{ asset('images/home/home_6.svg') }}" alt="" class="">
			</div>
			<div class="col-md-8">
				<h3 class="font-heading mt-4 mb-5 h1"><span class="text-orange">Everything you need</span> in a client communication & management tool</h3>
				<div class="d-md-flex flex-wrap">
					<div class="flex-1 pr-4 mb-4">
						<h6 class="font-heading mb-1">Clients can be demanding, and that's ok.</h6>
						<p class="text-muted font-weight-light mb-0">
							They pay you for a service, and they expect service, and most of all, they want results, tangible results.
							<br />
							<br />
							To get <span class="text-orange">real results</span>, clients firstly want to feel they are getting value for money! By keeping in regular communication and by making yourself accessible (on your terms), you can quickly build repour, trust, and show the value you are providing.
						</p>
					</div>
					<div class="flex-1 pr-4 mb-4">
						<h6 class="font-heading mb-1">The second part can be a little harder.</h6>
						<p class="text-muted font-weight-light mb-0">
							Showing real tangible results in many cases comes down to what the client is prepared to put in. By keeping in touch with clients and giving them the support they need, and by keeping them accountable, you have a far greater change of them getting the outcome they desire.
							<br />
							<br />
							Telleo helps you do all this and so much more!
						</p>
					</div>
				</div>

				<div class="d-md-flex flex-wrap">
					<div class="flex-1 pr-4 mb-4">
						<h6 class="font-heading mb-1">Video Calls</h6>
						<p class="text-muted font-weight-light mb-0">Communicating two way video that can be recorded and referenced by your clients later is a great way to give extra value.</p>
					</div>
					<div class="flex-1 pr-4 mb-4">
						<h6 class="font-heading mb-1">Bookings</h6>
						<p class="text-muted font-weight-light mb-0">Managing bookings has never been easier. Enable clients to see your available time slots and book video call.</p>
					</div>
				</div>

				<div class="d-md-flex flex-wrap">
					<div class="flex-1 pr-4 mb-4">
						<h6 class="font-heading mb-1">Payments</h6>
						<p class="text-muted font-weight-light mb-0">Never have to chase up clients for payments again. Once you set up their subscription or one-off payment, the system will collect payments for you.</p>
					</div>
					<div class="flex-1 pr-4 mb-4">
						<h6 class="font-heading mb-1">Onboarding</h6>
						<p class="text-muted font-weight-light mb-0">When you have new clients come on board, you can set them up and have them provide additional information you ned all through the interface.</p>
					</div>
				</div>

				<div class="d-md-flex flex-wrap">
					<div class="flex-1 pr-4 mb-4">
						<h6 class="font-heading mb-1">Replays</h6>
						<p class="text-muted font-weight-light mb-0">Clients can replay past videos and replay other videos you have provided at a time that works for them. There is no involvement needed from you.</p>
					</div>
					<div class="flex-1 pr-4">
						<h6 class="font-heading mb-1">Communication</h6>
						<p class="text-muted font-weight-light mb-0">By delivering superior communication to your clients, they will be even happier with your services, increasing the length of time they are with you, maximizing revenue and increase the likelihood of referral business.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="home-content home-content-7">
	<div class="container text-center">
		<div class="row justify-content-center">
			<div class="col-md-7">
				<div class="d-flex align-items-center justify-content-center">
					<img src="{{ asset('images/brands/chrome.webp') }}" alt="Google Chrome" height="55" class="mx-1">
					<img src="{{ asset('images/brands/firefox.png') }}" alt="Firefox" height="46" class="mx-1">
					<img src="{{ asset('images/brands/safari.png') }}" alt="Firefox" height="50" class="mx-1">
					<img src="{{ asset('images/brands/edge.png') }}" alt="Microsoft Edge" height="45" class="mx-1">
				</div>
				<h4 class="h1 font-heading my-4">Your clients can join you from any browser seamlessly</h4>
				<p class="h5 text-muted mb-5 font-weight-light line-height-sm">Optimized to work efficiently with major and modern web browsers</p>
				<button class="btn btn-primary btn-lg btn-sm-block px-4" type="button" @click.prevent="auth = true; action = 'signup'">Start Free Trial</button>
			</div>
		</div>
	</div>
</div>

<div class="home-content home-content-8 bg-gray-100">
	<div class="container">
		<div class="row flex-row-reverse align-items-center">
			<div class="col-md-6 mb-4 mb-md-0 mt-n2 mt-md-0">
				<img src="{{ asset('images/home/home_8.svg') }}" alt="" class="w-100 mt-n5 mt-md-0">
			</div>
			<div class="col-md-6">
				<h3 class="font-heading mb-4 h1">Engaged customers are happy customers</h3>
				<p class="mb-0 text-muted font-weight-light">
					By having active and frequent conversations with your clients, you are providing additional value that you can incorporate into your fee structure or provide as a free service.
					<br />
					<br />
					Remember, you reply on your terms and when you are ready, but your customers see you as being accessible to you and available.
				</p>
			</div>
		</div>
	</div>
</div>

<div class="home-content home-content-9">
	<div class="container">
		<div class="row align-items-center">
			<div class="col-md-7 text-center mt-n4 mt-md-0">
				<img src="{{ asset('images/home/home_9.svg') }}" alt="" class="w-75 mt-n5 mt-md-0">
			</div>
			<div class="col-md-5 mt-md-0 mt-n5 bg-white">
				<h3 class="font-heading mt-4 mb-4 h1">Earn more from the same customer</h3>
				<p class="mb-0 text-muted font-weight-light">
					Higher lifetime values is something that all business strive for! Better communication means extending the likelihood of increasing the length of time you have your clients, giving you the best possible lifetime value of client outcome.
				</p>
			</div>
		</div>
	</div>
</div>

<div class="home-content home-content-10 bg-gray-100">
	<div class="container text-center">
		<div class="row justify-content-center">
			<div class="col-md-6">
				<h4 class="h1 font-heading mb-4">Take a free 2-minute tour <br /> of the product instantly</h4>
				<p class="h5 text-muted font-weight-light mb-5">Our easy to use software is browser-based, so there is nothing to install, and you can start using it as soon as you sign up!</p>
				<a class="btn btn-orange btn-lg btn-sm-block px-4" href="{{ url('/@johnwell') }}">Book a Demo</a>
			</div>
		</div>
	</div>
</div>

<div class="home-content bg-primary text-white home-content-11">
	<div class="container text-center py-md-5">
		<div class="row justify-content-center">
			<div class="col-md-6">
				<h4 class="h1 font-heading mb-5">Top-rated customer support to help you grow</h4>
				<p class="h5 mb-0 font-weight-light">Get the help you need from our dedicated support team</p>
			</div>
		</div>
	</div>
</div>

<div class="home-content bg-gray-100 home-content-12">
	<div class="container text-center py-md-5" id="pricing">
		<div class="row justify-content-center">
			<div class="col-md-10">
				<h5 class="h1 font-heading mb-md-5 mb-4">Choose plan & pricing</h5>
				
				<div class="row text-left">
					@foreach($plans as $plan)
					<div class="col-md-4">
						<div class="border rounded bg-white plan p-3 position-relative" @click="selectPlan(plan)">
							<h5 class="mb-4 font-heading text-primary text-uppercase">{{ $plan->name }}</h5>
							<h4 class="mb-0 font-weight-normal d-inline"><strong>${{ intval($plan->price) }}</strong></h4><span>{{ substr(strval($plan->price - intval($plan->price)), 1) }}</span> / {{ $plan->interval }}

							<div class="text-secondary">
								@if($plan->per_user)
									per user
								@endif
								&nbsp;
							</div>
							
							<div class="my-3">
								<strong>Bookings</strong>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Booking System
								</div>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Booking URL
								</div>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Time Zone Manager
								</div>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Email Reminders
								</div>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Unlimited Service Types
								</div>
								
								<div class="booking-plus" data-plan="{{ strtolower($plan->name) }}">
									<strong class="mt-3 d-block">Booking Plus</strong>
									<!-- <div class="d-flex align-items-center">
										<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Multi Book&nbsp;&nbsp;<u><a href="">Learn more</a></u>
									</div> -->
									<div class="d-flex align-items-center">
										<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Multi-team booking system
									</div>
									<div class="d-flex align-items-center">
										<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Organization Booking URL
									</div>
									<div class="d-flex align-items-center">
										<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Linked Accounts
									</div>
									<div class="d-flex align-items-center">
										<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Admin Bookings
									</div>
								</div>

								<div class="payments" data-plan="{{ strtolower($plan->name) }}">
									<strong class="mt-3 d-block">Payments</strong>
									<div class="d-flex align-items-center">
										<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Take Payments (via Stripe)
									</div>
									<div class="d-flex align-items-center">
										<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Xero Accounting Integration
									</div>
									<div class="d-flex align-items-center">
										<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Subscription Manager
									</div>
								</div>

								<div class="integrations" data-plan="{{ strtolower($plan->name) }}">
									<strong class="mt-3 d-block">Integrations</strong>
									<div class="d-flex align-items-center">
										<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Zoom
									</div>
									<div class="d-flex align-items-center">
										<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Google Calendar
									</div>
									<div class="d-flex align-items-center">
										<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Outlook Calendar
									</div>
									<div class="d-flex align-items-center">
										<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Xero
									</div>
									<div class="d-flex align-items-center">
										<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Stripe
									</div>
								</div>



								<strong class="mt-3 d-block">Communication</strong>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Unlimited Contacts
								</div>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Delayed Chat
								</div>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Live Chat
								</div>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Send Files
								</div>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Send Voice Memos
								</div>
								<div class="d-flex align-items-center">
									<checkmark-icon width="30" height="30" class="fill-success ml-n1"></checkmark-icon>Live Video Calls
								</div>
							</div>

							<small class="text-secondary">+ Stripe processing fees of 2.9% + 30¢ per successful card charge.</small>

							<button class="btn btn-outline-primary btn-block px-4 mt-4" type="button" @click.prevent="auth = true; action = 'signup'">Start Free Trial</button>

						</div>
					</div>
					@endforeach
				</div>

			</div>
		</div>
	</div>
</div>

<div class="home-content home-content-13">
	<div class="container">
		<div class="row flex-row-reverse justify-content-center align-items-center">
			<div class="col-md-4 mt-n3 mt-md-0">
				<img src="{{ asset('images/home/home_13.svg') }}" alt="" class="w-100 mt-n5 mt-md-0 px-5 px-md-0 mb-4 mb-md-0">
			</div>
			<div class="col-md-8">
				<h4 class="h1 font-heading mb-4">FAQ</h4>

				<div id="faq">
				  	<div class="border-bottom pb-4 mb-4">
						<h5 class="font-heading cursor-pointer mb-0" data-toggle="collapse" data-target="#faq_1">How does the free trial work?</h5>
					    <div id="faq_1" class="collapse show" data-parent="#faq">
					      	<p class="pt-3 mb-0">
							  By signing up for a free trial, you get full access to Telloe for 14 days. There is absolutely no obligation to continue at the end of your trial and it's completely up to you if you want to continue using the application.
					      	</p>
					    </div>
				  	</div>

				  	<div class="border-bottom pb-4 mb-4">
						<h5 class="font-heading cursor-pointer mb-0" data-toggle="collapse" data-target="#faq_2">What if I need help with my setup?</h5>
					    <div id="faq_2" class="collapse" data-parent="#faq">
					      	<p class="pt-3 mb-0">
							  We're here to help. If you have any trouble in setting up and need training, simply book a 15 minute demo call or send us an email at <a href="mailto:support@telloe.com">support@telloe.com</a>.
					      	</p>
					    </div>
				  	</div>

				  	<div class="border-bottom pb-4 mb-4">
						<h5 class="font-heading cursor-pointer mb-0" data-toggle="collapse" data-target="#faq_3">What currencies are accepted?</h5>
					    <div id="faq_3" class="collapse" data-parent="#faq">
					      	<p class="pt-3 mb-0">
							  Currency is default to USD; however, other major currencies such as AUD, CHF, EUR, GBP, CAD, SGD, PHP and NZD. Feel free to reach out to us if you need assistance on adding your own currency that is not listed yet.
					      	</p>
					    </div>
				  	</div>

				  	<div class="border-bottom pb-4 mb-4">
						<h5 class="font-heading cursor-pointer mb-0" data-toggle="collapse" data-target="#faq_4">Can I change my plan?</h5>
					    <div id="faq_4" class="collapse" data-parent="#faq">
					      	<p class="pt-3 mb-0">
							  Your plan is based on the purpose you would like to use Telloe for. Standard features include bookings and communication functionality. As you add more features, pricing is increased accordingly. To learn more about it, feel free to visit our link to <a href="#pricing">plan and pricing</a>.
					      	</p>
					    </div>
				  	</div>

				  	<div class="border-bottom pb-4 mb-4">
						<h5 class="font-heading cursor-pointer mb-0" data-toggle="collapse" data-target="#faq_6">What payment types are accepted?</h5>
					    <div id="faq_6" class="collapse" data-parent="#faq">
					      	<p class="pt-3 mb-0">
					       	We accept most major credit cards.
					      	</p>
					    </div>
				  	</div>

				  	<div class="border-bottom pb-4 mb-4">
						<h5 class="font-heading cursor-pointer mb-0" data-toggle="collapse" data-target="#faq_7">What is a contact?</h5>
					    <div id="faq_7" class="collapse" data-parent="#faq">
					      	<p class="pt-3 mb-0">
							  A contact is a record of a person stored in Telloe that has signed up to receive ongoing communication with you. Effectively, these are your customers you provide coaching services to.
					      	</p>
					    </div>
				  	</div>

					<div class="border-bottom pb-4 mb-4">
					<h5 class="font-heading cursor-pointer mb-0" data-toggle="collapse" data-target="#faq_8">What is a member?</h5>
					<div id="faq_8" class="collapse" data-parent="#faq">
							<p class="pt-3 mb-0"> 
							A member is a record of a person who is a part of your company/organization. You can add members to your Company, assign them to a team or organization, and manage their bookings using Telloe. You could activate this feature by option for the Enterprise Plan.
							</p>
					</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="home-content home-content-14 bg-gray-100">
	<div class="container text-center">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h4 class="h1 font-heading mb-5">Ready to grow your business through the most powerful communication platform on the planet?</h4>
				<button class="btn btn-primary btn-lg btn-sm-block px-4" type="button" @click.prevent="auth = true; action = 'signup'">Start Free Trial</button>
			</div>
		</div>
	</div>
</div>
@stop

@section('scripts')
	<script type="text/javascript" src="{{ config('app.url') }}/js/widget.js?p={{ env('HOME_WIDGET_USERNAME') }}"></script>
@stop
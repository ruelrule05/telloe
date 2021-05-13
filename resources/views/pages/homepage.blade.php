@extends('layouts.page')

@section('title', ucwords("The intelligent way to manage your clients' conversations, in one place"))

@section('content')

<div class="bg-secondary py-24">
	<div class="container">
		<div class="grid grid-cols-12 items-start">
			<div class="lg:col-span-8 col-span-12 lg:pr-24 order-2 lg:order-1">
				<h1 class="font-serif text-primary font-semibold sm:text-home-heading text-4xl">MONDAY&mdash;FRIDAY SIMPLIFIED.</h1>
				<p class="text-xl lg:my-16 mt-4 mb-8 text-muted lg:pr-36">Organize meetings with people on different video calling platforms across multiple time zones; without needless back and forth.</p>
				<button type="button" class="w-full lg:w-auto px-9 lg:mb-0 mb-3 py-4 border-2 border-primary font-semibold rounded transition-all focus:outline-none font-serif bg-primary hover:bg-primary-dark text-white text-base" @click="auth = true; action = 'signup'"><span  class="relative -bottom-px">START FREE TRIAL</span></button>
				<button type="button" class="w-full lg:w-auto px-9 py-4 rounded font-semibold focus:outline-none font-serif hover:bg-primary transition-all hover:text-white text-primary border-2 border-primary lg:ml-4 text-base" @click="openVideoDemo()"><span class="relative -bottom-px">WATCH VIDEO</span></button>
			</div>
			<div class="lg:col-span-4 col-span-12 order-1 lg:order-2 lg:px-0 px-8 lg:mb-0 mb-6">
				<img src="{{ asset('images/home/hero.svg') }}">
			</div>
		</div>
	</div>
</div>

 
<div class="container lg:py-24 py-8" id="features">
	<div class="grid lg:grid-cols-2 items-center">
		<div class="lg:pr-24">
			<span class="font-serif text-xs font-semibold">SAVE TIME, FEWER MISTAKES, LESS FRUSTRATION!</span>
			<h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5">Monday to Friday meetings just got a whole lot simpler! smarter!</h2>
		</div>
		<div class="lg:pl-10 lg:pr-10 lg:mt-0 mt-4">
			<span class="font-bold lg:text-xl">Collaborate, Organize, Week Sorted</span>
			<p class="lg:text-xl text-muted lg:mt-5">Simplified online scheduling that takes the hassle out of bookings. <br /><br />Your flexible booking calendar displays your daily, weekly and monthly availability so your contacts can self-schedule appointments that work for everyone!</p>
		</div>
	</div>
</div>

 
<div class="container lg:py-24 py-8">
	<div class="grid lg:grid-cols-2 items-center">
		<div class="lg:pr-24 order-2 lg:order-1">
			<span class="font-serif text-xs font-semibold">GET IT RIGHT THE FIRST TIME</span>
			<h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-10 mb-5">Stop the back and forth.</h2>
			<span class="font-bold lg:text-xl">One Of A Kind - Scheduling Slider</span>
			<p class="text-muted lg:mt-4">Create ad-hoc meeting slots with our one-of-a-kind collaborative scheduling slider and connect with others in real-time to match up meetings that work for everyone. Instantly see each other's availability and corresponding time zones all on the one page. <br /><br />Who needs the back and forth  when trying to sort out availability? It’s no problem when you've got Telloe!</p>
		</div>
		<div class="lg:pl-10 order-1 lg:order-2 lg:mb-0 mb-4">
			<img src="images/home/scheduler.svg" alt="">
		</div>
	</div>
</div>

 
<div class="container lg:py-24 py-8">
	<div class="grid lg:grid-cols-2 items-center">
		<div class="lg:pr-24">
			<img src="images/home/integrations.svg" alt="">
		</div>
		<div class="lg:pl-10">
			<span class="font-serif text-xs font-semibold">ONE EASY TO USE TOOL</span>
			<h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-10 mb-5">Different meeting types, no problem.</h2>
			<span class="font-bold text-xl">Popular Platforms Work with Telloe</span>
			<p class="text-muted lg:mt-4">Arrange face-to-face meetings, phone calls,  Skype calls, Zoom calls and Google Meets to create  bookings that include your platform links; or you can also make use of our very own fully-featured Telloe video messaging system. <br /><br />Our advanced but simple to use features give you maximum flexibility!</p>
		</div>
	</div>
</div>


<div class="container lg:py-24 py-8">
	<span class="font-serif text-xs font-semibold">MAKE IT BEND</span>
	<h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-20 mb-10">Flexibility right where you need it.</h2>
	<div class="grid grid-cols-12">
		<div class="lg:col-span-7 col-span-12 lg:pr-36 order-2 lg:order-1">
			<div class="feature" :class="{show: feature == 1}">
				<div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all" @click="feature = 1">
					<div>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2" class="line-1"/>
							<line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2"/>
						</svg>
					</div>
					<div class="pl-6">
						<span class="font-bold lg:text-xl feature-title">Schedule Recurring Bookings At Once</span>
					</div>
				</div>
				<div class="pl-12 feature-content">
					<p class="text-muted mt-2">Do away with the trouble of having to manually book recurring appointments whenever they are due. <br /><br />With our recurring meeting  feature, you and your contacts can create one booking and set it to recurring so you don't have to keep repeating the task. Automatic reminders ensure that everyone is in the loop and no one misses out.</p>
				</div>
			</div>

			<div class="feature" :class="{show: feature == 2}">
				<div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all" @click="feature = 2">
					<div>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2" class="line-1"/>
							<line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2"/>
						</svg>
					</div>
					<div class="pl-6">
						<span class="font-bold lg:text-xl">Book Multiple Time Slots All At Once</span>
					</div>
				</div>
				<div class="pl-12 feature-content">
					<p class="text-muted mt-2">Easily schedule multiple appointments in different time slots concurrently without having to wait to complete one booking before initiating another.</p>
				</div>
			</div>

			<div class="feature" :class="{show: feature == 3}">
				<div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all" @click="feature = 3">
					<div>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2" class="line-1"/>
							<line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2"/>
						</svg>
					</div>
					<div class="pl-6">
						<span class="font-bold lg:text-xl">Booking Blocks</span>
					</div>
				</div>
				<div class="pl-12 feature-content">
					<p class="text-muted mt-2">Create groups of bookings in a few simple clicks. Great for those times when you offer multiple call services as a package.</p>
				</div>
			</div>
			
			<div class="feature" :class="{show: feature == 4}">
				<div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all" @click="feature = 4">
					<div>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2" class="line-1"/>
							<line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2"/>
						</svg>
					</div>
					<div class="pl-6">
						<span class="font-bold lg:text-xl">Add Notes to Bookings</span>
					</div>
				</div>
				<div class="pl-12 feature-content">
					<p class="text-muted mt-2">Create notes for your contacts and their bookings to help you remember important information for future or past referencing.</p>
				</div>
			</div>


			<div class="feature" :class="{show: feature == 5}">
				<div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all" @click="feature = 5">
					<div>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2" class="line-1"/>
							<line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2"/>
						</svg>
					</div>
					<div class="pl-6">
						<span class="font-bold lg:text-xl">Send Smart Reminders</span>
					</div>
				</div>
				<div class="pl-12 feature-content">
					<p class="text-muted mt-2">Automated reminders help you notify your clients of their upcoming appointments while also letting them know that you're thinking about them. These smart reminders help you  build trust between you and your clients, and ultimately produce better results and greater client satisfaction.</p>
				</div>
			</div>


			<div class="feature" :class="{show: feature == 6}">
				<div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all" @click="feature = 6">
					<div>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2" class="line-1"/>
							<line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2"/>
						</svg>
					</div>
					<div class="pl-6">
						<span class="font-bold lg:text-xl">Shared Bookings</span>
					</div>
				</div>
				<div class="pl-12 feature-content">
					<p class="text-muted mt-2">Invite one or more people to the same time slot for multi-participant meetings.</p>
				</div>
			</div>
		</div>
		<div class="lg:col-span-5 col-span-12 order-1 lg:order-2 lg:px-0 px-10">
			<img src="images/home/bookings.svg" alt="">
		</div>
	</div>
</div>


<div class="bg-gray-100 lg:py-24 py-8" id="about">
	<div class="container">
		<div class="grid lg:grid-cols-12 items-center">
			<div class="col-span-6 lg:pr-10 order-2 lg:order-1">
				<span class="font-serif text-xs font-semibold">TEAM WORK MAKES THE DREAM WORK</span>
				<h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-10 mb-5">Working together with others in a team, easy!</h2>
				<span class="font-bold text-xl">Create Team Booking Groups</span>
				<p class="text-muted lg:mt-5">Share your teams calendar allowing people to book with the person that’s available at the time that best works for them.<br /><br />As an admin you will clearly be able to see who is meeting when with whom and when.<br /><br/>Review the daily schedule and make adjustments as  needed. </p>
			</div>
			<div class="col-span-6 lg:pl-48 order-1 lg:order-2 lg:px-0 px-8">
				<img src="/images/home/team.svg" alt="" class="w-full">
			</div>
		</div>
	</div>
</div>

<div class="bg-gray-100 lg:py-24 py-8">
	<div class="container">
		<div class="grid lg:grid-cols-12 items-center">
			<div class="col-span-6 pr-10 order-2 lg:order-1">
				<span class="font-serif text-xs font-semibold">SHOW ME THE MONEY</span>
				<h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-10 mb-5">Getting paid in a way that works for you.</h2>
				<span class="font-bold text-xl">Take & Set Up Payments</span>
				<p class="text-muted lg:mt-5">Take credit or debit card payments ahead of appointments using stripe integration. Set up your clients for auto subscriptions with ease and enjoy the convenience of automatic debits. <br/><br/>
					— Take payment for a single booking<br/>
					— Take payment for a block of bookings<br/>
					— Set up monthly or annual subscriptions <br /><br/>Telloe uses stripe integration which enables you to accept payments how you need.</p>
			</div>
			<div class="col-span-6 lg:pl-48 order-1 lg:order-2 lg:px-0 px-8 lg:mb-0 mb-6">
				<img src="/images/home/pay.svg" alt="" class="w-full">
			</div>
		</div>
	</div>
</div>


<div class="container lg:py-24 py-8">
	<div class="grid grid-cols-12 items-center">
		<div class="lg:col-span-9 col-span-12">
			<span class="font-serif text-xs font-semibold">WE’VE GOT YOUR BACK</span>
			<h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-10 mb-5">More than just another scheduling tool; we help you serve your clients.</h2>
		</div>
	</div>

	<div class="lg:flex lg:mt-20 justify-between">
		<div class="lg:w-3/12 w-full">
			<div class="lg:mb-12 mb-4 h-56 text-center lg:text-left lg:px-0 px-12">
				<img src="/images/home/share.svg" class="h-full inline-block" alt="">
			</div>
			<h6 class="font-bold lg:text-xl">Record & Share</h6>
			<p class="text-muted lg:mt-4">Our platform allows you to record your video conversations which you can choose to send to your client afterwards as A reminder of what was covered during the meeting.</p>
		</div>
		<div class="lg:w-3/12 w-full lg:mt-0 mt-8">
			<div class="lg:mb-12 mb-4 h-56 text-center lg:text-left lg:px-0 px-12">
				<img src="/images/home/video-voice.svg" class="h-full inline-block" alt="">
			</div>
			<h6 class="font-bold lg:text-xl">Send Video & Voice Messages</h6>
			<p class="text-muted lg:mt-4">Keep your clients engaged by creating and sending  video and voice messages that don’t expire, allowing them to listen to them as often as needed, when needed.</p>
		</div>
		<div class="lg:w-3/12 w-full lg:mt-0 mt-8">
			<div class="lg:mb-12 mb-4 h-56 text-center lg:text-left lg:px-0 px-12">
				<img src="/images/home/screen-recording.svg" class="h-full inline-block" alt="">
			</div>
			<h6 class="font-bold lg:text-xl">Send Screen Recordings & Files</h6>
			<p class="text-muted lg:mt-4">Create and send screen recordings that can be sent to your clients with ease, alongside any files that may be needed to accommodate the information that has been shared on the screen recording.</p>
		</div>
	</div>
</div>


<div class="bg-secondary lg:py-24 py-8">
	<div class="container">
		<div class="lg:flex justify-center">
			<div class="lg:px-0 px-12 lg:mb-0 mb-6">
				<img src="/images/home/video-tour.svg">
			</div>
			<div class="lg:w-9/12 lg:pl-20">
				<h3 class="font-serif text-primary font-semibold heading uppercase">Take a 60 second video tour</h3>
				<p class="text-muted lg:w-2/3 lg:my-8">
					Telloe puts everything you need for a meeting  in one place. It's a calm, organised way to manage your day, week and month with ease and flow.  
				</p>
				<button type="button" class="lg:w-auto w-full lg:mt-0 mt-4 px-9 py-4 border-2 border-primary font-semibold rounded transition-all focus:outline-none font-serif bg-primary hover:bg-primary-dark text-white text-base" @click="openVideoDemo()"><span class="relative -bottom-px">VIEW VIDEO</span></button>
			</div>
		</div>
	</div>
</div>


<div class="container lg:py-24 py-8" id="pricing">
	<h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5 lg:mb-14">Simple plans, no surprises</h2>
	<h6 class="font-bold lg:text-2xl">Every plan includes 14 Day Trial and:</h6>

	<div class="lg:flex mt-6 justify-between">
		<div class="lg:w-5/12">
			<div v-for="planFeature in planFeatures" :key="planFeature.title" v-cloak class="mt-10">
				<div class="text-muted font-serif text-xs font-semibold uppercase mb-2">@{{ planFeature .title}}</div>
				<div v-for="feature in planFeature.features" class="border-bottom flex items-center py-3 justify-between">
					@{{ feature }}
					<greencheck-icon></greencheck-icon>
				</div>
			</div>
			<div class="text-muted mt-6">* Processing fee of 2.9% + $0.30 per transaction applies</div>
		</div>

		<div class="lg:w-5/12 lg:mt-0 mt-10">
			<div class="text-muted font-serif text-xs font-semibold uppercase mb-2">SELECT YOUR DISCOUNT</div>
			@foreach($plans as $plan)
			<div class="lg:flex items-center justify-between border-bottom lg:py-8 py-4">
				<div>
					<div class="font-bold lg:text-2xl mb-1">{{ $plan->name }}</div>
					<div class="text-muted mb-4 text-sm">{{ $plan->subheading }}</div>
					<button type="button" class="px-8 py-4 lg:w-auto w-full rounded font-semibold focus:outline-none font-serif hover:bg-primary transition-all hover:text-white text-primary border-2 border-primary text-xs" @click="auth = true; action = 'signup'"><span class="relative -bottom-px">START FREE TRIAL</span></button>
				</div>
				<div class="text-center lg:text-right lg:mt-0 mt-4">
					<div class="text-xl font-bold"><span class="lg:text-6xl text-3xl">$</span><p class="price inline-block">{{ $plan->price }}</p>/month</div>
					<div class="text-muted text-sm">per user</div>
				</div>
			</div>
			@endforeach
		</div>
	</div>
</div>


<div class="container lg:py-24 py-8">
	<div class="grid grid-cols-12">
		<div class="lg:col-span-3 col-span-12">
			<h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mb-0 mb-6">FAQ</h2>
		</div>
		<div class="lg:col-span-5 col-span-12">
			<div class="border-bottom lg:pb-6 lg:mb-6 pb-3 mb-3">
				<h5 class="lg:text-3xl text-xl cursor-pointer" @click="faq = 1">How does the free trial work?</h5>
				<div class="faq" :class="{show: faq == 1}">
					  <p class="pt-3 text-muted">
					  By signing up for a free trial, you get full access to Telloe for 14 days. There is absolutely no obligation to continue at the end of your trial and it's completely up to you if you want to continue using the application.
					  </p>
				</div>
			  </div>

			  <div class="border-bottom lg:pb-6 lg:mb-6 pb-3 mb-3">
				<h5 class="lg:text-3xl text-xl cursor-pointer" @click="faq = 2">What if I need help with my setup?</h5>
				<div class="faq" :class="{show: faq == 2}">
					  <p class="pt-3 text-muted">
					  We're here to help. If you have any trouble in setting up and need training, simply book a 15 minute demo call or send us an email at <a href="mailto:support@telloe.com">support@telloe.com</a>.
					  </p>
				</div>
			  </div>

			  <div class="border-bottom lg:pb-6 lg:mb-6 pb-3 mb-3">
				<h5 class="lg:text-3xl text-xl cursor-pointer" @click="faq = 3">What currencies are accepted?</h5>
				<div class="faq" :class="{show: faq == 3}">
					  <p class="pt-3 text-muted">
					  Currency is default to USD; however, other major currencies such as AUD, CHF, EUR, GBP, CAD, SGD, PHP and NZD. Feel free to reach out to us if you need assistance on adding your own currency that is not listed yet.
					  </p>
				</div>
			  </div>

			  <div class="border-bottom lg:pb-6 lg:mb-6 pb-3 mb-3">
				<h5 class="lg:text-3xl text-xl cursor-pointer" @click="faq = 4">Can I change my plan?</h5>
				<div class="faq" :class="{show: faq == 4}">
					  <p class="pt-3 text-muted">
					  Your plan is based on the purpose you would like to use Telloe for. Standard features include bookings and communication functionality. As you add more features, pricing is increased accordingly. To learn more about it, feel free to visit our link to <a href="#pricing">plan and pricing</a>.
					  </p>
				</div>
			  </div>

			  <div class="border-bottom lg:pb-6 lg:mb-6 pb-3 mb-3">
				<h5 class="lg:text-3xl text-xl cursor-pointer" @click="faq = 5">What payment types are accepted?</h5>
				<div class="faq" :class="{show: faq == 5}">
					  <p class="pt-3 text-muted">
					   We accept most major credit cards.
					  </p>
				</div>
			  </div>

			  <div class="border-bottom lg:pb-6 lg:mb-6 pb-3 mb-3">
				<h5 class="lg:text-3xl text-xl cursor-pointer" @click="faq = 6">What is a contact?</h5>
				<div class="faq" :class="{show: faq == 6}">
					  <p class="pt-3 text-muted">
					  A contact is a record of a person stored in Telloe that has signed up to receive ongoing communication with you. Effectively, these are your customers you provide coaching services to.
					  </p>
				</div>
			  </div>

			<div class="border-bottom lg:pb-6 lg:mb-6 pb-3 mb-3">
				<h5 class="lg:text-3xl text-xl cursor-pointer" @click="faq = 7">What is a member?</h5>
				<div class="faq" :class="{show: faq == 7}">
						<p class="pt-3 text-muted"> 
						A member is a record of a person who is a part of your company/organization. You can add members to your Company, assign them to a team or organization, and manage their bookings using Telloe. You could activate this feature by option for the Enterprise Plan.
						</p>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="bg-gray-100 lg:py-24 py-8">
	<div class="container">
		<div class="lg:flex items-center justify-center">
			<div class="lg:w-4/12">
				<span class="font-serif text-xs font-semibold">YOU’RE IN GOOD HANDS</span>
				<h2 class="text-primary lg:text-5xl text-2xl font-bold lg:mt-5">Our customer support team is exceptional!</h2>
			</div>
			<div class="w-1/12"></div>
			<div class="lg:w-5/12 lg:mt-0 mt-4">
				<p class="text-muted mb-8">
					You'll get all the help you need to get the most out of the Telloe booking and communications platform.
					<br />
					<br />
					Ready to switch to one of the most powerful and efficient client communication platforms available?
				</p>
				<button type="button" class="lg:w-auto w-full px-8 py-4 rounded font-semibold focus:outline-none font-serif hover:bg-primary transition-all hover:text-white text-primary border-2 border-primary text-xs" @click="auth = true; action = 'signup'"><span class="relative -bottom-px">START FREE TRIAL</span></button>
			</div>
		</div>
	</div>
</div>


<div class="bg-primary lg:py-24 py-8">
	<div class="container">
		<div class="lg:flex justify-center">
			<div class="lg:w-8/12">
				<h3 class="font-serif text-white font-semibold heading lg:mb-10 mb-5">MONDAY&mdash;FRIDAY SIMPLIFIED.</h3>
				<h4 class="text-white lg:text-3xl text-2xl font-semibold mb-4">Telloe, making your Monday to Friday simple again! </h4>
				<p class="text-white lg:text-xl mb-10">Sign up  now and start using Telloe instantly with a free 14 Day Trial. You don't have to install anything to gain access to this simple, easy to use, game changing tool.</p>
				<button type="button" class="lg:w-auto w-full px-8 py-4 rounded font-semibold focus:outline-none font-serif bg-white transition-all hover:bg-gray-200 text-primary text-xs" @click="auth = true; action = 'signup'"><span class="relative -bottom-px">START FREE TRIAL</span></button>
			</div>
		</div>
	</div>
</div>
@stop

@section('scripts')
	<script type="text/javascript" src="{{ config('app.url') }}/js/widget.js?p={{ env('HOME_WIDGET_USERNAME') }}"></script>
@stop
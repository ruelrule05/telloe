@extends('layouts.page')

@section('title', ucwords("The intelligent way to manage your clients' conversations, in one place"))

@section('content')

<div class="bg-secondary py-24">
	<div class="container">
		<div class="grid grid-cols-12 items-start">
			<div class="col-span-7 pr-24">
				<h1 class="font-serif text-primary font-semibold">MONDAY&mdash;FRIDAY SIMPLIFIED.</h1>
				<p class="text-xl my-16 text-muted pr-36">Organize meetings with people on different video calling platforms across multiple time zones; without needless back and forth.</p>
				<button type="button" class="px-9 py-4 border-2 border-primary rounded transition-all focus:outline-none font-serif bg-primary hover:bg-primary-dark transition-all text-white text-base"><span>START FREE TRIAL</span></button>
				<button type="button" class="px-9 py-4 rounded transition-all focus:outline-none font-serif hover:bg-primary transition-all hover:text-white text-primary border-2 border-primary ml-4 text-base"><span>WATCH VIDEO</span></button>
			</div>
			<div class="col-span-5">
				<img src="{{ asset('images/home/hero.svg') }}">
			</div>
		</div>
	</div>
</div>

 
<div class="container py-24">
	<div class="grid grid-cols-2 items-center">
		<div class="pr-24">
			<span class="font-serif text-xs">SAVE TIME, FEWER MISTAKES, LESS FRUSTRATION!</span>
			<h2 class="text-primary text-5xl font-bold mt-5">Monday to Friday meetings just got a whole lot simpler!</h2>
		</div>
		<div class="pl-10 pr-10">
			<span class="font-bold text-xl">Collaborate, Organize, Week Sorted</span>
			<p class="text-xl text-muted mt-5">Simplified online scheduling that takes the hassle out of bookings. <br /><br />Your flexible booking calendar displays your daily, weekly and monthly availability so your contacts can self-schedule appointments that work for everyone!</p>
		</div>
	</div>
</div>

 
<div class="container py-24">
	<div class="grid grid-cols-2 items-center">
		<div class="pr-24">
			<span class="font-serif text-xs">GET IT RIGHT THE FIRST TIME</span>
			<h2 class="text-primary text-5xl font-bold mt-5 mb-10">Stop the back and forth.</h2>
			<span class="font-bold text-xl">One Of A Kind - Scheduling Slider</span>
			<p class="text-muted mt-4">Create ad-hoc meeting slots with our one-of-a-kind collaborative scheduling slider and connect with others in real-time to match up meetings that work for everyone. Instantly see each other's availability and corresponding time zones all on the one page. <br /><br />Who needs the back and forth  when trying to sort out availability? It’s no problem when you've got Telloe!</p>
		</div>
		<div class="pl-10">
			<img src="images/home/scheduler.svg" alt="">
		</div>
	</div>
</div>

 
<div class="container py-24">
	<div class="grid grid-cols-2 items-center">
		<div class="pr-24">
			<img src="images/home/integrations.svg" alt="">
		</div>
		<div class="pl-10">
			<span class="font-serif text-xs">ONE EASY TO USE TOOL</span>
			<h2 class="text-primary text-5xl font-bold mt-5 mb-10">Different meeting types, no problem.</h2>
			<span class="font-bold text-xl">Popular Platforms Work with Telloe</span>
			<p class="text-muted mt-4">Arrange face-to-face meetings, phone calls,  Skype calls, Zoom calls and Google Meets to create  bookings that include your platform links; or you can also make use of our very own fully-featured Telloe video messaging system. <br /><br />Our advanced but simple to use features give you maximum flexibility!</p>
		</div>
	</div>
</div>


<div class="container py-24">
	<span class="font-serif text-xs">MAKE IT BEND</span>
	<h2 class="text-primary text-5xl font-bold mt-5 mb-20">Flexibility right where you need it.</h2>
	<div class="grid grid-cols-12">
		<div class="col-span-7 pr-36">
			<div class="flex items-center">
				<div>
					<svg width="24" height="2" viewBox="0 0 24 2" fill="none" xmlns="http://www.w3.org/2000/svg">
						<line y1="1" x2="24" y2="1" stroke="#BDC2DB" stroke-width="2"/>
					</svg>
				</div>
				<div class="pl-6">
					<span class="font-bold text-xl text-primary">Schedule Recurring Bookings At Once</span>
				</div>
			</div>
			<div class="pl-12">
				<p class="text-muted mt-2">Do away with the trouble of having to manually book recurring appointments whenever they are due. <br /><br />With our recurring meeting  feature, you and your contacts can create one booking and set it to recurring so you don't have to keep repeating the task. Automatic reminders ensure that everyone is in the loop and no one misses out.</p>
			</div>

			<div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all">
				<div>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2"/>
						<line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2"/>
					</svg>
				</div>
				<div class="pl-6">
					<span class="font-bold text-xl">Book Multiple Time Slots All At Once</span>
				</div>
			</div>

			<div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all">
				<div>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2"/>
						<line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2"/>
					</svg>
				</div>
				<div class="pl-6">
					<span class="font-bold text-xl">Booking Blocks</span>
				</div>
			</div>
			
			<div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all">
				<div>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2"/>
						<line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2"/>
					</svg>
				</div>
				<div class="pl-6">
					<span class="font-bold text-xl">Add Notes to Bookings</span>
				</div>
			</div>

			<div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all">
				<div>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2"/>
						<line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2"/>
					</svg>
				</div>
				<div class="pl-6">
					<span class="font-bold text-xl">Send Smart Reminders</span>
				</div>
			</div>

			<div class="flex items-center mt-7 cursor-pointer hover:text-primary transition-all">
				<div>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<line x1="12" y1="4.37114e-08" x2="12" y2="24" stroke="#BDC2DB" stroke-width="2"/>
						<line y1="11" x2="24" y2="11" stroke="#BDC2DB" stroke-width="2"/>
					</svg>
				</div>
				<div class="pl-6">
					<span class="font-bold text-xl">Shared Bookings</span>
				</div>
			</div>
		</div>
		<div class="col-span-5">
			<img src="images/home/bookings.svg" alt="">
		</div>
	</div>
</div>


<div class="bg-gray-100 py-24">
	<div class="container">
		<div class="grid grid-cols-12 items-center">
			<div class="col-span-6 pr-10">
				<span class="font-serif text-xs">TEAM WORK MAKES THE DREAM WORK</span>
				<h2 class="text-primary text-5xl font-bold mt-5 mb-10">Working together with others in a team, easy!</h2>
				<span class="font-bold text-xl">Create Team Booking Groups</span>
				<p class="text-muted mt-5">Share your teams calendar allowing people to book with the person that’s available at the time that best works for them.<br /><br />As an admin you will clearly be able to see who is meeting when with whom and when.<br /><br/>Review the daily schedule and make adjustments as  needed. </p>
			</div>
			<div class="col-span-6 pl-48">
				<img src="/images/home/team.svg" alt="" class="w-full">
			</div>
		</div>
	</div>
</div>

<div class="bg-gray-100 py-24">
	<div class="container">
		<div class="grid grid-cols-12 items-center">
			<div class="col-span-6 pr-10">
				<span class="font-serif text-xs">SHOW ME THE MONEY</span>
				<h2 class="text-primary text-5xl font-bold mt-5 mb-10">Getting paid in a way that works for you.</h2>
				<span class="font-bold text-xl">Take & Set Up Payments</span>
				<p class="text-muted mt-5">Take credit or debit card payments ahead of appointments using stripe integration. Set up your clients for auto subscriptions with ease and enjoy the convenience of automatic debits. <br/><br/>
					— Take payment for a single booking<br/>
					— Take payment for a block of bookings<br/>
					— Set up monthly or annual subscriptions <br /><br/>Telloe uses stripe integration which enables you to accept payments how you need.</p>
			</div>
			<div class="col-span-6 pl-48">
				<img src="/images/home/pay.svg" alt="" class="w-full">
			</div>
		</div>
	</div>
</div>


<div class="container py-24">
	<div class="grid grid-cols-12 items-center">
		<div class="col-span-9">
			<span class="font-serif text-xs">WE’VE GOT YOUR BACK</span>
			<h2 class="text-primary text-5xl font-bold mt-5 mb-10">More than just another scheduling tool; we help you serve your clients.</h2>
		</div>
	</div>

	<div class="grid grid-cols-12 mt-24">
		<div class="col-span-3">
			<img src="/images/home/share.svg" class="w-full" alt="">
		</div>
	</div>
</div>

@stop

@section('scripts')
	<script type="text/javascript" src="{{ config('app.url') }}/js/widget.js?p={{ env('HOME_WIDGET_USERNAME') }}"></script>
@stop
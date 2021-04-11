<footer class="lg:py-16 py-8">
	<div class="container">
		<div class="lg:grid grid-cols-12">
			<div class="col-span-4">
				<a href="/"><img src="{{ asset('telloe.svg') }}" alt="" class="lg:h-8 h-6"></a>
				<span class="block text-muted text-xs lg:mt-6 mt-2">Copyright {{ date('Y') }}. Telloe. All Rights Reserved.</span>
			</div>

			<div class="col-span-2 mt-md-0 lg:mt-5 mt-8">
				<h5 class="font-serif text-muted uppercase text-xs font-semibold lg:mb-4 mb-2">Product</h5>
				<a href="#pricing" class="block mb-2 text-sm">Pricing</a>
				<a href="#pricing" class="block text-sm">Try it for free</a>
			</div>

			<div class="col-span-2 mt-md-0 lg:mt-4 mt-8">
				<h5 class="font-serif text-muted uppercase text-xs font-semibold lg:mb-4 mb-2">Company</h5>
				<a href="" class="block text-sm">Become an affiliate</a>
			</div>

			<div class="col-span-2 mt-md-0 lg:mt-4 mt-8">
				<h5 class="font-serif text-muted uppercase text-xs font-semibold lg:mb-4 mb-2">Hello</h5>
				<a href="" class="block mb-2 text-sm">Contact us</a>
				<a href="" class="block text-sm">Watch a demo</a>
			</div>

			<div class="col-span-2 mt-md-0 lg:mt-4 mt-8">
				<h5 class="font-serif text-muted uppercase text-xs font-semibold lg:mb-4 mb-2">Legal</h5>
				<a href="{{ url('/privacy-policy') }}" class="block mb-2 text-sm">Privacy Policy</a>
				<a href="{{ url('/terms-of-service') }}" class="block text-sm">Terms & Conditions</a>
			</div>
		</div>
	</div>
</footer>
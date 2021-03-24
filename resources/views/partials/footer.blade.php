<footer class="py-16">
	<div class="container">
		<div class="grid grid-cols-12">
			<div class="col-span-4">
				<a href="/"><img src="{{ asset('telloe.svg') }}" alt="" height="35"></a>
				<span class="block text-muted text-xs mt-6">Copyright {{ date('Y') }}. Telloe. All Rights Reserved.</span>
			</div>

			<div class="col-span-2 mt-md-0 mt-5">
				<h5 class="font-serif text-muted uppercase text-xs font-semibold mb-4">Product</h5>
				<a href="#pricing" class="block mb-2 text-sm">Pricing</a>
				<a href="#pricing" class="block text-sm">Try it for free</a>
			</div>

			<div class="col-span-2 mt-md-0 mt-4">
				<h5 class="font-serif text-muted uppercase text-xs font-semibold mb-4">Company</h5>
				<a href="" class="block text-sm">Become an affiliate</a>
			</div>

			<div class="col-span-2 mt-md-0 mt-4">
				<h5 class="font-serif text-muted uppercase text-xs font-semibold mb-4">Hello</h5>
				<a href="" class="block mb-2 text-sm">Contact us</a>
				<a href="" class="block text-sm">Watch a demo</a>
			</div>

			<div class="col-span-2 mt-md-0 mt-4">
				<h5 class="font-serif text-muted uppercase text-xs font-semibold mb-4">Legal</h5>
				<a href="{{ url('/privacy-policy') }}" class="block mb-2 text-sm">Privacy Policy</a>
				<a href="{{ url('/terms-of-service') }}" class="block text-sm">Terms & Conditions</a>
			</div>
		</div>
	</div>
</footer>
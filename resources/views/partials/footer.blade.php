<footer class="lg:py-16 py-8 border-top">
	<div class="container">
		<div class="lg:grid grid-cols-12">
			<div class="col-span-4">
				<a href="/"><img src="{{ asset('telloe.svg') }}" alt="" class="lg:h-8 h-6"></a>
				<span class="block text-muted text-xs lg:mt-6 mt-2">Copyright {{ date('Y') }}. Telloe. All Rights Reserved.</span>
			</div>

			<div class="col-span-2 mt-md-0 lg:mt-4 mt-8">
				<h5 class="font-serif text-muted uppercase text-xs font-semibold lg:mb-4 mb-2">Product</h5>
				<a href="/#pricing" class="block text-sm mb-2">Pricing</a>
				<a href="#" class="block text-sm" @click.prevent="auth = true; action = 'signup'">Try it for free</a>
			</div>

			<div class="col-span-2 mt-md-0 lg:mt-4 mt-8">
				<h5 class="font-serif text-muted uppercase text-xs font-semibold lg:mb-4 mb-2">Company</h5>
				<a href="/contact" class="block text-sm mb-2">Contact us</a>
				<a href="/affiliates" class="block text-sm mb-2">Become an affiliate</a>
			</div>

			<div class="col-span-2 mt-md-0 lg:mt-4 mt-8">
				<h5 class="font-serif text-muted uppercase text-xs font-semibold lg:mb-4 mb-2">Hello</h5>
				<a href="#" class="block text-sm mb-2" @click.prevent="openVideoDemo()">Watch a demo</a>
			</div>

			<div class="col-span-2 mt-md-0 lg:mt-4 mt-8">
				<h5 class="font-serif text-muted uppercase text-xs font-semibold lg:mb-4 mb-2">Legal</h5>
				<a href="{{ url('/privacy-policy') }}" class="block mb-2 text-sm">Privacy Policy</a>
				<a href="{{ url('/terms-of-service') }}" class="block text-sm mb-2">Terms & Conditions</a>
			</div>
		</div>
	</div>
</footer>

<script src="{{ asset('js/E-v1.js') }}" async=""></script>
	
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async="" src="{{ asset('js/js.js') }}"></script>
<script>
	window.dataLayer = window.dataLayer || [];

	function gtag() {
	dataLayer.push(arguments);
	}
	gtag("js", new Date());
	gtag("config", "UA-176150819-1");
</script>

<!-- Facebook Pixel Code -->
<script>
	!(function(f, b, e, v, n, t, s) {
	if (f.fbq) return;
	n = f.fbq = function() {
		n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
	};
	if (!f._fbq) f._fbq = n;
	n.push = n;
	n.loaded = !0;
	n.version = "2.0";
	n.queue = [];
	t = b.createElement(e);
	t.async = !0;
	t.src = v;
	s = b.getElementsByTagName(e)[0];
	s.parentNode.insertBefore(t, s);
	})(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
	fbq("init", "621261285253190");
	fbq("track", "PageView");
</script>
<noscript>
	<img height="1" width="1" src="https://www.facebook.com/tr?id=621261285253190&ev=PageView&noscript=1" />
</noscript>
<!-- End Facebook Pixel Code -->
<script type="text/javascript">
	window.smartlook || (function(d) {
	var o = (smartlook = function() {
		o.api.push(arguments);
		}),
		h = d.getElementsByTagName("head")[0];
	var c = d.createElement("script");
	o.api = new Array();
	c.async = true;
	c.type = "text/javascript";
	c.charset = "utf-8";
	c.src = "https://rec.smartlook.com/recorder.js";
	h.appendChild(c);
	})(document);
	smartlook("init", "f7570f1288a7920a46a670158181b091fb6fc9b8");
</script>
<!-- Google Tag Manager (noscript) -->  
<noscript>
	<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WD8BDT3" height="0" width="0" style="display: none; visibility: hidden"></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->
<script type="text/javascript">
	(function(w, d) {
	w.HelpCrunch = function() {
		w.HelpCrunch.q.push(arguments);
	};
	w.HelpCrunch.q = [];

	function r() {
		var s = document.createElement("script");
		s.async = 1;
		s.type = "text/javascript";
		s.src = "https://widget.helpcrunch.com/";
		(d.body || d.head).appendChild(s);
	}
	if (w.attachEvent) {
		w.attachEvent("onload", r);
	} else {
		w.addEventListener("load", r, false);
	}
	})(window, document);
</script>
<script type="text/javascript">
	HelpCrunch("init", "telloe", {
	applicationId: 1,
	applicationSecret: "HYahOyK1vO4D3ea4HpLWVHpaYj5YZjXSyFEeZrjzprYGPRrEcuQ5ungv7ZyJ0rXrFj855O/bQBygjA92KkFXMg==",
	});
	HelpCrunch("showChatWidget");
</script>
<script>
	window.CONTACT = null;
	window.MEMBER = null;
</script>
<script>
	(function() {
	function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	var click_id = getParameterByName("sub1");
	if (click_id) {
		document.cookie = "click_id=" + click_id + ";path=/;";
	}
	})();
</script>
<script type="text/javascript" src="{{ config('app.url') }}/js/widget.js?p={{ env('HOME_WIDGET_USERNAME') }}"></script>

<style id="wistia_22_style" type="text/css" class="wistia_injected_style">
	@font-face {
	font-family: "WistiaPlayerInterNumbersSemiBold";
	font-feature-settings: "tnum"1;
	src: url(data:application/x-font-woff;charset=utf-8;base64,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);
	}
</style>

<script async="" type="text/javascript" src="{{ asset('js/a.js') }}"></script>
<div id="telloe-widget">
	<div data-v-cb0d81fe="" id="widget">
	<button data-v-cb0d81fe="" type="button" class="telloe-widget-btn">
		<img data-v-cb0d81fe="" src="{{ asset('images/logo.svg') }}" height="20" />Book </button>
	<!---->
	</div>
</div>

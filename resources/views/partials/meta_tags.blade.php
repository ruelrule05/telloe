<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0 maximum-scale=1.0, user-scalable=no" />
<meta name="csrf-token" content="{{ csrf_token() }}" />
<meta property="fb:app_id" content="149673835629240" /> 
<meta property="og:type" content="website" /> 
<meta property="og:url" content="{{ Request::url() }}" /> 
<meta property="og:site_name" content="{{ config('app.name') }}" />
<meta name="twitter:card" content="summary_large_image" />

<meta property="og:title" content="Schedule a meeting time that works for you based on availability | Meet Telloe" />
 <meta property="og:type" content="website" />
 <meta property="og:url" content="https://telloe.com/" />
 <meta property="og:description" content="Organize meetings with people on different video calling platforms across multiple time zones; without needless back and forth." />
 <meta property="og:image" content="{{ config('app.url') }}/images/og-image.png" />
 <meta property="og:image:alt" content="" />


<link rel="icon" type="image/png" href="{{ asset('favicon.png') }}" />
<link rel="canonical" href="{{ url()->current() }}" />
<link rel="alternate" href="{{ url()->current() }}" hreflang="en" />

@if(config('app.env') == 'production')
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WD8BDT3');</script>
    <!-- End Google Tag Manager -->

    <script>(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');</script>
    <script async src='https://r.wdfl.co/rw.js' data-rewardful='3b8ca5'></script>
@endif
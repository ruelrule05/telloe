<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0 maximum-scale=1.0, user-scalable=no" />
<meta name="csrf-token" content="{{ csrf_token() }}" />
<meta property="fb:app_id" content="149673835629240" /> 
<meta property="og:type" content="website" /> 
<meta property="og:url" content="{{ Request::url() }}" /> 
<meta property="og:site_name" content="{{ config('app.name') }}" />
<meta name="twitter:card" content="summary_large_image" />

<link rel="icon" type="image/png" href="{{ asset('favicon.png') }}" />
<link rel="canonical" href="{{ url()->current() }}" />
<link rel="alternate" href="{{ url()->current() }}" hreflang="en" />

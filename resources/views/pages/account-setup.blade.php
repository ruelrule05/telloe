<!doctype html>
<html lang="en">
<head>
	<title></title>
	@include('partials.meta_tags')
	@include('partials.styles')

    <link rel="stylesheet" href="{{ mix('css/dashboard.css') }}" crossorigin="anonymous">
</head>
<body class="bg-secondary">
    <div id="app" v-cloak>
        <auth></auth>
    </div>   
    
    <style>
        .auth-container > button {
            display: none !important;
        }
    </style>
    
    <script>
        window.AUTH = {!! isset($authUser) ? "JSON.parse('".json_encode($authUser)."');" : 'null' !!};
    </script>
	<script src="{{ mix('js/account-setup.js') }}" async defer></script>
</body>
</html>

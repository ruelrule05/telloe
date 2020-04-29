@php 
$navbar = $footer = $app_padded = $navbar_login = false; 
@endphp

@extends('frontend.layouts.page')

@section('title', 'Login')

@section('metas')
<meta property="og:title" content="Login | {{ config('app.name') }}" />
<meta name="twitter:title" content="Login | {{ config('app.name') }}" />
<!-- <meta name="description" content="Login and apply on jobs, or post your jobs at Workhob PH.">
<meta property="og:description" content="Login and apply on jobs, or post your jobs at Workhob PH." /> -->
<meta property='og:image' content="{{ asset('banner.jpg') }}?v=1.2.1" />
<meta name="twitter:image" content="{{ asset('banner.jpg') }}?v=1.2.1" />
@stop


@section('content')
<div class="px-4 px-md-0">
	<div class="row h-100vh justify-content-center align-items-center mx-0" v-cloak>
		<div class="col-md-6 col-lg-5 col-xl-4">
			<div class="mb-5 text-center">
				<a href="{{ url('/') }}" class="text-black h3">
			     <!--  <img src="{{ asset('logo.svg') }}" alt="{{ config('app.name') }}" title="{{ config('app.name') }}" height="25"> -->
			     {{ config('app.name') }}
			    </a>
			</div>
			<vue-form-validate @submit="login">
				<h1 class="h3 mb-1 font-heading">Log In</h1>
				<div class="mb-3 text-muted">Continue to your account</div>
				<div class="form-group">
					<input type="email" v-model="loginForm.email" class="form-control form-control-lg" data-required placeholder="Email">
				</div>
				<div class="form-group">
					<input type="password" v-model="loginForm.password" class="form-control form-control-lg" data-required placeholder="Password">
				</div>

				<vue-button type="submit" :loading="loading" button_class="btn btn-primary btn-block btn-lg shadow-none">Log In</vue-button>
			</vue-form-validate>

			<hr data-content="OR LOGIN WITH" class="hr-text mt-5 mb-4">

			<div class="d-flex mx-n1">
				<button class="btn btn-light border flex-grow-1 mx-1 d-flex align-items-center justify-content-center" @click="FacebookLogin" data-action="login"><facebook-icon height="20" width="20" class="mr-2"></facebook-icon>Facebook</button>
				<button class="btn btn-light border flex-grow-1 mx-1 d-flex align-items-center justify-content-center" @click="Googlesignin"><google-icon height="16" width="16" class="mr-2"></google-icon>Google</button>
			</div>

			<div class="mt-3 font-size-14">
				<a href="/recover" class="font-size-small underline text-muted">Forgot password?</a>
				<div>
					<a href="/signup" class="font-size-small underline text-muted">Don't have an account?</a>
				</div>
			</div>
		</div>
	</div>
</div>
@stop

@section('scripts')
<script>
var action_type = 'login';
</script>

@include('frontend.partials.social_scripts')
<script src="{{ mix('js/auth.js') }}"></script>
@stop
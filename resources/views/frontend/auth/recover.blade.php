@php 
$navbar = $footer = $app_padded = $navbar_login = false; 
@endphp

@extends('frontend.layouts.page')

@section('title', 'Forgot Password')

@section('metas')
<meta property="og:title" content="Forgot Password | {{ config('app.name') }}" />
<meta name="twitter:title" content="Forgot Password | {{ config('app.name') }}" />
<!-- <meta name="description" content="Login and apply on jobs, or post your jobs at Workhob PH.">
<meta property="og:description" content="Login and apply on jobs, or post your jobs at Workhob PH." /> -->
<meta property='og:image' content="{{ asset('banner.jpg') }}?v=1.2.1" />
<meta name="twitter:image" content="{{ asset('banner.jpg') }}?v=1.2.1" />
@stop


@section('content')
<div class="px-4 px-md-0">
	<div class="row h-100vh justify-content-center align-items-center mx-0" v-cloak>
		<div class="col-md-6 col-lg-5 col-xl-4">
			<div class="text-center" v-if="recoverForm.success">
				<check-icon class="text-success" size="3x"></check-icon>
				<h3 class="mt-2 mb-0 font-circular">Password reset link sent</h3>
				<div class="text-muted mb-4">We have sent you the instructions on how to reset your password</div>
				<a href="/login" class="btn btn-primary btn-block-sm shadow-none">Log In</a>
			</div>
			<vue-form-validate @submit="recover" v-else>
				<h1 class="h3 mb-1">Forgot your password?</h1>
				<div class="mb-3 text-muted">We'll email you instructions on how to recover your account</div>
				<div class="form-group">
					<input type="email" v-model="recoverForm.email" class="form-control form-control-lg" data-required placeholder="Email">
				</div>
				<vue-button label="Send reset link" type="submit" :loading="loading" button_class="btn btn-primary btn-block btn-lg shadow-none"></vue-button>
				<a href="/login" class="btn btn-link pl-0 text-black btn-sm"><arrow-left-icon size="1x"></arrow-left-icon> Log In</a>
			</vue-form-validate>
		</div>
	</div>
</div>
@stop

@section('scripts')
<script>
var action_type = 'login';
</script>

<script src="{{ mix('js/auth.js') }}"></script>
@stop
@php 
$navbar = $footer = $app_padded = false; 
@endphp

@extends('frontend.layouts.page')

@section('title', 'Create Your Account')

@section('metas')
<meta property="og:title" content="Create Your Account | {{ config('app.name') }}" />
<meta name="twitter:title" content="Create Your Account | {{ config('app.name') }}" />
<!-- <meta name="description" content="Post jobs and connect with the best virtual assistants that will help you and your business succeed.">
<meta property="og:description" content="Post jobs and connect with the best virtual assistants that will help you and your business succeed." /> -->
<meta property='og:image' content="{{ asset('banner.jpg') }}?v=1.2.1" />
<meta name="twitter:image" content="{{ asset('banner.jpg') }}?v=1.2.1" />
@stop


@section('content')
<div class="px-4 px-md-0">
	<div class="row h-100vh justify-content-center align-items-center mx-0" v-cloak>
		<div class="col-md-6 col-lg-5 col-xl-4">
			<vue-form-validate @submit="signup" class="mt-5">
				<h1 class="h3 font-weight-bold mb-4 font-circular">Create your account</h1>
				<div class="form-group">
					<input type="text" v-model="signupForm.first_name" class="form-control form-control-lg" data-required placeholder="First Name">
				</div>
				<div class="form-group">
					<input type="text" v-model="signupForm.last_name" class="form-control form-control-lg" data-required placeholder="Last Name">
				</div>
				<div class="form-group">
					<input type="email" v-model="signupForm.email" class="form-control form-control-lg" data-required placeholder="Email">
				</div>
				<div class="form-group">
					<input type="password" v-model="signupForm.password" class="form-control form-control-lg" data-required placeholder="Password">
					</div>

				<div class="margin-bottom font-size-14 text-muted">By clicking the sign up button, you agree that you've read and accepted {{ config('app.name') }}'s <a href="/terms-of-service" target="_blank" class="underline">Terms of Service</a> and <a href="/privacy-policy" class="underline" target="_blank">Privacy Policy</a>.</div>

				<vue-button label="Sign Up" type="submit" :loading="loading" button_class="btn btn-primary btn-block btn-lg shadow-none mt-3"></vue-button>
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
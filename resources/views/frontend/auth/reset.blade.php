@php 
$navbar = $footer = $app_padded = false; 
@endphp

@extends('frontend.layouts.page')

@section('title', 'Password Update')

@section('metas')

<meta property="og:title" content="Reset Password - {{ config('app.name') }}" />
<meta name="twitter:title" content="Reset Password - {{ config('app.name') }}" />
<meta property='og:image' 			content="{{ asset('banner.jpg') }}?v=1.2.1" />
<meta name="twitter:image" 			content="{{ asset('banner.jpg') }}?v=1.2.1" />
@stop


@section('content')
	<div class="container" v-cloak>
		<div class="row h-100vh ml-0 mr-0 justify-content-center align-items-center">
			<div class="col-md-6 col-lg-5 col-xl-4">
				<div class="text-center">
					<h1 class="h3 mb-1 font-circular">Update password</h1>
				</div>

				<vue-form-validate @submit="reset" class="mt-4">
					<fieldset :disabled="loading">
						<div class="form-group mb-2">
							<input type="password" placeholder="New Password" v-model="resetForm.password" class="form-control" required>
						</div>
						<div class="form-group">
							<input type="password" placeholder="Confirm New Password" v-model="resetForm.password_confirmation" class="form-control" required>
						</div>
					</fieldset>
					<div class="text-right">
						<vue-button :loading="loading" type="submit" button_class="btn-primary">Update Password</vue-button>
					</div>
				</vue-form-validate>
			</div>
		</div>
	</div>
@stop


@section('scripts')
<script>
const action_type = 'reset';
</script>
<script src="{{ mix('js/auth.js') }}"></script>
@stop

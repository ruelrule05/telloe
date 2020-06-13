<!doctype html>
<html lang="en">
<head>
<title>Admin Login</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0 maximum-scale=1.0, user-scalable=no" />
<link rel="stylesheet" href="{{ mix('css/bootstrap.css') }}">
<link rel="stylesheet" href="{{ mix('css/app.css') }}">
</head>
<body>
	<div class="px-4 px-md-0">
		<div class="row h-100vh justify-content-center align-items-center mx-0">
			<div class="col-md-5 col-lg-4 col-xl-3">
				<div class="text-center">
					<h3 class="mb-0">{{ config('app.name') }}</h3>
					<div class="text-gray">
						<small>ADMIN V1.0</small>
					</div>
				</div>

				<div class="mt-4">
					<form method="POST" action="/admin/auth/login">
						{{ csrf_field() }}
						<div class="form-group">
							<input type="email" name="email" placeholder="Email" value="{{ old('email') }}" class="form-control" required>
						</div>
						<div class="form-group">
							<input type="password" name="password" placeholder="Password" class="form-control" required>
						</div>
						<div class="text-right">
							<button type="submit" class="btn btn-primary btn-block-md shadow-none">Log In</button>
						</div>
					</form>

					@if( $errors->any() )
					<div class="alert alert-danger">
					  	<ul class="mb-0">
			                @foreach( $errors->all() as $error )
			                <li>{!! $error !!}</li>
			                @endforeach
					  	</ul>
					</div>
		            @endif
				</div>
			</div>
		</div>
	</div>
</body>
</html>
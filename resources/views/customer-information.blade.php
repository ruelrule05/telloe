@extends('frontend.layouts.page')

@section('title', 'Customer Information | ' . $widget->heading)

@section('content')
<div class="container my-5 py-5">
	<div class="row justify-content-center">
		<div class="col-md-4">
			<vue-form-validate>
			    <h4 class="mb-4">Customer Information Form</h4>
			    <div class="form-group">
			        <input type="text" class="form-control" data-required placeholder="First Name" />
			    </div>
			    <div class="form-group">
			        <input type="text" class="form-control" data-required placeholder="Last Name" />
			    </div>
			    <div class="form-group">
			        <input type="email" class="form-control" data-required placeholder="Email" />
			    </div>
			    <div class="form-group">
			        <input type="text" class="form-control" data-required placeholder="Phone" />
			    </div>

			    <div class="text-right">
			        <vue-button type="submit" button_class="btn btn-primary">Submit</vue-button>
			    </div>
			</vue-form-validate>
		</div>
	</div>
</div>
@stop
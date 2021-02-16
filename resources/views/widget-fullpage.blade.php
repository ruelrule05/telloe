@extends('frontend.layouts.page')

@section('title', $widget->heading)

@section('scripts')
<script>
	let widget = {!! json_encode($widget) !!};
</script>
<script src="{{ mix('/js/widget.js') }}"></script>
@stop
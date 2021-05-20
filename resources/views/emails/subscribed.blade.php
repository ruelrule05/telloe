@extends('emails.layout')

@section('content')


<p style="font-size: 16px; line-height: 1.5; text-align:left; margin: 0">
You have successfully subscribed to <strong>{{ $plan->name }}</strong> plan.
</p>


<div style="border-radius: 15px; background-color: #F8F8F9; padding: 15px 20px; margin-top: 20px">
    @if($plan->subheading)
        &bull; {{ $plan->subheading }}
        <br />
    @endif
    @if($plan->every_months == 1)
        &bull; ${{ $plan->price }}/month
        <br />
    @endif
    &bull; Renews every {{ $plan->every_months }} {{ $plan->every_months > 1 ? 'months' : 'month' }}
</div>


@if($actionUrl)
<a href="{{ $actionUrl }}"
    style="{{ $style['button'] }}{{ $style['display-block'] }} margin-top: 20px; margin-bottom: 5px"
    class="button"
    target="_blank">
    {{ $actionText }}
</a>

<div style="text-align: left; margin-top: 20px; border-top: solid 1px #ddd; padding-top: 20px;">
     <p style="{{ $style['paragraph-sub'] }} margin-bottom: 0">
        If you’re having trouble clicking the "{{ $actionText }}" button,
        copy and paste the URL below into your web browser: <br />
        <a style="{{ $style['text-primary'] }} text-decoration: underline;" href="{{ $actionUrl }}" target="_blank">
            {{ $actionUrl }}
        </a>
    </p>
</div>
@endif
@stop

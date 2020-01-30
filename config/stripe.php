<?php

return [
	'secret_key' => env('STRIPE_SECRET_KEY', ''),
	'publishable_key' => env('STRIPE_PUBLISHABLE_KEY', ''),
	'product_id' => env('STRIPE_PRODUCT_ID', ''),
];
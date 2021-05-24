<?php
return [
    'app_id' => env('OAUTH_APP_ID'),
    'app_password' => env('OAUTH_APP_PASSWORD'),
    'redirect_uri' => env('OAUTH_REDIRECT_URI'),
    'authority' => env('OAUTH_AUTHORITY'),
    'authorize_endpoint' => env('OAUTH_AUTHORIZE_ENDPOINT'),
    'token_endpoint' => env('OAUTH_TOKEN_ENDPOINT'),
    'scopes' => env('OAUTH_SCOPES'),
    'graph_extension_name' => env('GRAPH_EXTENSION_NAME')
];
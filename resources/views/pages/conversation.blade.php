<!doctype html>
<html lang="en">
<head>
	<title></title>
	@include('partials.meta_tags')
	@include('partials.styles')

    <link rel="stylesheet" href="{{ mix('css/dashboard.css') }}" crossorigin="anonymous">
</head>
<body class="bg-secondary">
    <div id="app" v-cloak>
        <div v-if="! auth" class="container mt-24 bg-white p-6 w-10/12 lg:w-1/4 rounded-xl convo-auth-container">
            <login></login>
        </div>
           
        <div v-else class="overflow-hidden bg-white conversation-height">
            <conversation></conversation>
            <video-call ref="videoCall"></video-call>
            <screen-recorder ref="screenRecorder" v-if="screenRecorder.conversation_id"></screen-recorder>
        </div>
    </div>    
    
    <style> 
        .auth-footer{
            display: none;
        }

        .forgot-password{
            display: none;            
        }

        .conversation-height{
            height: 100vh;
            overflow: hidden;
        }
        .convo-auth-container .my-8{
            margin-bottom: 0 !important;
        }
        
    </style>

    <script>
        window.AUTH = {!! isset($authUser) ? "JSON.parse('".json_encode($authUser)."');" : 'null' !!};
        window.CONVERSATION_ID = {!! isset($conversation) ? "JSON.parse('".json_encode($conversation->id)."');" : 'null' !!};
        
    </script>

	<script src="{{ mix('js/conversation.js') }}" async defer></script>
</body>
</html>

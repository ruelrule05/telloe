<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\Chatbot;
use App\Models\Chatbox;
use File;
use Nesk\Puphpeteer\Puppeteer;
use BotMan\BotMan\BotMan;
use BotMan\BotMan\BotManFactory;
use BotMan\BotMan\Drivers\DriverManager;
use App\Http\Conversations\OnboardingConversation;
use BotMan\BotMan\Cache\LaravelCache;

class MessageController extends Controller
{
    public function __construct()
    {
        auth()->setDefaultDriver('api');
    }

    public function index(Request $request)
    {
        $conversation = null;
        if(auth()->check()) :

        elseif($request->guest) :
            $conversation = Conversation::with('messages')->where('metadata->guest_cookie', $request->guest)->first();
        endif;

        return response()->json($conversation);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'conversation_id' => 'required|exists:conversations,id',
            'type' => 'required',
            'timestamp' => 'required',
        ]);
        $conversation = Conversation::findOrFail($request->conversation_id);
        $this->authorize('addMessage', $conversation);

        $time = time();
        $sourceFile = null;
        if ($request->hasFile('source')) :
            $filename = $time . '-source';
            $srcDestination = 'storage/message-media/' . $filename;
            $request->file('source')->storeAs('public/message-media/', $filename);
            $sourceFile = '/' . $srcDestination;
        endif;

        $previewFile = null;
        if ($request->preview) :
            $source = $request->preview;
            $filename = $time . '-preview';
            $previewDestination = 'storage/message-media/' . $filename;
            $preview = base64_decode(substr($source, strpos($source, ',') + 1));
            File::put($previewDestination, $preview);
            $previewFile = '/' . $previewDestination;
        endif;

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'user_id' => auth()->user()->id,
            'type' => $request->type,
            'message' => $request->message,
            'timestamp' => $request->timestamp,
            'source' => $sourceFile,
            'preview' => $previewFile,
            'metadata' => json_decode($request->metadata),
        ]);
        $response = [
            'id' => $message->id,
            'conversation' => [
                'id' => $conversation->id,
                'user_id' => $conversation->user_id,
                'members' => $conversation->members()->pluck('user_id')->toArray(),
                'widget' => [
                    'user_id' => $conversation->widget->user_id
                ],
            ],
        ];

        return response()->json($response);
    }

    public function update($id, Request $request)
    {
        $this->validate($request, [
            'preview' => 'required'
        ]);
        $message = Message::findOrfail($id);
        $this->authorize('update', $message);

        $message->update([
            'preview' => $request->preview
        ]);
        return response(1);
    }


    public function getPagePreview(Request $request)
    {
        $this->validate($request, [
            'url' => 'required'
        ]);
        $data = [
            'title' => $request->url,
            'description' => '', 
            'favicon' => '',
            'url' => $request->url,
        ];
        $puppeteer = new Puppeteer;
        $browser = $puppeteer->launch();
        $page = $browser->newPage();
        $page->goto($request->url);
        $data['title'] = $page->title(); 
        $metaDescription = $page->querySelector("head > meta[name*='description']");
        if ($metaDescription) $data['description'] = $metaDescription->getProperty('content')->jsonValue();
        $favicon = $page->querySelector("link[rel*='icon']");
        if ($favicon) $data['favicon'] = $favicon->getProperty('href')->jsonValue();
        $browser->close();

        ?>
        <a class="snapturebox-my-2 snapturebox-d-block snapturebox-text-decoration-none" href="<?php echo $data['url']; ?>" target="_blank">
            <div class="snapturebox-bg-light snapturebox-rounded snapturebox-p-2">
                <?php if($data['favicon']) : ?>
                <div class="snapturebox-text-center snapturebox-mb-2">
                    <img src="<?php echo $data['favicon']; ?>" height="20" />
                </div>
                <?php endif; ?>
                <h6 class="snapturebox-text-dark snapturebox-mb-0 snapturebox-font-weight-bold"><?php echo $data['title']; ?></h6>
                <div class="snapturebox-line-height-sm">
                    <small class="snapturebox-text-gray"><?php echo $data['description']; ?></small>
                </div>
            </div>
        </a>
        <?php

        return;
    }



    public function botman(Request $request)
    {
        $config = [
            // Your driver-specific configuration
            // "telegram" => [
            //    "token" => "TOKEN"
            // ]
        ];
        $chatbot = null;
        if($request->bot_id) :
            $chatbot = Chatbot::where('bot_id', $request->bot_id)->firstOrFail();
            $this->authorize('show', $chatbot);
        else :
            $chatbot = $request->widget->defaultChatbot;
        endif;

        if($chatbot) :
            /*if(!$request->chatbox_id) :
            endif;*/

            // Create an instance
            $botman = BotManFactory::create($config, new LaravelCache());
            $botman->hears('(.*?)', function(BotMan $bot) use($chatbot) {
                $bot->startConversation(new OnboardingConversation($chatbot));
            });

            /*// Give the bot something to listen for.
            $botman->hears('hello', function (BotMan $bot) {
                $bot->reply('Hello yourself.');
            });*/

            // Start listening
            $botman->listen();
        endif;
    }


    

    public function show($id, Request $request)
    {
        $message = Message::findOrFail($id);
        $this->authorize('show', $message);
        return response()->json($message);
    }
}

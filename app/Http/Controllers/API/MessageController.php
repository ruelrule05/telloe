<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Convo;
use App\Models\Message;
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

    public function store(Request $request)
    {
        $this->validate($request, [
            'type' => 'required',
        ]);

        $convo = Convo::firstOrCreate([
            'widget_id' => $request->widget->id,
            'user_id' => auth()->user()->id
        ]);

        $time = time();

        $sourceFile = null;
        if ($request->source) :
            $source = $request->source;
            $filename = $time . '-source';
            $srcDestination = 'storage/message-media/' . $filename;
            $src = base64_decode(substr($source, strpos($source, ',') + 1));
            File::put($srcDestination, $src);
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
            'convo_id' => $convo->id,
            'user_id' => auth()->user()->id,
            'message' => $request->message,
            'type' => $request->type,
            'source' => $sourceFile,
            'preview' => $previewFile,
            'metadata' => json_decode($request->metadata),
        ]);

        return response()->json($message);
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

        $chatbot = $request->widget->defaultChatbot;
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
}

<?php
namespace App\Http\Conversations;
use BotMan\BotMan\BotMan;
use BotMan\BotMan\Messages\Conversations\Conversation;
use BotMan\BotMan\Messages\Incoming\Answer;
use BotMan\BotMan\Messages\Incoming\IncomingMessage;
use App\Models\Chatbot;
use App\Models\Chatbox;
use Validator;
use Illuminate\Support\Facades\Log;

class OnboardingConversation extends Conversation
{
    protected $chatbot;
    protected $data = [];

    public function __construct(Chatbot $chatbot)
    {
    	$this->chatbot = $chatbot;
    }

    public function stopsConversation(IncomingMessage $message)
	{
		return $message->getText() == 'stop';
	}

	public function parseMessage($message)
	{
		return strtr($message, $this->data);
	}

    public function getNext($chatbox)
    {
    	if($chatbox->target) :
			$next = $this->chatbot->chatboxes()->where('id', $chatbox->target)->first();
			if($next) :
				$this->init($next);
			endif;
		else :
			$this->say('', ['end' => true]);
		endif;
    }

    public function getButtonFromAnswer($buttons, Answer $answer)
    {
    	$buttonFound = false;
    	$answer = $answer->getText();
    	foreach($buttons as $button) :
		    if ($button->id == $answer) :
		        $buttonFound = $button;
		        break;
		    endif;
		endforeach;
		return $buttonFound;
    }

    public function init(Chatbox $chatbox)
    {
    	switch($chatbox->type) :
    		// Buttons
    		case 'buttons':
    			// check which button is clicked
				$this->ask($this->parseMessage($chatbox->message),
				function(Answer $answer) use ($chatbox) {
					$button = $this->getButtonFromAnswer($chatbox->metadata->buttons, $answer);
					if($button) :
						$this->getNext($button);
					endif;
				},
				['type' => 'buttons', 'buttons' => $chatbox->metadata->buttons]
				);
    			break;


    		// User input
    		case 'user_input':
	    		if($chatbox->input_type) :
	    			$additionalParams = [];
	    			if($chatbox->input_type == 'options') $additionalParams = ['type' => 'options', 'options' => $chatbox->metadata->options];
					$this->ask($chatbox->message, function(Answer $answer) use ($chatbox) {
						$answerText = $answer->getText();
						$valid = false;
						switch($chatbox->input_type) :
							case 'text' :
								$valid = true;
								break;

							case 'email':
								$valid = !Validator::make(['email' => $answerText], ['email' => 'required|email'])->fails();
								break;

							case 'phone' :
								$valid = true;
								break;

							case 'options' :
								$option = $this->getButtonFromAnswer($chatbox->metadata->options, $answer);
								if($option) :
									$valid = true;
									$answerText = $option->text;
								endif;
								break;
						endswitch;

						if(!$valid) :
							$this->say("Sorry, that doesn't seem to be a valid " . $chatbox->input_type);
							$this->repeat();
						else :
							if($chatbox->variable) $this->data[$chatbox->variable] = $answerText;
							$this->getNext($chatbox);
						endif;
					},
					$additionalParams
				);
				endif;
    			break;


    		// Action
    		case 'action':
    			$message = null;
    			switch($chatbox->metadata->action) :
    				case 'open_url':
	    				$message = $chatbox->metadata->url;
    					break;

    				case 'download_file':
	    				$message = url($chatbox->metadata->file->source);
    					break;

    				case 'trigger_chatbot':
	    				$nextChatbot = Chatbot::where('bot_id', $chatbox->metadata->bot_id)->first();
	    				if($nextChatbot && auth()->user()->can('show', $nextChatbot)) :
	    					$this->chatbot = $nextChatbot;
	    					$this->run();
	    				endif;
    					break;
    			endswitch;

    			if($message) :
    				$this->say($message, ['type' => 'action', 'action' => $chatbox->metadata->action]);
	    			$this->getNext($chatbox);
    			endif;
    			break;


    		// Default (text type)
    		default:
				$this->say($this->parseMessage($chatbox->message), ['type' => 'text']);
				$this->getNext($chatbox);

    	endswitch;

    }

    public function run()
    {
        // This will be called immediately
        $start = $this->chatbot->chatboxes()->where('is_start', true)->first();
        if($start) $this->init($start);
    }
}
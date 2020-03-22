<?php
namespace App\Http\Conversations;
use BotMan\BotMan\BotMan;
use BotMan\BotMan\Messages\Conversations\Conversation;
use BotMan\BotMan\Messages\Incoming\Answer;
use BotMan\BotMan\Messages\Incoming\IncomingMessage;
use App\Models\Chatbot;
use App\Models\Chatbox;
use Validator;

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

    public function init(Chatbox $chatbox)
    {
    	switch($chatbox->type) :
    		// Buttons
    		case 'buttons':
    			// ask which button is clicked
				$this->say($this->parseMessage($chatbox->message), ['type' => 'buttons', 'buttons' => $chatbox->buttons]);
    			break;


    		// User input
    		case 'user_input':
	    		if($chatbox->input_type) :
					$this->ask($chatbox->message, function(Answer $answer) use ($chatbox) {
						$answer = $answer->getText();
						$valid = false;
						switch($chatbox->input_type) :
							case 'text' :
								$valid = true;
								break;

							case 'email':
								$valid = !Validator::make(['email' => $answer], ['email' => 'required|email'])->fails();
								break;
						endswitch;

						if(!$valid) :
							$this->say("Sorry, that doesn't seem to be a valid " . $chatbox->input_type);
							$this->repeat();
						else :
							if($chatbox->variable) $this->data[$chatbox->variable] = $answer;
							$this->getNext($chatbox);
						endif;
					});
				endif;
    			break;

    		// Default (text type)
    		default:
				$this->say($this->parseMessage($chatbox->message), ['type' => 'text']);
				$this->getNext($chatbox);

    	endswitch;






		/*if (isset($this->chatbot->chatboxes[$index])) :
	    	for(; $index <= count($this->chatbot->chatboxes) - 1; $index++) :
				$chatbox = $this->chatbot->chatboxes[$index];
	    		if($chatbox->input_type) :
	    			$this->ask($chatbox->message, function(Answer $answer) use ($index, $chatbox) {
	    				// validate answer
	    				$answer = $answer->getText();
	    				$validator = false;
	    				switch($chatbox->input_type) :
	    					case 'email':
	    						$validator = Validator::make(['email' => $answer], ['email' => 'required|email']);
	    						if($validator->fails()) :
	    							$this->say("Sorry, that doesn't seem to be a valid " . $chatbox->input_type);
	    							$this->repeat();
	    						endif;
	    						break;
	    				endswitch;
	    				$this->init($index+1);
	    			});
			        break;
	    		endif;
	    		$this->say($chatbox->message);
	    	endfor;
	    endif;*/
		
    }

    public function run()
    {
        // This will be called immediately
        $start = $this->chatbot->chatboxes()->where('is_start', true)->first();
        if($start) $this->init($start);
    }
}
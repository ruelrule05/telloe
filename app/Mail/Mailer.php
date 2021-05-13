<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Mailer extends Mailable
{
    public $primaryColor = '#6e82ea';
    public $style = [
        /* Layout ------------------------------ */
        'body' => 'margin: 0; padding: 0; width: 100%; background-color: #F2F4F6; padding: 0 5px',
        'email-wrapper' => 'width: 100%; margin: 0; padding: 0;',

        /* Masthead ----------------------- */
        'email-masthead' => 'padding: 25px 0; text-align: center;',
        'email-masthead_name' => 'font-size: 16px; font-weight: bold; color: #2F3133; text-decoration: none; text-shadow: 0 1px 0 white;',

        'email-body' => 'width: 100%; margin: 0; padding: 0; border-top: 1px solid #EDEFF2; border-bottom: 1px solid #EDEFF2; ;',
        'email-body_inner' => 'max-width: 100%; width: auto; margin: 0 auto; padding: 0;',
        'email-body_cell' => 'padding: 15px; width: 500px; max-width: 1100%; background-color:#FFF;',

        'email-footer' => 'width: auto; max-width: 100%; margin: 0 auto; padding: 0; text-align: center;',
        'email-footer_cell' => 'color: #AEAEAE; padding: 35px; text-align: center;background-color: #FFF;',

        /* Body ------------------------------ */
        'body_action' => 'width: 100%; max-width: 100%; margin: 30px auto; padding: 0; text-align: center;',
        'body_sub' => 'margin-top: 25px; padding-top: 25px; border-top: 1px solid #EDEFF2;',

        /* Type ------------------------------ */
        'anchor' => 'color: #6e82ea; text-decoration: none',
        'header-1' => 'margin-top: 0; color: #2F3133; font-size: 19px; font-weight: bold; text-align: left;',
        'paragraph' => 'margin-top: 0; color: #353535; font-size: 17px; line-height: 1.5em;',
        'paragraph-sub' => 'margin-top: 0; color: #353535; font-size: 12px; line-height: 1.5em;',
        'paragraph-center' => 'text-align: center;',
        'text-gray' => 'color: #82899a;',
        'text-primary' => 'color: #6e82ea;',

        /* Buttons ------------------------------ */
        'button' => 'border-radius: 50px; padding: 8px 36px; text-transform: uppercase;
	    			font-weight: bold;
                    display: inline-block;
	                 background-color: #3167e3; color: #ffffff; font-size: 15px;;
	                 text-align: center; text-decoration: none; -webkit-text-size-adjust: none;max-width:100%;',

        'display-block' => 'display: block;',
        'button--green' => 'background-color: #22BC66;',
        'button--red' => 'background-color: #dc4d2f;',
        'button--blue' => 'background-color: #6e82ea;',
    ];

    public $fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

    use Queueable, SerializesModels;
}
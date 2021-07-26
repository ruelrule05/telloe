<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style type="text/css">
      *{
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        font-smoothing: antialiased;
      }
      a { text-decoration: none; outline: none; }
      @media (max-width: 649px) {
        .o_col-full { max-width: 100% !important; }
        .o_col-half { max-width: 50% !important; }
        .o_hide-lg { display: inline-block !important; font-size: inherit !important; max-height: none !important; line-height: inherit !important; overflow: visible !important; width: auto !important; visibility: visible !important; }
        .o_hide-xs, .o_hide-xs.o_col_i { display: none !important; font-size: 0 !important; max-height: 0 !important; width: 0 !important; line-height: 0 !important; overflow: hidden !important; visibility: hidden !important; height: 0 !important; }
        .o_xs-center { text-align: center !important; }
        .o_xs-left { text-align: left !important; }
        .o_xs-right { text-align: left !important; }
        table.o_xs-left { margin-left: 0 !important; margin-right: auto !important; float: none !important; }
        table.o_xs-right { margin-left: auto !important; margin-right: 0 !important; float: none !important; }
        table.o_xs-center { margin-left: auto !important; margin-right: auto !important; float: none !important; }
        h1.o_heading { font-size: 32px !important; line-height: 41px !important; }
        h2.o_heading { font-size: 26px !important; line-height: 37px !important; }
        h3.o_heading { font-size: 20px !important; line-height: 30px !important; }
        .o_xs-py-md { padding-top: 24px !important; padding-bottom: 24px !important; }
        .o_xs-pt-xs { padding-top: 8px !important; }
        .o_xs-pb-xs { padding-bottom: 8px !important; }
      }
      .text-muted{color: #838ea6;}
      .text-primary{color: #3167e3}
      .o_email_content {
        background: #ffffff; padding: 60px; box-sizing: border-box;border-radius: 15px
      }
      
	    @media (max-width: 991px) {
        .o_email_content {
          padding: 30px;
        }
      }
    </style>
    <!--[if mso]>
    <style>
      table { border-collapse: collapse; }
      .o_col { float: left; }
    </style>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
  </head>
  <body class="o_body o_bg-white" style="width: 100%;margin: 0px;padding: 0px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;background-color: #fae6e2;">

    
    <!-- content -->
    <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="margin-top: 10px; background-color: #fae6e2;">
      <tbody>
        <tr>
          <td class="o_bg-white o_px-md o_py" align="center" style="padding-left: 24px;padding-right: 24px;padding-top: 24px;padding-bottom: 24px;">
            <!--[if mso]><table width="584" cellspacing="0" cellpadding="0" border="0" role="presentation"><tbody><tr><td align="center"><![endif]-->
            <div class="o_col-6s o_sans o_text o_text-secondary o_center" style="font-family: {{ $fontFamily }};margin-top: 0px;margin-bottom: 0px;font-size: 15px;line-height: 24px;max-width: 584px; text-align: left;">
              <div class="o_email_content">
                <a class="o_text-primary" target="_blank" href="{{ config('app.url') }}" style="text-decoration: none;outline: none;color: #126de5;"><img src="{{ config('app.url') }}/logo.png" height="25"></a>
                  <div style="margin-top: 25px">&nbsp;</div>
                  @yield('content')
              </div>

              <div style="font-family: {{ $fontFamily }};margin-top: 10px;margin-bottom: 0px;line-height: 21px;color: #333;padding-right: 8px; padding-top: 5px">
                <p class="o_mb-xs" style="margin-top: 0px;margin-bottom: 8px; font-weight: 200; font-size: 13px">&copy;{{ date('Y') }} {{ config('app.name') }}. All Rights Reserved.</p>
                </p>
              </div>
            </div>

            <!--[if mso]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>

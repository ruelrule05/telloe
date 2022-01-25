
@if(config('app.env') == 'production')
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-176150819-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-176150819-1');
  </script>

  <!-- Facebook Pixel Code -->
  <script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window,document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '621261285253190'); 
  fbq('track', 'PageView');
  </script>
  <noscript>
  <img height="1" width="1" 
  src="https://www.facebook.com/tr?id=621261285253190&ev=PageView
  &noscript=1"/>
  </noscript>
  <!-- End Facebook Pixel Code -->

  <script type='text/javascript'>
    window.smartlook||(function(d) {
      var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
      var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
      c.charset='utf-8';c.src='https://rec.smartlook.com/recorder.js';h.appendChild(c);
      })(document);
      smartlook('init', 'f7570f1288a7920a46a670158181b091fb6fc9b8');
  </script>

  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WD8BDT3"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

  @php $uri = request()->route()->uri() @endphp
  @if(request()->route()->getName() == 'home')
  <script type="text/javascript">
    (function(w,d){
      w.HelpCrunch=function(){w.HelpCrunch.q.push(arguments)};w.HelpCrunch.q=[];
      function r(){var s=document.createElement('script');s.async=1;s.type='text/javascript';s.src='https://widget.helpcrunch.com/';(d.body||d.head).appendChild(s);}
      if(w.attachEvent){w.attachEvent('onload',r)}else{w.addEventListener('load',r,false)}
    })(window, document)
    </script>
    
    <script type="text/javascript">
      HelpCrunch('init', 'telloe', {
        applicationId: 1,
        applicationSecret: 'HYahOyK1vO4D3ea4HpLWVHpaYj5YZjXSyFEeZrjzprYGPRrEcuQ5ungv7ZyJ0rXrFj855O/bQBygjA92KkFXMg=='
      })
    
      HelpCrunch('showChatWidget');
  </script>
  @endif

@endif


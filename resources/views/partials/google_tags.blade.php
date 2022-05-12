@if(config('app.env') == 'production')
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-176150819-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-176150819-1');
    </script>

    <!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WD8BDT3" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
@endif
<!-- Global site tag (gtag.js) - Google Ads: 369673356 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-369673356"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-369673356');
</script>

<!-- Event snippet for Sign-up conversion page -->
<script>
  gtag('event', 'conversion', {'send_to': 'AW-369673356/_OdCCIibrrwDEIyJo7AB'});
</script>

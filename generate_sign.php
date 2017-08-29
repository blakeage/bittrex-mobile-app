<?php
  $apikey='';
  $apisecret='';
  $nonce=time();
  $uri='https://bittrex.com/api/v1.1/account/getbalance?apikey='.$apikey.'&currency=ADX&nonce='.$nonce;
  $sign=hash_hmac('sha512',$uri,$apisecret);
  echo "\n" . $sign . "\n";
  echo $nonce . "\n";
?>

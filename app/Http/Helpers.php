<?php

function is_base64_encoded($data)
{
	$data = substr($data, strpos($data, 'base64,') + 7);
	return (bool) preg_match('/^[a-zA-Z0-9\/\r\n+]*={0,2}$/', $data);
}
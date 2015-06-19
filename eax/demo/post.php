<?php

$msg = "Nome: " . $_POST['nome']  . "\n Idade: " . $_POST['idade'] . "\n País: " . $_POST['pais'];

$handler = fopen('data.json', 'a+');
fwrite($handler, $msg);
fclose($handler);
<?php

if(isset($_GET['file'])){
    $file = $_GET['file'] . ".pdf";
    
    header("Content-Type: application/octet-stream");
    
    
    header("Content-Disposition: attachment; filename=" . urlencode($file));
    header("Content-Type: application/download");
    header("Content-Description: File Transfer");
    header("Content-Length: " . filesize($file));
    
    $fp = fopen($file, "r");
    while(!feof($fp)){
        echo fread($fp, 65536);
    }
    fclose($fp);
}
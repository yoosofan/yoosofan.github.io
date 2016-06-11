<?php
/*http://yagudaev.com/posts/resolving-php-relative-path-problem/
include($_SERVER["DOCUMENT_ROOT"]."/dir/script_name.php");
include(dirname(__FILE__)."/dir/script_name.php");
script_name=basename(__FILE__);
*/
//http://www.openoffice.org/framework/documentation/mimetypes/mimetypes.html
//https://gist.github.com/nikhilben/602332
/*
 * ase "pdf":
        header("Content-type: application/pdf"); 
        header("Content-Disposition: attachment; filename=\"".$path_parts["basename"]."\""); // use 'attachment' to force a download
        break;
        default; // Other document formats (doc, docx, odt, ods etc)
        header('Content-type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        header("Content-Disposition: filename=\"".$path_parts["basename"]."\"");
    }
*/
$file1=$_SERVER["DOCUMENT_ROOT"].'files/semester/time_table_941.odt' ;
if (file_exists($file1)){
    //header('Content-Description: File Transfer');
    header('Pragma: public');
    //header('Content-Type: application/octet-stream' );
    header('Content-Type: application/vnd.oasis.opendocument.text' );
    //header('Content-Type: '.mime_content_type(basename($file1)));
    header('Content-Disposition: attachment; filename="'.basename($file1).'"');
    //header('Mime-Version: 1.0');
    header('Content-Length: ' .filesize($file1));
    header("Content-Transfer-Encoding: binary\n");
    //header('Expires: 0');
    //header('Cache-Control:  public, must-revalidate');
    //header('Pragma: no-cache');
    //ob_clean();
    flush();
    readfile($file1);
//    exit;
}
?>


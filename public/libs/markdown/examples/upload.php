<?php
$context = $_POST['context'];
$myfile = fopen("test.md", "w") or die("保存失败");
fwrite($myfile,$context);
fclose($myfile);
echo "保存成功";
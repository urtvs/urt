<?php
header('Content-Type: application/json');

$a=array();
$comment=array();
for ($i=0; $i<10 ; $i++) {
    $comment[]=array('commentID'=>$i, 'comment'=>'comment '.$i);
    $a['results']['block1'][]=array('id'=>$i, 'name'=>'user '.$i, 'comment'=>array($comment));
    $a['results']['block2'][]=array('id'=>$i*100, 'name'=>'user '.$i*100, 'comment'=>array($comment));
    $a['results']['block3'][]=array('id'=>$i*100, 'name'=>'user '.$i*100, 'comment'=>array($comment));
    $a['results']['block4'][]=array('id'=>$i*100, 'name'=>'user '.$i*100, 'comment'=>array($comment));
    $a['results']['block5'][]=array('id'=>$i*100, 'name'=>'user1 '.$i*100, 'comment'=>array($comment));
    $a['results']['block6'][]=array('id'=>$i*100, 'name'=>'user '.$i*100, 'comment'=>array($comment));
}

echo json_encode($a);
?>
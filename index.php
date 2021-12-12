<?php 
    $files = glob('videos/*.mp4');
    $fname = $files[0];
    $ftext = preg_replace("/[0-9]./i", " ", ucwords(str_replace('_', ' ', basename($fname, '.mp4'))));
?>
<section class="cid-rvKIrx3PM4" id="header2-9k">
    <div class="container-fluid">
    <h1 class="text-center pb-4">Médialejátszó</h1>
    <div class="col-12 mb-4">
        <div class="col-sm-12 col-md-10 col-lg-8 col-xl-6 p-2 m-auto">
            <div class="br-4 border-1-solid-gray text-gray">
                <div class="p-2 pt-2 mb-2">
                    <div id="infobox" class="box" style="display: none;">>>> <b><?php echo $ftext; ?></b> <<<</div>
                    <div id="audioplayer" class="box">
                        <div id="toggle-wrap" class="play">
                                <button id="toggle"></button>
                        </div>
                        <div class="timeline-wrap">
                            <div id="timeline">    
                                <div id="playhead" style="margin-left: 0;"></div>
                            </div>
                        </div>
                    </div>
                    <video style="max-height: 406px;" poster="logo/M_C_Logo_Type.png" id="music" preload="none" class="w-100 pt-2">
                        <source src="<?php echo $fname; ?>"/>
                    </video>
                    <ul id="playlist" class="box">
                        <?php
                        $i = 1;
                        $j = 1;
                        foreach ($files as $file) {
                            $song = preg_replace("/[0-9]./i", "", ucwords(str_replace('_', ' ', basename($file, '.mp4'))));
                            echo "<li><a href='#' data-audio-src='$file'><b>$song</b> <span>[$i / ".count($files)."]</span></a></li>";
                            $i++;
                            }
                        ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="js/player.js" type="text/javascript"></script>
</section>


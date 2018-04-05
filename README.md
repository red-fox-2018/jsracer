# jsracer

INISIASI ARGV

SET JUMLAHPLAYER = ARGV 2
SET JUMLAHLINTASAN = ARGV 3
SET HASIL
SET FINISH sama dengan false
SET ARRPLAYER sama dengan FUNCTION generate_player dari JUMLAHPLAYER, JUMLAHLINTASAN

IF JUMLAHPLAYER kurang dari 2
  RETURN DISPLAY 'Maaf ! Jumlah pemain JSRacer kurang dari 2!'
END IF
ELSE IF JUMLAHLINTASAN kurang dari 15
  RETURN DISPLAY 'Maaf ! Jumlah panjang lintasan JSRacer kurang dari 15!'
END ELSE IF

RUN FUNCTION playMode
RUN FUNCTION print_board
RUN FUNCTION Winner dari hasil, Finnish

FUNCTION playMode
FUNCTION generate_player
FUNCTION print_line
FUNCTION print_board
FUNCTION advanced_player
FUNCTION finnished
FUNCTION winner
FUNCTION dice
FUNCTION reset_board
FUNCTION sleep

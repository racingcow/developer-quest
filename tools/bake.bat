@echo off

:: Path to impact.js and your game's main .js
SET IMPACT_LIBRARY=lib/impact/impact.js
SET GAME=lib/devquest/main.js

:: Output file
SET OUTPUT_FILE=../developer-quest-publish/devquest.min.js


:: Change CWD to Impact's base dir
cd ../


:: Bake!
::php tools/bake.php %IMPACT_LIBRARY% %GAME% %OUTPUT_FILE%

:: If you dont have the php.exe in your PATH uncomment the
:: following line and point it to your php.exe

"c:\Program Files (x86)\PHP\v5.4\php.exe" tools/bake.php %IMPACT_LIBRARY% %GAME% %OUTPUT_FILE%

pause
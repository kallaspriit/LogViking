cd ../client
7z a -tzip -r ../build/LogViking.nw *.html *.js *.ico *.png *.jpg *.gif *.css *.json

cd ../build
copy /b node-webkit\nw.exe+LogViking.nw LogViking.exe

#ResHacker.exe -addoverwrite "LogViking.exe", "LogViking.exe", "logo.ico", ICONGROUP, MAINICON, 0
#ResHacker.exe -addoverwrite "LogViking.exe", "LogViking.exe", "logo.ico", ICONGROUP, IDR_MAINFRAME, 0
#ie4uinit.exe -ClearIconCache

#cd /d %userprofile%\AppData\Local
#attrib �h IconCache.db
#del IconCache.db
#start explorer
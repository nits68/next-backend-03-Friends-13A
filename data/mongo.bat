@echo off
chcp 65001
"mongoimport.exe" --uri="mongodb://localhost:27017" --db=friends --collection=seasons --drop --file=seasons.json --jsonArray
"mongoimport.exe" --uri="mongodb://localhost:27017" --db=friends --collection=episodes --drop --file=episodes.json --jsonArray
echo PLEASE KILL AND RESTART YOUR BACKEND SERVER DEV TASK IF RUNNING!
pause
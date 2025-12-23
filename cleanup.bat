@echo off
echo Cleaning up old containers...
docker stop restaurant-server restaurant-frontend server frontend 2>nul
docker rm restaurant-server restaurant-frontend server frontend 2>nul
echo Done! Now run the Jenkins pipeline.
pause

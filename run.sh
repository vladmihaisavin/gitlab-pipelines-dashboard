docker build --tag gitlab-pipelines-dashboard .
docker run -p 3000:3000 -p 6606:6606 --name=gpd -d  gitlab-pipelines-dashboard
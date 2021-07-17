docker build --tag gitlab-pipelines-dashboard .
docker run -p 3000:3000 -p 6606:6606 --name=erb -d  gitlab-pipelines-dashboard
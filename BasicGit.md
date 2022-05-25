# Basic Git commands for Deployment

git init
git status

git add -A

<!-- commit is like a certain snapshot of all the code at a certain point in time -->
<!-- -m is message, M is modified, U is untracked -->

git commit -m "Initial commit"

<!-- connect existing repo to the remote -->

git remote add origin https://github.com/Karthi20thc/Natours-Tour.git

git push origin master

git pull origin master

# Basic Heroku commands for Deployment

heroku login

<!-- creates a  new remote branch in our git repo. This branch is called heroku Before we added a remote branch pointing to github called origin -->

heroku create

<!-- push our application to that remote branch i,e heroku  -->

git push heroku master

heroku open

<!-- to see logs -->

heroku logs --tail

<!-- To set environvemnet varibles to heroku -->

heroku config:set NODE_ENV=production
heroku config:set DATABASE='mongodb+srv://Karthik:<PASSWORD>@cluster0.c6bru.mongodb.net/natours?retryWrites=true&w=majority'
heroku config:set DATABASE_PASSWORD=mongodbatlas

<!-- after settings all environment variables -->

heroku apps:rename natours-karthik

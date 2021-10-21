SET UP

step 1: clone the repo to your local
step 2: change to the project directory
step 3: install dependencies: ```yarn install```
step 4: install router: ```yarn add react-router-dom```
step 5: run the application: ```yarn start```
step 6: before coding, ensure that local is up to date with remote
```git fetch```
then switch to local main branch
```git checkout main```
if needed, download the latest remote main
```git pull origin main```
finally create and switch to a new local branch 
```git checkout -b <name>```
step 7: when you are happy with your code and want to add it to Github: 
```git add .```
```git commit -m"message"
```git push origin <branch_name>```










"/"
<Home />
fetch("https://api.imgflip.com/get_memes")


"/:template_id"
<GenerateMeme />
fetch("https://api.imgflip.com/get_memes")

fetch("https://api.imgflip.com/caption_image", {
  body: "template_id=181913649&username=croure&password=y2btvB-A9TQb92n&text0=testtop&text1=testbottom",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  method: "POST"
})




https://i.imgflip.com/5r4djq.jpg


curl https://api.imgflip.com/get_memes

curl https://api.imgflip.com/caption_image \
-X POST \
-d "template_id=181913649&username=croure&password=y2btvB-A9TQb92n&text0=testtop&text1=testbottom"

croure
y2btvB-A9TQb92n

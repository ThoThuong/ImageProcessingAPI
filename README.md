# Instruction to start the ImageProcessingAPI project.

## Step 1:

    Open the ImageProcessingAPI project folder.

    Type the command and press up on the enter button following the steps below on the VSCode terminal console or the windows console or the console macOS window to launch this project.

## Step 2 (Install Dependencies):

    npm i

## Step 3 (Build project):

    npm run build

## Step 4 (Start project):

    => To run on product mode:
    npm run start

    => To run on dev mode:
    npm run dev

## Step 5 (Run the Unit test):

    => To run test:
    npm run test

## To testing API on postman

    Install postman app and then import the collection file in folder CollectionPostman. in the collection we have one folder call is ImageProcessingAPI and in this folder we have two request to resize image.

    1) For this endpoint we can pass any image from the client machine which use to testing API
    The enpoint is: http://127.0.0.1:3000/resize
    The method to send data to server is Post
    The type of the body of the request is form-data:

        widh: is mandatory key and to pass the number of width you want to resize your image.
        height: is mandatory key and to pass the number of height you want to resize your image
        image: is mandatory key and to pass your image which you want to resize

    2) For this endpoint, we can only pass the image name already available in this project.
        1) http://127.0.0.1:3000/?filename=aslhndogan.jpg&width=400&height=500
        2) http://127.0.0.1:3000/?filename=fallow-deer.jpg&width=400&height=500
        3) http://127.0.0.1:3000/?filename=juan-martin-lopez.jpg&width=400&height=500
        4) http://127.0.0.1:3000/?filename=rufous.jpg&width=400&height=500

<p align="center">
  <img src="CollectionPostman/CollectionPostman/Screen Shot 2022-07-31 at 10.38.38.png" alt="The result image testing on the postman tool">
</p>

## To Testing API on browser.

    the list endpoints can be Testing:
    1) http://127.0.0.1:3000/?filename=aslhndogan.jpg&width=400&height=500
    2) http://127.0.0.1:3000/?filename=fallow-deer.jpg&width=400&height=500
    3) http://127.0.0.1:3000/?filename=juan-martin-lopez.jpg&width=400&height=500
    4) http://127.0.0.1:3000/?filename=rufous.jpg&width=400&height=500

<p align="center">
    <img src="CollectionPostman/Screen Shot 2022-07-31 at 21.18.02.png" alt="The result image testing on the google chrome browser">
</p>

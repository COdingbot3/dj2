song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist =0;
scoreLeftWrist =0;

function preload()
{
    song = loadSound("music.mp3");
    song2 = loadSound("Song2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}
function draw() {
    image(video, 0, 0, 600, 500);

if (scoreLeftWrist > 0.08) {
    fill("red");
    stroke("purple");
    circle(leftWristX,leftWristY,20);
    song.play()
    song2.stop()
}

if (scoreRightWrist > 0.08) {
    fill("red");
    stroke("purple");
    circle(rightWristX,rightWristY,20);
    song.stop()
    song2.play()
}
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop()
    {
      song.stop();
    }

    function gotPoses(results)
    {
        if(results.length > 0)
        {
            console.log(results);
            leftWristX = results[0].pose.leftWrist.x;
            leftWristY = results[0].pose.leftWrist.y;
            console.log("leftWristX =" + leftWristX +" leftWristY ="+ leftWristY);

            scoreRightWrist = results[0].pose.keypoints[10].score;
            scoreLeftWrist = results[0].pose.keypoints[9].score;

            rightWristX = results[0].pose.rightWrist.x;
            rightWristY = results[0].pose.rightWrist.y;
            console.log("rightWristX =" + rightWristX +" rightWristY ="+ rightWristY);
        }
    }

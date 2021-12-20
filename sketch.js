let vw;
let vh;
let paroleDiv;
let introDiv;
let displayedWords;

let finalWords;
let finalTitle;
let finalTitleContainer;
let finalTitleQuote;

let instructions;
let itsTime = false;
let index = 0;
let button;
let scrollAvailable = false;
let hasSkippedGame = false;
let hasSkippedVideo = false;
let wordsAppeared = false;
let scrollPoint = 0;
let video;
let videoContainer;
let loadedVideo = false;
let deletedN=0;
let titleDisappeared = false;
let hoverStarted = false;
let startButton;
let startButtonContainer;

let text1, text2, text3, text4;
let text1Pos, text2Pos, text3Pos, text4Pos;
let text1Initial, text2Initial, text3Initial, text4Initial;
let text1Final, text2Final, text3Final, text4Final;

let speed = 5;

let colors = ["6eb1f4", "d85652", "bcdcf7", "ffc5e5", "e8b6ff", "c3e264", "a698f4", "18ad71", "7fe2a9", "647eff"];
//var getNewRandomColor;

var words = ["authenticity", "free", "speech ", "no", "analytics", "privacy", "you do you", "your thinking", "no spying", "end-to-end encryption", "fair", "community owned", "love", "decentralization", "meaningful connection", "off", "not approved offensive behaviour", "privately organized", "open platform", "free flow of information", "(vs) censorship", "authentic human connection", "free thought", "the", "telegram", "app.net", "ownership and control of your data", "uncesored self expression", "secure messaging", "healthy user experience", "indipendent", "grid", "(vs) politically censorship", "authentic expression", "(vs) sell our information", "a place for you", "freedom of expression and association", "no premium costs", "open, free, and honest global conversation", "self-hosted", "share positive", "youtube", "(vs) feed that mines your attention", "blockchain technology", "connecting free and indepent community", "don't break any laws", "expression matters", "no stealing your data", "complexity", "(vs) cancel culture", "empowers you to protect your identity", "flourish express ideas freely", "interconnected", "more private than Facebook", "no cookies", "(vs) decentralized platform", "(vs) limited state/removed/self censored videos", "ethereum blockchain", "no tracking", "open", "personal data", "respectfull", "safe space", "twitter", "users accountable", "your friends for real", "own and control personal information", "express yourself openly", "decentralized network of indipendent operated servers", "(vs) censor our speech", "common webserver techonology", "for humans not algorithms", "instagram", "open conversation", "politically unbiased", "own your conversation", "(vs) survaillance", "can't delete/moderate/block/ban", "decentralized identity", "distributed", "not for sale", "(vs) addiction", "build real-world connection", "matrix", "right to privacy", "sense of belonging", "(vs) platform fees", "code of cunduction", "groupme", "have their voices heard", "no fear of being deplatformed", "take back your data", "you own your data", "self expression", "free to express", "gnu social", "freedom", "data stored forever on a distributed data source", "(vs) selling data", "creative freedom", "fairness", "true ownership of online identity", "whatsapp", "(vs) censor", "back in your hands", "(vs) digital survaillance", "decentralized", "individual liberty", "no stealing your data", "privately", "secure space", "safely", "(vs) violating privacy"];

function setup() {
  noCanvas();
  finalTitleContainer = select(".finalTitleContainer");
  finalTitle = select(".finalTitle");
  finalTitleQuote = select(".finalTitleQuote");

  text1 = select("#text1");
  text2 = select("#text2");
  text3 = select("#text3");
  text4 = select("#text4");

  text1Initial=115;
  text2Initial=135;
  text3Initial=155;
  text4Initial=170;

  text1Final=15;
  text2Final=35;
  text3Final=55;
  text4Final=70;

  text1Final2=15-100;
  text2Final2=35-100;
  text3Final2=55-100;
  text4Final2=70-100;

  text1Pos = text1Initial;
  text2Pos = text2Initial;
  text3Pos = text3Initial;
  text4Pos = text4Initial;

  video=select(".video");
  video.onended(startFunction);
  videoContainer = select("#videoContainer");
  instructions = select("#instructions");

  var rColor = random(colors);
  button = select("#scrolldown");
  button.mousePressed(startFunction);
  button.style("background-color", "#" + rColor);

  startButton = select("#enter");
  startButtonContainer = select(".buttonContainer");

  paroleDiv = select("#keywordsContainer");
  paroleDiv.style("background-color", "#" + rColor);

  for (let i = 0; i < words.length; i++) {
    let elemento = createP(words[i]);
    elemento.parent(paroleDiv);
    elemento.addClass("elementino");


    if (words[i] != "off" && words[i] != "the" && words[i] != "grid") {
      elemento.mouseOver(deleteWord);
    } else {
      elemento.addClass("toKeep");
    }
  }
  displayedWords = selectAll(".elementino");
  finalWords = selectAll(".toKeep");


}

function draw() {
  if (itsTime && index < words.length - 1) {
    if (!displayedWords[index].hasClass("toKeep")) {
      displayedWords[index].style("opacity", "0");
    }
    index++;
  }

  text1.style("top", text1Pos + "vh");
  text2.style("top", text2Pos + "vh");
  text3.style("top", text3Pos + "vh");
  text4.style("top", text4Pos + "vh");

  //checkBoundaries();
}

function checkBoundaries() {
  if (text1Pos < text1Final || text1Pos > text1Initial) {
    text1Pos = text1Final;
  }
  if (text2Pos < text2Final || text2Pos > text2Initial) {
    text2Pos = text2Final;
  }
  if (text3Pos < text3Final || text3Pos > text3Initial) {
    text3Pos = text3Final;
  }
  if (text4Pos < text4Final || text4Pos > text4Initial) {
    text4Pos = text4Final;
  }
}

//----------------------------------------------------------------------------------------------
function deleteWord() {
  this.style("opacity", "0");
  deletedN++;
  if(deletedN>36&&!hoverStarted) {
    startFunction();
    hoverStarted=true;
  }
}

function startFunction() {
  if (!hasSkippedVideo && hasSkippedGame) {
    video.style("opacity", "0");
    setTimeout(function() {video.remove();}, 500);
    button.addClass("removeEvents");
    button.html("");
    showInstructions();
    hasSkippedVideo=true;
  }

  if (!hasSkippedGame) {
    button.addClass("removeEvents");
    button.html("");
    itsTime = true;
    finalWords[0].style("transition", ".5s");
    finalWords[1].style("transition", ".5s");
    finalWords[2].style("transition", ".5s");
    hasSkippedGame = true;
    setTimeout(hideWords, 1400-deletedN*10);
  }


}

function hideWords() {
  finalWords[0].style("opacity", "0");
  finalWords[1].style("opacity", "0");
  finalWords[2].style("opacity", "0");
  setTimeout(reorderWords, 600);
}

function reorderWords() {
  finalTitleContainer.style("transition", ".5s");
  finalTitleContainer.style("opacity", 1);
  wordsAppeared = true;
  button.html("scroll to continue");
  setTimeout(function() {scrollAvailable = true;}, 600);
}

//-------------------------------------------------------------------------------------------------------

function mouseWheel() {
  if (scrollAvailable && event.deltaY > 0) {
    if(!titleDisappeared) {
      finalTitleContainer.style("opacity", 0);
      titleDisappeared = true;
    }
    text1Up();
    text2Up();
    text3Up();
    text4Up();
    textsUp();
    showVideo();
  }

  if (scrollAvailable && event.deltaY < 0) {
    scrollPoint--;
    if(!titleDisappeared) {
      finalTitleContainer.style("opacity", 0);
      titleDisappeared = true;
    }
    text1Down();
    text2Down();
    text3Down();
    text4Down();
    textsDown();
    hideVideo();
  }
}

function text1Up() {
  if (text1Pos >= text1Final && text1Pos <= text1Initial) {
    if (text1Pos - speed < text1Final) {
      text1Pos = text1Final;
    } else {
      text1Pos -= speed;
      setTimeout(function() {finalTitleContainer.style("opacity", 0);}, 200);
    }
  }
}

function text1Down() {
  if (text1Pos >= text1Final && text1Pos <= text1Initial && text2Pos == text2Initial) {
    if (text1Pos + speed > text1Initial) {
      text1Pos = text1Initial;
      finalTitleContainer.style("opacity", 1);
    } else {
      text1Pos += speed;
    }
  }
}

//-------------------------------------------------------------------------------titolo + scroll

function text2Up() {
  if (text2Pos >= text2Final && text2Pos <= text2Initial && text1Pos == text1Final) {
    if (text2Pos - speed < text2Final) {
      text2Pos = text2Final;
    } else {
      text2Pos -= speed;
    }
  }
}

function text2Down() {
  if (text2Pos >= text2Final && text2Pos <= text2Initial && text3Pos == text3Initial) {
    if (text2Pos + speed > text2Initial) {
      text2Pos = text2Initial;
    } else {
      text2Pos += speed;
    }
  }
}

//-------------------------------------------------------------------------------titolo + scroll

function text3Up() {
  if (text3Pos >= text3Final && text3Pos <= text3Initial && text2Pos == text2Final) {
    if (text3Pos - speed < text3Final) {
      text3Pos = text3Final;
    } else {
      text3Pos -= speed;
    }
  }
}

function text3Down() {
  if (text3Pos >= text3Final && text3Pos <= text3Initial && text4Pos == text4Initial) {
    if (text3Pos + speed > text3Initial) {
      text3Pos = text3Initial;
    } else {
      text3Pos += speed;
    }
  }
}

//-------------------------------------------------------------------------------titolo + scroll

function text4Up() {
  if (text4Pos >= text4Final && text4Pos <= text4Initial && text3Pos == text3Final) {
    if (text4Pos - speed < text4Final) {
      text4Pos = text4Final;
    } else {
      text4Pos -= speed;
    }
  }
}

function text4Down() {
  if (text4Pos >= text4Final && text4Pos <= text4Initial) {
    if (text4Pos + speed > text4Initial) {
      text4Pos = text4Initial;
    } else {
      text4Pos += speed;
    }
  }
}

//--------------------------------------------------------------------------------------------

function textsUp() {
  if (text4Pos <= text4Final) {
      text1Pos -= speed;
      text2Pos -= speed;
      text3Pos -= speed;
      text4Pos -= speed;
    }
}

function textsDown() {
  if (text4Pos <= text4Final && !hasSkippedVideo) {
      text1Pos += speed;
      text2Pos += speed;
      text3Pos += speed;
      text4Pos += speed;
    }
}

//----------------------------------------------------------------------------------------

function showVideo() {
  if(text4Pos<-5 && !hasSkippedVideo) {
    video.style("opacity", "1");
    if (hoverStarted) {
      video.showControls();
      videoContainer.removeClass("removeEvents");
    } else {
      video.play();
    }
    button.html("skip>>");
    button.removeClass("removeEvents");
  }
}

function hideVideo() {
  if(text4Pos<-5 && !hasSkippedVideo) {
    video.style("opacity", "0");
    video.pause();
    button.html("scroll to continue");
    button.addClass("removeEvents");
  }
}

//----------------------------------------------------------------------------------------

function showInstructions() {
  startButton.style("opacity", "1");
  startButton.removeClass("removeEvents");
  startButtonContainer.removeClass("removeEvents");
  instructions.style("opacity","1");
}

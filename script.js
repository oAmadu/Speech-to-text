const listenButton = document.getElementById('listenButton');
const transcriptDiv = document.getElementById('transcript');

let finalTranscript = '';
let isListening = false;

if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();

  recognition.continuous = true;

  recognition.onstart = function() {
    listenButton.textContent = 'Listening...';
    listenButton.classList.add('listening');
  };

  recognition.onend = function() {
    listenButton.textContent = 'Listen!';
    listenButton.classList.remove('listening');
  };

  recognition.onresult = function(event) {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + '\n';
      } else {
        interimTranscript += transcript;
      }
    }

    transcriptDiv.textContent = finalTranscript + interimTranscript;
  };

  listenButton.addEventListener('click', function() {
    if (isListening) {
      recognition.stop();
      isListening = false;
    } else {
      finalTranscript = '';
      transcriptDiv.textContent = '';
      recognition.start();
      isListening = true;
    }
  });
} else {
  listenButton.disabled = true;
  listenButton.textContent = 'Speech recognition not supported';
}
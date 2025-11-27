<!-- Demo GIF: Replace the link below with your own GIF URL -->
![Lia V2 Demo](https://media.tenor.com/1QnQ2E31E4gAAAAC/machine-love-kasane-teto.gif)

## Requirements

- **Python 3.7+** (Recommended: 3.10 or newer)
- **pip** (Python package manager)

### Python Packages
- `pyttsx3` (for Text-to-Speech, optional but recommended)
- `googletrans` (for translation, optional)
- `sounddevice`, `vosk` (for voice input, optional)
- `pygame`, `numpy`, `soundfile` (for advanced TTS features)

### For Streaming/Advanced
- Ollama (for LLM integration, see OLLAMA_SETUP.md)
- obs-websocket-py (for OBS integration, optional)

Install all recommended packages:
```powershell
pip install pyttsx3 googletrans==4.0.0-rc1 sounddevice vosk pygame numpy soundfile obs-websocket-py
```
# Lia V2 - Streaming AI (Neuro-sama Style)

## Features

- **No API Keys Required**: Works offline, no subscriptions needed
- **Context Memory**: Remembers long conversations and topics
- **Personality Engine**: Consistent, sweet, and kind character
- **Response Variety**: Natural, non-repetitive replies
- **Emotion Detection**: Senses your mood and responds accordingly
- **TTS (Text-to-Speech)**: Voice output for streaming or fun
- **Twitch Integration**: Reads and responds to Twitch chat
- **Custom Knowledge**: Teach Lia new facts and responses
- **Persistent Memory**: Saves all chats and knowledge

---

## Quick Start

### 1. Run Lia in Console
```powershell
cd "C:\Users\####\####\######\LIA" your own path
python lia_v2.py
```

### 2. (Optional) Enable Voice Output
```powershell
pip install pyttsx3
```

### 3. Chat!
```
You: Hi Lia!
Lia: Hehe~ Hi there! How are you doing?

You: What can you do?
Lia: Oh! I can chat with you and remember our conversations!

You: stats
Stats:
   Knowledge: 118 things
   Messages: 2
   Topics: 0
   Questions: 0
```

---

## Streaming Setup

### 1. TTS for Streaming
- Install `pyttsx3` (see above)
- Lia will speak responses out loud

### 2. Twitch Integration
- Get an OAuth token: https://twitchapps.com/tmi/
- Edit `streaming/twitch_integration.py` with your channel and token
- Run Lia as usual

### 3. OBS Integration (Optional)
- Use "Window Capture" in OBS to show Lia's chat #haven't added yet
- Add "Text (GDI+)" for overlay responses

---

## Ollama Integration (Limitless Knowledge)

Lia can use a local LLM (like llama3) for dynamic, intelligent answers.

**Setup:**
1. Download and install Ollama: https://ollama.ai/download
2. Pull a model (e.g. llama3.2:1b):
   ```powershell
   ollama pull llama3.2:1b
   ```
3. Run Lia:
   ```powershell
   python lia_v2.py
   ```

See `OLLAMA_SETUP.md` for full details and troubleshooting.

---

## Teaching Lia New Knowledge

You can teach Lia new facts at runtime:
```python
from lia_v2 import LiaStreamingAI
lia = LiaStreamingAI()
lia.learn("favorite game", "I love chatting! That's my favorite game~")
response = lia.get_response("What's your favorite game?")
print(response)
```

---

## Customization

- **Personality**: Edit `core/personality.py` to tweak traits
- **Response Templates**: Edit `core/response_generator.py`
- **TTS Settings**: Edit `streaming/tts_engine.py` for voice, rate, and volume
- **Twitch Settings**: Edit `streaming/twitch_integration.py`

---

## Requirements
- Python 3.7+
- `pyttsx3` (for TTS, optional)
- `obs-websocket-py` (for OBS integration, optional)
- Ollama (for LLM integration, optional)

---

## Example Conversation
```
You: Hi Lia!
Lia: Hehe~ Hi there! How are you doing?
You: What's your name?
Lia: My name is Lia! I have white hair and green eyes, ehehe~
You: You're cute!
Lia: Aww~ You're making me blush! >//<
You: What do you like?
Lia: Oh! Tell me more about that~ What do YOU like?
You: I like gaming
Lia: Ooh~ gaming! Cool! What's your favorite game?
```

---

## FAQ & Troubleshooting

- **No voice output?**
  - Make sure `pyttsx3` is installed
- **Ollama not detected?**
  - Start Ollama, check your model, see `OLLAMA_SETUP.md`
- **Twitch not working?**
  - Double-check your OAuth token and channel name
- **Bot not learning?**
  - Check file permissions for `knowledge.json`

---

## Contributing

Pull requests and suggestions are welcome! See the code comments for extension points.

---

**Enjoy streaming and chatting with Lia!**


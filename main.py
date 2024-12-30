from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from mido import MidiFile, MidiTrack, Message

# Initialize FastAPI App
app = FastAPI(docs_url=None, redoc_url=None)  # Disable Swagger UI

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Route - Redirect to API docs if directly accessed
@app.get("/", include_in_schema=False)
async def root():
    return {"message": "Welcome to the DJAPE Backend! Use the frontend app for interaction."}

# Music Generation Endpoint
@app.post("/generate-music/")
async def generate_music(prompt: str = "simple melody"):
    midi = MidiFile()
    track = MidiTrack()
    midi.tracks.append(track)

    # Simple melody example
    notes = [60, 62, 64, 65, 67]
    for note in notes:
        track.append(Message('note_on', note=note, velocity=64, time=128))
        track.append(Message('note_off', note=note, velocity=64, time=128))

    filename = "generated_song.mid"
    midi.save(filename)
    return {"message": "MIDI file generated successfully", "file": filename}

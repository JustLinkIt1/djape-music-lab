from fastapi import FastAPI
from fastapi.responses import FileResponse
from mido import MidiFile, MidiTrack, Message
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],
)

# Root Route
@app.get("/")
async def root():
    return {"message": "Welcome to the DJAPE Backend! The server is running."}

# Generate Music Route (POST)
@app.post("/generate-music/")
async def generate_music(prompt: str = "simple melody"):
    midi = MidiFile()
    track = MidiTrack()
    midi.tracks.append(track)

    notes = [60, 62, 64, 65, 67]  # Simple melody
    for note in notes:
        track.append(Message('note_on', note=note, velocity=64, time=128))
        track.append(Message('note_off', note=note, velocity=64, time=128))

    filename = "generated_song.mid"
    midi.save(filename)
    return FileResponse(filename, headers={"Content-Disposition": f"attachment; filename={filename}"})

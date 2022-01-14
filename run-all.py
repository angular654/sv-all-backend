import subprocess
#python ./client/main.py & python ./streamer.py
subprocess.run("python ./client/main.py & python ./streamer.py & docker-compose up", shell=True)
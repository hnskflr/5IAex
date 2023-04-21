from fastapi import FastAPI, File, UploadFile

app = FastAPI()


# TODO: upload file
#       create thread
#       send each line over usb
#       if pause / resume pause / resume thread
#       if stop stop thread

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/pause")
async def pause():
    # pause / resume send thread
    return { "successful": "true" }

@app.get("/resume")
async def resume():
    # pause / resume send thread
    return { "successful": "true" }


@app.get("/stop")
async def stop():
    # stop send thread
    return { "successful": "true" }

@app.post("/upload")
async def upload(file: UploadFile ):
    try:
        content = file.file.readlines()
        # start thread that sends each line to arduino
        for line in content:
            print(line)

    except Exception as e:
        return { "message": e.args }
    finally:
        file.file.close()

    return { "message": "File uploaded succseefully" }

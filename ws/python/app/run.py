import os
import uvicorn

port = int(os.environ.get('HTTP_PORT', '5500'))

if __name__ == '__main__':
    uvicorn.run(app="urls:app", host='0.0.0.0', port=port, reload=True)
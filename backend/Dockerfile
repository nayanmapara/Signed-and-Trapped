FROM python:3.9

WORKDIR Signed-and-Trapped/backend/

COPY requirements.txt .
RUN pip install cohere --break-system-packages
RUN pip install pinecone --break-system-packages
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "run.py"]

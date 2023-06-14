FROM python:3.9-slim-buster

WORKDIR /code

RUN pip3 install pytest

COPY requirements.txt .

COPY test_run.py ./

CMD [ "pytest", "test_run.py" ]
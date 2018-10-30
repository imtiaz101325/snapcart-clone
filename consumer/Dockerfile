FROM ubuntu:18.04

RUN apt update \
    && apt upgrade -y \
    && apt install wget locales python3-dev python3-pip tesseract-ocr -y \
    && apt clean \
    && apt autoremove \ 
    && locale-gen en_US.UTF-8 \
    && wget --no-check-certificate https://github.com/tesseract-ocr/tessdata/raw/3.04.00/eng.traineddata -P /usr/share/tessdata \
    && wget --no-check-certificate https://github.com/tesseract-ocr/tessdata/raw/3.04.00/ben.traineddata -P /usr/share/tessdata

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

LABEL Name=snapcart_clone_consumer Version=0.0.2
EXPOSE 5000

WORKDIR /app

COPY . /app

RUN python3 -m pip install pipenv
# temporary workaround https://github.com/pypa/pipenv/issues/2924
RUN pipenv run pip install pip==18.0
RUN pipenv install --verbose --skip-lock
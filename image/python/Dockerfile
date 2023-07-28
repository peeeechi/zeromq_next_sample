
FROM python:3.8.10

ENV USER_NAME=gyoukaku
ENV USER_UID=1000
ENV USER_GID=1000

RUN apt-get update && apt-get install -y --no-install-recommends \
gosu \
vim \
curl \
&& apt-get clean \
&& rm -rf /var/lib/apt/lists/*

COPY ./requirements.txt /tmp/requirements.txt
COPY ./scripts/* /tmp/scripts/

RUN pip install -r /tmp/requirements.txt


ENTRYPOINT [ "/tmp/scripts/add-user.sh" ]

FROM node:18.17.0
ENV _UID=1000
ENV _GID=1000

RUN apt-get update && apt-get install -y \
  sudo \
  gosu \
  git \
  && apt-get clean

RUN mkdir /home/node/ws \
  && groupmod -g ${_GID} node \
  && usermod -u ${_UID} -g ${_GID} node \
  && echo "node:node" | chpasswd

COPY ./scripts/init.sh /tmp

ENTRYPOINT [ "/tmp/init.sh" ]
CMD [ "gosu node:node bash" ]

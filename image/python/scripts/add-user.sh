#!/bin/bash -eu

# /usr/sbin/sshd

groupadd -g ${USER_GID} ${USER_NAME}
useradd -u ${USER_UID} -g ${USER_GID} ${USER_NAME} -p $(perl -se 'print crypt(${var}, "\$6\$saltsalt")' -- -var=${USER_NAME})
usermod -G sudo ${USER_NAME}
# mv /tmp/dotfiles/.bashrc /home/${USER_NAME}/.bashrc
# mv /tmp/dotfiles/.vimrc /home/${USER_NAME}/.vimrc

if [ ! -d /home/${USER_NAME}/ws ]; then
    mkdir -p /home/${USER_NAME}/ws
fi
chown -R ${USER_NAME}:${USER_NAME} /home/${USER_NAME}
cd /home/${USER_NAME}/ws

gosu ${USER_NAME}:${USER_NAME} "/bin/bash"
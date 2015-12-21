/*
 Learn MongoDB
───────────────
 MONGOD
 Exercise 1 of 9

Hey hey from learnyoumongo. First, let's get MongoDB installed.
You can download MongoDB from https://www.mongodb.org/downloads.

We will also need to add it to your $PATH.

-------------------------------------------------------------------------------

## HINTS

To verify that mongod is installed, you can try running mongod --version.

If you are on Windows, you will need to use mongod.exe instead.

It should print out something similar to:

    db version v2.6.8
    2015-05-06T09:44:39.362-0500 git version: nogitversion
*/

/*
He seguido las instrucciones de esta web:
https://docs.mongodb.org/getting-started/shell/tutorial/install-mongodb-on-ubuntu/

La salida obtenida al comprobar la versión es:
$mongod --version
db version v3.0.7
git version: 6ce7cbe8c6b899552dadd907604559806aa2e9bd

El problema es que hay un fallo conocido con las verisones posteriores a la 2.6.3 con
Ubuntu 15.04 y 15.10 que no se corregirá hasta Ubuntu 16.04 según 
http://stackoverflow.com/a/29902538

He seguido finalmente las instrucciones de ese comentario de stackoverflow, instalando
una versión más antigua de mongo pero que funciona, desde los repositorios de ubuntu.
*/
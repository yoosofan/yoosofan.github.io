/* named_pipe_server.cpp    The server process */
#define _GNU_SOURCE
#include "named_pipe_local.h"
int main(){
  int  n, done, dummyfifo, publicfifo, privatefifo;
  struct message  msg;
  FILE            *fin;
 static char     buffer[PIPE_BUF];
  mknod(PUBLIC, S_IFIFO | 0666, 0);
  if ((publicfifo = open(PUBLIC, O_RDONLY)) == -1 ||
      (dummyfifo= open(PUBLIC, O_WRONLY | O_NDELAY))==-1 )
  { perror(PUBLIC);   return 1; }
  while (read(publicfifo,(char *) &msg, sizeof(msg)) >0){
    n = done = 0;
    do {
      if ((privatefifo=open(msg.fifo_name, O_WRONLY|O_NDELAY)) == -1)
        sleep(3);
      else {
        fin = popen(msg.cmd_line, "r");
        write(privatefifo, "\n", 1);
        while ((n = read(fileno(fin), buffer,PIPE_BUF))>0){
         write(privatefifo, buffer, n);
          memset(buffer, 0x0, PIPE_BUF);
        }
        pclose(fin);
        close(privatefifo);
        done = 1;
      }
    } while (++n < 5 && !done);
    if (!done) {
      write(fileno(stderr),
     "\nNOTE: SERVER ** NEVER ** accessed private FIFO\n",
      48);
      return 2;
    }
  }
  return 0;
}

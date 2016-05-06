#include <iostream>
#include <cstdio>
#include <unistd.h>
#include <string.h>
using namespace std;
int main(){
    int f_des[2];
    static char message[BUFSIZ];
    char writeMessage[2000]= "check write and test pipes ";
    int ret_val = 0;
    if(pipe(f_des) ==  -1){
        perror("pipe"); ret_val =2;
    } else switch(fork()){
        case -1:
            perror("Fork"); ret_val=3;   break;
        case 0:
            close(f_des[1]);
            if(read(f_des[0],message, BUFSIZ) != -1){
                cout<< "Message recieved by child: ["
                  << message << "]" << endl;
                cout.flush();
            } else {perror("Read error"); ret_val = 4;}
        break;
        default:  // In the Parent
            close(f_des[0]);
            cout<<"Enter your message   : " ;cout.flush();
            cin.getline(writeMessage ,BUFSIZ - 1);
            if(write(f_des[1], writeMessage, strlen(writeMessage))){
                cout<<"Message sent by parent  :  ["
                   <<writeMessage<<"]"<<endl;
                cout.flush();
            } else {perror("Write"); ret_val=5;}
        break;
    }
    return ret_val;
}

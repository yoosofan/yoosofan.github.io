/* Shared_mem_sample.cpp */
#include <iostream>
#include <iomanip>
#include <sys/types.h>
#include <sys/wait.h>
#include "Shared_mem.h"
int main(int argc, char *argv[]) {
  int    n;
  Shared_mem<int> s[4];
//Instantiate an array of shared memory objects
//each to hold an integer value.
  if (argc < 2 || (n = atoi(argv[1])) > 6 || n < 1 ) {
    cerr << "Usage: " << argv[0] << " value 1-6" << endl;
    return 1;
  }
  setbuf(stdout, NULL);  // Standard output is unbuffered
                         // Starting values
  s[0].Put(0);           // Process counter
  s[1].Put(1);           // Process # when @ end of line
  s[2].Put(64);          // Output width
  s[3].Put(0);           // Process # that starts new line
  cout <<  "\t\t\tTree of level " << n << endl << endl;
  for (int i=0; i < n; ++i) {
    if ( !fork() ) {           // in the child
      int temp_width = s[2].Get();// get output width
      if ((s[0].Get()) == s[3].Get())// if @ start of line use 1/2
        temp_width /= 2;
      cout << setiosflags(ios::uppercase) << hex
           << setw(temp_width) << (s[0].Get()) % 16;
      s[0].Put(s[0].Get()+1); // count the process
    }
    if ( s[0].Get() == s[1].Get() ){// If at the end of line
     s[1].Put( s[1].Get() * 2 + 1 );//update end of line process #
     s[2].Put( s[2].Get() / 2 ); // decrease output width
     s[3].Put( s[0].Get() ); // new sart of line process #
      cout << endl << endl;
    }
    wait(0);       // wait for the child to finish!
  }
  return 0;
}
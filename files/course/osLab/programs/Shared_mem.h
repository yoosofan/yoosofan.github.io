/* Shared_mem.h
   A VERY simplified shared memory class for use in a std UNIX
   environment.  See the text for instructions on how to use
   this class.  Copyright (c) 2002 J. S. Gray

   Exit codes for class operations:

   1 - Unable to allocate memory      2 - Unable map memory
   3 - Could not remove shared memory
   * changed by ahmad yoosofan Nov 2008
   * to correct g++ link error
 */
 #ifndef Shared_mem_h
 #define Shared_mem_h
// #define _GNU_SOURCE
 #include <iostream>
 #include <cstdio>
 #include <sys/types.h>
 #include <unistd.h>
 #include <stdlib.h>
 #include <sys/ipc.h>
 #include <sys/shm.h>
 using namespace std;
 template <class S_type>     // Allow for different data types
 class Shared_mem {
   public:
     Shared_mem ( );        // Constructor
     ~Shared_mem( );        // Destructor - remove shared memory
     void   Put( const S_type );// Assign value to shared memory
     S_type Get(  );     // Return value from shared memory

   private:
     int    shmid;        // ID of shared memory
     S_type *shm_ptr;     // Reference to shared memory
     pid_t  my_pid;       // Hang on to originator PID
 };
                              // Generate private mem segment
template <class S_type>                // Generalize data type
Shared_mem<S_type>::Shared_mem(  ){
  my_pid = getpid( );           // Save PID of creating process
  if ((shmid = shmget(IPC_PRIVATE, sizeof(S_type),
       IPC_CREAT | 0660)) < 0)
    exit(1);
  if ((shm_ptr = (S_type *) shmat(shmid, NULL, 0)) == NULL)
    exit(2);
}
template <class S_type>// Remove memory if creator
Shared_mem<S_type>::~Shared_mem(  ) {
  if ( getpid( ) == my_pid ) {
    shmdt( (char *) shm_ptr );
    if ( shmctl(shmid, IPC_RMID, (struct shmid_ds *) 0) == -1 )
      exit( 3 );
  }
}
template <class S_type>// Assign value to this location
void Shared_mem<S_type>::Put( const S_type stuff  ){
  *shm_ptr = stuff;
}
template <class S_type>// Retrieve value from location
S_type Shared_mem<S_type>::Get(  ){
  static S_type stuff;
  stuff = *shm_ptr;
  return stuff;
}
#endif
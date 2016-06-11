/* SSemaphore.cpp
    SSemaphore implementation - Copyright (c)  2002  J. S. Gray
 */
#include "SSemaphore.h"
SSemaphore::SSemaphore(  ){// Generate a private semaphore
  zero.sem_num   = 0, zero.sem_op   =  0;
  zero.sem_flg   = SEM_UNDO , lock.sem_num   = 0;
  lock.sem_op   = -1, lock.sem_flg   = SEM_UNDO;
  unlock.sem_num = 0, unlock.sem_op =  1;
  unlock.sem_flg = SEM_UNDO;   my_pid = getpid( );
  if((semid = semget( IPC_PRIVATE, 1, 0660 )) == -1 ){
      exit( 1 );
  }
  Put( 0 );   //Default - set to zero @ start
}
SSemaphore::~SSemaphore( ) {// Remove semaphore if creator
  if ( getpid( ) == my_pid )
    if ( semctl( semid, 0, IPC_RMID ) == -1 )
      exit( 2 );
}
int SSemaphore::P( ){// LOCK semaphore & Atomic test & decrement
  if ( semop( semid, &lock, 1 ) == -1 )
    exit( 3 );
  return 0;
}
void SSemaphore::V( ){// UNLOCK semaphore & Increment semaphore
  if ( semop( semid, &unlock, 1 ) == -1 )
    exit( 4 );
}
int SSemaphore::Z( ){// Wait for semaphore to be 0
  if ( semop( semid, &zero, 1 ) == -1 )
    exit( 5 );
  return 0;
}
void SSemaphore::Put( int const value ){
  arg.val = value; //Assign value to the semaphore
  if ( semctl(semid, 0, SETVAL, arg ) == -1 )
    exit( 6 );
}

int SSemaphore::Get( ){// Return value of the semaphore
  int sem_value;
  if ((sem_value=semctl(semid, 0, GETVAL, 0)) == -1 )
    exit( 7 );
  return sem_value;
}

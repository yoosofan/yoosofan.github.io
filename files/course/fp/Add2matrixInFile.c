/*
 * Add two matrix which stored in a text file.
 * Author   :     Ahmad Yoosofan
 * Date     :     2010/12/29
 */
#include <stdio.h>
#include <stdlib.h>

typedef struct {
      int *A;
      int nrows,ncols;
   } oneDimMatrix;
enum modeOfReading {DETECT_SIZE , READ_MATRIX };
oneDimMatrix AddoneDimMatrix(oneDimMatrix a , oneDimMatrix b);
int readTwoOnDimMatrixFromAFile(char *fileName , oneDimMatrix * a , oneDimMatrix * b);
oneDimMatrix createMatrix(int nrows  , int ncols){
   oneDimMatrix a;
   a.nrows = nrows;
   a.ncols = ncols;
   a.A = (int *) malloc(nrows * ncols * sizeof(int));
   if(a.A == 0){
      printf("Can not allocate memory in createMatrix \n");
      exit(0);
   }
   return a;
}
int getAnElementOfOneDimMatrix(oneDimMatrix *a , int i , int j){
   int index , result ;
   index = i * a->ncols + j;
   if(index >=0 && index < a->nrows * a->ncols)
      result = *(a->A+index);
   else{
      printf("You access to index which is out of range\n");
      result = 0 ;
   }
   return result;
}
int setAnElementOfOneDimMatrix(oneDimMatrix *a , int i, int j , int value){
   int index ;
   index = i * a->ncols + j ;
   if(index >=0 && index < a->nrows * a->ncols)
      *(a->A + index) = value;
   else
      printf("You access to index of matrix which is out of range of matrix. \n");
   return index;
}

oneDimMatrix copyOneDimMatrix(oneDimMatrix *a){
   oneDimMatrix result;
   int i , j;
   result = createMatrix(a->nrows , a->ncols);
   for(i = 0 ; i< a->nrows ; i++)
      for(j=0 ; j<a->ncols ; j++)
         setAnElementOfOneDimMatrix(&result,i,j,getAnElementOfOneDimMatrix(a,i,j));
   return result;
}

void printOneDimMatrix(oneDimMatrix *a){
   int i , j;
   for(i=0; i < a->nrows ; i++ ){
      for(j=0 ; j < a->ncols ; j++)
         printf("%d\t\t",getAnElementOfOneDimMatrix(a, i,j));
      printf("\n");
   }
}
oneDimMatrix addTwoOneDimMatrix(oneDimMatrix *a , oneDimMatrix *b ){
   oneDimMatrix result;
   int i,j;
   if( a->nrows == b->ncols && a->ncols == b->ncols){
      result = copyOneDimMatrix(a);
      for(i=0 ; i< result.nrows; i++)
         for(j=0; j<result.ncols; j++)
            setAnElementOfOneDimMatrix(&result,i,j, getAnElementOfOneDimMatrix(a,i,j) + getAnElementOfOneDimMatrix(b,i,j));
   }
   else 
      printf("Matrices wtih different number of rows and number of columns can not be added \n");
   return result;
}
int main(){
      oneDimMatrix a1 , a2, result;
      char fileName[] = "inputMatrixFile.txt" ;
      readTwoOnDimMatrixFromAFile(fileName , &a1 , &a2);
      result = addTwoOneDimMatrix(&a1 , &a2);
      printOneDimMatrix(&result);
      return 0;
}
char* stringToNumberInALine(char *str1 , int *pa , int * len){
   char *ps;
   *pa = 0;
   while(str1 != 0 && (*str1 == ' ' || *str1 == '\t' ) ) {
      (*len) ++ ;
      str1   ++ ;
   }
   ps = str1 ; 
   while(str1 != 0 )
      if(*str1 >=48 && *str1 <= 57 ){
         *pa = *pa * 10 + (*str1 - 48 );
         str1 ++;
         (*len) ++;
      }
      else 
         break;
   if(ps == str1)
      ps = 0;
   return ps;
}

int lengthOfString(char *str1){
   int i;
   for(i=0; str1 && *str1 ; str1++ , i++)
      ;
   return i;
}
int extractAndPrintALine(char *line){
   int len = 0;
   int a ;
   int n=0;
   while(stringToNumberInALine(line+len , &a , &len)){
      printf("%d\t\t", a);
      n++;
   }
   printf("\n");
   return n;
}
int extractIntegersInALine(char *line , int *A , int max){
   int len = 0 , a , n=0;
   while(n < max && stringToNumberInALine(line+len , &a , &len))
      A[n++] = a ;
   return n;
}
int getNumberOfColums(char *line){
   int len = 0 , a , n=0;
   while(stringToNumberInALine(line+len , &a , &len))
      n++;
   return n;
}
void inconsistentErrorReport(char *msg ,  int numberOfLines,  int nr , int nc){
   printf("Error, %s\n",msg); 
   printf("Line number is %d , row number is %d , columns number is %d \n" , 
      numberOfLines, nr , nc );
   exit(0);
   
}
FILE *openAFileForReading(char *fileName){
   FILE *fp;
   fp = fopen(fileName , "r");
   if(!fp){ printf("Can not open input file %s\n",fileName); exit(0); }
   return fp;
}
int getSizeOfMatrixInFile(FILE *fp , int numberOfLines, int *pnr , int *pnc){
   char line[55000]; 
   int numberOfColumns = 0;
   int nc = 0 , nr =0;  
   int flag = 1;
   int flagFirstLineOfMatrixVisited = 0;
   fgets(line , 54999 , fp);
   while(!feof(fp) && flag == 1){ 
      nc = getNumberOfColums(line);
      if(nc != 0){
         if(nr == 0)
            numberOfColumns = nc;         
         if(nc != numberOfColumns)
            inconsistentErrorReport("inconsistent matrix with different number of columns in each rows.", 
                                     numberOfLines, nr , nc );
         nr++ ;
         if( flagFirstLineOfMatrixVisited == 0)
            flagFirstLineOfMatrixVisited = 1;         
      }
      else  if( flagFirstLineOfMatrixVisited == 1)
      {   flag = 0; break; }
      
      numberOfLines ++ ;      
      fgets(line , 54999 , fp);
   }
   if(flag ==1 && getNumberOfColums(line)){
      numberOfLines ++ ;
      nr ++ ;
   }
   *pnr = nr;
   *pnc = numberOfColumns;
   return numberOfLines;
}
int readMatrixFromFile(FILE *fp , int numberOfLines , int mode , oneDimMatrix *a){
   char line[55000]; 
   int numberOfColumns = 0;
   int nc = 0 , nr =0;  
   int flag = 1;
   int flagFirstLineOfMatrixVisited = 0;
   fgets(line , 54999 , fp);
   while(!feof(fp) && flag == 1){
      if(mode == DETECT_SIZE)
         nc = getNumberOfColums(line);
      else
         nc = extractIntegersInALine(line , a->A + nr * a->ncols , a->ncols);
      if(nc != 0){ 
         if(nr == 0)
            numberOfColumns = nc;         
         if(nc != numberOfColumns)
            inconsistentErrorReport("inconsistent matrix with different number of columns in each rows.", 
                                     numberOfLines, nr , nc );
         nr++ ;
         if( flagFirstLineOfMatrixVisited == 0)
            flagFirstLineOfMatrixVisited = 1;         
      }
      else  if( flagFirstLineOfMatrixVisited == 1)
      {   flag = 0; break; }
      numberOfLines ++ ;      
      fgets(line , 54999 , fp);
   }
   if(flag ==1 && getNumberOfColums(line)){
      numberOfLines ++ ;
      nr ++ ;
   }
   a->nrows = nr;
   a->ncols = numberOfColumns;
   return numberOfLines;
}
int readTwoOnDimMatrixFromAFile(char *fileName , oneDimMatrix * a , oneDimMatrix * b){
   FILE *fp;
   int numberOfLines = 0;

   fp = openAFileForReading(fileName);
   numberOfLines = readMatrixFromFile(fp, numberOfLines, DETECT_SIZE, a);
   printf("%d  %d %d \n" ,numberOfLines ,  a->nrows , a->ncols );
   numberOfLines= readMatrixFromFile(fp, numberOfLines, DETECT_SIZE , b);
   printf("%d  %d %d \n" ,numberOfLines , b->nrows , b->ncols);
   if(a->nrows != b->nrows)
      inconsistentErrorReport("Different number of rows in each matrix.", 
                              numberOfLines, a->nrows , a->ncols);
   fclose(fp);

   *a = createMatrix(a->nrows , a->ncols);
   *b = createMatrix(b->nrows , b->ncols);
   fp = openAFileForReading(fileName);
   numberOfLines = readMatrixFromFile(fp, numberOfLines, READ_MATRIX, a);
   numberOfLines= readMatrixFromFile(fp, numberOfLines, READ_MATRIX , b);
   fclose(fp);   
   /*   printOneDimMatrix(a);  printf("\n");  printOneDimMatrix(b); */
   return numberOfLines;
}
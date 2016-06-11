#include<stdio.h>
int main(){
   int a[1000],b[1000],c[1000],sum[1000];
   int i,j,n,m,x,y,temp,carry,k;
   scanf("%d",& x);
   scanf("%d",& y);
   i=0;
   while(x>0){
      a[i] = x - (x/10)*10;
      x = x / 10;
      i = i +1;
   }
   n = i;
   x=y;
   i=0;
   while(x>0){
      b[i] = x - (x/10)*10;
      x = x / 10;
      i = i +1;
   }
   m = i;
   i=0;
   while(i<1000){
      sum[i] = 0;
      i = i +1;
   }
   i = 0;
   while(i<n){
      printf("%d",a[i]);
      i = i + 1;
   }
   printf("\n");
   i=0;
   while(i<m){
      printf("%d",b[i]);
      i = i +1;
   }
   printf("\n");
   i=0;

   printf("%d\n",n);
   printf("%d\n",m);
   while(i<m){
      j = 0;
      carry = 0;
      while(j<1000){
         c[j]= 0;
         j = j + 1;
      }
      j = 0;
      while( j <n){
         temp = a[i] * b[j]+carry;
         c[j] = temp - (temp/10) * 10;
         carry = temp/10;
         j = j + 1;
      }
      c[j] = carry;
      k=0;
      while(k<=j){
         sum[k+i] = sum[k+i] + c[k];
         k = k + 1;
      }
      i = i + 1;
   }
   k = i+j;
   while(i>=0){
      printf("%d",sum[i]);
      i = i -1;
   }
   return 0;
}






























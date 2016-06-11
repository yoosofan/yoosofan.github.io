/*
     webrel - Version 1.0
    This file is part of webrel.

    Copyright (C) 2010, Ahmad Yoosofan.  
    Thanks to 
	  	Sara Izadi (former co-developer)

    This software is distributed
    under the terms of the GNU General Public License.

    webrel is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    webrel is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with webrel.  If not, see <http://www.gnu.org/licenses/>.


 */

//--Identify a new type called Token to use as token in analyser(This object contains 2 attributes & 5 methods)--

function Token(num)
{
   if(num>0)
   {
      this.data=new Array(1);
      this.type=new Array(1);
   }
   this.getdata=Token_getdata
   this.gettype=Token_gettype
   this.setdata=Token_setdata
   this.settype=Token_settype
   this.length=Token_length
}
//*************************************
function Token_getdata(num)
{
   return this.data[num]
}
//*************************************
function Token_gettype(num)
{
   return this.type[num]
}
//*************************************
function Token_setdata(num,value)
{
   this.data[num]=value
}
//*************************************
function Token_settype(num,value)
{
   this.type[num]=value
}
//*************************************
function Token_length()
{
   return this.data.length;
}

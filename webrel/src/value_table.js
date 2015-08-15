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
// JavaScript Document
function value_table(num)
{
      if(num>0)
      {
         this.name=new Array(num);
         this.relation=new Array(num);
         for(var k=0;k<num;k++)
            this.relation[k]=new Relation(1,1);
      }
      this.setname=VT_setname;
      this.setrelation=VT_setrelation;
      this.getname=VT_getname;
      this.getrelation=VT_getrelation;
}
//*************************************************
function VT_setname(index,name)
{
   this.name[index]=name;
}
//*************************************************
function VT_setrelation(index,relation)
{
   this.relation[index]=relation;
}
//*************************************************
function VT_getname(index)
{
   return this.name[index];
}
//*************************************************
function VT_getrelation(index)
{
   return this.relation[index];
}

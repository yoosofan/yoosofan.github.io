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

function Relation(row,col)
{
   if(col>0)
   {
      this.data=new Array(col);
      for(var col_num=0;col_num<col;col_num++)
         this.data[col_num]=new Array(row);
      this.schema=new Array(col);
      this.row=row;
      this.column=col;
      this.group_index=-1;
      this.type=new Array(col);
      for(var i=0;i<col;i++)
         this.type[i]="string";
   }

   this.getalldata=Relation_getalldata;
   this.setalldata=Relation_setalldata;
   this.getsingledata=Relation_getsingledata;
   this.setsingledata=Relation_setsingledata;
   this.getallschema=Relation_getallschema;
   this.setallschema=Relation_setallschema;
   this.getsingleschema=Relation_getsingleschema;
   this.setsingleschema=Relation_setsingleschema;
   this.getalltype=Relation_getalltype;
   this.setalltype=Relation_setalltype;
   this.getsingletype=Relation_getsingletype;
   this.setsingletype=Relation_setsingletype;
   this.getrow=Relation_getrow;
   this.getcolumn=Relation_getcolumn;
   this.setrow=Relation_setrow;
   this.setcolumn=Relation_setcolumn;

}
//****************************************************
function Relation_getalldata()
{
      return this.data;
}
//****************************************************
function Relation_setalldata(value_array,row,col)
{
   for(var i=1;i<=row;i++)
         for(var j=0;j<col;j++)
            this.data[j][i]=value_array[i][j];
}
//****************************************************
function Relation_getsingledata(row,col)
{
   return this.data[col][row];
}
//****************************************************
function Relation_setsingledata(value,row,col)
{
   this.data[col][row]=value;
}
//****************************************************
function Relation_getallschema()
{
   return this.schema;
}
//****************************************************
function Relation_setallschema(schema_array,col)
{
   for(var i=0;i<col;i++)
      this.schema[i]=schema_array[i];
}
//****************************************************
function Relation_getsingleschema(col)
{
   return this.schema[col];
}
//****************************************************
function Relation_setsingleschema(schema_value,col)
{
   this.schema[col]=schema_value;
}
//*****************************************************
function Relation_getrow()
{
   return this.row;
}
//*****************************************************
function Relation_getcolumn()
{
   return this.column;
}
//*****************************************************
function Relation_setcolumn(value)
{
   this.column=value;
}
//*****************************************************
function Relation_setrow(value)
{
   this.row=value;
}
//****************************************************
function Relation_getalltype()
{
   return this.type;
}
//****************************************************
function Relation_setalltype(type_array,col)
{
   for(var i=0;i<col;i++)
      this.type[i]=type_array[i];
}
//****************************************************
function Relation_getsingletype(col)
{
   return this.type[col];
}
//****************************************************
function Relation_setsingletype(type_value,col)
{
   this.type[col]=type_value;
}
//*****************************************************

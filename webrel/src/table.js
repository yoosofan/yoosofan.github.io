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

function Table_getValue(row,col)
{
return this.data[row*this.columns+col]
}
//****************************
function Table_setValue(row,col,value)
{
this.data[row*this.columns+col]=value
}
//****************************
function Table_set(contents)
{
var n = contents.length
for(var j=0;j<n;++j) this.data[j]=contents[j]
}
//****************************
function Table_isHeader(row,col)
{
return this.header[row*this.columns+col]
}
//****************************
function Table_makeHeader(row,col)
{
this.header[row*this.columns+col]=true
}
//****************************
function Table_makeNormal(row,col)
{
this.header[row*this.columns+col]=false
}
//****************************
function Table_makeHeaderRow(row)
{
for(var j=0;j<this.columns;++j)
this.header[row*this.columns+j]=true
}
//****************************
function Table_makeHeaderColumn(col)
{
for(var i=0;i<this.rows;++i)
this.header[i*this.columns+col]=true
}
//****************************
function Table_write(doc)
{
doc.write("<table cellspacing="+this.x+">" )
for(var i=0;i<this.rows;i++)
{
doc.write("<TR>")
for(var j=0;j<this.columns;++j)
{
if(this.header[i*this.columns+j])
{
doc.write("<TH>")
doc.write(this.data[i*this.columns+j])
doc.write("<TH>")
}
else
{
doc.write("<TD>")
doc.write(this.data[i*this.columns+j])
doc.write("</TD>")
}
}
doc.writeln("</TR>")
}
doc.writeln("</TABLE>")
}
//****************************
function Table(rows,columns)
{
this.rows=rows
this.columns=columns
this.border=0
this.x=10
if(rows*columns>0)
{
this.data=new Array(rows*columns)
this.header=new Array(rows*columns)
}
else
{
this.data=new Array(1)
this.header=new Array(1)
}
this.getValue=Table_getValue
this.setValue=Table_setValue
this.set=Table_set
this.isHeader=Table_isHeader
this.makeHeader=Table_makeHeader
this.makeNormal=Table_makeNormal
this.makeHeaderRow=Table_makeHeaderRow
this.makeHeaderColumn=Table_makeHeaderColumn
this.write=Table_write
}

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

function Type()
{
   this.type=0;
   this.gettype=Type_gettype;
   this.settype=Type_settype;
}
//*********************************
function Type_gettype()
{
   return this.type;
}
//*********************************
function Type_settype(value)
{
   this.type=value;
}

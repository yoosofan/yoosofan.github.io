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

function syntax()
{
   //_______________________Data Declaration____________________________
   var flag=true;
   var cn=0;
   var act;
   var num;
   var accept=false;
   var error=false;
   not=false
   if(t.gettype(tp)=="end")  not=true;
   //___________________________________________________________________
   while(flag)
   {
      cn=stack.tos();
      //alert(cn)
      //alert(t.gettype(tp))
      act=action_table_data[cn][terminal2num(t.gettype(tp))];
      //alert(act)
      if(act==0||flag_error)
      {
         error=true;
         flag=false;
         break;
      }
      if(parseInt(act)<0)
      {
         num=parseInt(act)*-1;
         num--;
      }
      else
      {
         num=parseInt(act)-1;
      }
      if(num==0)
      {
         accept=true;;
         flag=false;
         break;
      }
      if(parseInt(act)<0)
      {
         reduce(num);
      }
      else
      {
         shift(num);
      }
   }
   if((error||flag_error)&&!not)
      syn_err_flag=1;
   else
      return output;
}
//**********************************************
function terminal2num(str)
{
   if(!str.localeCompare("expopr"))
      return 0;
   else if(!str.localeCompare("camaopr"))
      return 1;
   else if(!str.localeCompare("INSERT"))
      return 2;
   else if(!str.localeCompare("DELETE"))
      return 3;
   else if(!str.localeCompare("UPDATE"))
      return 4;
   else if(!str.localeCompare("DROP"))
      return 5;
   else if(!str.localeCompare("VAR"))
      return 6;
   else if(!str.localeCompare("DECIMAL"))
      return 7;
   else if(!str.localeCompare("INTEGER"))
      return 8;
   else if(!str.localeCompare("CHAR"))
      return 9;
   else if(!str.localeCompare("BOOLEAN"))
      return 10;
   else if(!str.localeCompare("SET"))
      return 11;
   else if(!str.localeCompare("WHERE"))
      return 12;
   else if(!str.localeCompare("TIMES"))
      return 13;
   else if(!str.localeCompare("MINUS"))
      return 14;
   else if(!str.localeCompare("SEMIJOIN"))
      return 15;
   else if(!str.localeCompare("SEMIMINUS"))
      return 16;
   else if(!str.localeCompare("RENAME"))
      return 17;
   else if(!str.localeCompare("DIVIDEBY"))
      return 18;
   else if(!str.localeCompare("RELATION"))
      return 19;
   else if(!str.localeCompare("TUPLE"))
      return 20;
   else if(!str.localeCompare("AS"))
      return 21;
   else if(!str.localeCompare("WITH"))
      return 22;
   else if(!str.localeCompare("EXTEND"))
      return 23;
   else if(!str.localeCompare("ADD"))
      return 24;
   else if(!str.localeCompare("SUMMARIZE"))
      return 25;
   else if(!str.localeCompare("BY"))
      return 26;
   else if(!str.localeCompare("ALL"))
      return 27;
   else if(!str.localeCompare("BUT"))
      return 28;
   else if(!str.localeCompare("PER"))
      return 29;
   else if(!str.localeCompare("COUNT"))
      return 30;
   else if(!str.localeCompare("SUM"))
      return 31;
   else if(!str.localeCompare("AVG"))
      return 32;
   else if(!str.localeCompare("MAX"))
      return 33;
   else if(!str.localeCompare("MIN"))
      return 34;
   else if(!str.localeCompare("AND"))
      return 35;
   else if(!str.localeCompare("OR"))
      return 36;
   else if(!str.localeCompare("XOR"))
      return 37;
   else if(!str.localeCompare("UNION"))
      return 38;
   else if(!str.localeCompare("INTERSECT"))
      return 39;
   else if(!str.localeCompare("NOT"))
      return 40;
   else if(!str.localeCompare("COUNTD"))
      return 41;
   else if(!str.localeCompare("SUMD"))
      return 42;
   else if(!str.localeCompare("AVGD"))
      return 43;
   else if(!str.localeCompare("oropr"))
      return 44;
   else if(!str.localeCompare("JOIN"))
      return 45;
   else if(!str.localeCompare("TRUE"))
      return 46;
   else if(!str.localeCompare("FALSE"))
      return 47;
   else if(!str.localeCompare("STRING"))
      return 48;
   else if(!str.localeCompare("id"))
      return 49;
   else if(!str.localeCompare("string"))
      return 50;
   else if(!str.localeCompare("int"))
      return 51;
   else if(!str.localeCompare("float"))
      return 52;
   else if(!str.localeCompare("ackop"))
      return 53;
   else if(!str.localeCompare("ackcl"))
      return 54;
   else if(!str.localeCompare("semiopr"))
      return 55;
   else if(!str.localeCompare("equ"))
      return 56;
   else if(!str.localeCompare("divequ"))
      return 57;
   else if(!str.localeCompare("assignopr"))
      return 58;
   else if(!str.localeCompare("lequ"))
      return 59;
   else if(!str.localeCompare("gequ"))
      return 60;
   else if(!str.localeCompare("great"))
      return 61;
   else if(!str.localeCompare("less"))
      return 62;
   else if(!str.localeCompare("addopr"))
      return 63;
   else if(!str.localeCompare("minusopr"))
      return 64;
   else if(!str.localeCompare("divopr"))
      return 65;
   else if(!str.localeCompare("mulopr"))
      return 66;
   else if(!str.localeCompare("prantop"))
      return 67;
   else if(!str.localeCompare("prantcl"))
      return 68;
   else if(!str.localeCompare("sharp"))
      return 69;
   else if(!str.localeCompare("end"))
      return 70;
}

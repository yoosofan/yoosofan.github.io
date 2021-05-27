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


//--lexical analyser file(It contains 9 functions)--

function lexic()
{
var ch="";
var cn=0;
var string_counter=0;
while(last<=str.length)
{
   ch=str.charAt(last);
   last++;
   switch(cn)
   {
      case 0:
         if(isletter(ch))
            cn=1;
         else if(isdigit(ch))
            cn=3;
         else if(ch=="+")
            cn=4;
         else if(ch=="-")
            cn=5;
         else if(ch==" ")
            cn=12;
         else if(ch.charCodeAt(0)==13)
            cn=12;
         else if(ch.charCodeAt(0)==10)
            cn=12;
         else if(ch=="|")
            cn=14;
         else if(ch==";")
            cn=16;
         else if(ch==",")
            cn=18;
         else if(ch==":")
            cn=20;
         else if(ch=="(")
            cn=23;
         else if(ch==")")
            cn=25;
         else if(ch=="{")
            cn=27;
         else if(ch=="}")
            cn=29;
         else if(ch=="=")
            cn=31;
         else if(ch=="/")
            cn=33;
         else if(ch==">")
            cn=36;
         else if(ch=="<")
            cn=39;
         else if(ch=="*")
            cn=42;
         else if(ch=="$")
            cn=44;
         else if(ch=="\"")
         {
            string_counter=1;
            cn=45;
         }
         else cn=47;
      break;
      case 1:
         if(isletter(ch)||isdigit(ch))
            cn=1;
         else
         {
            cn=2;
            ungetchar();
         }
      break;
      case 2:
         ungetchar();
         cn=0;
         type=identify();
         make_token();
         set_first_last();
      break;
      case 3:
         if(isdigit(ch))
            cn=3;
         else if(ch==".")
            cn=9;
         else
         {
            ungetchar();
            cn=8;
         }
      break;
      case 4:
         if(isdigit(ch))
            cn=3;
         else
         {
            ungetchar();
            cn=6;
         }
      break;
      case 5:
         if(isdigit(ch))
            cn=3;
         else
         {
            ungetchar();
            cn=7;
         }
      break;
      case 6:
         ungetchar();
         cn=0;
         type="addopr";
         make_token();
         set_first_last();
      break;
      case 7:
         ungetchar();
         cn=0;
         type="minusopr";
         make_token();
         set_first_last();
      break;
      case 8:
         ungetchar();
         cn=0;
         type="int";
         make_token();
         set_first_last();
      break;
      case 9:
         if(isdigit(ch))
            cn=10;
         cn=44;
      break;
      case 10:
         if(isdigit(ch))
            cn=10;
         else
         {
            ungetchar();
            cn=11;
         }
      break;
      case 11:
         ungetchar();
         cn=0;
         type="Float";
         make_token();
         set_first_last();
      break;
      case 12:
         if(ch==" "||ch.charCodeAt(0)==13||ch.charCodeAt(0)==10)
            cn=12;
         else
         {
            ungetchar();
            cn=13;
         }
      break;
      case 13:
         ungetchar();
         cn=0;
         set_first_last();
      break;
      case 14:
         ungetchar();
         cn=15;
      break;
      case 15:
         ungetchar();
         cn=0;
         type="oropr";
         make_token();
         set_first_last();
      break;
      case 16:
         ungetchar();
         cn=17;
      break;
      case 17:
         ungetchar();
         cn=0;
         type="semiopr";
         make_token();
         set_first_last();
      break;
      case 18:
         ungetchar();
         cn=19;
      break;
      case 19:
         ungetchar();
         cn=0;
         type="camaopr";
         make_token();
         set_first_last();
      break;
      case 20:
         if(ch=="=")
            cn=21;
         else
         {
            ungetchar();
            cn=22;
         }
      break;
      case 21:
         ungetchar();
         cn=0;
         type="assignopr";
         make_token();
         set_first_last();
      break;
      case 22:
         ungetchar();
         cn=0;
         type="expopr";
         make_token();
         set_first_last();
      break;
      case 23:
         ungetchar();
         cn=24;
      break;
      case 24:
         ungetchar();
         cn=0;
         type="prantop";
         make_token();
         set_first_last();
      break;
      case 25:
         ungetchar();
         cn=26;
      break;
      case 26:
         ungetchar();
         cn=0;
         type="prantcl";
         make_token();
         set_first_last();
      break;
      case 27:
         ungetchar();
         cn=28;
      break;
      case 28:
         ungetchar();
         cn=0;
         type="ackop";
         make_token();
         set_first_last();
      break;
      case 29:
         ungetchar();
         cn=30;
      break;
      case 30:
         ungetchar();
         cn=0;
         type="ackcl";
         make_token();
         set_first_last();
      break;
      case 31:
         ungetchar();
         cn=32;
      break;
      case 32:
         ungetchar();
         cn=0;
         type="equ";
         make_token();
         set_first_last();
      break;
      case 33:
         if(ch=="=")
            cn=34;
         else
         {
            ungetchar();
            cn=35;
         }
      break;
      case 34:
         ungetchar();
         cn=0;
         type="divequ";
         make_token(2);
         set_first_last();
      break;
      case 35:
         ungetchar();
         cn=0;
         type="divopr";
         make_token();
         set_first_last();
      break;
      case 36:
         if(ch=="=")
            cn=37;
         else
         {
            ungetchar();
            cn=38;
         }
      break;
      case 37:
         ungetchar();
         cn=0;
         type="gequ";
         make_token();
         set_first_last();
      break;
      case 38:
         ungetchar();
         cn=0;
         type="great";
         make_token();
         set_first_last();
      break;
      case 39:
         if(ch=="=")
            cn=40;
         else if(ch == ">")
            cn = 34;
         else
         {
            ungetchar();
            cn=41;
         }
      break;
      case 40:
         ungetchar();
         cn=0;
         type="lequ";
         make_token();
         set_first_last();
      break;
      case 41:
         ungetchar();
         cn=0;
         type="less";
         make_token();
         set_first_last();
      break;
      case 42:
         ungetchar();
         cn=43;
      break;
      case 43:
         ungetchar();
         cn=0;
         type="mulopr";
         make_token();
         set_first_last();
      break;
      case 44:
         ungetchar();
         cn=0;
         type="end";
         make_token();
         set_first_last();
      break;
      case 45:
         if(ch!="\"")
            cn=45;
         else
         {
            string_counter=2;
            cn=46;
         }
      break;
      case 46:
         ungetchar();
         cn=0;
         type="string";
         first=first+1;
         last=last-1;
         make_token();
         first=first-1;
         last=last+1;
         set_first_last();
      break;
      case 47:
         error();
         set_first_last();
         cn=0;
      break;
   }
}

if(string_counter==1)
{
   lex_err_flag=1;
}
}
//***********************************************
function isdigit(ch)
{
   if(ch=="0"||ch=="1"||ch=="2"||ch=="3"||ch=="4"||ch=="5"||ch=="6"||ch=="7"||ch=="8"||ch=="9")
      return 1;
   return 0;
}
//***********************************************
function isletter(ch)
{
   if(ch=="a"||ch=="b"||ch=="c"||ch=="d"||ch=="e"||ch=="f"||ch=="g"||ch=="h"||ch=="i"||ch=="j"||ch=="k"||
      ch=="l"||ch=="m"||ch=="n"||ch=="o"||ch=="p"||ch=="q"||ch=="r"||ch=="s"||ch=="t"||ch=="u"||ch=="v"||
      ch=="w"||ch=="x"||ch=="y"||ch=="z"||ch=="A"||ch=="B"||ch=="C"||ch=="D"||ch=="E"||ch=="F"||ch=="G"||
      ch=="H"||ch=="I"||ch=="J"||ch=="K"||ch=="L"||ch=="M"||ch=="N"||ch=="O"||ch=="P"||ch=="Q"||ch=="R"||
      ch=="S"||ch=="T"||ch=="U"||ch=="V"||ch=="W"||ch=="X"||ch=="Y"||ch=="Z"||ch=="_"||ch=="#")
      return 1;
   return 0;
}
//***********************************************
function identify()
{
if(!strcmp1("INSERT")||!strcmp1("insert"))
   return "INSERT";
else if(!strcmp1("DELETE")||!strcmp1("delete"))
   return "DELETE";
else if(!strcmp1("UPDATE")||!strcmp1("update"))
   return "UPDATE";
else if(!strcmp1("SET")||!strcmp1("set"))
   return "SET";
else if(!strcmp1("WHERE")||!strcmp1("where"))
   return "WHERE";
else if(!strcmp1("UNION")||!strcmp1("union"))
   return "UNION";
else if(!strcmp1("INTERSECT")||!strcmp1("intersect"))
   return "INTERSECT";
else if(!strcmp1("MINUS")||!strcmp1("minus"))
   return "MINUS";
else if(!strcmp1("JOIN")||!strcmp1("join"))
   return "JOIN";
else if(!strcmp1("SEMIJOIN")||!strcmp1("semijoin"))
   return "SEMIJOIN";
else if(!strcmp1("SEMIMINUS")||!strcmp1("semiminus"))
   return "SEMIMINUS";
else if(!strcmp1("RENAME")||!strcmp1("rename"))
   return "RENAME";
else if(!strcmp1("GROUP")||!strcmp1("group"))
   return "GROUP";
else if(!strcmp1("UNGROUP")||!strcmp1("ungroup"))
   return "UNGROUP";
else if(!strcmp1("DIVIDEBY")||!strcmp1("divideby"))
   return "DIVIDEBY";
else if(!strcmp1("AS")||!strcmp1("as"))
   return "AS";
else if(!strcmp1("WITH")||!strcmp1("with"))
   return "WITH";
else if(!strcmp1("EXTEND")||!strcmp1("extend"))
   return "EXTEND";
else if(!strcmp1("ADD")||!strcmp1("add"))
   return "ADD";
else if(!strcmp1("SUMMARIZE")||!strcmp1("summarize"))
   return "SUMMARIZE";
else if(!strcmp1("BY")||!strcmp1("by"))
   return "BY";
else if(!strcmp1("ALL")||!strcmp1("all"))
   return "ALL";
else if(!strcmp1("BUT")||!strcmp1("but"))
   return "BUT";
else if(!strcmp1("PER")||!strcmp1("per"))
   return "PER";
else if(!strcmp1("COUNT")||!strcmp1("count"))
   return "COUNT";
else if(!strcmp1("SUM")||!strcmp1("sum"))
   return "SUM";
else if(!strcmp1("AVG")||!strcmp1("avg"))
   return "AVG";
else if(!strcmp1("MAX")||!strcmp1("max"))
   return "MAX";
else if(!strcmp1("MIN")||!strcmp1("min"))
   return "MIN";
else if(!strcmp1("AND")||!strcmp1("and"))
   return "AND";
else if(!strcmp1("OR")||!strcmp1("or"))
   return "OR";
else if(!strcmp1("TRUE")||!strcmp1("true"))
   return "TRUE";
else if(!strcmp1("FALSE")||!strcmp1("false"))
   return "FALSE";
else if(!strcmp1("AND")||!strcmp1("and"))
   return "AND";
else if(!strcmp1("IN")||!strcmp1("in"))
   return "IN";
else if(!strcmp1("NOT")||!strcmp1("not"))
   return "NOT";
else if(!strcmp1("XOR")||!strcmp1("xor"))
   return "XOR";
else if(!strcmp1("TIMES")||!strcmp1("times"))
   return "TIMES";
else if(!strcmp1("RELATION")||!strcmp1("relation"))
   return "RELATION";
else if(!strcmp1("TUPLE")||!strcmp1("tuple"))
   return "TUPLE";
else
   return"id";
}
//***********************************************
function strcmp1(key)
{
   var temp=str.slice(first,last)
   temp=temp.toUpperCase();
   return(key.localeCompare(temp))
}
//***********************************************
function ungetchar()
{
   last--;
}
//***********************************************
function make_token(tokenTypeNumber2)
{
  tokenTypeNumber2 = tokenTypeNumber2 || 1;
  var temp;
  if( tokenTypeNumber2 == 2)
    temp = "/=";
  else
    temp=str.slice(first,last);
  if(!type.localeCompare("id"))
    temp=temp.toLowerCase();
  t.setdata(counter,temp);
  t.settype(counter,type);
  counter++;
}
//***********************************************
function set_first_last()
{
   first=last;
}
//***********************************************
function error()
{
   var e_str="error";
   var ch="";
   e_str="";
   while((ch!=" "||ch!=";"||ch.charCodeAt(0)==13)&&(last<str.lenght))
   {
      ch=str.charAt[last];
      last++;
      if(ch==";")
         break;
   }
   lex_err_flag=1;
}
